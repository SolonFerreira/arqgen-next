# Revisões de Implementação

## Ciclo 1 — Estado epistemológico de viabilidade

### Problema e prioridade

O produto classificava automaticamente um cenário como “Solução Viável” usando apenas CA e taxa de ocupação simulados. Era a maior prioridade porque criava falsa certeza em um domínio regulatório de alto risco.

### Princípios constitucionais afetados

- clareza antes de magia;
- nunca apresentar estimativa como fato;
- separar cálculo, inferência e validação;
- legislação deve ser estruturada, versionada e auditada antes de automatizada;
- confiança exige tornar limitações visíveis.

### Solução implementada

`getStatus()` passou a produzir estados epistemológicos:

- `Dados insuficientes`;
- `Limites informados excedidos`;
- `Próximo aos limites informados`;
- `Avaliação preliminar`.

O estado preliminar declara que CA e ocupação foram calculados, mas a legislação não foi validada. O painel executivo e a faixa do cenário exibem o detalhe da avaliação.

### Arquivos alterados

- `index.html`

### Verificações

- `npm test`: 9 testes aprovados.
- `git diff --check`: nenhuma inconsistência de whitespace.
- servidor local respondeu com o conteúdo atualizado.
- busca por “Solução Viável”: nenhuma ocorrência restante no produto.

### Limitações e riscos

- a interface não pôde ser inspecionada visualmente porque o navegador integrado não estava disponível;
- os limites 12 de CA e 50% de ocupação continuam sendo premissas simuladas e ainda não possuem uma entidade de origem;
- o banner pode precisar de ajuste responsivo após validação visual;
- outros textos mockados ainda contêm números desconectados do motor de cálculo.

### Oportunidades descobertas

- transformar limites simulados em premissas explicitamente identificadas;
- derivar textos do copiloto e insights de cálculos reais;
- promover nomes estratégicos dos cenários acima da numeração de versão.

### Recomendação para o próximo ciclo

Reler todos os documentos em `/reviews` e reavaliar se a maior oportunidade restante é transformar versões em estratégias ou corrigir primeiro as inconsistências numéricas que reduzem confiança.

## Ciclo 2 — Estratégias como identidade dos cenários

### Problema e prioridade

A interface apresentava “Versão 01/02/03” como identidade principal, embora cada alternativa representasse uma estratégia. Isso mantinha a metáfora de arquivo rejeitada pelo manifesto e fazia a numeração competir com a intenção.

### Princípios constitucionais afetados

- hipóteses em vez de arquivos;
- a unidade de trabalho é a decisão;
- cenários devem representar estratégias distintas;
- comparação deve começar pelas diferenças que mudam a decisão.

### Solução implementada

Foram definidos metadados explícitos para os três cenários:

- `Equilíbrio de implantação · v01`;
- `Máxima densidade · v02`;
- `Mais área livre · v03`.

Os nomes estratégicos passaram a ocupar a posição principal no seletor, painel executivo, faixa do canvas, comparação, apresentação e relatórios. A revisão permanece como metadado secundário. “Maior VGV” foi removido porque o protótipo não possui dados econômicos que sustentem essa promessa.

### Arquivos alterados

- `index.html`;
- `CLAUDE.md`.

### Verificações

- `npm test`: 9 testes aprovados.
- `git diff --check`: nenhuma inconsistência de whitespace.
- nenhuma ocorrência restante de `VERSION_HYPOTHESES`, “Comparar Versões”, “Maior VGV” ou “Versão 01 ativa”.
- servidor local respondeu com nomes estratégicos atualizados.

### Limitações e riscos

- as chaves internas continuam como `Versão 01/02/03` para evitar uma migração de estado sem benefício imediato;
- a nomenclatura ainda precisa ser validada com usuários reais;
- não houve inspeção visual automatizada do seletor e da comparação;
- os cenários ainda não mostram seus trade-offs em texto estruturado.

### Oportunidades descobertas

