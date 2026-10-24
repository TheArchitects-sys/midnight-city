// Configuração única do Tailwind do site (união das configs inline que existiam por página).
// Recompile depois de usar classes novas: npx tailwindcss@3.4.17 -c tailwind.config.cjs -i tailwind.input.css -o tailwind.css --minify
// As cores personalizadas não são usadas em nenhuma página hoje; ficam para não quebrar uso futuro.
module.exports = {
  darkMode: 'class',
  content: [
    './*.html',
    './*.js',
    './content/**/*.js',
    './tailwind-safelist.txt' // classes vistas em execução (geradas por JS),
  ],
  theme: {
    extend: {
      colors: {
        'gold-primary': '#d4af37',
        'gold-light': '#f1d27a',
        'gold-dim': '#8c6a2b',
        'dark-bg': '#050608',
        'dark-surface': '#0a0912',
        'dark-veil': '#0f0e1a',
        'crimson-pure': '#c82924',
        gold: { 300: '#f1d27a', 400: '#e5c058', 500: '#d4af37', 600: '#c49929', 700: '#8c7126' },
      },
    },
  },
};
