import OrderCard from './OrderCard'
import StatCard from './StatCard'
import { recentOrders } from '@/data/accountData'

export default function OverviewTab() {
    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Total Orders" value="12" />
                <StatCard label="Member Status" value="Gold" />
                <StatCard label="Points Balance" value="2,450" />
            </div>

            <div>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="font-serif text-2xl text-charcoal italic">Recent Orders</h2>
                </div>
                <div className="space-y-4">
                    {recentOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            </div>
        </div>
    )
}