- adicionar intenção, ganho, custo e risco a cada estratégia;
- derivar todos os textos numéricos do motor de cálculo;
- tornar recomendação, confiança e validações uma síntese visível.

### Recomendação para o próximo ciclo

Corrigir inconsistências numéricas estáticas antes de ampliar a interface de recomendação. Uma recomendação só é confiável quando o copiloto e o canvas compartilham a mesma base calculada.

## Ciclo 3 — Inteligência dinâmica e consistência numérica

### Problema e prioridade

Quatro gaps interligados: insights estáticos desconectados dos cálculos reais; copiloto respondendo como chatbot simples sem análise estruturada; textos mockados com números desconectados do motor; premissas regulatórias invisíveis para o usuário.

### Princípios constitucionais afetados

- o produto deve parecer vivo — indicadores mudam, copiloto observa;
- nunca apresentar estimativa como fato — premissas precisam de origem e estado;
- copiloto deve chegar com contexto e observações;
- separar cálculo, inferência e validação;
- a recomendação deve ter objetivo, critérios, confiança, premissas e próximo passo.

### Solução implementada

**Insights dinâmicos:** `computeInsights(towers, m)` substituiu `INSIGHTS_DATA` estático. Gera insights contextuais com base em CA real, margem de CA, potencial de crescimento por torre, TO disponível, conflitos e sobreposições. InsightsRail recebe `towers` e `m` como props.

**Copiloto análise estruturada:** seleção de torre agora produz `role:"copilot-analysis"` com campo `observation`, `suggestion`, `confidence` e array `facts[]` com `source` (calculado/informado). Substituiu o `role:"copilot-context"` simples com texto de status. Debounce de 500ms evita flooding.

**Descrição dinâmica no getStatus:** `status.detail` agora inclui CA real, margem calculada e unidades estimadas. `status.nextStep` recomenda próxima ação de acordo com o estado atual. Ambos renderizados no `LotOverview`.

**Premissas explícitas:** seção "Premissas" no LotOverview mostra CA max (12), TO max (50%) e vagas (1) com badges "simulado"/"informado" e disclaimer claro.

**Intenção e trade-off nas estratégias:** `SCENARIO_META` expandido com campos `intent` e `tradeoff`. Renderizados no `ComparePanel` abaixo do seletor de estratégia.

**Consistência numérica:** `const HISTORY` substituído por `function initialHistory()` que computa métricas reais via `calculateMetrics` nos `INIT_TOWERS`. O skill card inicial mostra unidades, CA e TO calculados.

**Constantes de limite:** `CA_LIMIT = 12` e `TO_LIMIT = 50` promovidos para constantes de módulo.

### Arquivos alterados

- `index.html`

### Verificações

- `npm test`: 9 testes aprovados.
- busca por valores hardcoded nas mensagens mockadas: substituídos por calculados.
- `getStatus` não produz mais "Solução Viável".

### Limitações e riscos

- `copilot-analysis` fica visível apenas se o chat estiver aberto; usuário com chat minimizado não vê a análise;
- insights são dispensáveis mas podem ser dispensados acidentalmente;
- premissas regulatórias mostradas como "simulado" — necessitam validação antes de qualquer decisão real.

### Oportunidades descobertas

- badge de não-lida no botão do chat minimizado;
- notificação do copiloto ao trocar de estratégia;
- síntese de recomendação comparativa no ComparePanel;
- alerta proativo quando CA ultrapassa limites;
- atalhos de teclado para troca de estratégia.

## Ciclo 4 — Copiloto proativo e encerramento do ciclo decisório

### Problema e prioridade

O copiloto reagia a ações do usuário mas não iniciava observações sobre o estado do canvas. O ComparePanel mostrava dados mas não fechava o ciclo de decisão. O usuário com chat minimizado não sabia quando o copiloto havia enviado análise.

### Princípios constitucionais afetados

