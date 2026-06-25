# Constituição do Arqgen Next

## Propósito

Esta pasta transforma a visão fundadora do Arqgen Next em regras utilizáveis por produto, design, engenharia, dados, IA e operação. Ela não descreve apenas o que o produto faz hoje. Define como decidir o que ele deve se tornar.

O [`PRODUCT_MANIFESTO.md`](../../PRODUCT_MANIFESTO.md) da raiz continua sendo a referência canônica e mais concisa de produto. Esta constituição o detalha. Se houver conflito, vale o manifesto da raiz; se a tensão permanecer, ela deve ser registrada e levada aos fundadores, não resolvida silenciosamente por conveniência.

## Regra de ouro

> **Geramos para avaliar. Avaliamos para decidir.**

A unidade principal da Arqgen Next é a decisão, não o arquivo. Toda funcionalidade deve melhorar uma decisão, reduzir uma incerteza, revelar um risco ou tornar um trade-off mais claro.

## Como usar

Antes de propor produto, UX, copy ou interação, leia:

1. [`PRODUCT_MANIFESTO.md`](PRODUCT_MANIFESTO.md)
2. [`PRODUCT_VISION.md`](PRODUCT_VISION.md)
3. [`STRATEGIC_POSITIONING.md`](STRATEGIC_POSITIONING.md)
4. [`PRODUCT_DECISION_FRAMEWORK.md`](PRODUCT_DECISION_FRAMEWORK.md)

Para trabalho especializado:

- Produto e estratégia: [`DECISION_DOMAIN.md`](DECISION_DOMAIN.md), [`USER_AND_BUYER.md`](USER_AND_BUYER.md), [`ROADMAP_PHILOSOPHY.md`](ROADMAP_PHILOSOPHY.md) e [`METRICS.md`](METRICS.md).
- IA: [`AI_PRINCIPLES.md`](AI_PRINCIPLES.md), [`COPILOT_BEHAVIOR.md`](COPILOT_BEHAVIOR.md) e [`AGENT_ARCHITECTURE.md`](AGENT_ARCHITECTURE.md).
- UX e design: [`UX_PRINCIPLES.md`](UX_PRINCIPLES.md), [`INTERFACE_MODEL.md`](INTERFACE_MODEL.md), [`DESIGN_PRINCIPLES.md`](DESIGN_PRINCIPLES.md) e [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md).
- Engenharia e dados: [`ENGINEERING_PRINCIPLES.md`](ENGINEERING_PRINCIPLES.md), [`DOMAIN_MODEL.md`](DOMAIN_MODEL.md), [`AQG_STRATEGY.md`](AQG_STRATEGY.md) e [`TRUST_AND_AUDITABILITY.md`](TRUST_AND_AUDITABILITY.md).
- Regulação e outputs: [`REGULATION_STRATEGY.md`](REGULATION_STRATEGY.md) e [`EXPORTS_AND_EXECUTIVE_OUTPUTS.md`](EXPORTS_AND_EXECUTIVE_OUTPUTS.md).
- Limites e cultura: [`WHAT_WE_WILL_NOT_BUILD.md`](WHAT_WE_WILL_NOT_BUILD.md) e [`FOUNDER_LETTER.md`](FOUNDER_LETTER.md).

## Público

Esta documentação serve a fundadores, arquitetos, urbanistas, incorporadores, designers, engenheiros de software, especialistas regulatórios, product managers e agentes de IA. Cada leitor pode entrar por seu domínio, mas não deve tomar decisões sem compreender a tese central.

## Protocolo para agentes de IA

Antes de agir, o agente deve:

1. identificar qual decisão será afetada;
2. distinguir fatos do repositório, premissas do pedido e inferências próprias;
3. consultar o documento especializado;
4. explicitar qualquer conflito com esta constituição;
5. preferir uma solução que torne alternativas, critérios e riscos visíveis;
6. não inventar certeza, dados regulatórios ou validação técnica;
7. atualizar documentação quando uma decisão estrutural aprovada mudar o sistema.

Agentes não devem usar a constituição como repertório de frases. Devem convertê-la em comportamento observável.

## Hierarquia de decisão

Em ordem:

1. segurança, responsabilidade técnica e legislação aplicável;
2. instrução explícita do usuário ou fundador;
3. manifesto canônico da raiz;
4. esta constituição;
5. evidência validada de usuários e mercado;
6. convenções de produto e implementação.

Conveniência técnica, padrões genéricos de SaaS e impacto visual não justificam contrariar os níveis superiores.

## Critério de manutenção

Mudanças nesta pasta devem registrar o motivo, a evidência e os documentos impactados. Evite duplicar uma regra em muitos arquivos; prefira um documento proprietário e links relativos. Princípios duradouros pertencem aqui. Estado de implementação pertence ao `CLAUDE.md`, issues ou documentação técnica operacional.

