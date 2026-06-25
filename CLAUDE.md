# Arqgen Next — CLAUDE.md

Contexto para continuar o desenvolvimento deste protótipo em uma nova conversa.

---

## O que é este projeto

**Arqgen Next V0** — protótipo navegável de produto para a Arqgen, startup brasileira de SaaS de viabilidade arquitetônica. O objetivo da V0 é demonstrar direção de produto: interface orientada a intenção, onde o arquiteto descreve o que quer e o canvas responde em tempo real.

**Tudo é mockado.** Sem backend real, sem LLM real. O objetivo é parecer funcional o suficiente para decisões de produto e design.

**Repo:** `https://github.com/SolonFerreira/arqgen-next` (público)
**Como rodar:** `python3 -m http.server 8080` na pasta do projeto → abrir `http://localhost:8080`
**Deploy:** GitHub Pages via `.github/workflows/pages.yml`, atualizado a cada push na `main`
**URL:** `https://solonferreira.github.io/arqgen-next/`

---

## Stack e arquitetura

- **Aplicação ativa:** `index.html` — tudo inline (React, JSX, estilos)
- **React 18** via CDN (`unpkg.com/react@18/umd`)
- **Babel Standalone** para transpilação JSX em runtime, com `runtime: 'classic'` forçado via `new Function()` (evita imports ES module que quebram sem bundler)
- **Zero dependências externas além de React** — lucide-react UMD estava vazio; ícones foram substituídos por SVG inline
- **Fontes:** Google Fonts — `Sora` (display/headings) e `Inter` (body/UI)
- **Estilos:** inline via `style={{}}` — sem Tailwind, sem CSS modules
- **Cálculos:** `calculations.js` — funções puras, sanitização, limites e formatação segura
- **Testes:** `npm test` usa o runner nativo do Node em `tests/calculations.test.cjs`

### Como o Babel é executado

```html
<script id="app-src" type="text/plain"> ... todo o JSX ... </script>
<script>
  window.addEventListener('DOMContentLoaded', () => {
    const src = document.getElementById('app-src').textContent;
    const compiled = Babel.transform(src, { presets: [['react', { runtime: 'classic' }]] }).code;
    (new Function(compiled))();
  });
</script>
```

---

## Paleta de cores (identidade Arqgen)

```js
const C = {
  ink:    "#1A202C",  // fundo principal
  ink2:   "#11151d",  // fundo mais profundo (canvas, idle)
  card:   "#20262f",  // superfície de card
  green:  "#01AD6E",  // verde primário — ações, seleção, logo
  green2: "#33E0A1",  // verde claro — highlights, métricas positivas
  purple: "#564FFF",  // secundário — badges, skill bubbles
  yellow: "#FFBC00",  // warning — conflito entre torres, CA alto
  red:    "#FD4848",  // erro — torre fora do terreno
  gray:   "#718096",  // texto muted, labels
  gray2:  "#CBD5E0",  // texto secundário, placeholders
};
```

Tipografia: `'Sora', sans-serif` para headings e labels de destaque. `'Inter', sans-serif` para corpo e UI.

---

## Componentes atuais (`index.html`)

| Componente | Linha | Descrição |
|-----------|-------|-----------|
| `ArqgenLogo` | ~63 | SVG real da Arqgen adaptado para fundo escuro (fills `#171923` → `#fff`) |
| `FlipValue` | ~133 | Número com animação flip ao mudar |
| `MetricBar` | ~153 | Barra de progresso colorida (verde/amarelo/vermelho por threshold) |
| `TypingDots` | ~164 | Indicador de digitação animado |
| `FileBubble` | ~230 | Card de arquivo anexado com extensão, tamanho e metadados mockados |
| `Bubble` | ~250 | Chat bubble com usuário, agente, skill, preview e ação inline |
| `MetricsHUD` | ~320 | HUD colapsável com KPIs e contador de torres |
| `SetbackOverlay` | ~355 | Sobreposição SVG dos recuos legais |
| `DistanceRuler` | ~375 | Cotas entre torre selecionada, torres vizinhas e limites |
| `TowerPanel` | ~455 | Propriedades, redução de 20% e remoção da torre |
| `Tower3D` | ~480 | Extrusão SVG proporcional ao número de pavimentos |
| `ReportCanvas` | ~505 | Planta limpa usada no preview do relatório |
| `ExportModal` | ~525 | Preview A4 e download demonstrativo do relatório |
| `PresentationHUD` | ~575 | HUD compacto do modo apresentação |
| `ComparePanel` | ~515 | Comparação de versões com dois canvas e deltas |
| `ExecutiveSidePanel` | ~330 | Status executivo, indicadores e resumo por torre |
| `IdleScreen` | ~600 | Tela inicial, sugestões e upload mockado |
| `ChatPanel` | ~725 | Chat em estados `mini` / `medium` / `full` |
| `ArqgenNext` | ~820 | Componente raiz e estado da aplicação |

