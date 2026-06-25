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

## Ciclo 7 — Neutralização de HTML injetado no relatório

### Problema e prioridade

O campo livre de motivo da decisão era interpolado diretamente no relatório HTML baixado. Um valor como `<img src=x onerror="alert(1)">` era preservado como marcação executável e poderia executar JavaScript quando o arquivo fosse aberto.

O problema recebeu prioridade sobre snapping e migração arquitetural por ser uma vulnerabilidade concreta de codificação de saída em conteúdo controlado pelo usuário.

### Causa raiz

`downloadReport()` construía o documento por template string sem escapar `decision.reason` e outros campos dinâmicos. A renderização React da aplicação é segura por padrão, mas essa proteção não se aplica à string HTML montada manualmente.

### Solução implementada

- nova função pura `escapeHtml()` em `calculations.js`;
- escape dos caracteres `&`, `<`, `>`, `"`, `'`;
- exportação da função para browser e CommonJS;
- aplicação do escape em todos os campos dinâmicos do relatório: estratégia, revisão, estado, intenção, trade-off, horário, motivo, pendências, IDs, tipologias, métricas e limites;
- teste unitário com payload executável.

### Arquivos alterados

- `calculations.js`;
- `index.html`;
- `tests/calculations.test.cjs`.

### Verificações

- `npm test`: 10 testes aprovados;
- payload `<img src=x onerror="alert('x')">&` convertido para entidades HTML;
- `git diff --check`: aprovado;
- balanço de chaves, parênteses e colchetes do JSX: zero;
- compilação integral do `app-src` com Babel Standalone: 187.430 bytes gerados sem erro.

### Limitações e riscos

- o relatório continua sendo HTML executável por definição; toda nova interpolação futura deve usar `escapeHtml`;
- não existe Content Security Policy embutida no arquivo exportado;
- o fluxo de download ainda não possui teste de integração em navegador.

### Oportunidades descobertas

- centralizar a geração do relatório em função pura e testável;
- adicionar CSP restritiva ao relatório exportado;
- testar o documento completo contra regressões de injeção.

### Recomendação para o próximo ciclo

Reler `/reviews` e auditar estados assíncronos, listeners e histórico de desfazer antes de aceitar a migração para Vite como próxima prioridade. Bugs funcionais continuam acima de arquitetura.

## Ciclo 8 — Invalidação da decisão por mudança de premissas

### Problema e prioridade

Uma decisão registrada permanecia com estado válido após alteração dos limites de CA ou taxa de ocupação. `decisionStale` comparava somente unidades e CA calculado; a base regulatória usada para decidir não era armazenada.

### Causa raiz

O snapshot de `decision` continha estratégia, métricas, motivo e pendências, mas não continha `limits`. A detecção de deriva estava acoplada ao componente e considerava apenas alterações no canvas.

### Solução implementada

- função pura `decisionStaleness()` em `calculations.js`;
- snapshot de `{ca,to}` gravado no momento da decisão;
- distinção entre `metricsChanged` e `assumptionsChanged`;
- estado stale ativado por alteração superior a 10% em unidades, 0,5 em CA ou qualquer mudança nos limites registrados;
- mensagem do copiloto identifica se divergiu o canvas, as premissas ou ambos;
- teste unitário para estado estável, deriva de métricas e mudança de premissas.

### Arquivos alterados

- `calculations.js`;
- `index.html`;
- `tests/calculations.test.cjs`.

### Verificações

- `npm test`: 11 testes aprovados;
- `git diff --check`: aprovado;
- compilação integral do JSX com Babel Standalone: 187.768 bytes sem erro;
- busca confirmou snapshot de limites no registro de decisão e uso da função pura.

### Limitações e riscos

- decisões criadas por versões anteriores do protótipo não possuem snapshot de limites; como o estado é somente em memória, não há migração persistente necessária;
- vagas por unidade ainda não fazem parte da base registrada;
- o relatório exibe premissas atuais, não uma comparação explícita entre premissas da decisão e premissas novas quando stale.

### Oportunidades descobertas

- exibir quais premissas mudaram no painel de decisão;
- incluir vagas quando a premissa se tornar editável;
- testar a transição stale em integração de UI.

