# Midnight City: site oficial

> *"Onde juramentos são mais fortes que sangue, e o silêncio sustenta o equilíbrio entre deuses e homens."*

Site oficial do **Midnight City (MC)**, RPG narrativo de deuses, mitologias e horror sobrenatural em Londres, sob o Véu e a vigilância da Égide de Avalon.

- Discord: https://discord.gg/RjVKryxCu
- Comunidade no Yoble: https://yoble.us/Community/309183

## Páginas

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Início: Temporada 2, convocações, onboarding, ofícios, criador de ficha |
| `universo.html` | Universo, cosmologia e Season 1 |
| `sistema.html` | Regras, sistemas e guias |
| `operacoes.html` | Painel de operações |
| `poderes.html` | Poderes e individualidades |
| `agente.html` | Central de vigilância (recursos do agente) |
| `banners.html` | Banners |
| `endgame.html` | Zonas de risco extremo |

Imagens e mídias ficam em `assets/`. A identidade visual (logo MC e favicons) está em `assets/brand/`.

## Rodar localmente

O site é estático, sem build. Para que os módulos e mídias carreguem sem bloqueio do navegador, use um servidor local em vez de abrir o arquivo direto:

```bash
python -m http.server 8000
# abra http://localhost:8000
```

## Publicar no GitHub Pages

1. Crie um repositório e envie todos os arquivos desta pasta para a raiz da branch `main` (o arquivo `.nojekyll` precisa ir junto).
2. No repositório, vá em **Settings → Pages → Build and deployment**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)` e salve.
3. Em 1 a 2 minutos o site estará em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

O projeto também já inclui `netlify.toml` e `vercel.json`, caso prefira Netlify ou Vercel.

## Dependências externas (via CDN)

GSAP + ScrollTrigger, three.js, lottie-web, Phosphor Icons e Google Fonts. O site precisa de internet para ficar com o visual completo.

## Tailwind (compilado)

O Tailwind não vem mais do CDN: ele é compilado em `tailwind.css`, o que deixa as páginas mais leves e sem saltos de layout. Sempre que usar uma classe do Tailwind que ainda não existe no site, recompile:

```bash
npx tailwindcss@3.4.17 -c tailwind.config.cjs -i tailwind.input.css -o tailwind.css --minify
```

`tailwind-safelist.txt` guarda as classes que só aparecem via JavaScript, para que não sumam na compilação.

## Imagens

As imagens grandes têm versão `.webp` ao lado do original, e é ela que as páginas usam. Ao adicionar uma imagem nova acima de ~400 KB, gere a versão WebP antes de referenciá-la.

---

Projeto de RPG colaborativo sem fins lucrativos, feito para entretenimento e ficção.