### Estados principais em `ArqgenNext`

```js
towers      // array de torres com posição, dimensões e dados
sel         // id da torre selecionada ("A" | "B" | "C" | null)
hoverId     // id da torre em hover
mode        // "idle" | "active"
leaving     // bool — true durante animação de saída do idle
chatSize    // "mini" | "medium" | "full"
metricsOpen // bool — HUD expandido ou colapsado
zoom        // número (50–200%)
pan         // deslocamento x/y do viewBox quando zoom > 100%
viewportWidth // largura atual para ajustes responsivos
version     // "Versão 01" | "Versão 02" | "Versão 03"
view        // "2D" | "3D"
msgs        // array de mensagens do chat
typing      // bool — animação de typing do agente
versions    // snapshots independentes das três versões
comparing   // bool — painel de comparação aberto
showSetbacks // bool — recuos visíveis
attachedFile // arquivo mockado aguardando envio
exportOpen   // bool — modal de exportação aberto
presenting   // bool — modo apresentação/fullscreen ativo
```

---

## Fluxo UX atual

1. **Idle:** tela limpa com logo + tagline + input centralizado + 3 chips de sugestão. Canvas não aparece.
2. **Transição (0.5s):** ao enviar primeira mensagem, idle faz fade+scale out, canvas aparece com fade in.
3. **Active:** canvas 100% da largura. Chat no canto inferior direito (mini/médio/completo). HUD de métricas no canto superior direito.
4. **Interações no canvas:** clique seleciona torre → abre `TowerPanel`. Drag move, handles de resize, zoom real por `viewBox`, recuos, cotas e visualização 3D.
5. **Chat contextual:** com uma torre selecionada, mensagens geram uma operação mockada com preview antes/depois e botão para aplicar no canvas.

---

## O que está funcionando hoje

- [x] Idle screen com logo real SVG + tagline + chips
- [x] Transição idle → canvas animada
- [x] Canvas SVG com terreno poligonal irregular (847m²)
- [x] 3 torres (A, B, C) com drag + handles de resize
- [x] Detecção de conflito: fora do terreno (vermelho + shake + retorno) e sobreposição entre torres (amarelo + badge)
- [x] HUD de métricas colapsável (top-right) com 4 KPIs atualizando em tempo real
- [x] Panel flutuante de propriedades da torre (next to selected tower)
- [x] Chat panel bottom-right com 3 estados (mini/médio/completo)
- [x] Chat mockado com 3 tipos de bubble (usuário, agente, skill)
- [x] Typing indicator + resposta automática mockada após 1.2s
- [x] Animações: flip de número, shake de torre, pulse de seleção, fadeUp de bubbles
- [x] Recuos legais com toggle
- [x] Sombra de projeção das torres
- [x] Régua de distâncias
- [x] Adição e remoção de torres
- [x] Zoom real de 50% a 200%
- [x] Visualização 3D por extrusão SVG
- [x] Snapshots independentes para Versão 01/02/03
- [x] Comparação lado a lado com deltas
- [x] Upload mockado de DWG, IFC, DXF, KMZ, RVT e NWC
- [x] Respostas contextuais por torre
- [x] Ações do chat aplicadas ao canvas
- [x] Skill cards com métricas antes/depois
- [x] Preview A4 de relatório com métricas e planta
- [x] Download demonstrativo do relatório em HTML
- [x] Modo apresentação fullscreen
- [x] HUD compacto para apresentação
- [x] Editor detalhado de pavimentos, unidades, área e tipologia
- [x] Pan com Shift + arrastar ou botão do meio
- [x] Zoom por Ctrl/Cmd + scroll
- [x] Cotas calculadas contra as arestas reais do terreno
- [x] Recuos variáveis por grupo de arestas
- [x] Ajustes responsivos na topbar, controles e chat
- [x] Auditoria numérica de unidades, área, TO e CA
- [x] Resize determinístico sem crescimento acumulativo
- [x] Guards contra NaN, Infinity, notação científica e valores absurdos
- [x] Testes unitários dos cálculos e transformações principais
- [x] Painel executivo lateral com status e potencial utilizado
- [x] Faixa-resumo da versão ativa
- [x] Tooltips 2D e detalhamento visual das torres 3D

---

## Roadmap e status

### Sprint 1 — Canvas mais rico — concluído

