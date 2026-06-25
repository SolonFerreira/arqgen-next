# Domínio de Decisão

## Decisão central

O domínio inicial é estudo de massa e legislação. A pergunta que o produto deve dominar é:

> **Quais alternativas urbanísticas são possíveis e qual alternativa merece avançar?**

Essa pergunta contém três problemas diferentes. Misturá-los produz recomendações frágeis.

## Motor de possibilidades

Responde “o que pode ser construído?”. Deve relacionar geometria do lote, acessos, recuos, gabarito, coeficientes, ocupação, permeabilidade, vagas, áreas computáveis e não computáveis, restrições físicas e premissas de produto.

Seu output não é uma única massa, mas um espaço de soluções representativas. Alternativas precisam ser estrategicamente distintas: por exemplo, máxima área, menor risco, melhor eficiência ou menor complexidade.

## Motor de comparação

Responde “como as alternativas diferem?”. Deve calcular e explicar, no mínimo:

- área construída, computável e privativa estimada;
- ocupação, coeficiente e permeabilidade;
- número e mix de unidades;
- vagas, altura e eficiência;
- complexidade técnica;
- dependência de premissas frágeis;
- risco legal e necessidade de validação;
- aderência ao objetivo declarado.

Métricas sem contexto não bastam. O comparador deve mostrar origem, fórmula, unidade, versão e impacto.

## Motor de recomendação

Responde “o que merece avançar?”. A recomendação é sempre condicionada.

> A IA nunca deve dizer que uma alternativa é melhor sem explicar segundo quais critérios.

Uma recomendação válida declara objetivo, pesos, premissas, nível de confiança, riscos remanescentes e validações humanas. Quando objetivos conflitam, deve apresentar uma fronteira de escolha, não esconder o conflito em um score único.

## O que significa “melhor”

Pode significar maximizar área privativa, unidades ou VGV estimado; reduzir risco legal, custo ou complexidade; favorecer aprovação, sustentabilidade, liquidez ou velocidade; ou equilibrar critérios.

O score é uma lente, não uma verdade. Pesos devem ser editáveis, nomeados e visíveis. Critérios duros, como violação legal, não podem ser compensados silenciosamente por ganhos econômicos.

## Limites

O produto oferece estudo preliminar e suporte à decisão. Não substitui:

- parecer jurídico ou consulta oficial;
- responsabilidade técnica de arquitetura e engenharia;
- aprovação municipal;
- projeto legal ou executivo;
- orçamento e análise econômica definitiva;
- levantamento topográfico validado.

Esses limites devem aparecer no momento relevante, não apenas em termos de uso.

## Riscos do domínio

- dados de entrada incompletos ou desatualizados;
- legislação ambígua, temporal ou dependente de interpretação;
- geometria importada com erros;
- falsa precisão de áreas e unidades;
- otimização que explora lacunas de modelagem;
- alternativas formalmente distintas, mas decisoriamente iguais;
- recomendação econômica sem dados comerciais suficientes.

## Cenários exemplares

**Máxima área:** utiliza mais coeficiente, mas depende de exceção regulatória e aumenta complexidade.

**Menor risco:** mantém folga de gabarito e recuos; entrega menos área, porém reduz dependências.

**Produto compacto:** maximiza unidades e exige mais vagas, circulação e área comum.

**Equilíbrio:** não lidera uma métrica, mas permanece robusto quando premissas variam.

O produto deve permitir comparar esses cenários, testar sensibilidade e preservar por que cada um foi criado.

## Checklist de domínio

- O objetivo está explícito?
- As fontes legais têm data e versão?
- Fatos e premissas estão separados?
- Alternativas representam estratégias distintas?
- Métricas são reproduzíveis?
- Restrições duras estão identificadas?
- Riscos e confiança estão visíveis?
- A recomendação aponta validações e próximo passo?

