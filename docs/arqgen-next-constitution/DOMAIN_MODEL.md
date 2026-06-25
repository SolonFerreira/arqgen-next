# Modelo de Domínio

## Princípio

O domínio deve representar decisões, não apenas documentos e geometria. Identificadores, versões, autoria, timestamps, fonte e estado de validação são campos transversais.

## Entidades

### Project

Contêiner organizacional. Campos: nome, organização, participantes, localização geral e status. Relaciona várias `Decision`. Existe para colaboração e governança, não como unidade de análise.

### Decision

Unidade central. Campos: título, pergunta, objetivo, estado, responsáveis, prazo e decisão final. Agrega site, regras, premissas, cenários, recomendação, evidências e exports.

### Site

Contexto territorial. Campos: endereço, coordenadas, município, sistema de referência e fontes. Possui um ou mais `Parcel`.

### Parcel

Geometria cadastral ou de estudo. Campos: polígono, área, confrontações, topografia, precisão e fonte. Pode divergir entre fontes; divergências são riscos, não sobrescritas.

### RegulationSet

Conjunto regulatório versionado e datado. Campos: jurisdição, vigência, zoneamento, fontes, estado de validação. Contém `Constraint` regulatórias.

### AssumptionSet

Conjunto versionado de hipóteses de produto e análise. Campos: tipologia, mix, vagas, eficiência, tolerância a risco e hipóteses comerciais. Cada item registra origem e impacto.

### Scenario

Estratégia comparável. Campos: nome, intenção, objetivo secundário, origem, status e versões usadas. Agrega uma `MassingAlternative`, métricas e riscos.

### MassingAlternative

Representação espacial de implantação e volumes. Campos: objetos AQG, torres, pavimentos, dimensões, acessos e áreas. Existe como hipótese geométrica dentro de um cenário.

### Constraint

Limite ou regra. Campos: tipo, expressão, severidade, origem, aplicabilidade, tolerância e validação. Pode ser duro, preferencial ou informativo.

### Metric

Valor calculado. Campos: nome, valor, unidade, fórmula, inputs, versão do motor e precisão. Pertence a cenário e pode referenciar evidências.

### Risk

Evento ou condição incerta. Campos: descrição, categoria, probabilidade qualitativa, impacto, severidade, cenários afetados, mitigação, responsável e estado.

### Recommendation

Conclusão condicionada. Campos: objetivo, critérios, pesos, cenário sugerido, alternativas, justificativa, confiança, riscos e validações. É produzida por versão e nunca equivale a `UserDecision`.

### Evidence

Base verificável. Campos: tipo, fonte, localização, trecho ou objeto, data, hash e estado. Pode sustentar fatos, premissas, constraints, métricas e recomendações.

### Export

Snapshot distribuível. Campos: tipo, público, versão da decisão, cenários incluídos, data, autor e aviso de pendências. Deve ser regenerável.

### AgentRun

Execução auditável. Campos: agente, versão, modelo, inputs referenciados, ferramentas, outputs, custo, latência, confiança, erros e revisões.

### UserDecision

Registro humano de avanço, descarte ou adiamento. Campos: escolha, justificativa, ressalvas, aprovadores, data e próximo passo. Pode discordar da recomendação sem apagá-la.

## Relações principais

```text
Project 1─N Decision
Decision 1─1 Site
Site 1─N Parcel
Decision 1─N RegulationSet
Decision 1─N AssumptionSet
Decision 1─N Scenario
Scenario 1─1 MassingAlternative
Scenario 1─N Metric
Scenario N─N Constraint
Scenario 1─N Risk
Decision 1─N Recommendation
Decision 1─N Evidence
Decision 1─N AgentRun
Decision 1─N Export
Decision 1─N UserDecision
```

## Invariantes

- cenário aponta para versões específicas de regras e premissas;
- métrica não existe sem fórmula ou método;
- recomendação não existe sem objetivo e critérios;
- export aponta para snapshot imutável;
- execução de agente não promove automaticamente extração a fato;
- decisão humana preserva recomendação e contexto da época;
- fonte ambígua não pode ser marcada como validada sem ator responsável.

## Exemplo

Uma decisão de potencial residencial usa o `Parcel` do levantamento, `RegulationSet v3` validado pelo consultor e `AssumptionSet v5` de produto. O cenário “Menor risco” contém uma massa, métricas calculadas e dois riscos. A recomendação favorece esse cenário com confiança média. O comitê registra uma `UserDecision` de avançar, condicionada à validação de vagas.

