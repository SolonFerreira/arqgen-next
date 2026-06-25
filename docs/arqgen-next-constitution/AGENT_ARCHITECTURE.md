# Arquitetura de Agentes

## Princípio

Agentes são papéis especializados sobre um domínio compartilhado, não personagens independentes. Cada execução usa inputs versionados, produz output estruturado, cita evidências e respeita limites de autoridade.

## Intake Agent

- **Responsabilidade:** entender objetivo, contexto, público e lacunas.
- **Inputs:** pedido, arquivos e decisão existente.
- **Outputs:** briefing estruturado, perguntas bloqueantes e plano de ingestão.
- **Limite:** não inventa parâmetros nem recomenda cenário.
- **Risco:** questionário excessivo; deve inferir contexto de baixo risco.

## Site Parser Agent

- **Responsabilidade:** interpretar localização, lote e arquivos espaciais.
- **Inputs:** DWG, DXF, IFC, RVT, KMZ, imagens e metadados.
- **Outputs:** `Site`, `Parcel`, objetos AQG, alertas de unidade e precisão.
- **Limite:** extração não equivale a levantamento validado.
- **Risco:** escala, coordenadas ou geometria incorreta.

## Regulation Structurer Agent

- **Responsabilidade:** converter fontes legais em parâmetros estruturados.
- **Inputs:** leis, quadros, mapas e dados informados.
- **Outputs:** rascunho de `RegulationSet`, evidências e ambiguidades.
- **Limite:** não emite parecer jurídico.
- **Risco:** usar texto revogado, exceção fora de contexto ou mapa errado.

## Assumption Auditor Agent

- **Responsabilidade:** verificar lacunas, conflitos e sensibilidade.
- **Inputs:** objetivo, regras, premissas e histórico.
- **Outputs:** inconsistências, premissas críticas e validações.
- **Limite:** não altera premissas sem registro.
- **Risco:** bloquear o fluxo por questões irrelevantes.

## Massing Generator Agent

- **Responsabilidade:** gerar estratégias espaciais distintas.
- **Inputs:** site, constraints, premissas e objetivos.
- **Outputs:** `Scenario` e `MassingAlternative` com intenção explícita.
- **Limite:** não declara viabilidade ou preferência.
- **Risco:** variações cosméticas ou exploração de falha na regra.

## Scenario Evaluator Agent

- **Responsabilidade:** calcular métricas e comparar cenários.
- **Inputs:** alternativas, regras, premissas e motores determinísticos.
- **Outputs:** métricas, deltas, violações e sensibilidade.
- **Limite:** não esconde dados ausentes em score.
- **Risco:** falsa comparabilidade por bases diferentes.

## Risk Analyst Agent

- **Responsabilidade:** identificar riscos legais, técnicos e de dados.
- **Inputs:** toda a decisão e evidências.
- **Outputs:** `Risk`, severidade, impacto, mitigação e responsável.
- **Limite:** não substitui especialista.
- **Risco:** fadiga de alerta ou severidade não calibrada.

## Recommendation Agent

- **Responsabilidade:** sugerir caminho segundo objetivo e critérios.
- **Inputs:** cenários avaliados, riscos, pesos e confiança.
- **Outputs:** `Recommendation` condicionada.
- **Limite:** não cria `UserDecision`.
- **Risco:** esconder conflito em score ou extrapolar evidência.

## Explanation Agent

- **Responsabilidade:** traduzir análise para públicos técnico e executivo.
- **Inputs:** entidades estruturadas e público-alvo.
- **Outputs:** explicações ligadas a evidências.
- **Limite:** não modifica cálculo nem remove ressalva.
- **Risco:** narrativa convincente além da força dos dados.

## Export Agent

- **Responsabilidade:** compor outputs versionados.
- **Inputs:** snapshot, template, público e finalidade.
- **Outputs:** relatório, quadro, memorial ou export técnico.
- **Limite:** não recalcula nem cria conclusões.
- **Risco:** documento ficar desatualizado ou sem contexto.

## Orquestração

O fluxo típico é:

```text
Intake → Site + Regulation → Assumption Audit
→ Massing Generation → Evaluation → Risk
→ Recommendation → Explanation → Export
```

Loops são esperados: risco pode pedir nova premissa; avaliação pode solicitar nova alternativa. Um orquestrador controla dependências, orçamento, permissões e parada.

## Regras universais

Todo agente deve:

- declarar incerteza;
- citar premissas e evidências;
- produzir schema validável;
- registrar versão e execução;
- recusar conclusão fora de autoridade;
- preservar responsabilidade humana;
- não tratar output de outro agente como verdade sem estado de validação.

