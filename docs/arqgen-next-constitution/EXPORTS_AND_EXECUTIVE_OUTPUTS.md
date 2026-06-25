# Exports e Outputs Executivos

## Papel

Um output não é o fim burocrático do fluxo. É a forma portátil de uma decisão, preparada para um público e finalidade. Deve preservar contexto suficiente para não transformar análise condicionada em afirmação absoluta.

## Relatório executivo

Para diretoria e comitê. Deve conter:

- pergunta e objetivo;
- resumo do terreno;
- alternativas comparadas;
- recomendação condicionada;
- trade-off dominante;
- riscos e pendências;
- confiança;
- decisão solicitada e próximo passo.

Deve ser curto, mas nunca omitir uma ressalva material.

## Quadro comparativo

Apresenta cenários em bases equivalentes, com métricas, deltas, restrições, risco e aderência ao objetivo. Deve declarar unidades, critérios e versão.

## Memorial de premissas

Lista legislação, produto, vagas, áreas, eficiência, fontes, responsáveis e estados de validação. É a base para revisão técnica e continuidade.

## Justificativa para comitê

Explica por que uma alternativa merece avançar, quais opções foram descartadas, segundo quais critérios e sob quais condições. Deve separar recomendação do sistema e decisão humana.

## Alertas de risco

Output focado em riscos críticos, impacto, cenários afetados, mitigação, responsável e prazo. Não usar matriz de risco como substituto de texto específico.

## Exportação técnica

Pode incluir dados estruturados, geometria, tabelas, memorial de cálculo e integração CAD/BIM. Deve preservar unidades, coordenadas, IDs AQG, versão e perdas de conversão.

## Exportação visual

Pranchas, imagens e apresentações ajudam a compreender implantação e diferenças. Devem conter legenda, escala quando aplicável, cenário, data e relação com métricas. Realismo visual não deve sugerir nível de desenvolvimento inexistente.

## Relação com a decisão

Todo export referencia:

- `Decision` e snapshot;
- objetivo;
- `RegulationSet` e `AssumptionSet`;
- cenários incluídos;
- data e autor;
- estado de validação;
- pendências;
- finalidade e público.

Se uma premissa crítica mudar, o export anterior permanece histórico e recebe estado “desatualizado”, sem ser alterado.

## Templates

Templates são por finalidade, não apenas formato:

- triagem de terreno;
- revisão técnica;
- comitê de investimento;
- consulta a especialista;
- handoff para projeto;
- registro de descarte.

Cada template define conteúdo obrigatório e nível de detalhe. Branding não pode remover rastreabilidade.

## Linguagem

Preferir:

> “Recomendação: avançar C para validação, condicionada à confirmação da regra de vagas.”

Evitar:

> “C é a solução ideal.”

## Checklist de publicação

- O objetivo está explícito?
- Cenários usam a mesma base?
- Premissas críticas e fontes aparecem?
- A recomendação é condicionada?
- Riscos e confiança estão visíveis?
- Data e versões estão registradas?
- O nível visual corresponde à maturidade?
- Há responsável e próximo passo?