### Recomendação para o próximo ciclo

Auditar o efeito de análise da torre: ele depende apenas de seleção e modo, apesar de produzir texto baseado em torres e limites mutáveis. Confirmar se o copiloto permanece com dados antigos após edição.

## Ciclo 9 — Atualização da análise do copiloto após edições

### Problema e prioridade

A análise contextual da torre era criada ao selecionar uma torre, mas não era recalculada quando a torre, as demais torres ou os limites regulatórios mudavam. O copiloto podia continuar mostrando pavimentos, unidades, CA, margem e recomendação antigos após drag, resize, edição ou alteração de premissas.

### Causa raiz

O `useEffect` lia `towersRef.current` e `limits`, mas declarava apenas `[sel, mode]` como dependências. Mantendo a mesma seleção, mudanças na base da análise não reexecutavam o efeito.

### Solução implementada

As dependências passaram a incluir `towers`, `limits.ca` e `limits.to`. O debounce de 500 ms existente é reiniciado durante alterações contínuas, evitando flooding e publicando uma única análise atualizada após a interação estabilizar.

### Arquivos alterados

- `index.html`.

### Verificações

- `npm test`: 11 testes aprovados;
- `git diff --check`: aprovado;
- compilação integral do JSX com Babel Standalone: 187.798 bytes sem erro;
- inspeção confirmou que todos os dados mutáveis lidos pelo efeito agora participam da invalidação.

### Limitações e riscos

- não há teste de integração React que simule resize e confirme a mensagem renderizada;
- durante uma interação contínua superior a 500 ms a análise aguarda estabilização, comportamento intencional;
- o uso de `towers` como dependência reinicia o timer a cada atualização do array.

### Oportunidades descobertas

- extrair a construção da análise para função pura testável;
- apresentar estado “analisando mudanças” em interações longas, se testes de UX indicarem necessidade.

### Recomendação para o próximo ciclo

Reler `/reviews` e procurar inconsistências remanescentes entre limites editáveis e valores hardcoded nas superfícies de comparação, alertas e exportação.

## Ciclo 10 — Limite editável aplicado ao destaque do comparador

### Problema e prioridade

O cabeçalho de cada cenário no comparador coloria o CA como alerta somente quando `m.ca >= 12`. Se o usuário alterasse o CA máximo para outro valor, a tabela e a recomendação usavam o novo limite, mas o resumo visual continuava preso ao valor inicial.

### Causa raiz

Um literal `12` permaneceu na regra de cor após a introdução de `limits`.

### Solução implementada

O destaque agora compara o CA com `limits.ca`, usando `CA_LIMIT` apenas como fallback.

### Arquivos alterados

- `index.html`.

### Verificações

- `npm test`: 11 testes aprovados;
- `git diff --check`: aprovado;
- compilação integral do JSX com Babel Standalone: 187.820 bytes sem erro;
- busca por comparações e labels de CA hardcoded em 12: nenhuma ocorrência funcional restante.

### Limitações e riscos

- exemplos de onboarding continuam mencionando CA 12 intencionalmente como conteúdo de demonstração;
- não há teste visual automatizado da cor.

### Recomendação para o próximo ciclo

Auditar corridas em `switchVersion()`: múltiplas trocas podem deixar timers concorrentes e a escolha original não pode cancelar uma transição antes de `version` ser atualizado.

## Ciclo 11 — Serialização das trocas de estratégia

### Problema e prioridade

Cada chamada de `switchVersion()` criava timers independentes. Trocas rápidas podiam aplicar uma intenção antiga depois de uma mais recente. Além disso, após escolher uma nova estratégia, escolher novamente a estratégia original durante os 200 ms de transição retornava cedo porque `version` ainda não havia mudado, sem cancelar o timer pendente.

### Causa raiz

Os timers não eram armazenados nem cancelados, e o estado não representava a estratégia pendente.

### Solução implementada

- `versionTransitionRef` armazena alvo, timer de troca e timer de fade;
- nova troca cancela os dois timers anteriores;
- requisição repetida para o mesmo alvo é ignorada;
- escolher a estratégia atual cancela uma transição pendente;
- callbacks verificam se ainda correspondem ao alvo vigente;
- cleanup desmonta o componente sem deixar timers ativos.