**1.1 Recuos legais**
Exibir as linhas de recuo (frontal, lateral, fundos) como sobreposição SVG sobre o terreno, com fill sutil e label de distância. Estado mockado: recuo frontal 5m, laterais 1.5m, fundos 3m. Mostrar/ocultar via toggle na barra de controles.

**1.2 Área de projeção por torre (sombra no terreno)**
Cada torre projeta sua "sombra de base" no terreno — retângulo levemente mais escuro que mostra a área de ocupação real no lote, separado do retângulo da torre.

**1.3 Régua de distância entre torres**
Ao selecionar uma torre, mostrar linhas tracejadas + cotas de distância para as outras torres e para as bordas do terreno.

**1.4 Adicionar nova torre**
Botão "+ Torre" na barra de controles que coloca uma nova torre D no centro do terreno disponível. Contador de torres no HUD.

---

### Sprint 2 — Versões e comparação — concluído

**2.1 Versões reais**
Cada versão (Versão 01/02/03) guarda um snapshot independente do estado `towers`. Trocar a versão no dropdown carrega o snapshot correspondente com animação de transição.

**2.2 Painel de comparação lado a lado**
Botão "Comparar versões" abre uma sobreposição que divide a tela verticalmente mostrando dois canvas com versões diferentes. Métricas side-by-side com delta colorido (verde se melhorou, vermelho se piorou).

---

### Sprint 3 — Chat mais inteligente — concluído na V0

**3.1 Respostas contextuais por torre**
Ao selecionar uma torre e enviar uma mensagem, a resposta mockada faz referência àquela torre específica (ex: "Torre B está com CA acima de 4.0...").

**3.2 Ações do chat no canvas**
Algumas respostas do agente incluem um botão de ação inline que aplica uma mudança no canvas (ex: "Reduzir Torre A 20%" → botão que realmente reduz a torre).

**3.3 Skill cards expandidos**
O bubble de skill mostra um mini-card com o resultado da operação: preview numérico antes/depois, com delta de métricas.

---

### Sprint 4 — Exportação e apresentação — concluído na V0

**4.1 Export PDF mockado**
Botão "Exportar" abre um modal A4 com planta, tabela de métricas e download demonstrativo em HTML. A geração de PDF real fica para a arquitetura com backend/bundler.

**4.2 Modo apresentação**
Botão na topbar que entra em fullscreen, esconde todos os controles e mostra só o canvas + HUD compacto. Ideal para apresentar para cliente.

---

### Sprint 4.5 — Polimento de interação — concluído

- Editor detalhado no `TowerPanel`
- Pan e zoom navegável pelo `viewBox`
- Cotas ligadas aos pontos mais próximos do polígono real
- Recuos diferenciados entre frontal, laterais e fundos
- Adaptação dos controles para larguras menores
- Remoção do componente legado fora de uso

---

### Sprint 5 — Migração de arquitetura (quando a V0 for aprovada)

- Migrar de `index.html` monolítico para projeto **Vite + React** com componentes em arquivos separados
- Manter a mesma paleta e estrutura de componentes — só separar em arquivos
- Adicionar **TypeScript** e tipos para o estado das torres
- Preparar para integração real com Claude API (substituir mocks por chamadas reais)

### Melhorias técnicas posteriores

- Adicionar histórico de desfazer/refazer para alterações no canvas
- Permitir edição precisa de largura, profundidade e posição da torre
- Melhorar responsividade para celulares abaixo de 480px
- Adicionar snapping entre torres e linhas de recuo

---

## Convenções de código

- **Estilos sempre inline** via `style={{}}` — não criar classes CSS globais novas
- **Sem comentários** além dos blocos de seção (`/* ── Nome ── */`)
- **Animações** via `@keyframes` no `<style>` global + `animation:` inline nas props
- **Nenhum `localStorage`** — estado 100% em memória (React state)
- **Não adicionar dependências CDN novas** sem confirmar — o histórico de `LucideReact` vazio mostrou que UMD de libs de componentes pode não funcionar
- Antes de qualquer novo componente, verificar se algum dos existentes pode ser reutilizado ou estendido

---

## Armadilhas conhecidas

| Problema | Causa | Solução aplicada |
|---------|-------|-----------------|
| Tela preta ao iniciar | Babel gerava `import from 'react/jsx-runtime'` | Forçar `runtime: 'classic'` na transform |
| `LucideReact` vazio | UMD deste pacote não exporta corretamente | SVGs inline para todos os ícones |
| SVG coord vs. DOM coord | MouseEvent usa coordenadas de tela, SVG usa viewBox | `svg.createSVGPoint()` + `getScreenCTM().inverse()` |
| Panel fora da tela | TowerPanel pode extravasar à direita | `panelPos()` faz reposicionamento automático |