- copiloto deve chegar cedo, enxergar relações, propor caminhos;
- cada transição é oportunidade para o copiloto;
- geração sem avaliação é espetáculo, avaliação sem decisão é relatório;
- confiança exige tornar limitações visíveis na exportação.

### Solução implementada

**Badge de não-lida no chat minimizado:** `ChatPanel` rastreia mensagens recebidas enquanto minimizado. Botão em modo mini mostra badge verde + pulse quando novas mensagens chegam. Claro ao expandir.

**Notificação ao trocar estratégia:** `switchVersion` envia `copilot-context` com métricas comparativas: unidades delta, CA delta e direção. Preservado ao selecionar torre (filtro anterior removia indevidamente `copilot-context`).

**Alerta proativo de CA:** `useEffect` monitora `m.ca` e envia notificação ao cruzar 10 ou CA_LIMIT. Cooldown de 25s evita repetição durante drag contínuo.

**Síntese de recomendação no ComparePanel:** função `compareRec(verL, mL, verR, mR)` gera texto condicional baseado em delta de unidades, CA e risco regulatório. Renderizada como bloco com cor púrpura abaixo da tabela de deltas.

**Botão "Avançar com esta":** quando `compareRec` retorna uma estratégia recomendada, botão aparece no bloco de síntese. Ao clicar, chama `onSwitch(rec.rec)` e fecha o comparador. Fecha o ciclo Explorar → Comparar → Decidir.

**Atalhos de teclado 1/2/3:** global `document.addEventListener` com ref para evitar stale closure. Ativado apenas em modo active e quando o foco não está em input/textarea.

**Estratégias nas alternativas:** `contextualReply` usa `scenarioName` e `scenarioIntent` para labels das alternativas. Bubble de alternatives mostra `alt.intent` como sublabel.

**Texto contextual no reply:** padrão de resposta do copiloto para `type==="increase"` menciona CA antes e depois; `type==="reduce"` menciona motivo baseado em CA real. Padrões regex expandidos (remov/exclu/apagar/deletar/tirar, aument/mais/ampli/pavimento/cresce/subir/sobe).

**Exportação enriquecida:** `downloadReport` inclui estado da avaliação, intenção e trade-off da estratégia, e tabela de premissas com badges "simulado"/"informado" e disclaimer. Alinha o relatório com a epistemologia do produto.

**SVG_PER_M2 constante:** elimina três computações repetidas de área de polígono em `computeInsights`, `towerAiText` e o efeito de seleção do copiloto. Usa `M_TO_SVG * M_TO_SVG`.

### Arquivos alterados

- `index.html`
- `reviews/IMPLEMENTATION_REVIEW.md`
- `reviews/NEXT_OPPORTUNITIES.md`

### Verificações

- `npm test`: 9 testes aprovados em todos os pontos de verificação intermediários.
- brace/paren balance: 0 em todos os pontos.
- todos os novos textos em português e alinhados com a linguagem estabelecida.

### Limitações e riscos

- atalhos 1/2/3 interferem se o usuário tiver extensão de browser que captura teclas numéricas;
- `compareRec` usa lógica condicional heurística — pode não cobrir todos os casos de comparação;
- notificação de CA usa cooldown de 25s que pode perder alertas consecutivos durante drag rápido;
- botão "Avançar com esta" fecha o comparador mas não registra formalmente a decisão (modo Decidir ainda ausente).

### Oportunidades descobertas

- superfície explícita de "Decidir" para registro formal de decisão com motivo;
- snapping de torres às linhas de recuo;
- histórico de desfazer/refazer;
- validação de premissas com link para consulta de legislação;
- modo de edição de texto das premissas pelo usuário.

## Ciclo 6 — Integridade regulatória e premissas informadas

### Problema e prioridade

Quatro gaps restantes após Ciclo 5: (P1) decisão sem motivo nem pendências; (P2) recuos sem detecção visual de violação nem snap; (P4) premissas CA/TO hardcoded impossibilitando cenários com legislação diferente.

