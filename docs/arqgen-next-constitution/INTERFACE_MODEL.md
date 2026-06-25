# Modelo de Interface

## Unidade estrutural

A unidade principal é `Decision`, por exemplo “Terreno Rua X — Potencial Residencial MCMV”. Um projeto pode conter decisões relacionadas; uma decisão contém objetivo, terreno, regras, premissas, cenários, métricas, riscos, recomendação, evidências e exports.

## As quatro áreas

### Canvas espacial

É o lugar onde o raciocínio ganha forma. Mostra lote, massas, recuos, acessos, restrições, cotas e diferenças espaciais. Deve permitir selecionar evidências e compreender por que uma métrica mudou.

Não é um viewer decorativo nem um CAD completo. Ferramentas de edição existem na medida em que ajudam a investigar hipóteses.

### Painel de premissas

Agrupa objetivo, legislação, produto, vagas, tipologias e pesos. Cada item exibe estado, fonte, versão e impacto. Alterações materiais criam uma revisão ou cenário e acionam recálculo explícito.

### Comparador de cenários

É o centro da decisão. Exibe alternativas como estratégias nomeadas, com métricas, riscos, dependências e ranking por objetivo. Deve oferecer lado a lado, deltas, sensibilidade e ligação com o canvas.

### Copiloto

Recebe comandos, explica o estado e sugere ações. Pode aparecer como composição contextual, não necessariamente como painel permanente. Sua saída deve atualizar entidades estruturadas e destacar efeitos nas outras áreas.

## Hierarquia visual

1. decisão e objetivo atuais;
2. estado de confiança e bloqueios;
3. alternativas e diferença dominante;
4. evidência espacial;
5. controles e detalhes.

O conteúdo do projeto deve ter mais presença que a moldura do software.

## Navegação

A navegação primária acompanha decisões recentes e projetos. Dentro da decisão, use modos orientados ao trabalho:

- **Entender:** terreno, fontes e premissas;
- **Explorar:** geração e edição de alternativas;
- **Comparar:** métricas, riscos e sensibilidade;
- **Decidir:** recomendação, registro e exportação.

Esses modos podem compartilhar o mesmo canvas e contexto; não precisam virar páginas isoladas.

## Componentes principais

- cabeçalho da decisão;
- indicador de completude e confiança;
- canvas 2D/3D;
- inspetor contextual;
- lista de premissas e fontes;
- cartões de estratégia;
- tabela comparativa;
- mapa de riscos;
- explicação vinculada;
- histórico de revisões;
- registro de decisão;
- centro de exportação.

## Histórico

O histórico deve responder: o que mudou, por quem, por quê, a partir de qual versão e com qual efeito. Versões representam estratégias e revisões, não cópias sem significado.

Eventos relevantes incluem mudança de premissa, importação, execução de agente, geração, cálculo, recomendação e decisão humana.

## Evidências

Conclusões devem ligar-se a fontes, trechos, objetos, cálculos ou ações. Ao selecionar uma evidência no texto, o canvas ou painel deve localizar sua contraparte quando aplicável.

## Exportações

Exports são vistas versionadas da decisão, nunca arquivos órfãos. Devem registrar cenário, premissas, data, confiança e pendências. Ver [`EXPORTS_AND_EXECUTIVE_OUTPUTS.md`](EXPORTS_AND_EXECUTIVE_OUTPUTS.md).

## Estrutura de referência

```text
Decision
├── Objective
├── Site + Source Files
├── RegulationSet
├── AssumptionSet
├── Scenarios
│   ├── Estratégia A
│   ├── Estratégia B
│   └── Estratégia C
├── Metrics + Risks
├── Recommendation
├── UserDecision
├── Evidence
└── Exports
```

