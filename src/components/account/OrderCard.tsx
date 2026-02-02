import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Order {
    id: string
    rawId?: string // Added rawId for linking to UUIDs while displaying shortened IDs
    date: string
    status: string
    total: string
    items: string[]
}

interface OrderCardProps {
    order: Order
}

export default function OrderCard({ order }: OrderCardProps) {
    return (
        <Link href={`/account/orders/${order.rawId ?? order.id}`} className="block">
            <div className="bg-white p-6 border border-charcoal/10 flex flex-col md:flex-row justify-between items-start md:items-center hover:border-sage transition-colors cursor-pointer group">
                <div className="space-y-1 mb-4 md:mb-0">
                    <div className="flex items-center space-x-3">
                        <span className="font-bold text-charcoal">{order.id}</span>
                        <span className="px-2 py-0.5 bg-sage/10 text-sage text-[10px] uppercase font-bold tracking-wider rounded-sm">{order.status}</span>
                    </div>
                    <p className="text-charcoal-400 text-sm">{order.items.join(', ')}</p>
                    <p className="text-xs text-charcoal-400/70 font-light">{order.date}</p>
                </div>
                <div className="flex items-center space-x-6">
                    <span className="font-serif text-lg">{order.total}</span>
                    <ChevronRight size={18} className="text-charcoal-400 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    )
}
