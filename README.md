# NEXA — GitHub Pages

Este repositório contém duas versões do site:
- `nativo/` — Transição nativa com View Transitions (cross-document)
- `pjax/` — SPA leve (PJAX) que troca apenas o `<main id="content">`

A página raiz (`index.html`) redireciona para `nativo/pagina-inicial.html` em 2s e traz links para as duas versões.

## Como publicar (GitHub Pages)
1. Crie um repositório no GitHub (público), ex.: `nexa-site`.
2. Faça commit de todos os arquivos desta pasta.
3. Vá em **Settings ▸ Pages**:
   - **Source**: Deploy from a branch
   - **Branch**: `main` e **Folder**: `/ (root)`
4. Aguarde a URL: `https://<seu-usuario>.github.io/nexa-site/`

> Dica: se quiser abrir direto na versão **PJAX**, acesse:
> `https://<seu-usuario>.github.io/nexa-site/pjax/pagina-inicial.html`
