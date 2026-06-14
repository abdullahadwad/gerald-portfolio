export const colors = {
    background: {
        main: '#F5F1EA',
        alt: '#EDE9E0',
    },
    text: {
        primary: '#111111',
        secondary: '#55524D',
        tertiary: '#8A8680',
    },
    border: '#D8D2C8',
    accent: {
        dark: '#2F3432',
        mid: '#6B6258',
    },
} as const;

export const typography = {
    fonts: {
        primary: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    weights: {
        light: 300,
        regular: 400,
        medium: 500,
    },
    tracking: {
        tight: '-0.02em',
        normal: '0em',
        wide: '0.06em',
        wider: '0.08em',
        widest: '0.14em',
    },
    leading: {
        tight: 1.05,
        normal: 1.6,
        relaxed: 1.7,
        loose: 1.8,
    },
} as const;