### Arquivos alterados

- `index.html`.

### Verificações

- `npm test`: 11 testes aprovados;
- `git diff --check`: aprovado;
- compilação integral do JSX com Babel Standalone: 188.961 bytes sem erro;
- inspeção confirmou que não existe mais `setTimeout` de troca sem referência cancelável.

### Limitações e riscos

- não há teste de integração com fake timers para sequência 1→2→3 e 1→2→1;
- a animação permanece baseada em timers, embora agora serializada;
- salvar a estratégia atual em `versions` pode ocorrer mais de uma vez durante uma sequência rápida, mas com o mesmo snapshot.

### Recomendação para o próximo ciclo

Auditar o histórico de desfazer. `onTowerDown` e `onHandleDown` gravam snapshots antes de saber se houve movimento, criando entradas sem alteração e desfazer aparentemente inoperante.

## Ciclo 12 — Histórico de undo sem ações vazias

### Problema e prioridade

Selecionar uma torre ou pressionar um handle sem mover gravava um snapshot no histórico. O próximo Ctrl+Z podia restaurar o mesmo estado e parecer quebrado. Um drag para fora do lote, posteriormente revertido, também mantinha uma entrada sem mudança.

### Causa raiz

O snapshot era gravado em `onTowerDown` e `onHandleDown`, antes de saber se a interação produziria mutação válida.

### Solução implementada

- mouse down apenas captura o snapshot candidato;
- drag grava o histórico uma única vez quando o deslocamento efetivo supera 0,1 unidade;
- resize grava uma única vez quando posição ou dimensão sanitizada realmente muda;
- drag inválido usa a posição final rastreada, reverte a torre e remove o snapshot recém-criado;
- lógica de rollback saiu do updater de estado, evitando efeito colateral dentro de `setTowers`.

### Arquivos alterados

- `index.html`.

### Verificações

- `npm test`: 11 testes aprovados;
- `git diff --check`: aprovado;
- compilação integral do JSX com Babel Standalone: 189.638 bytes sem erro;
- busca confirmou ausência de `pushHistorySnapshot` nos handlers de mouse down;
- snapshots continuam presentes nas mutações discretas: chat, alternativa, adicionar, ajustar, salvar e remover.

### Limitações e riscos

- não existe teste de integração de ponteiro e Ctrl+Z;
- resize pode deixar torre fora do lote, comportamento preexistente sinalizado visualmente como conflito;
- histórico continua restrito às torres e não inclui limites, decisão, zoom ou seleção.

### Recomendação para o próximo ciclo

Verificar `decisionStaleness()` quando as métricas atuais são inválidas. Uma decisão baseada em métricas antigas não deve permanecer verde se a configuração atual não pode ser calculada.

## Ciclo 13 — Decisão invalidada quando métricas não podem ser calculadas

### Problema e prioridade

`decisionStaleness()` retornava `stale:false` quando as métricas atuais eram inválidas. Uma configuração com torre fora do lote podia perder CA e unidades calculáveis enquanto a decisão anterior permanecia visualmente vigente.

### Causa raiz

O guard clause tratava ausência de decisão e métricas inválidas como o mesmo estado neutro.

### Solução implementada

- ausência de decisão continua retornando estado não stale;
- decisão existente com métricas inválidas retorna `stale:true` e `metricsChanged:true`;
- mudança de premissas continua sendo detectada mesmo com métricas inválidas;
- teste unitário cobre configuração atual inválida.

### Arquivos alterados

- `calculations.js`;
- `tests/calculations.test.cjs`.

### Verificações

- `npm test`: 11 testes aprovados;
- `git diff --check`: aprovado;
- compilação integral do JSX com Babel Standalone: 189.638 bytes sem erro.

### Limitações e riscos

- a mensagem do copiloto classifica métricas inválidas como divergência do canvas, sem detalhar a razão específica retornada por `calcMetrics`;
- a decisão permanece armazenada como histórico, corretamente marcada como desatualizada.

### Recomendação para o próximo ciclo

