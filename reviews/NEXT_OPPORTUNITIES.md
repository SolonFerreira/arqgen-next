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

## Próximas oportunidades

### P1 — Superfície explícita de "Decidir"

**Evidência:** O modo "Decidir" da constituição não tem superfície própria. O usuário pode avançar com uma estratégia via ComparePanel, mas não registra motivo, critérios ou pendências da decisão.

**Impacto:** A constituição define "A unidade de trabalho é a decisão" e "Avaliação sem decisão é relatório." Sem esta superfície, o produto ainda não fecha o ciclo.

**Direção:** Um painel leve (não modal) onde o usuário registra estratégia escolhida, motivo e pendências antes de avançar. Não requer backend — estado em memória para V0.

### P2 — Snapping de torres às linhas de recuo

**Evidência:** Ao arrastar torres perto das linhas de recuo, não há indicação visual de proximidade nem snapping automático.

**Impacto:** Torna o posicionamento impreciso e força o usuário a estimar distâncias visualmente.

**Direção:** Ao fazer drag, se a torre se aproximar a < 3 SVG units de uma linha de recuo, snap automático para o ponto exato. Linha de recuo pisca para confirmar o snap.

### P3 — Histórico de desfazer (Ctrl+Z)

**Evidência:** Qualquer operação no canvas é irreversível sem trocar de versão.

**Impacto:** Eleva a ansiedade ao explorar. Usuários tendem a ser mais conservadores quando não podem desfazer.

**Direção:** Stack de snapshots de `towers` com profundidade de ~20. Ctrl+Z restaura o snapshot anterior.

### P4 — Edição de premissas pelo usuário

**Evidência:** CA 12 e TO 50% estão hardcoded. O usuário não pode informar os limites reais do seu terreno.

**Impacto:** O produto não consegue calcular corretamente para lotes com legislação diferente do padrão simulado.

**Direção:** Modal de "Configurar premissas" acessível pelo ícone da seção Premissas. Permite editar CA max, TO max e vagas. Recalcula tudo ao salvar.

## Regra para o próximo ciclo

Antes de selecionar e implementar um item, reler todos os arquivos em `/reviews`, confirmar que ele permanece como a maior oportunidade e registrar qualquer mudança de prioridade.
