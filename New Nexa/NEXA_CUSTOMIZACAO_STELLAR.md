# NEXA — Checklist de Customização (Template HTML5UP Stellar)

## Estrutura (âncoras nativas)
- `#intro` (Hero) — Headline forte + subtítulo + CTA duplo.
- `#first` — Por que publicar (4–6 bullets com ícones/checagens).
- `#second` — Processo editorial + Serviços + Portfólio (grade de capas).
- `#cta` — Chamada final com botões (“Simular custo”, “Publicar agora”).

## Identidade e Acessibilidade
- [ ] Ajustar variáveis em `assets/css/nexa.css` (`--nexa-navy`, `--nexa-accent`).
- [ ] Inserir logo (SVG/PNG) no header; garantir contraste AA/AAA.
- [ ] Links com sublinhado visível (feito em `nexa.css`).
- [ ] Não depender apenas de cor nos ícones/estados (usar rótulos `data-label` quando fizer sentido).

## Conteúdo
- [ ] Headline do Hero (promessa clara + benefício).
- [ ] Bullets “Por que NEXA”: qualidade editorial, POD, distribuição, suporte, prazos.
- [ ] Processo: 6 etapas com prazos e o que está incluso.
- [ ] Serviços: capa, revisão, diagramação, ISBN, impressão.
- [ ] Portfólio: 6 capas destacadas.
- [ ] Depoimentos e FAQ (inserir novas <section> se necessário).
- [ ] Contato (form + WhatsApp).

## SEO/Performance
- [ ] Meta tags (title/description/OG).
- [ ] Imagens WebP/AVIF otimizadas (≤200KB hero, ≤100KB demais).
- [ ] Minificar CSS/JS (opcional).

## Publicação
- [ ] Testar `index-nexa.html` localmente.
- [ ] Deploy (Netlify/Hostinger/Cloudflare Pages/Vercel).

Arquivos criados:
- `index-nexa.html`
- `assets/css/nexa.css`
- `assets/js/nexa.js`
