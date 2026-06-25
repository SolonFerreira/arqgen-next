# Estratégia AQG

## Tese

AQG deve evoluir para uma camada semântica proprietária do ambiente construído. Não basta ser um formato de arquivo interno.

> O diferencial não é usar IA sobre arquivos. É transformar arquivos em uma representação confiável para decisão.

## Por que arquivos não bastam

DWG, DXF, IFC, RVT e KMZ carregam geometrias e informações valiosas, mas têm semântica, qualidade, unidades e convenções diferentes. Um agente que opera diretamente sobre cada formato repete interpretação, perde contexto e torna auditoria difícil.

AQG normaliza sem apagar a origem.

## O que deve representar

- geometria e sistema de coordenadas;
- objetos, tipos e propriedades;
- pavimentos, torres, ambientes e fachadas;
- relações espaciais: contém, toca, distancia, acessa, sombreia;
- áreas, volumes e métodos de cálculo;
- restrições e vínculos regulatórios;
- premissas e cenários;
- proveniência, confiança e estado de validação;
- correspondência com elementos do arquivo-fonte.

## Relação com formatos

- **DWG/DXF:** preservar layers, blocos, unidades e entidades; inferir semântica com confiança.
- **IFC/RVT:** mapear objetos e relações, preservando identificadores e propriedades.
- **KMZ/geoespacial:** preservar CRS, localização, polígonos e contexto territorial.
- **Imagens/PDF:** registrar extrações como evidências, não geometria validada.

Importadores e exportadores são adaptadores. O domínio não deve depender da estrutura acidental de um formato.

## Como ajuda agentes

Agentes podem consultar “torres dentro do lote”, “constraints que afetam a fachada norte” ou “objetos alterados entre cenários” sem reprocessar arquivos brutos.

O AQG permite:

- ferramentas determinísticas para geometria;
- contexto seletivo para modelos;
- edição com validação de schema;
- comparação de cenários;
- explicação ligada a objetos;
- reprocessamento e auditoria.

## Identidade e versionamento

Objetos precisam de IDs estáveis, versões e proveniência. Transformações registram origem, confiança e perdas. Relações derivadas devem indicar algoritmo e versão.

O modelo deve separar:

- elemento importado;
- elemento inferido;
- elemento gerado;
- elemento editado pelo usuário;
- propriedade calculada.

## Defensabilidade

O ativo não é a extensão `.aqg`. É o conjunto de ontologia, conversores, regras, dados de correção, avaliações e histórico de decisões que torna a representação confiável no contexto brasileiro.

Essa camada melhora com casos reais e permite trocar modelos de IA sem perder conhecimento de domínio.

## Riscos

- criar schema universal e complexo cedo demais;
- acoplar AQG ao protótipo visual atual;
- perder fidelidade ao normalizar;
- não versionar ontologia;
- confundir inferência com dado de origem;
- tornar formato fechado que impede interoperabilidade;
- investir em infraestrutura sem validar casos decisórios.

## Princípio de evolução

Começar com o subconjunto necessário ao estudo de potencial. Expandir quando uma decisão real exigir nova semântica. Cada campo deve responder quais agentes, regras ou explicações habilita.

