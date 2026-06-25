# Framework de Decisão de Produto

## Regra

> **Não construir features que pareçam inteligentes, mas não melhorem a qualidade decisória.**

Toda proposta começa pela decisão, não pela solução.

## Perguntas obrigatórias

1. Qual decisão melhora?
2. Quem toma essa decisão?
3. Qual incerteza reduz?
4. Qual risco revela ou mitiga?
5. Qual trade-off torna visível?
6. Ajuda a gerar ou comparar alternativas relevantes?
7. Explicita premissas e evidências?
8. Aumenta rastreabilidade?
9. Reduz tempo ou retrabalho?
10. Aumenta confiança sem criar falsa certeza?
11. Fortalece AQG ou a camada semântica?
12. Aproxima o produto de infraestrutura decisória?
13. É defensável ou facilmente copiável?
14. Serve ao operador, ao decisor ou a ambos?
15. Qual métrica de valor mudará?

Propostas sem respostas concretas não entram em priorização.

## Matriz de priorização

Pontuar de 0 a 3:

| Dimensão | 0 | 3 |
|---|---|---|
| Impacto decisório | cosmético | muda decisão crítica |
| Redução de incerteza | nenhuma | remove bloqueio relevante |
| Confiança e rastro | opaco | evidência reproduzível |
| Frequência | rara | presente no fluxo principal |
| Diferenciação | commodity | fortalece ativo próprio |
| Viabilidade | dependência desconhecida | entregável e testável |
| Risco | alto e não mitigado | controlado |

Use:

```text
Prioridade = (impacto + incerteza + confiança + frequência + diferenciação + viabilidade) - risco
```

A fórmula organiza conversa; não substitui julgamento. Violações constitucionais eliminam a proposta independentemente da nota.

## Aprovação

Priorizar quando a feature melhora decisão crítica, cria comparação superior, torna premissas auditáveis, tem ROI observável e fortalece o domínio inicial.

Exemplo bom:

> Comparador com métricas, riscos, premissas e explicação vinculada.

Ele serve operação e comitê, reduz incerteza e cria rastro.

## Rejeição ou adiamento

Rejeitar quando a feature é visualmente impressionante, genérica, desconectada de massa/legislação, aumenta complexidade sem confiança, depende de dados inexistentes ou empurra o produto para CAD/BIM horizontal.

Exemplo ruim:

> “Gerar massa futurista em 3D” sem métricas, objetivo ou explicação.

Ela produz demo, não decisão.

## Processo

1. Escrever um decision brief de uma página.
2. Identificar usuário, momento e evidência do problema.
3. Formular hipótese mensurável.
4. Avaliar riscos técnicos, legais e de posicionamento.
5. Prototipar a menor mudança decisória completa.
6. Testar com caso real, não apenas preferência visual.
7. Medir comportamento e qualidade.
8. Decidir escalar, revisar ou remover.

## Decision brief

Deve conter:

- decisão-alvo;
- situação atual;
- usuário e comprador;
- hipótese;
- alternativa mais simples;
- premissas;
- métricas;
- riscos;
- impacto em domínio, IA e exportações.

## Anti-cosmética

Uma melhoria visual é válida quando reduz erro, tempo de interpretação ou ambiguidade. “Mais premium” não é resultado suficiente. Pergunte qual comportamento ou decisão melhora e como será observado.

## Critério final

Se a proposta não puder explicar seu lugar no fluxo `Objetivo → Premissas → Alternativas → Comparação → Decisão → Evidências`, ela provavelmente não pertence ao produto.

