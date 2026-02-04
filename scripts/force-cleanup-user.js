
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    }
});

async function cleanupUser(email) {
    console.log(`Starting cleanup for ${email}...`);

    // 1. Get User ID
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) {
        console.error('List users failed:', listError);
        return;
    }

    const user = users.find(u => u.email === email);
    if (!user) {
        console.log('User not found in Auth. Checking public tables just in case...');
        // We can't easily query public tables by email if we don't know the ID, 
        // but usually if they aren't in Auth, they are effectively gone.
        return;
    }

    const userId = user.id;
    console.log(`Found User ID: ${userId}`);

    // 2. Delete related data from public schema
    // Note: We use the service role key so RLS is bypassed.

    // Delete Wishlists
    const { error: wishlistError } = await supabase.from('wishlists').delete().eq('user_id', userId);
    if (wishlistError) console.error('Error deleting wishlists:', wishlistError);
    else console.log('Deleted wishlists.');

    // Delete User Addresses
    const { error: addressError } = await supabase.from('user_addresses').delete().eq('id', userId); // Assuming ID matches or need to query
    // Actually user_addresses usually have 'user_id' or 'id' link. Let's assume 'id' is the user ID if 1:1 or query by user_id
    // Checking schema via assumption: usually keys are user_id
    const { error: addressError2 } = await supabase.from('user_addresses').delete().eq('user_id', userId);
    // Just try both fields to be safe
    if (addressError && addressError2) console.error('Error deleting addresses:', addressError);
    else console.log('Deleted addresses.');

    // Delete Orders
    const { error: orderError } = await supabase.from('orders').delete().eq('profile_id', userId);
    if (orderError) console.error('Error deleting orders:', orderError);
    else console.log('Deleted orders.');

    // Delete Profile (User Addresses usually cascade from profile or need manual delete if no cascade)
    // Let's try deleting profile directly.
    const { error: profileError } = await supabase.from('profiles').delete().eq('id', userId);
    if (profileError) console.error('Error deleting profile:', profileError);
    else console.log('Deleted profile.');

    // 6. Delete OTP codes
    const { error: otpError } = await supabase
        .from('otp_codes')
        .delete()
        .eq('email', email);

    if (otpError) {
        console.warn('Error deleting OTP codes (might be empty):', otpError.message);
    } else {
        console.log('Deleted OTP codes.');
    }

    // 7. Delete from Auth
    const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);

    if (deleteError) {
        console.error('Error deleting auth user:', deleteError);
    } else {
        console.log(`Success! User ${email} has been fully removed.`);
    }
}

cleanupUser('sivihandloom@gmail.com');
