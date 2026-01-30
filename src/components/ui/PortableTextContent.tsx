import { PortableText, PortableTextComponents } from '@portabletext/react'

const components: PortableTextComponents = {
    block: {
        h1: ({ children }) => <h1 className="font-serif text-4xl mb-6 italic text-charcoal">{children}</h1>,
        h2: ({ children }) => <h2 className="font-serif text-3xl mb-4 text-charcoal">{children}</h2>,
        h3: ({ children }) => <h3 className="font-serif text-2xl mb-3 text-charcoal">{children}</h3>,
        normal: ({ children }) => <p className="mb-4 text-charcoal-400 leading-relaxed font-light">{children}</p>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-sage pl-6 my-6 text-xl font-serif italic text-charcoal-400">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-5 mb-4 text-charcoal-400 space-y-2">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-5 mb-4 text-charcoal-400 space-y-2">{children}</ol>,
    },
}

export default function PortableTextContent({ value }: { value: any }) {
    return <PortableText value={value} components={components} />
}
