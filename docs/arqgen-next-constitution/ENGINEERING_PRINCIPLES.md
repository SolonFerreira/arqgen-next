# Princípios de Engenharia

## Objetivo

A arquitetura deve tornar cada decisão reproduzível, evolutiva e auditável. Velocidade de entrega importa, mas não pode depender de misturar fonte, cálculo e recomendação em uma caixa impossível de revisar.

## Princípios

### Modularidade por responsabilidade

Separar ingestão, normalização, camada semântica, regras, geração, avaliação, recomendação, explicação, visualização e exportação. Interfaces entre camadas devem usar contratos versionados.

### Auditabilidade por padrão

Todo resultado relevante registra inputs, versões, regras, modelo, prompt ou política, data, ator, execução e artefatos. Logs técnicos e trilha de decisão são relacionados, mas não idênticos.

### Estado imutável e derivação

Premissas, regras e cenários publicados devem receber versões. Alterações criam nova revisão; métricas são derivadas e podem ser reprocessadas. Nunca sobrescrever silenciosamente a base de uma decisão já exportada.

### Determinismo onde importa

Cálculos geométricos, métricas e regras duras devem ser implementados por funções testáveis. LLMs podem estruturar, explicar e propor, mas não devem substituir um cálculo determinístico disponível.

### Interoperabilidade

Arquivos CAD/BIM e geoespaciais são entradas e saídas. O núcleo trabalha sobre representação semântica própria, preservando referência ao original, unidades, sistema de coordenadas e perdas de conversão.

### Segurança

Aplicar isolamento por organização e projeto, menor privilégio, criptografia, retenção explícita e controle de exportação. Dados de clientes não entram em treinamento sem consentimento inequívoco.

## Múltiplos modelos de IA

Usar uma camada de orquestração que separe capacidades de fornecedores. Contratos de agente devem definir input, output estruturado, ferramentas permitidas, política de retry, avaliação e fallback.

Evitar:

- lógica de domínio dentro de prompts proprietários;
- dependência de formato exclusivo de um modelo;
- ausência de suíte de avaliação comparável;
- troca automática de modelo sem registrar qual executou.

## Testes

A pirâmide inclui:

- unidade para geometria, regras e métricas;
- contrato para schemas e integrações;
- golden tests para importação e exportação;
- avaliação de agentes com casos representativos e adversariais;
- integração ponta a ponta por decisão;
- testes de migração e reprocessamento;
- testes de autorização e vazamento entre tenants.

Saídas probabilísticas são avaliadas por critérios: completude, fidelidade a evidências, calibração de confiança, segurança e utilidade decisória.

## Observabilidade

Medir latência, custo, falhas, drift, taxa de revisão humana, divergência entre modelos e impacto no fluxo. Uma execução deve poder ser reconstruída sem expor conteúdo sensível em logs operacionais.

## Reprocessamento

Quando regra, modelo ou parser muda, o sistema deve saber quais decisões foram afetadas e permitir reprocessamento controlado. Resultados antigos continuam acessíveis e identificados como produzidos por versão anterior.

## Anti-padrões

- uma única tabela de “projetos” com blobs opacos;
- cálculos apenas no cliente;
- resultado de LLM gravado como fato;
- prompt como única documentação da regra;
- export sem snapshot de premissas;
- edição destrutiva de legislação;
- microserviços prematuros sem fronteiras reais;
- eventos sem idempotência.

## Critério arquitetural

Uma decisão técnica é boa quando reduz o custo de explicar, reproduzir e evoluir uma decisão do produto. Complexidade que não melhora esses atributos deve ser adiada.

