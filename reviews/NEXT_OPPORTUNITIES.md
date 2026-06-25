# Próximas Oportunidades

## Estado

Backlog inicial criado após a leitura do repositório e da constituição. Ainda requer validação visual no navegador antes de qualquer conclusão sobre hierarquia, espaçamento ou comportamento responsivo.

## Concluído — Remover falsa declaração de viabilidade

### Evidência

`getStatus()` classifica cenários automaticamente como “Solução Viável” usando apenas CA e taxa de ocupação simulados. O sistema não possui um `RegulationSet` validado nem evidências suficientes para declarar viabilidade.

### Impacto

Viola confiança, estratégia regulatória e o princípio de não tratar estimativa como fato. Pode induzir o usuário a interpretar uma checagem parcial como validação técnica.

### Resultado

O ciclo 1 substituiu a declaração absoluta por estados epistemológicos e tornou explícito que CA e ocupação foram calculados enquanto a legislação permanece não validada. Detalhes em `IMPLEMENTATION_REVIEW.md`.

## Concluído — Transformar versões em estratégias

### Evidência

O modelo interno e a interface ainda usam “Versão 01/02/03”, apesar de anexarem subtítulos estratégicos.

### Impacto

Mantém a metáfora de arquivo e enfraquece o princípio “hipóteses em vez de versões”. O usuário compara números antes de compreender intenção e trade-off.

### Resultado

O ciclo 2 promoveu nomes estratégicos em todas as superfícies relevantes e rebaixou a numeração para metadado de revisão. Detalhes em `IMPLEMENTATION_REVIEW.md`.

## Concluído — Ciclo 3 — Inconsistências numéricas

Textos mockados derivados dos cálculos reais. Copiloto usa `copilot-analysis` com fatos estruturados. Premissas explícitas com badges de estado. Intenção e trade-off nas estratégias. Detalhes em `IMPLEMENTATION_REVIEW.md`.

## Concluído — Ciclo 3 — Recomendação condicional

`getStatus` retorna `nextStep` contextual. LotOverview renderiza recomendação em verde. Detalhes em `IMPLEMENTATION_REVIEW.md`.

## Concluído — Ciclo 3 — Premissas regulatórias explícitas

Seção "Premissas" no LotOverview com CA max, TO max e vagas com badges "simulado"/"informado". Detalhes em `IMPLEMENTATION_REVIEW.md`.

## Concluído — Ciclo 5 — Decidir, desfazer e resposta a intenção

- Estado `decision` registra estratégia, hora e métricas ao clicar "Avançar com esta"
- Badge "Decisão registrada · HH:MM" na faixa do canvas para a estratégia decidida
- Histórico de desfazer com Ctrl+Z (stack de 20 snapshots, instrumented em: drag, resize, save, remove, add, adjust, applyChatAction, applyAlt)
- Alternativas do chat reordenadas por intenção detectada na mensagem (densidade / área livre / equilíbrio)

Detalhes em `IMPLEMENTATION_REVIEW.md`.

## Concluído — Ciclo 4 — Copiloto proativo e encerramento decisório

Badge de não-lida no chat minimizado. Notificação ao trocar estratégia. Alerta de CA. Síntese comparativa com botão "Avançar com esta". Atalhos 1/2/3. Exportação com premissas e avaliação. Detalhes em `IMPLEMENTATION_REVIEW.md`.

---

## Concluído — Ciclo 6 — Integridade regulatória e premissas informadas

### Evidência

Premissas CA/TO hardcoded, sem surface de decisão com motivo, sem detecção visual de recuos, sem snapping.

### Resultado

- Badge "Recuo" no canvas quando torre viola INSET_TERRAIN com recuos visíveis
- SETBACK_METERS e INSET_TERRAIN extraídos para constantes de módulo (reutilizadas em SetbackOverlay e towerState)
- `nudgeInsidePoly` faz snap da torre para dentro do polígono insetado ao soltar
- Intenção da estratégia visível no LotOverview sem precisar abrir comparador
- Formulário "Decidir" in-place no ComparePanel: motivo livre + checklist de pendências
- Badge de pendências no version banner; badge amarelo "Decisão desatualizada" ao derivar
- `decisionStale` detecta deriva de métricas pós-decisão (>10% unidades ou >0.5 CA)
- Copiloto envia mensagem quando decisão fica stale
- `limits` state editável via inline form em Premissas: CA máx e TO máx
- `getStatus`, `computeInsights`, `compareRec`, `towerAiText`, `contextualReply`, `InsightsRail`, alerta de CA e ComparePanel METRICS todos propagam `limits`
- Relatório exportado reflete limites informados com badges "informado"/"simulado"
- Copiloto envia mensagem ao aplicar novos limites

Detalhes em `IMPLEMENTATION_REVIEW.md`.

## Próximas oportunidades residuais

### R1 — Snapping magnético em tempo real durante drag

**Evidência:** O snap atual ocorre apenas no drop (onUp). Durante o drag a torre mostra badge "Recuo" mas não há atração visual para as linhas de recuo.

**Impacto:** Dificulta o alinhamento preciso. Para posicionamento rápido seria útil sentir o snap enquanto arrasta.

**Direção:** Em `onMove`, se a aresta mais próxima da torre estiver a < 6 SVG units de uma aresta do INSET_TERRAIN, snap automático e flash na aresta de recuo.

### R2 — Migração para Vite + React (Sprint 5)

**Evidência:** O arquivo index.html tem ~2200 linhas. Todo o código está inline. Sem TypeScript, sem linting, sem hot reload.

**Impacto:** Dificulta manutenção à medida que o produto cresce. Bloqueador para integração real com Claude API.

**Direção:** Seguir Sprint 5 do roadmap no CLAUDE.md — manter paleta e estrutura, separar em arquivos, adicionar TypeScript.

### R3 — Vagas editáveis nas premissas

**Evidência:** "Vagas por unidade" está hardcoded como 1 com badge "informado". O usuário não pode alterar.

**Impacto:** Menor; vagas não afetam as métricas calculadas nesta V0.

**Direção:** Adicionar field de vagas ao formulário de premissas. Propagar para o relatório exportado.

## Regra para o próximo ciclo

Antes de selecionar e implementar um item, reler todos os arquivos em `/reviews`, confirmar que ele permanece como a maior oportunidade e registrar qualquer mudança de prioridade.