Auditar se o histórico de undo é isolado por estratégia. Um stack global de arrays sem identificador de cenário pode restaurar geometria de outra estratégia.

## Ciclo 14 — Isolamento do undo por estratégia

### Problema e prioridade

O histórico de torres era global e sobrevivia à troca de estratégia. Editar uma estratégia, trocar para outra e usar Ctrl+Z podia restaurar geometria pertencente ao cenário anterior dentro do cenário atual.

### Causa raiz

Os snapshots armazenavam apenas arrays de torres, sem chave de estratégia, e `switchVersion()` não reiniciava o stack.

### Solução implementada

- histórico inicia vazio;
- a primeira mutação de cada sessão grava o estado atual;
- quando uma troca de estratégia é efetivamente aplicada, o histórico é reiniciado;
- cancelamento de transição não limpa o histórico da estratégia que permanece ativa.

### Arquivos alterados

- `index.html`.

### Verificações

- `npm test`: 11 testes aprovados;
- `git diff --check`: aprovado;
- compilação integral do JSX com Babel Standalone: 189.647 bytes sem erro;
- busca confirmou inicialização vazia e reset dentro do callback efetivo de troca.

### Limitações e riscos

- o usuário não pode desfazer uma edição de uma estratégia depois de sair e voltar para ela;
- uma evolução futura pode manter stacks independentes por estratégia;
- não existe teste de integração de teclado atravessando cenários.

### Recomendação para o próximo ciclo

Auditar `applyAlt()`. Alternativas do chat carregam `alt.ver`, mas a função atual substitui somente `towers`; isso pode exibir uma estratégia com a geometria de outra.

## Ciclo 15 — Aplicação atômica de alternativa e identidade

### Problema e prioridade

Alternativas do chat possuíam `alt.ver`, nome e intenção, mas `applyAlt()` substituía apenas as torres. Aplicar “Máxima densidade” enquanto “Equilíbrio” estava ativo deixava a geometria de uma estratégia sob a identidade de outra.

### Causa raiz

O handler tratava alternativa como transformação local de canvas, ignorando que o objeto representava um `Scenario`.

### Solução implementada

- sanitização do snapshot antes da aplicação;
- quando `alt.ver` difere da estratégia ativa, timers de transição são cancelados;
- snapshot atual é salvo na estratégia de origem;
- snapshot mostrado no preview é gravado na estratégia de destino;
- `version`, `towers` e `pan` são atualizados como uma única intenção;
- histórico de undo é reiniciado ao cruzar estratégias;
- alternativa na estratégia atual continua sendo mutação desfazível.

### Arquivos alterados

- `index.html`.

### Verificações

- `npm test`: 11 testes aprovados;
- `git diff --check`: aprovado;
- compilação integral do JSX com Babel Standalone: 190.266 bytes sem erro;
- inspeção confirmou consumo de `alt.ver` e preservação da estratégia de origem.

### Limitações e riscos

- aplicação cruzada é imediata e não usa a animação da troca manual;
- as alternativas continuam sendo geradas a partir de `VERSIONS_INIT`, não do snapshot editado da estratégia correspondente;
- não há teste de integração do card até o seletor de estratégia.

### Recomendação para o próximo ciclo

Adicionar Content Security Policy restritiva ao relatório HTML exportado como defesa em profundidade contra futuras interpolações inseguras.

## Ciclo 16 — CSP no relatório exportado

### Problema e prioridade

O escape de HTML neutralizava os campos conhecidos, mas o documento exportado continuava sem política de execução. Uma interpolação insegura adicionada no futuro poderia reintroduzir XSS.

### Solução implementada

O relatório inclui CSP via meta tag:

- `default-src 'none'`;
- `style-src 'unsafe-inline'`;
- `img-src data:`;
- `base-uri 'none'`;
- `form-action 'none'`.

O arquivo não pode carregar scripts, frames, objetos, fontes ou recursos de rede. CSS inline continua permitido para preservar o layout.

### Arquivos alterados

- `index.html`.

### Verificações

- `npm test`: 11 testes aprovados;
- `git diff --check`: aprovado;
- compilação integral do JSX com Babel Standalone: 190.417 bytes sem erro;
- busca confirmou CSP e escape simultaneamente presentes no gerador.

