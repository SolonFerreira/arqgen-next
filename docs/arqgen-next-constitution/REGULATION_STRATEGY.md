# Estratégia de Legislação

## Regra constitucional

> **Antes de automatizar legislação, a Arqgen Next deve estruturar, versionar e auditar premissas legais.**

A postura é conservadora porque erro regulatório pode invalidar cenário, comprometer capital e induzir responsabilidade indevida.

## Fase 1 — Input estruturado

O usuário informa ou valida zoneamento, coeficientes, ocupação, permeabilidade, recuos, gabarito, vagas, áreas computáveis, exceções e vigência.

Cada parâmetro registra:

- valor e unidade;
- jurisdição e aplicabilidade;
- fonte;
- data de vigência ou consulta;
- responsável;
- estado de validação;
- observações e exceções.

O produto calcula com esses parâmetros, mas não afirma que são juridicamente completos.

## Fase 2 — Leitura assistida

A IA lê PDFs, tabelas, mapas e anexos e produz rascunho. Cada extração deve citar página, trecho ou região, além de confiança.

Estados:

- extraído, aguardando revisão;
- confirmado pelo usuário;
- validado por especialista;
- conflitante;
- revogado ou desatualizado;
- não aplicável.

Confirmar um valor não confirma a interpretação do conjunto.

## Fase 3 — Base regulatória versionada

A base organiza regras por cidade, zona, tema, vigência e fonte oficial. Mudanças geram novas versões e análise de impacto sobre decisões existentes.

Uma regra não deve ser atualizada no lugar. Decisões antigas preservam a versão usada; o sistema alerta quando há versão posterior.

## Separação epistemológica

- **Fato:** o documento oficial contém determinado texto.
- **Extração:** o sistema identificou um valor ou condição.
- **Premissa:** o estudo adotará determinada interpretação.
- **Inferência:** a regra parece aplicar-se ao lote.
- **Validação:** um responsável confirmou o uso para aquela decisão.

Misturar essas etapas é a principal fonte de falsa confiança.

## Ambiguidade

Quando houver conflito entre texto, mapa, anexo ou prática local:

1. preservar todas as fontes;
2. localizar a divergência;
3. criar cenários regulatórios, se possível;
4. estimar impacto;
5. atribuir risco e responsável;
6. impedir conformidade definitiva;
7. registrar a resolução e sua evidência.

## Exibição de risco legal

O risco deve aparecer no cenário afetado, no comparador e no export. Deve conter regra, causa, impacto, severidade, confiança, validação e responsável.

Evitar alertas vagos como “consulte a legislação”. Preferir:

> “B depende de varanda não computável; impacto máximo estimado de 420 m². Fonte: Lei X, art. Y. Interpretação pendente de consultor local.”

## Fontes

Priorizar fonte oficial primária. Registrar URL ou arquivo, órgão, data e hash. Fontes secundárias podem orientar descoberta, nunca substituir evidência quando a decisão exigir rigor.

## Responsabilidade

O Arqgen organiza, calcula e explica. O profissional competente valida aplicabilidade e assume responsabilidade nos termos legais. Essa fronteira deve estar incorporada em estados, permissões e linguagem, não escondida em rodapé.

