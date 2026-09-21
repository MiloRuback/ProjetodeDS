# Amigo Fiel Petshop — Projeto PWA

Projeto da atividade **PWA (Progressive Web App)** — Etec São Mateus.
Site de Petshop desenvolvido com HTML, CSS e JavaScript puros, transformado em um
aplicativo instalável (PWA) com funcionamento offline.

## Estrutura de arquivos

```
ProjetoPWA/
├── index.html      → Página principal do site
├── style.css       → Estilos (cores, layout, responsividade)
├── script.js       → Interatividade + registro do Service Worker
├── manifest.json   → Configuração do PWA (nome, ícones, cores)
├── sw.js           → Service Worker (cache e funcionamento offline)
├── icon-192.png    → Ícone do app (192x192)
├── icon-512.png    → Ícone do app (512x512)
├── img/            → Imagens do site (geradas com IA)
└── README.md       → Este arquivo
```

## Como testar no computador

O Service Worker só funciona por servidor (não abre com duplo clique no HTML).
Use uma das opções:

**Opção 1 — Python (já vem no computador da escola):**
```bash
python -m http.server 8000
```
Depois acesse: http://localhost:8000

**Opção 2 — VS Code:** instale a extensão *Live Server*, clique com o botão
direito no `index.html` → *Open with Live Server*.

### Testar o modo offline
1. Abra o site no Chrome e recarregue a página 1x (o SW instala o cache);
2. Abra o **DevTools (F12) → Application → Service Workers** e confira se está *activated*;
3. Marque **DevTools (F12) → Network → Offline** e recarregue: o site continua funcionando!

## Como publicar no GitHub Pages

1. Crie uma conta em https://github.com (ou faça login);
2. Clique em **New** para criar um repositório (ex.: `ProjetoPWA`), público;
3. Em *Quick setup*, clique em **uploading an existing file** e arraste **todos os arquivos** deste projeto;
4. Clique em **Commit changes**;
5. Vá em **Settings → Pages** e, em *Branch*, selecione **main** → **Save**;
6. Aguarde de 2 a 5 minutos e acesse:
   `https://SEU-USUARIO.github.io/ProjetoPWA/`

## Como gerar o APK com o PWABuilder

1. Com o site já no ar no GitHub Pages, acesse https://www.pwabuilder.com/
2. Cole a URL do seu site e clique em **Start**;
3. Confira o resultado da análise (manifest e service worker devem aparecer como OK);
4. Clique em **Package for stores** → **Android** e baixe o pacote;
5. O arquivo **app-release-signed.apk** pode ser instalado direto no celular
   (ative a instalação de *fontes desconhecidas* nas configurações do Android).

## Observações técnicas

- O `sw.js` usa **caminhos relativos** (`./index.html` em vez de `/index.html`).
  Isso é necessário para o cache funcionar no GitHub Pages, onde o site fica em
  uma subpasta (`/usuario/ProjetoPWA/`).
- O `manifest.json` foi personalizado com o nome do petshop e as cores do site,
  mantendo a estrutura do modelo da atividade (ícones 192/512, `start_url`,
  `display: standalone`, `orientation: portrait`).
- O `script.js` registra o Service Worker e também mostra o botão **"Instalar App"**
  automaticamente quando o navegador permite a instalação do PWA.
