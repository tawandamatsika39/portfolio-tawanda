module.exports = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                void: '#000000',
                obsidian: '#0B0B0C',
                spice: {
                    DEFAULT: '#D4AF37',
                    muted: '#A8893A',
                    dim: 'rgba(212, 175, 55, 0.35)'
                },
                stardust: '#9BA0A8',
                snow: '#F5F5F7'
            },
            fontFamily: {
                display: ['"JetBrains Mono"', 'Consolas', 'monospace'],
                sans: ['"JetBrains Mono"', 'Consolas', 'monospace']
            },
            letterSpacing: {
                orbit: '0.15em',
                vast: '0.3em',
                cosmos: '0.5em'
            },
            borderColor: {
                hairline: 'rgba(255, 255, 255, 0.07)'
            }
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
        // ...
      ],

}
