import { LucideIcon } from 'lucide-react'

interface PlaceholderTabProps {
    title: string
    icon: LucideIcon
}

export default function PlaceholderTab({ title, icon: Icon }: PlaceholderTabProps) {
    return (
        <div className="flex flex-col items-center justify-center h-[400px] border border-dashed border-charcoal/20 rounded-sm bg-ivory/50">
            <div className="w-16 h-16 rounded-full bg-bone flex items-center justify-center mb-6">
                <Icon size={32} className="text-sage" strokeWidth={1} />
            </div>
            <h2 className="font-serif text-2xl text-charcoal italic mb-2">{title}</h2>
            <p className="text-charcoal-400 font-light">This section is coming soon.</p>
        </div>
    )
}
