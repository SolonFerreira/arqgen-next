# Base do Design System

## Escopo

Este documento define uma base funcional, não uma marca final. Tokens e componentes devem evoluir com testes reais, preservando clareza, sobriedade e rastreabilidade.

## Princípios visuais

- superfícies discretas; conteúdo espacial em primeiro plano;
- contraste suficiente e estados acessíveis;
- tipografia numérica legível;
- cor reservada para significado;
- bordas, elevação e movimento usados com parcimônia;
- densidade ajustável por contexto técnico ou executivo.

A paleta atual do protótipo pode orientar continuidade, mas não deve ser tratada como identidade imutável.

## Tokens semânticos

Nomear por função, não por cor:

- `surface/canvas`, `surface/panel`, `surface/elevated`;
- `text/primary`, `text/secondary`, `text/muted`;
- `status/validated`, `status/assumed`, `status/pending`;
- `risk/low`, `risk/medium`, `risk/high`, `risk/blocking`;
- `confidence/high`, `confidence/medium`, `confidence/low`;
- `action/primary`, `action/secondary`, `focus`.

## Componentes fundamentais

### Cards

- **StrategyCard:** intenção, métricas-chave, risco e aderência ao objetivo.
- **AssumptionCard:** valor, origem, estado, versão e impacto.
- **RiskCard:** condição, severidade, cenários afetados, mitigação e responsável.
- **EvidenceCard:** fonte, trecho ou objeto, data e vínculo.
- **RecommendationCard:** objetivo, conclusão condicionada, confiança e próximo passo.

Cards não devem se tornar contêiner universal. Tabelas são melhores para comparação repetitiva.

### Tabela comparativa

Linhas são critérios; colunas são cenários. Deve suportar unidade, delta, melhor segundo objetivo, restrição dura, detalhes e ordenação. Cabeçalhos permanecem visíveis. Não usar score agregado como única linha.

### Indicadores

- **RiskIndicator:** severidade + rótulo + causa.
- **ConfidenceBadge:** nível + justificativa acessível.
- **AssumptionChip:** estado curto; abre fonte e histórico.
- **MetricDelta:** direção, magnitude e interpretação contextual.
- **ValidationState:** validado, extraído, assumido, conflitante ou ausente.

### Painéis

- painel contextual do objeto selecionado;
- painel de premissas;
- painel de explicação;
- drawer de evidências;
- painel executivo.

Painéis devem preservar o canvas e compartilhar seleção.

### Timeline

Registra eventos relevantes com ator, ação, versão, motivo e efeito. Agrupa eventos mecânicos sem apagar mudanças decisórias.

## Estados

Todo componente de dados deve considerar:

- carregando com contexto;
- vazio com próxima ação;
- parcial;
- desatualizado;
- recalculando;
- erro recuperável;
- erro bloqueante;
- somente leitura;
- alterado, ainda não validado.

## Nomenclatura

Nomes de componentes em inglês no código; rótulos de produto em português no mercado inicial. Usar termos do domínio, como `Scenario`, `Constraint` e `Evidence`, em vez de `Item`, `Box` ou `DataCard`.

Alternativas devem ter nomes estratégicos: “Menor risco”, “Máxima área”, “Equilíbrio”, e não apenas números.

## Acessibilidade

- foco visível e navegação por teclado;
- significado nunca somente por cor;
- contraste conforme WCAG;
- tabelas com estrutura semântica;
- labels para gráficos e canvas;
- alternativa textual para relações espaciais importantes;
- redução de movimento.

## Governança

Um componente entra no sistema quando resolve um padrão repetido e possui estados documentados. Não promover abstrações criadas para uma única tela. Mudanças semânticas exigem revisar UX, domínio e exportações, não apenas aparência.

