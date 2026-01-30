import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                sage: {
                    DEFAULT: '#9CA770',
                    50: '#F5F7ED',
                    100: '#E8ECDA',
                    200: '#D4DCB5',
                    300: '#C0CB90',
                    400: '#ACBB6B',
                    500: '#9CA770',
                    600: '#7D8659',
                    700: '#5E6442',
                    800: '#3F432C',
                    900: '#202115',
                },
                ivory: {
                    DEFAULT: '#E4E4DE',
                    50: '#FDFCFB',
                    100: '#F9F9F6',
                    200: '#F1F1EC',
                    300: '#E9E9E2',
                    400: '#E4E4DE',
                    500: '#D5D5CC',
                    600: '#B8B8AC',
                    700: '#9B9B8C',
                    800: '#7E7E6C',
                    900: '#61614C',
                },
                charcoal: {
                    DEFAULT: '#1A1A1A',
                    50: '#4D4D4D',
                    100: '#404040',
                    200: '#333333',
                    300: '#262626',
                    400: '#1A1A1A',
                    500: '#0D0D0D',
                    600: '#000000',
                },
                bone: {
                    DEFAULT: '#FDFCFB',
                    50: '#FFFFFF',
                    100: '#FDFCFB',
                },
            },
            fontFamily: {
                serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
                sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
            },
            letterSpacing: {
                'wide-luxury': '0.05em',
            },
        },
    },
    plugins: [],
}

export default config
