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

## Prioridade 1 — Corrigir inconsistências numéricas do protótipo

### Evidência

Textos mockados mencionam taxa de ocupação de 38% e CA em 92% do potencial, enquanto o motor atual calcula outros valores para os mesmos cenários.

### Impacto

Reduz confiança e faz o copiloto parecer desconectado do canvas.

### Direção

Derivar mensagens dos cálculos reais ou remover números estáticos.

## Prioridade 2 — Tornar a recomendação condicionada visível

### Evidência

O produto apresenta indicadores e insights, mas não possui uma superfície persistente que declare objetivo, recomendação, confiança, premissas críticas e validações necessárias.

### Impacto

O canvas mostra geometria e métricas, mas ainda não fecha o ciclo decisório definido na constituição.

### Direção

Criar uma síntese compacta e contextual ligada ao comparador, sem transformar a interface em dashboard.

## Prioridade 3 — Explicitar premissas regulatórias simuladas

### Evidência

Os limites de CA 12 e taxa de ocupação 50% estão incorporados ao comportamento, mas não existem como premissas com origem, estado e escopo.

### Impacto

Mesmo com a nova linguagem preliminar, o usuário ainda não consegue distinguir facilmente parâmetros informados, simulados e validados.

### Direção

Apresentar os limites usados como premissas simuladas e conectá-los aos estados da avaliação, sem sugerir validação legal.

## Regra para o próximo ciclo

Antes de selecionar e implementar um item, reler todos os arquivos em `/reviews`, confirmar que ele permanece como a maior oportunidade e registrar qualquer mudança de prioridade.
