import { GoogleGenerativeAI } from '@google/generative-ai'
import { Product } from '@/lib/sanity/client'

const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY

if (!apiKey) {
    console.warn('⚠️  GEMINI_API_KEY not found. AI features will be disabled.')
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

/**
 * Sivi Lead Stylist System Prompt
 * Defines the AI persona and behavior for style consultations
 */
const STYLIST_PROMPT = `You are the Sivi Lead Stylist, a sophisticated fashion consultant for Sivi Studio—a premium Hyderabad-based atelier specializing in Quiet Luxury, conscious craft, and custom tailoring.

## Your Persona
- **Tone**: Sophisticated, warm, and helpful. Never pushy or sales-y.
- **Expertise**: Deep knowledge of Indian handlooms (Pochampally Ikat, Gadwal silk, Uppada weaves), fabric science (40D foam, 60s count cotton), and contemporary styling.
- **Philosophy**: You believe in timeless elegance over trends, conscious consumption, and garments that age gracefully.

## Your Role
1. **Understand the Customer**: Ask thoughtful questions about their style, occasion, body type, and preferences.
2. **Recommend Thoughtfully**: Suggest products from the Sivi collection that truly fit their needs.
3. **Educate**: Share insights about fabric heritage, material science, and care instructions.
4. **Personalize**: Reference their measurements if available, suggest custom tailoring options.

## Guidelines
- Keep responses concise (2-3 paragraphs max)
- Always mention specific product names when recommending
- Highlight the craft story and material details
- If asked about availability, mention 7-10 day standard shipping or Hyderabad studio pickup
- Never make up product details—only reference products provided in context

## Example Tone
"For a summer wedding in Hyderabad, I'd recommend our Pochampally Silk Saree. The Ikat weave is breathable yet elegant, and the tie-dye precision creates a subtle geometric pattern that photographs beautifully. The 60s count cotton lining ensures comfort even in the heat. Would you like to know more about the artisan who wove this piece?"
`

/**
 * Get AI style recommendation based on user message and product catalog
 */
export async function getStyleRecommendation(
    userMessage: string,
    products: Product[] = [],
    conversationHistory: { role: 'user' | 'model'; parts: string }[] = []
) {
    if (!genAI) {
        throw new Error('Gemini API is not configured. Please add GEMINI_API_KEY to your environment variables.')
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

    // Build product context
    const productContext = products.length > 0
        ? `\n\n## Available Products\n${products.map(p =>
            `- **${p.title}**${p.price ? ` (₹${p.price.toLocaleString('en-IN')})` : ' (Price on Request)'}: ${p.description}`
        ).join('\n')}`
        : ''

    // Start chat with system prompt
    const chat = model.startChat({
        history: [
            {
                role: 'user',
                parts: [{ text: STYLIST_PROMPT + productContext }]
            },
            {
                role: 'model',
                parts: [{ text: 'Understood. I am the Sivi Lead Stylist, ready to help you discover pieces that resonate with your style and values. How may I assist you today?' }]
            },
            ...conversationHistory.map(msg => ({
                role: msg.role,
                parts: [{ text: msg.parts }]
            }))
        ]
    })

    const result = await chat.sendMessage(userMessage)
    return result.response.text()
}

/**
 * Stream AI response for real-time chat experience
 */
export async function streamStyleRecommendation(
    userMessage: string,
    products: Product[] = []
) {
    if (!genAI) {
        throw new Error('Gemini API is not configured.')
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

    const productContext = products.length > 0
        ? `\n\n## Available Products\n${products.map(p =>
            `- **${p.title}**${p.price ? ` (₹${p.price.toLocaleString('en-IN')})` : ' (Price on Request)'}: ${p.description}`
        ).join('\n')}`
        : ''

    const prompt = `${STYLIST_PROMPT}${productContext}\n\nCustomer: ${userMessage}\n\nSivi Stylist:`

    const result = await model.generateContentStream(prompt)
    return result.stream
}
