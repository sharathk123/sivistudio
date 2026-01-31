interface StatCardProps {
    label: string
    value: string
}

export default function StatCard({ label, value }: StatCardProps) {
    return (
        <div className="bg-white p-6 border-l-2 border-sage shadow-sm">
            <span className="text-xs uppercase tracking-widest text-charcoal-400 block mb-2">{label}</span>
            <span className="font-serif text-3xl text-charcoal">{value}</span>
        </div>
    )
}
