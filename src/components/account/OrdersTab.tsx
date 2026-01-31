import { recentOrders } from '@/data/accountData'
import OrderCard from './OrderCard'

export default function OrdersTab() {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-3xl text-charcoal italic">My Order History</h2>
            </div>
            <div className="space-y-4">
                {recentOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
                <div className="bg-ivory-100 p-8 text-center text-charcoal-400 font-light mt-8">
                    No more past orders found.
                </div>
            </div>
        </div>
    )
}
