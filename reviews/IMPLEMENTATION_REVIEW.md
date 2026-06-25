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
