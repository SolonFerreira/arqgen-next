# Princípios de UX

## Decision-first

O centro da experiência é uma decisão em evolução. A jornada principal é:

```text
Objetivo → premissas → alternativas → comparação → decisão → evidências
```

O usuário deve sempre entender em que etapa está, o que falta e qual ação move o estudo adiante.

## Papéis das superfícies

> **O chat é a interface de comando e explicação. A decisão acontece no comparador.**

- O **canvas** torna consequências espaciais visíveis.
- O **painel de premissas** mostra o que governa o resultado.
- O **comparador** organiza estratégias, métricas, riscos e escolha.
- O **copiloto** interpreta intenção, executa ações e explica.

Nenhuma superfície deve tentar assumir todas as funções.

## Sensação desejada

O usuário deve sentir clareza, controle, velocidade e capacidade de defender uma escolha. A IA deve reduzir ansiedade ao tornar lacunas e riscos tratáveis.

O usuário não deve sentir que recebeu uma resposta mágica, perdeu autoria ou precisa confiar cegamente.

## Fluxos principais

### Criar uma decisão

Começar por objetivo e contexto mínimo, não por uma tela vazia de configuração. O sistema reconhece arquivos e sugere premissas; o usuário valida o que importa.

### Gerar alternativas

Antes de gerar, mostrar objetivo e restrições dominantes. Depois, apresentar estratégias nomeadas, não “Versão 1, 2 e 3”.

### Comparar

Começar pelas diferenças que mudam a decisão. Permitir descer até fórmula, fonte e geometria. Preservar critérios de ordenação.

### Decidir

Registrar escolha, justificativa, ressalvas, responsáveis por validação e próximo passo. “Ainda não decidir” é um estado válido.

## Incerteza

Incerteza precisa ser visível, localizada e acionável. Use estados como:

- validado;
- informado pelo usuário;
- extraído, aguardando revisão;
- assumido provisoriamente;
- conflitante;
- ausente e bloqueante.

Um banner genérico de “verifique os dados” não é suficiente.

## Estados vazios

Estados vazios devem explicar o próximo avanço:

- sem terreno: importar, desenhar ou informar localização;
- sem legislação: preencher parâmetros ou anexar fonte;
- sem alternativas: escolher objetivo e gerar estratégias;
- sem comparação: selecionar ao menos dois cenários;
- sem recomendação: resolver premissas bloqueantes.

Não usar vazio como vitrine de funcionalidades.

## Erros

Um erro deve dizer o que falhou, que parte da decisão foi afetada, se dados foram preservados e como continuar. Erros de cálculo ou importação nunca podem produzir resultados silenciosamente parciais.

## Complexidade progressiva

O resumo mostra objetivo, recomendação condicionada, diferenças críticas e riscos. O aprofundamento revela premissas, fórmulas, fontes e histórico.

Simplificar não significa esconder. Significa ordenar a informação segundo a decisão.

## Princípios de interação

- Antecipar ações quando a inferência é segura.
- Pedir confirmação quando a consequência é material.
- Criar cenário para mudanças estratégicas.
- Usar edição direta para ajustes locais.
- Manter undo, histórico e comparação.
- Conectar alertas a elementos espaciais e premissas.
- Evitar modais que removam o usuário do contexto.

## Teste

Ao observar qualquer tela, deve ser possível responder: qual decisão está aberta, qual objetivo governa o estudo, quais dados são incertos, quais alternativas existem e qual é o próximo avanço?

