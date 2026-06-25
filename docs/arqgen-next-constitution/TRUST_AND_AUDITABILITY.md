# Confiança e Auditabilidade

## Princípio

Confiança não é o usuário acreditar na IA. É o usuário conseguir compreender, verificar, contestar e corrigir o sistema.

## Cadeia de evidência

Uma conclusão deve permitir navegar por:

```text
Recomendação
→ critérios e objetivo
→ métricas e riscos
→ cálculos e regras
→ premissas e fatos
→ evidências e fontes
```

Se um elo não existir, a conclusão deve declarar a limitação.

## Logs

Registrar eventos relevantes:

- ator e organização;
- data e timezone;
- ação;
- inputs e versões;
- ferramentas, modelo e agente;
- output e validação;
- erro, retry e fallback;
- motivo informado pelo usuário;
- objetos afetados.

Logs de auditoria são imutáveis e acessíveis conforme permissão. Não devem conter segredos ou dados desnecessários.

## Rastreio de premissas

Cada premissa possui origem, responsável, estado, versão e cenários dependentes. Quando muda, o sistema mostra quais métricas, recomendações e exports ficam desatualizados.

Premissas críticas merecem análise de sensibilidade e confirmação antes da decisão.

## Cálculos explicáveis

Toda métrica deve expor método, unidade, inputs, arredondamento e versão do motor. Para cálculos complexos, apresentar explicação humana e detalhes reproduzíveis.

Modelos generativos não devem realizar aritmética crítica quando existe motor determinístico.

## Níveis de confiança

Confiança é calculada por qualidade e concordância das fontes, completude, validação, estabilidade do método e força da inferência. Deve ser localizada: um cenário pode ter geometria com confiança alta e interpretação legal baixa.

Não produzir um “87% confiante” sem calibração demonstrável.

## Revisão humana

Definir pontos de revisão proporcionais ao risco:

- confirmação de geometria e unidade importadas;
- validação de parâmetros legais;
- aprovação de premissas críticas;
- revisão de recomendação;
- aprovação de export para uso externo.

O sistema registra quem revisou e o que foi revisado. Um clique em “aprovar tudo” não é revisão adequada.

## Contestação e correção

O usuário deve poder corrigir dado, anexar evidência, discordar de recomendação e registrar justificativa. A correção não apaga o resultado anterior; cria nova versão e permite medir falhas.

## Export auditável

Todo output inclui versão da decisão, data, fontes, premissas críticas, cenários, confiança, pendências e responsável. Deve ser possível reproduzir o documento a partir do snapshot.

## Alertas

Alertas devem ser priorizados por impacto e ação. Um risco bloqueante impede linguagem conclusiva. Um aviso informativo não deve competir visualmente com ele.

## Anti-padrões

- caixa-preta com “explicação” gerada depois;
- trilha baseada só em logs de texto;
- confiança decorativa;
- fonte sem vigência;
- edição que reescreve histórico;
- export sem ressalvas;
- disclaimer universal;
- auditoria disponível apenas para administradores técnicos.

## Teste

Uma pessoa competente, sem acesso à conversa original, consegue reconstruir por que a decisão foi recomendada e quais incertezas permaneciam? Se não, o sistema ainda não é auditável.

