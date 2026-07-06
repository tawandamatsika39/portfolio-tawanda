module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{vue,js,ts}',
    './content/**/*.md',
  ],
  theme: {
    extend: {
      colors: {
        // base dark surface scale — page/header/card depth layers
        night: {
          50: '#f4f4f7',
          100: '#e4e4ec',
          200: '#c4c4d4',
          300: '#9a9ab0',
          400: '#6b6b85',
          500: '#4a4a63',
          600: '#34344a',
          700: '#26263a',
          800: '#1c1c2b',
          900: '#0d0d14',
          950: '#06060a',
        },
        // brand violet, evolved from the site's existing #8546c5 / #a268dd
        primary: {
          50: '#f5f0fc',
          100: '#ebe0f9',
          200: '#d4bef2',
          300: '#b995e8',
          400: '#a268dd',
          500: '#8546c5',
          600: '#6d38a3',
          700: '#562c81',
          800: '#3f2060',
          900: '#281440',
          950: '#180c28',
        },
        // Zimbabwean motif — Great Zimbabwe granite / terracotta clay
        ochre: {
          50: '#faf3ea',
          100: '#f0dfc4',
          200: '#e0c093',
          300: '#cf9f66',
          400: '#c17f3f',
          500: '#a8622b',
          600: '#8a4d22',
          700: '#6b3b1c',
          800: '#4d2c17',
          900: '#332012',
          950: '#21140b',
        },
        // futuristic-AI glow accent
        neon: {
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          glow: '#00f0ff',
          green: '#39ff14',
        },
      },
      fontFamily: {
        display: ['"Orbitron"', 'sans-serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 8px rgba(133,70,197,0.6), 0 0 24px rgba(133,70,197,0.35)',
        'glow-primary-lg': '0 0 16px rgba(162,104,221,0.7), 0 0 48px rgba(133,70,197,0.4)',
        'glow-neon': '0 0 6px rgba(34,211,238,0.7), 0 0 20px rgba(34,211,238,0.4)',
        'glow-ochre': '0 0 8px rgba(168,98,43,0.55), 0 0 22px rgba(168,98,43,0.3)',
        'glow-card': '0 4px 24px -4px rgba(0,0,0,0.6), 0 0 0 1px rgba(162,104,221,0.15)',
      },
      backgroundSize: {
        200: '200% 200%',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: 1 },
          '50%, 100%': { opacity: 0 },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        blink: 'blink 1s steps(1) infinite',
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-links': theme('colors.primary.600'),
            a: {
              textDecoration: 'none',
              borderBottom: `1px dashed ${theme('colors.primary.400')}`,
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.gray.300'),
            '--tw-prose-headings': theme('colors.primary.200'),
            '--tw-prose-links': theme('colors.neon.400'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-bullets': theme('colors.primary.400'),
            '--tw-prose-hr': theme('colors.primary.800'),
            '--tw-prose-quotes': theme('colors.ochre.300'),
            '--tw-prose-quote-borders': theme('colors.primary.600'),
            '--tw-prose-code': theme('colors.neon.300'),
            '--tw-prose-th-borders': theme('colors.primary.700'),
            a: {
              textDecoration: 'none',
              borderBottom: `1px dashed ${theme('colors.neon.500')}`,
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
