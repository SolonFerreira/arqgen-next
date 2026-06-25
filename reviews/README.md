# Memória de Evolução Autônoma

## Propósito

Esta pasta preserva o raciocínio entre ciclos de evolução do Arqgen Next. Ela não substitui a constituição em `/docs`: a constituição define princípios duradouros; `/reviews` registra evidências, problemas encontrados, decisões tomadas e oportunidades ainda abertas.

## Regra entre ciclos

> Sempre que concluir um ciclo, antes de iniciar o próximo, releia todos os documentos em `/reviews`.

A releitura é obrigatória para:

- evitar repetir análises e soluções já tentadas;
- identificar padrões recorrentes de produto, UX e engenharia;
- verificar se riscos anteriores foram realmente resolvidos;
- comparar oportunidades restantes;
- escolher a melhoria de maior valor ainda não realizada.

Nenhum novo ciclo deve ser priorizado apenas pela memória do agente.

## Estrutura recomendada

- `PRODUCT_REVIEW.md`: violações do manifesto, qualidade decisória e oportunidades de produto.
- `UX_REVIEW.md`: fricções por perfil, carga cognitiva, estados e fluxo.
- `ENGINEERING_REVIEW.md`: arquitetura, manutenção, testes e desempenho.
- `IMPLEMENTATION_REVIEW.md`: mudanças concluídas, evidências e limitações.
- `NEXT_OPPORTUNITIES.md`: backlog priorizado por impacto, esforço, dependências e risco.

Os arquivos podem ser criados conforme houver conteúdo real. Não gerar documentação vazia apenas para preencher a estrutura.

## Fechamento obrigatório de ciclo

Cada ciclo deve registrar:

1. problema escolhido e por que era a maior prioridade;
2. princípio constitucional afetado;
3. solução implementada;
4. arquivos alterados;
5. verificações executadas e seus resultados;
6. limitações e riscos remanescentes;
7. oportunidades descobertas;
8. recomendação para o próximo ciclo.

## Abertura obrigatória de ciclo

Antes de implementar:

1. ler todos os arquivos desta pasta;
2. consolidar itens ainda abertos;
3. eliminar análises duplicadas;
4. procurar padrões entre ciclos;
5. reavaliar impacto, esforço, dependências e risco;
6. selecionar a maior oportunidade restante coerente com a constituição.

## Ordem de prioridade

1. violações do manifesto;
2. violações dos princípios de UX;
3. comportamentos de software tradicional incompatíveis com AI-native;
4. qualidade da decisão;
5. experiência do canvas;
6. comportamento do copiloto;
7. arquitetura;
8. engenharia;
9. desempenho;
10. polimento visual.

Impacto visual isolado nunca supera confiança, clareza ou qualidade decisória.
