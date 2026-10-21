# Vinícius G Pereira — Portfólio

Portfólio pessoal construído do zero, combinando engenharia de dados, desenvolvimento de software e design de interação. Cada seção foi projetada como uma experiência distinta — animações 3D, scroll-driven storytelling, tipografia editorial — com foco em performance, acessibilidade e responsividade.

**URL pública:** [vgb.workers.dev](https://vgb.workers.dev)

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Stack](#-stack)
- [Estrutura](#-estrutura)
- [Web Design](#-web-design)
  - [Sistema Visual](#sistema-visual)
  - [Seções](#seções)
  - [Componentes Reutilizáveis](#componentes-reutilizáveis)
  - [Padrões de Animação](#padrões-de-animação)
  - [Acessibilidade](#acessibilidade)
- [Performance](#-performance)
- [Rotas](#-rotas)
- [Como Rodar](#-como-rodar)
- [Deploy](#-deploy)
- [Convenções](#-convenções)

---

## 🎯 Visão Geral

Este é o portfólio profissional de **Vinícius Giovanni Pereira Barbosa**, Analista de Planejamento no Grupo Casas Bahia e fundador da Cosmos — iniciativa de tecnologia focada em automação RPA, software sob medida e engenharia de dados.

O projeto tem três objetivos:

1. **Comunicar impacto real** — os 4 dossiês enterprise (Data Quality, Gargalos, RPA, BI) representam projetos reais com números auditáveis, anonimizados por NDA
2. **Demonstrar capacidade técnica** — o próprio portfólio é uma peça de engenharia: SSR com TanStack Start, animações 3D com React Three Fiber, scroll-driven storytelling, tipografia editorial
3. **Servir de vitrine para a Cosmos** — seção institucional dedicada à iniciativa, com track record de impacto agregado

**Diferenciais:**
- 10 seções na home, cada uma com identidade visual própria
- 4 cases enterprise com scrollytelling de 7 seções cada
- CV imprimível com duas variantes (Corporate / Tech) geradas do mesmo código
- Deploy em Cloudflare Workers com SSR global via edge runtime

---

## 🛠 Stack

### Core

| Camada | Tecnologia | Versão | Por quê |
|---|---|---|---|
| **Framework** | [TanStack Start](https://tanstack.com/start) | 1.169 | SSR + streaming, meta tags por rota, file-based routing type-safe |
| **Router** | [TanStack Router](https://tanstack.com/router) | 1.170 | Type-safe, preload de rotas, integrado ao Start |
| **UI** | React | 19.2 | Server Components ready, novas APIs (use, useOptimistic) |
| **Linguagem** | TypeScript | 6.0 | Type safety end-to-end |
| **Build** | Vite | 8.0 | HMR rápido, tree-shaking agressivo |
| **CSS** | Tailwind CSS | 4.3 | Configuração via `@theme` inline, zero `tailwind.config.js` |

### Animação e Interação

| Tecnologia | Uso |
|---|---|
| [Motion](https://motion.dev) (ex-Framer Motion) | Todas as animações declarativas: `useScroll`, `useTransform`, `AnimatePresence`, springs |
| [Lenis](https://lenis.darkroom.engineering/) | Smooth scroll global, exposto em `window.lenis` para controle programático |
| [React Three Fiber](https://r3f.docs.pmnd.rs/) | Canvas 3D declarativo com React (usado no Hero e Entregáveis) |
| [Drei](https://drei.docs.pmnd.rs/) | Helpers para R3F: `Environment`, `ContactShadows`, `MeshTransmissionMaterial`, `Text3D`, `Sparkles` |
| [Three.js](https://threejs.org/) | Motor 3D base |

### Estilo e Tipografia

| Tecnologia | Uso |
|---|---|
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first, configurado via `@theme` no `styles.css` |
| [@fontsource/anton](https://fontsource.org/fonts/anton) | Fonte display (títulos e números gigantes) |
| [@fontsource/inter](https://fontsource.org/fonts/inter) | Fonte body (textos e UI) |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Helper `cn()` para combinar classes sem conflito |

### Ícones

| Biblioteca | Uso |
|---|---|
| [lucide-react](https://lucide.dev/) | Ícones funcionais (setas, chevrons, mail, phone, etc.) |
| [react-icons](https://react-icons.github.io/react-icons/) (`/si`) | Logos de marca: Python, JS, TS, Databricks, CSS, HTML |

### Ferramentas

| Ferramenta | Uso |
|---|---|
| [Wrangler](https://developers.cloudflare.com/workers/wrangler/) | CLI da Cloudflare para deploy |
| [@cloudflare/vite-plugin](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack/) | Adapter oficial Vite → Cloudflare Workers |
| [Prettier](https://prettier.io/) + `prettier-plugin-tailwindcss` | Formatação consistente |
| [ESLint](https://eslint.org/) | Lint com config do TanStack |

---

## 📁 Estrutura

```
portfolio-vinicius/
├── public/
│   ├── assets/
│   │   ├── clients/              → fotos dos depoimentos (5 arquivos)
│   │   ├── cosmos-logo.svg
│   │   ├── vinicius-hero.png     → foto recortada do Hero
│   │   └── vinicius-mountain.png → foto da seção Sobre Mim
│   └── og.png                    → Open Graph image
│
├── src/
│   ├── components/
│   │   ├── sections/             → 10 seções da home
│   │   │   ├── Hero.tsx
│   │   │   ├── Authority.tsx     (Destaques — 8 números)
│   │   │   ├── Testimonials.tsx  (5 depoimentos reais do LinkedIn)
│   │   │   ├── About.tsx         (Sobre Mim — sticky)
│   │   │   ├── Deliverables.tsx  (3 painéis em scroll horizontal)
│   │   │   ├── Journey.tsx       (Trajetória — carrossel de 6 eras)
│   │   │   ├── Stack.tsx         (9 tiles + 2 marquees)
│   │   │   ├── Education.tsx     (5 credenciais)
│   │   │   ├── Cosmos.tsx        (iniciativa + track record)
│   │   │   └── Footer.tsx        (contato flutuante)
│   │   │
│   │   ├── projects/             → componentes da rota /projetos
│   │   │   ├── ProjectCard.tsx   → card de dossiê
│   │   │   ├── ProjectGrid.tsx   → grid com filtros
│   │   │   ├── CaseVisual.tsx    → mockups CSS dos cases
│   │   │   └── diagnostics/      → 4 diagnósticos animados
│   │   │       ├── DiagnosticGargalos.tsx
│   │   │       ├── DiagnosticDataQuality.tsx
│   │   │       ├── DiagnosticRPA.tsx
│   │   │       ├── DiagnosticBI.tsx
│   │   │       └── DiagnosticRenderer.tsx
│   │   │
│   │   ├── three/                → canvas e cenas 3D
│   │   │   ├── scenes/
│   │   │   │   ├── FinancialScene.tsx    (cofre)
│   │   │   │   └── DeliveriesScene.tsx   (telas flutuando)
│   │   │   ├── HeroCanvas.tsx
│   │   │   ├── PanelCanvas.tsx
│   │   │   └── Particles.tsx
│   │   │
│   │   └── ui/                   → componentes reutilizáveis
│   │       ├── NavBar.tsx        (navegação multi-rota)
│   │       ├── SectionLabel.tsx
│   │       ├── Marquee.tsx       (CSS puro, sem JS)
│   │       ├── CountUp.tsx       (com reserva de espaço)
│   │       ├── Typewriter.tsx    (idem)
│   │       ├── DonutChart.tsx
│   │       ├── FlowDiagram.tsx   (SVG animado)
│   │       ├── DepthLayers.tsx   (4 camadas de profundidade)
│   │       ├── SmoothScroll.tsx  (wrapper Lenis)
│   │       ├── TiltCard.tsx      (tilt 3D no hover)
│   │       ├── WaveDivider.tsx
│   │       └── TestimonialCard.tsx (legado — usado em variante antiga)
│   │
│   ├── data/                     → fonte única de verdade
│   │   ├── projects.ts           → 4 cases enterprise
│   │   └── cv.ts                 → dados do CV (2 variantes)
│   │
│   ├── hooks/
│   │   └── useScrollSnap.ts      → scroll snap por seção
│   │
│   ├── lib/
│   │   └── utils.ts              → helper cn()
│   │
│   ├── routes/                   → file-based routing
│   │   ├── __root.tsx            → shell HTML + meta tags globais
│   │   ├── index.tsx             → home (10 seções)
│   │   ├── cv.tsx                → CV imprimível
│   │   └── projetos/
│   │       ├── index.tsx         → listagem de dossiês
│   │       └── $slug.tsx         → detalhe do case (scrollytelling)
│   │
│   ├── routeTree.gen.ts          → gerado automaticamente
│   ├── router.tsx
│   └── styles.css                → @theme Tailwind v4 + estilos globais
│
├── wrangler.jsonc                → config do Cloudflare Workers
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Regras de organização

| Pasta | O que vai | O que NÃO vai |
|---|---|---|
| `routes/` | Só arquivos que viram URLs | Componentes com lógica |
| `components/sections/` | Blocos grandes da home (1 arquivo = 1 seção) | Componentes genéricos |
| `components/ui/` | Peças reutilizáveis em qualquer rota | Lógica de negócio |
| `components/projects/` | Componentes específicos de `/projetos` | Componentes da home |
| `components/three/` | Canvas, cenas, partículas | Componentes 2D |
| `data/` | Objetos de dados puros | JSX, componentes |
| `hooks/` | Hooks customizados reutilizáveis | Componentes |

---

## 🎨 Web Design

### Sistema Visual

**Paleta:**

| Token | Cor | Uso |
|---|---|---|
| `--color-cream` | `#EDE6D8` | Fundo dominante, textos sobre navy |
| `--color-navy` | `#0B1F3A` | Textos, blocos escuros, fundos de seção |
| `--color-navy/85` | `rgba(11,31,58,0.85)` | Fundo da NavBar com `backdrop-blur` |
| `#081729` | navy escuro | Footer flutuante (tom abaixo do navy base) |

**Acentos por projeto (dossiês):**
- Data Quality: `#6B21A8` (roxo)
- Cost Optimization: `#10B981` (verde)
- RPA: `#D97706` (âmbar)
- Lead Time: `#4A90B8` (azul)
- Business Intelligence: `#4A90B8`

**Tipografia:**

| Papel | Fonte | Uso |
|---|---|---|
| Display | **Anton** | Títulos gigantes, números (Destaques, Cosmos, resultado de dossiês) |
| Body | **Inter** (400, 700) | Todo o resto — textos, labels, UI |
| Mono | **Inter** com `tracking-[0.2em]` | Indicadores ("01 / 03", "Dossiê 001") |

**Escala tipográfica** — todos os títulos usam `clamp()` para fluid responsivo:

```css
/* Hero PORTFÓLIO */
font-size: clamp(2rem, 16vw, 16rem);

/* Números gigantes (Destaques, Resultado) */
font-size: clamp(2rem, 5.5vw, 4.5rem);

/* Títulos de seção */
font-size: clamp(1.75rem, 3.5vw, 2.75rem);

/* Corpo de texto */
font-size: clamp(0.875rem, 1.3vw, 1.125rem);
```

**Espaçamento:**
- Seções: `py-24 md:py-32` (96px mobile / 128px desktop)
- Container: `w-[min(92%,1280px)]` (92% em telas pequenas, 1280px máximo)
- Gap entre elementos: `gap-3 md:gap-5`

**Radius padrão:** `30px` (`--radius-brand`) — aplicado em botões, cards, seções arredondadas

**Sombras:**
- Cards: `shadow-[0_4px_14px_rgba(11,31,58,0.06)]`
- Hover elevado: `shadow-[0_24px_48px_-12px_rgba(11,31,58,0.18)]`
- Footer flutuante: `shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.6)]`

---

### Seções

#### 1. Hero (`Hero.tsx`)

**Composição:** 3 camadas com `z-index` diferentes + partículas 3D + 8 ícones tech flutuantes.

| Camada | z-index | Conteúdo |
|---|---|---|
| Partículas | 0 | `HeroCanvas` com ~1600 partículas navy (500 no mobile) |
| Glow | 1 | Radial pulsante atrás da foto |
| PORTFÓLIO (fill) | 10 | `<h1>` em Anton navy |
| Ícones tech | 15 | 8 ícones em quadrados glassy com float infinito |
| Foto | 20 | PNG recortado, `h-[82%] md:h-[90%]` |
| PORTFÓLIO (stroke) | 30 | Mesmo texto em stroke cream de 3px |
| Textos + botões | 40 | Nome/cargo topo esquerdo + 4 botões no rodapé |

**Animações:**
- Parallax entre camadas no scroll (`useScroll` + `useTransform`)
- Botões entram em cascata (stagger de 150ms)
- Hover dos botões: lift 4px + sombra (transição de entrada separada da de hover)
- Ícones tech: float + rotate infinito
- Partículas 3D: reagem ao mouse com lerp

**Diferencial:** 4 botões — Cosmos / Projetos (→ `/projetos`) / Entregáveis (scroll) / Contato (scroll)

#### 2. Destaques (`Authority.tsx`)

**Formato:** lista vertical editorial com 8 números em navy full-bleed.

- Cada número com descrição contextual completa
- **Parallax cruzado:** número desliza ←, descrição →, índice ↕ (3 velocidades diferentes)
- Linha vertical de progresso cresce com scroll
- Watermark "NÚMEROS" com parallax horizontal
- Cada row tem linha que se desenha via `scaleX` no scroll

**Números mostrados:**
1. R$ 25,5 mi — capital liberado
2. R$ 12 mi/ano — ganhos operacionais RPA
3. R$ 3,6 mi/ano — custo financeiro evitado
4. R$ 3 mi/ano — Data Quality
5. +5.400h — devolvidas ao time
6. +14 — softwares entregues
7. +19 — projetos BI
8. Cosmos — iniciativa B2B

#### 3. Depoimentos (`Testimonials.tsx`)

**Formato:** carrossel 3D com cover flow e autoplay.

- 5 depoimentos reais do LinkedIn (Leonardo, Jonathan, Thainá, Edmilson, Patiño)
- Ordem por impacto: gestores → sênior → mentorado → colega
- Badge de relação colorido por accent
- Fotos reais via `/assets/clients/*.svg`
- Link "Ver no LinkedIn" com SVG inline (contorna bug do `react-icons/si` v5.5.0)
- Autoplay de 9s sem pausa no hover
- Palco `h-[80vh] max-h-[820px]` para quotes longas

**Animações:**
- Slide 3D ao trocar card: `x`, `rotateY`, `scale`, `blur`
- Avatar com `y: [0, -5, 0]` infinito
- Swipe no mobile (touch events)

#### 4. Sobre Mim (`About.tsx`)

**Formato:** sticky section (200vh desktop / 140vh mobile).

- Imagem (`vinicius-mountain.png`) com inset de 48px → full-bleed conforme scroll
- Texto em camada independente com posição fixa (evita layout shift)
- Overlay navy/60 para legibilidade
- Texto entra com fade conforme a imagem cresce

**Animações:**
- `inset` anima de 48px → 0
- `borderRadius` anima de 30px → 0
- Texto com `opacity` + `y` progressivos

#### 5. Entregáveis (`Deliverables.tsx`)

**Formato:** scroll horizontal de 3 painéis (380vh sticky).

**Composição por painel:**
- **Painel 1:** cofre 3D animado (dial gira → porta abre → luz ilumina barras) + 2 mini cards com números
- **Painel 2:** fluxo SVG animado (input → validação → RPA → saída) + 2 mini cards
- **Painel 3:** 3 mockups 3D de telas flutuando + 2 mini cards

**Animações coreografadas:**
- Painel ativo dispara sequência completa (stagger de entrada, count-up, glow)
- Sub-cards com `TiltCard` (3D no hover)
- Cofre no mobile: centralizado, escala 0.82, sombra opacity 0.40

**Indicadores:**
- Label dinâmico: "ENTREGÁVEIS" → "Impacto Financeiro" → "Eficiência Operacional" → "Entregas Software & BI"
- Cor do label adapta ao fundo (cream sobre navy, navy sobre cream)
- Dots no rodapé
- CTA "Ver os 4 dossiês" no terceiro painel

#### 6. Trajetória (`Journey.tsx`)

**Formato:** carrossel horizontal de 6 eras (600vh sticky).

- Cada era com cor de accent própria (progressão: dourado envelhecido → ouro vivo)
- Ano gigante em Anton com blur→nítido + scale
- Capítulo "Atual" com 2 pulsos sobrepostos
- Dots + título do capítulo no rodapé

#### 7. Stack (`Stack.tsx`)

**Formato:** 9 tiles + 2 marquees de competências.

- Header `09 / 07` em Anton
- Cada tile: ícone, label, número de índice
- **Hover:** TiltCard 3D (6°) + cor da marca + glow radial + pulso de energia
- Marquees: 2 rows em direções opostas (CSS puro, sem JS)
- Background: grid pontilhado + 2 glows pulsando

#### 8. Formação (`Education.tsx`)

**Formato:** timeline lateral + 5 cards.

- Header `05 / 03` (credenciais / instituições)
- Timeline com nodes coloridos por instituição (FIAP vermelho, Databricks laranja, UNICV verde)
- Node da graduação tem pulso infinito
- Card: watermark da instituição (4% opacity) + glow colorido no hover + tags em stagger
- Badge "Graduação" diferenciado

#### 9. Cosmos (`Cosmos.tsx`)

**Formato:** 3 cards navy full-bleed.

- Card 1: "O que construímos" (não vendemos ferramentas, entregamos o trabalho)
- Card 2: "Como trabalhamos" (inteligência vs. julgamento)
- Card 3: "Founder track record" com grid 3x2 de números reais + disclaimer em itálico
- CTA "Conhecer a Cosmos" (desktop à direita, mobile abaixo)

#### 10. Footer (`Footer.tsx`)

**Formato:** card flutuante que sobe sobre a seção Cosmos.

- Cantos superiores arredondados (`rounded-t-[40px] md:rounded-t-[80px]`)
- Fundo `#081729` (navy mais escuro que Cosmos `#0B1F3A`)
- Sombra superior forte (`0 -30px 60px -15px rgba(0,0,0,0.6)`)
- Badge "Disponível para novos projetos" com pulso duplo verde
- Headline "VAMOS CONSTRUIR ALGO INCRÍVEL JUNTOS?" com word reveal sequencial
- 4 contact cards com TiltCard + glow dourado (email, WhatsApp, Cosmos, CV)
- Scroll-to-top circular

---

### Componentes Reutilizáveis

| Componente | Função | Onde é usado |
|---|---|---|
| `NavBar` | Navegação multi-rota com detecção de seção ativa | Todas as rotas |
| `SectionLabel` | Label + linha animada, variantes default/light | Todas as seções |
| `Marquee` | CSS puro, duplicação + `translateX(-50%)` | Destaques, Testimonials, Stack |
| `CountUp` | Animação de número com reserva de espaço | Destaques, Deliverables, Cases |
| `Typewriter` | Digitação com reserva de espaço | Deliverables |
| `DonutChart` | SVG com `pathLength=1` + `strokeDashoffset` | Painel 1 do Deliverables |
| `FlowDiagram` | SVG com `pathLength` animado | Painel 2 do Deliverables |
| `TiltCard` | 3D no hover (perspective + rotateX/Y) | Stack, Footer, Deliverables |
| `DepthLayers` | 4 camadas de profundidade (grid + formas + partículas + vinheta) | Painéis 1 e 3 do Deliverables |
| `SmoothScroll` | Wrapper Lenis com destroy no unmount | `__root.tsx` |
| `WaveDivider` | SVG com 2 ondas sobrepostas | Painéis do Deliverables |

**Padrões-chave:**
- **Reserva de espaço** em `CountUp` e `Typewriter`: um `<span>` invisível com o valor final evita layout shift durante a animação
- **`useScroll` + `useTransform`** para animações ligadas ao scroll (sem listeners manuais)
- **`whileInView` + `viewport={{ once: true }}`** para animações de entrada (executam uma vez)
- **`useReducedMotion`** em todos os componentes com movimento

---

### Padrões de Animação

**Por tipo:**

| Tipo | Técnica | Onde |
|---|---|---|
| **Scroll-driven** | `useScroll` + `useTransform` + `useSpring` | About, Deliverables, Journey, Destaques |
| **Entrada** | `whileInView` + `initial` + `viewport.once` | Todas as seções |
| **Hover** | `whileHover` + `transition` (separado da entrada) | Botões, cards, links |
| **Carrossel** | `AnimatePresence` + `custom={direction}` + variants | Testimonials |
| **Loop infinito** | `animate` + `transition.repeat: Infinity` | Ícones tech, glow, pulso dos nodes |
| **Snap** | `useScrollSnap` hook + `data-snap` attributes | Todas as seções |
| **Stagger** | `transition.delay: index * 0.05` | Cards, tags, listas |

**Cuidados aplicados:**
- **Nunca animar `margin`, `padding`, `width`, `height`** — só `transform`, `opacity`, `filter`
- **`transformStyle: preserve-3d`** apenas quando necessário (custa performance)
- **`will-change: transform`** aplicado apenas em elementos com animação contínua
- **`prefers-reduced-motion`** desliga todas as animações e mantém o estado final

---

### Acessibilidade

- `prefers-reduced-motion` respeitado globalmente (via `styles.css` + `useReducedMotion`)
- `aria-label` em todos os botões icon-only (setas, dots, hamburger)
- `aria-current="page"` nos links ativos da NavBar
- `role="dialog"` + `aria-modal` no drawer mobile
- `:focus-visible` global (outline 2px navy, offset 4px)
- `lang="pt-BR"` no `<html>`
- Contraste WCAG AA verificado (exceto textos decorativos `cream/40`)
- Navegação por teclado testada (Tab percorre todos os interativos)
- `alt` descritivo em todas as imagens

---

## 🚀 Performance

> **Status:** 🚧 **Em desenvolvimento.**
>
> O plano de otimização está detalhado em [`docs/PERFORMANCE.md`](./docs/PERFORMANCE.md) (a ser criado). A meta é atingir **92–96 no Lighthouse mobile** com estratégia híbrida — 3D otimizado em devices fortes, fallback estático em devices fracos.

**Baseline atual (antes das otimizações):**

| Métrica | Valor |
|---|---|
| Bundle inicial (gzip) | ~500 KB |
| LCP mobile | ~5.8s |
| TBT mobile | ~1200ms |
| Performance mobile | ~42 |

**Fases planejadas:**
1. Code splitting e lazy loading
2. Otimização do Three.js (dpr, antialias, partículas, samples)
3. Assets (WebP/AVIF, subset de fontes)
4. CSS e rendering (content-visibility, will-change)
5. Rede (preload, preconnect)
6. Medição e validação final

*Documentação completa será adicionada após a conclusão das fases.*

---

## 🛣 Rotas

| Rota | Arquivo | Descrição |
|---|---|---|
| `/` | `routes/index.tsx` | Home com 10 seções |
| `/projetos` | `routes/projetos/index.tsx` | Listagem dos 4 dossiês enterprise com filtros |
| `/projetos/[slug]` | `routes/projetos/$slug.tsx` | Detalhe do case com scrollytelling de 7 seções |
| `/cv` | `routes/cv.tsx` | CV imprimível (2 variantes via `?v=corporate` ou `?v=tech`) |

**Slugs dos dossiês:**
- `diagnostico-gargalos-expedicao-alta-escala`
- `data-quality-operacao-transporte`
- `automacao-rpa-programacao-pedidos`
- `infraestrutura-bi-logistico-nacional`

---

## 🏃 Como Rodar

**Pré-requisitos:** Node 20+ (recomendado 22+), npm

```bash
# Instalar dependências
npm install

# Dev server (porta 3000)
npm run dev

# Build de produção
npm run build

# Preview do build local
npm run preview

# Lint
npm run lint

# Formatação automática
npm run format

# Verificar formatação
npm run check
```

**Gerar rotas após criar nova rota:**

```bash
npm run generate-routes
```

---

## ☁️ Deploy

**Plataforma:** [Cloudflare Workers](https://workers.cloudflare.com/)

**Config:** `wrangler.jsonc`

```jsonc
{
  "name": "portfolio-vinicius",
  "compatibility_date": "2026-10-19",
  "main": "@tanstack/react-start/server-entry",
  "assets": { "directory": ".output/public" },
  "observability": { "enabled": true }
}
```

**Deploy:**

```bash
# Primeira vez: autenticar
npx wrangler login

# Deploy (build + upload)
npm run deploy
```

**URL pública:** [https://vgb.workers.dev](https://vgb.workers.dev)

**Futuro:** domínio próprio `vinicius.dev.br` a ser adquirido e apontado para o mesmo Worker.

---

## 📐 Convenções

### Nomenclatura

| Tipo | Convenção | Exemplo |
|---|---|---|
| Componentes React | PascalCase | `ProjectCard.tsx`, `NavBar.tsx` |
| Hooks | camelCase com `use` | `useScrollSnap.ts` |
| Funções utilitárias | camelCase | `cn()`, `getProjectBySlug()` |
| Constantes | UPPER_SNAKE_CASE | `AUTO_ADVANCE_MS`, `SAFE_SIZE` |
| Tipos/Interfaces | PascalCase | `Project`, `Testimonial`, `CVVariant` |
| Rotas (URLs) | kebab-case em PT | `/projetos`, `/cv` |
| Pastas de componentes | kebab-case em EN | `sections`, `projects`, `three` |

### Estrutura de componentes

```tsx
// 1. Imports (React → libs externas → componentes internos → tipos)
import { useState, useRef } from 'react'
import { motion } from 'motion/react'
import { SomeIcon } from 'lucide-react'
import { MyComponent } from '@/components/ui/MyComponent'
import type { MyType } from '@/data/types'

// 2. Tipos locais
type Props = { ... }

// 3. Constantes do módulo
const SOME_CONSTANT = 42

// 4. Componente principal (default function)
export function MySection() { ... }

// 5. Sub-componentes (não exportados)
function SubComponent() { ... }
```

### Idiomas

- **Código:** inglês (variáveis, funções, componentes, comentários técnicos)
- **Conteúdo do site:** português (pt-BR)
- **URLs:** português (`/projetos`, `/cv`)
- **Commits:** português (formato Conventional Commits: `feat:`, `fix:`, `chore:`)

### Git

- **Commits atômicos** — cada commit resolve uma coisa só
- **Mensagens descritivas** com contexto do "porquê", não só do "o quê"
- **Nunca commitar** `.env`, `node_modules/`, `.output/`, `.wrangler/`

---

## 📝 Licença

Projeto pessoal. Código disponível para referência e aprendizado. Conteúdo (textos, imagens, cases) protegido por direitos autorais — não reutilizar sem autorização.

---

**Autor:** Vinícius Giovanni Pereira Barbosa · [LinkedIn](https://www.linkedin.com/in/vinícius-giovanni-139941297) · [GitHub](https://github.com/Vinicius-Giovanni)