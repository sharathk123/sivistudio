import { createAdminClient } from './src/lib/supabase/admin'

async function testQuery() {
    try {
        const supabase = createAdminClient()
        const userId = 'e0cc304f-0467-40be-9f1f-56a6293ce20c' // The user from the screenshot

        console.log('Testing query for user:', userId)

        const { data: orders, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_items (
                    id,
                    sanity_product_id,
                    selected_size,
                    quantity,
                    price
                )
            `)
            .eq('profile_id', userId)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Query Error:', error)
        } else {
            console.log('Query Success! Number of orders:', orders?.length)
            if (orders && orders.length > 0) {
                console.log('First Order:', JSON.stringify(orders[0], null, 2))
            }
        }
    } catch (e) {
        console.error('Script error:', e)
    }
}

testQuery()
