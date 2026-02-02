
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function GET() {
    const supabase = createAdminClient()

    const results: any = {}

    const checks = ['user_id', 'userId', 'profile_id', 'customerId', 'customer_id', 'owner', 'auth_id']

    for (const col of checks) {
        const { error } = await supabase.from('orders').select(col).limit(1)
        results[col] = error ? error.message : 'EXISTS'
    }

    // Also check if table is accessible at all
    const { error: tableError } = await supabase.from('orders').select('id').limit(1)
    results['id'] = tableError ? tableError.message : 'EXISTS'

    return NextResponse.json(results)
}