### Limitações e riscos

- CSP em meta tag depende do suporte do navegador ao abrir arquivo local;
- CSS inline exige `'unsafe-inline'`, mas scripts permanecem bloqueados;
- ainda não há teste automatizado que abra o relatório em navegador e capture violações.

### Recomendação para o próximo ciclo

Auditar dependências CDN sem versão exata. Recursos mutáveis prejudicam reprodutibilidade e podem quebrar o protótipo sem alteração no repositório.

## Ciclo 17 — Dependências CDN fixas e verificadas por SRI

### Problema e prioridade

Os scripts usavam `react@18`, `react-dom@18` e Babel sem versão. A auditoria HTTP comprovou redirects mutáveis para React 18.3.1, ReactDOM 18.3.1 e Babel 8.0.2. O protótipo podia mudar ou quebrar sem qualquer commit.

### Solução implementada

- versões exatas nos três URLs;
- hashes SHA-384 em `integrity`;
- `crossorigin="anonymous"` para validação SRI cross-origin;
- contexto técnico atualizado com versões reais.

### Arquivos alterados

- `index.html`;
- `CLAUDE.md`.

### Verificações

- os três arquivos remotos foram baixados e comparados aos hashes declarados: todos conferem;
- `npm test`: 11 testes aprovados;
- `git diff --check`: aprovado;
- compilação com Babel 8.0.2 exato: 190.417 bytes sem erro.

### Limitações e riscos

- o aplicativo ainda depende de disponibilidade de CDN e Google Fonts;
- bundles de desenvolvimento são grandes e inadequados para produção;
- migração para bundler deve substituir CDN e Babel runtime.

### Recomendação para o próximo ciclo

Realizar auditoria final do diff, procurar segredos, conflitos, artefatos temporários e regressões documentais. Não iniciar migração Vite sem a aprovação prevista no roadmap técnico.

## Ciclo 18 — Copilot reposicionável

### Problema e prioridade

O Copilot permanecia fixo no canto inferior direito e podia cobrir exatamente a região do canvas que o usuário precisava investigar. Minimizar reduzia sua área, mas o ícone continuava preso ao mesmo canto.

### Princípios constitucionais afetados

- o canvas é o lugar onde o pensamento acontece;
- a interface não deve competir com o conteúdo;
- o usuário precisa manter controle visual sobre a decisão;
- o Copilot deve apoiar o canvas, não bloqueá-lo.

### Solução implementada

- arraste pelo cabeçalho nos estados médio e completo;
- arraste pelo próprio botão no estado minimizado;
- clique no botão minimizado continua abrindo o Copilot;
- limiar de 3 px diferencia clique de arraste;
- posição preservada ao minimizar, expandir ou alternar o tamanho;
- posicionamento `fixed` permite mover sobre toda a viewport;
- limites de 8 px impedem que o painel fique inacessível fora da tela;
- posição é recalculada quando o estado, conteúdo anexado, mensagens ou viewport alteram as dimensões;
- controles do cabeçalho interrompem o pointer down para não iniciar arraste;
- suporte a pointer events e `touchAction:"none"` para mouse, caneta e toque.

### Arquivos alterados

- `index.html`;
- `calculations.js`;
- `tests/calculations.test.cjs`;
- `CLAUDE.md`.

### Verificações

- `npm test`: 12 testes aprovados;
- teste de clamp cobre borda direita, borda superior, painel maior que viewport e valores inválidos;
- `git diff --check`: aprovado;
- JSX compilado e JavaScript parseado com Babel;
- inspeção estática confirmou arraste nos três estados e bloqueio de propagação nos controles.

### Limitações e riscos

- o navegador integrado não estava disponível para teste visual automatizado;
- a posição não persiste após recarregar, coerente com a regra atual de estado apenas em memória;
- não existe botão “voltar ao canto”, pois a posição sempre permanece alcançável e a ação acrescentaria configuração.

### Recomendação para o próximo ciclo

Validar visualmente em navegador quando a superfície estiver disponível, especialmente drag por toque, transição mini → completo e convivência com o painel lateral.
