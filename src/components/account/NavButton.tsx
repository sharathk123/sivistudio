import { ChevronRight, LucideIcon } from 'lucide-react'

interface NavButtonProps {
    active: boolean
    onClick: () => void
    icon: LucideIcon
    label: string
}

export default function NavButton({ active, onClick, icon: Icon, label }: NavButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-between px-4 py-4 transition-all duration-300 group ${active ? 'bg-charcoal text-white' : 'hover:bg-ivory text-charcoal'}`}
        >
            <div className="flex items-center space-x-3">
                <Icon size={18} className={active ? 'text-sage' : 'text-charcoal-400 group-hover:text-sage'} />
                <span className={`uppercase tracking-widest text-xs font-bold ${active ? 'text-white' : 'text-charcoal'}`}>{label}</span>
            </div>
            {active && <ChevronRight size={16} className="text-sage" />}
        </button>
    )
}