### Princípios constitucionais afetados

- nunca apresentar estimativa como fato — premissas precisam de origem e estado;
- histórico importa porque organizações precisam lembrar por que escolheram;
- o canvas importa porque decisões espaciais precisam ser vistas;
- copiloto deve chegar cedo, observar e contestar premissas.

### Solução implementada

**Recuo visual:** `towerState()` retorna `"setback"` quando `showSetbacks` é true e algum canto da torre está fora de `INSET_TERRAIN`. Torres em recuo recebem fill e stroke amarelos + badge "Recuo" no canvas.

**Snap de recuo:** `nudgeInsidePoly(x,y,w,h,pts)` calcula deslocamento mínimo para trazer todos os cantos para dentro do polígono insetado. `onUp` aplica o snap quando `showSetbacksRef.current` é true.

**Constantes de módulo:** `SETBACK_METERS=[5,1.5,1.5,3,3,1.5,1.5,5]` e `INSET_TERRAIN=insetPoly(...)` promovidos para módulo, reutilizados em `SetbackOverlay`, `towerState` e `onUp`.

**Intenção visível no LotOverview:** `scenarioIntent(version)` renderizado abaixo da revisão no header do painel, dispensando abertura do comparador.

**Formulário "Decidir":** `deciding` state no `ComparePanel`. Ao clicar "Avançar com esta →", abre form inline com textarea de motivo e checklist de 4 pendências pré-definidas. Ao confirmar, `onSwitch(v, {reason, pending})` fecha comparador, registra decisão enriquecida e envia mensagem ao copiloto.

**Decision stale:** `decisionStale = useMemo(...)` detecta quando unidades derivam > 10% ou CA > 0,5 da baseline da decisão. Version banner muda para amarelo. Copiloto envia notificação na primeira transição true.

**Premissas editáveis:** `limits = useState({ca:12,to:50})` em `ArqgenNext`. LotOverview ganha botão "editar" que abre inputs in-place para CA máx e TO máx. Ao aplicar, copiloto notifica. Premissas alteradas recebem badge "informado".

**Propagação de limits:** `getStatus(m,lim)`, `computeInsights(towers,m,lim)`, `compareRec(verL,mL,verR,mR,lim)`, `TowerDetail.towerAiText(t,metrics)` (via prop `limits`), copilot analysis useEffect, alerta de CA, `contextualReply` e ComparePanel METRICS strip — todos usam `limits.ca`/`limits.to` efetivos.

**Relatório exportado:** premissas com badges "informado"/"simulado" conforme `limits` ativos. Registro de decisão incluído quando presente (motivo, pendências, hora).

### Arquivos alterados

- `index.html`
- `reviews/NEXT_OPPORTUNITIES.md`
- `reviews/IMPLEMENTATION_REVIEW.md`

### Verificações

- `npm test`: 9 testes aprovados em todos os pontos de checkpoint.
- brace/paren balance: 0 em todos os commits.
- `limits` propagado por: getStatus, computeInsights, compareRec, towerAiText, copilot analysis, CA alert, contextualReply, ComparePanel METRICS.
- snap de recuo funciona para qualquer polígono insetado via `nudgeInsidePoly`.

### Limitações e riscos

- snap ocorre apenas no drop (onUp); durante drag não há atração magnética às linhas de recuo;
- `nudgeInsidePoly` usa heurística de maior deslocamento por eixo; pode não ser ótimo em polígonos côncavos;
- vagas por unidade ainda hardcoded (1) — não afeta métricas nesta V0;
- `calculateMetrics` em `calculations.js` usa seus próprios `LIMITS` internos; limites do usuário não propagam para `m.ca` nem `m.occ` calculados (apenas para a avaliação de status e textos do produto).

### Oportunidades descobertas

- snap magnético em tempo real durante drag (aresta da torre atrai para aresta do inset polygon);
- vagas editáveis nas premissas;
- migração para Vite + React (Sprint 5 do roadmap).
