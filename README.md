# claude-para-product-owner

Projeto com agentes e código de exemplo para uso do Claude Code por Product
Owners. É o material do curso **Claude Code para Product Owners** (8 horas),
construído em torno do projeto fictício **Consulta Fácil** — agendamento na
rede municipal de saúde de Vila Nova do Recôncavo.

O curso pressupõe domínio de INVEST, SPIDR, Gherkin, DoR/DoD e RICE. Nada disso
é ensinado aqui. O objeto de estudo é o comportamento do agente quando aplicado
a esse trabalho, e como controlá-lo por escrito.

---

## Conteúdo do repositório

```
projeto-consulta-facil-INICIAL/   o que é distribuído: agentes v0, CLAUDE.md com "NÃO fazer" vazia
projeto-consulta-facil-GABARITO/  kit completo, liberado depois do exercício final
agentes/                          os 12 subagentes de PO, prontos para .claude/agents/
Curso-PO-Claude-Code.pptx         77 slides
EMENTA-*.md  ROTEIRO-*.md         ementa e roteiro das 13 videoaulas
COMO-CONDUZIR.md                  guia do instrutor
ONDE-RODA-O-QUE.md                chat vs. Cowork vs. Claude Code
AVALIACAO-DOS-AGENTES.md          autópsia de 7 agentes de mercado
```

---

## A cadeia de arquivos

Cada prompt abaixo consome o arquivo do passo anterior e escreve o do próximo.
Quando um artefato intermediário não é escrito, o agente seguinte trabalha
sobre o que você lembrou de colar, e não sobre o que foi decidido.

| Arquivo | Quem escreve |
|---|---|
| `backlog/backlog-bruto.md` | chega até você |
| `backlog/triagem.md` | `backlog-triage` |
| `epicos/E1-fatiamento.md` | `epic-splitter` |
| `historias/CF-###.md` | `story-writer` + `acceptance-criteria` |
| `backlog/rice-input.csv` | `backlog-prioritizer` |
| `backlog/ordenacao-vigente.md` | `backlog-prioritizer` |
| `releases/R1.md` | `release-planner` |
| o e-mail à Secretária | `stakeholder-comms` |

---

## Os prompts

Todos usam o mesmo molde de quatro blocos: **contexto**, **tarefa**,
**restrições** e **critério de pronto**. As restrições não são estilo: cada uma
existe contra um comportamento específico e observável do modelo.

Três regras se repetem e valem para qualquer prompt daqui:

1. **Todo número cita o arquivo de onde veio**, ou vira `[A CONFIRMAR — fonte]`.
2. **O que ele não sabe vira pergunta declarada**, nunca suposição silenciosa.
3. **O entregável é um arquivo**, não uma resposta no terminal.

| Prompt | Agente | Slide |
|---|---|---|
| [Prompting estruturado](#110--prompting-estruturado) | o molde | 19 |
| [SPIDR uma lente por vez](#24--spidr-uma-lente-por-vez) | `epic-splitter` | 25 |
| [Decomposição](#26--epic-splitter--decomposição) | `epic-splitter` | 27 |
| [Registrar a escolha](#261--epic-splitter--registrar-a-escolha) | `epic-splitter` | 28 |
| [Triagem do backlog](#281--backlog-triage--triagem-do-backlog-bruto) | `backlog-triage` | 31 |
| [Escrever a história](#321--story-writer--escrever-a-história) | `story-writer` | 36 |
| [Critérios de aceite](#38--acceptance-criteria--critérios-de-aceite) | `acceptance-criteria` | 42 |
| [Crítica adversarial](#391--story-critic--crítica-adversarial) | `story-critic` | 44 |
| [Priorização](#421--backlog-prioritizer--priorização) | `backlog-prioritizer` | 50 |
| [Plano de release](#451--release-planner--plano-de-release) | `release-planner` | 54 |
| [A conversa difícil](#461--stakeholder-comms--a-conversa-difícil) | `stakeholder-comms` | 56 |
| [Criar um agente](#531--criar-um-agente-a-partir-de-um-defeito-observado) | meta | 62 |
| [O fluxo inteiro](#55--o-fluxo-inteiro--um-pedido-seis-agentes) | `product-owner` | 64 |

### 1.10 · Prompting estruturado

*Slide 19. O molde de quatro blocos. Todos os prompts abaixo são instâncias dele.*

```
[CONTEXTO]
Épico E3 (lembretes) do Consulta Fácil. Persona P2
(Jefferson). Outcome O1: absenteísmo 31% -> 15%.
Evidência em docs/pesquisa/entrevistas.md (E03, E05).

[TAREFA]
Escrever 1 história para a fatia "lembrete D-1 com
confirmação em um toque".

[RESTRIÇÕES]
- Formato do PRODUCT.md, seção 8
- Português, linguagem simples
- Sem decisão de implementação no texto
- Todo número com fonte ou [A CONFIRMAR]

[CRITÉRIO DE PRONTO]
- Passa nos 6 testes INVEST
- Tem "fora de escopo" com ao menos 1 item
- Lista as premissas que você assumiu
```

### 2.4 · SPIDR uma lente por vez

*Slide 25. Ele aplica só a lente Path por padrão. Este prompt força as cinco e devolve conjuntos separados.*

```
> epic-splitter: aplique SPIDR ao E1, uma lente por vez, e me devolva CINCO conjuntos separados.
  Para cada lente: no máximo 4 fatias, e diga qual conjunto você descartaria e por quê.
  Não escolha por mim. A escolha do conjunto é minha.
```

### 2.6 · `epic-splitter` — decomposição

*Slide 27. Duas propostas, nunca uma: uma só vira âncora e você para de escolher.*

```
[CONTEXTO]
Épico E1 (agendamento), arquivo epicos/E1-agendamento.md.
Restrições em PRODUCT.md secoes 6 e 11.
Estimativa grossa do time: 45-60 pontos.
Velocidade: 26 pts/sprint (sprints 11-13, fonte Jira).

[TAREFA]
epic-splitter: propor DUAS alternativas de fatiamento,
com lentes SPIDR diferentes.

[RESTRIÇÕES]
- Máximo 8 fatias por proposta
- Toda fatia passa no teste da sprint review
- NÃO estimar pontos (é do time)
- NÃO inventar regra de negócio para justificar corte
- As 4 perguntas em aberto do E1 devem aparecer
  como risco, não ser resolvidas por você

[CRITÉRIO DE PRONTO]
- Qual fatia é lançável sozinha
- O que cada proposta deixa de fora
- As premissas que você assumiu
```

### 2.6.1 · `epic-splitter` — registrar a escolha

*Slide 28. Ele transcreve a sua decisão. Ele não justifica a sua decisão.*

```
> epic-splitter: gravei a escolha.
  Escreva epicos/E1-fatiamento.md com:

  - as fatias da Proposta A, na ordem que eu ditei
  - o que ficou de fora, com o motivo QUE EU DEI
  - as premissas e as perguntas em aberto que
    continuam sem resposta

  NÃO escreva as histórias.
  NÃO invente justificativa de valor: onde eu não
  dei motivo, escreva [PO NÃO JUSTIFICOU].

# Depois, uma fatia por vez:
> story-writer: escreva a história da fatia 2.
  Só ela. Pare antes dos critérios de aceite.
```

### 2.8.1 · `backlog-triage` — triagem do backlog bruto

*Slide 31. A maior redução de trabalho do dia: 22 entram, 10 saem como história.*

```
[CONTEXTO]
backlog/backlog-bruto.md — 22 itens vindos da ouvidoria,
de e-mail da Secretaria, do WhatsApp da recepção e de
ata de reunião. Épicos vigentes: epicos/E1 a E6.

[TAREFA]
backlog-triage: classificar os 22 itens nas 7 categorias.
NÃO reescrever nenhum item ainda.

[RESTRIÇÕES]
- Cite o número do item em toda linha
- Solução disfarçada: escreva a PERGUNTA que devolve o
  problema ao solicitante. Não adivinhe a dor
- Duplicata: diga o que se PERDE ao consolidar
- Obrigação legal: procure o prazo no texto. Se não
  achar, [A CONFIRMAR — quem é a fonte]
- NÃO invente o solicitante de nenhum item

[CRITÉRIO DE PRONTO]
Escreva backlog/triagem.md com:
- os 22 classificados, nenhum "não sei"
- as perguntas a devolver, por solicitante
- quantos sobraram como história de verdade
```

### 3.2.1 · `story-writer` — escrever a história

*Slide 36. Previne quatro dos cinco defeitos recorrentes já no pedido.*

```
[CONTEXTO]
Fatia 2 de epicos/E1-fatiamento.md.
Persona: Marlene (P1), docs/personas.md.
Outcome O1 (absenteismo 31,2% -> 15%), PRODUCT.md sec. 3.
Evidencia da dor: E03 e E07 em docs/pesquisa/entrevistas.md.

[TAREFA]
story-writer: escrever UMA historia para esta fatia.
NAO escrever criterios de aceite ainda.

[RESTRIÇÕES]
- Persona pelo nome. Nunca "o usuario"
- O beneficio NAO pode repetir a acao da historia
- Sem solucao tecnica no texto: o COMO e do time
- Todo numero cita arquivo, ou vira [A CONFIRMAR - fonte]
- Secao "Fora de escopo" obrigatoria, com ao menos 1 item

[CRITÉRIO DE PRONTO]
- Passa nos 6 testes INVEST
- Premissas assumidas e perguntas em aberto listadas
```

### 3.8 · `acceptance-criteria` — critérios de aceite

*Slide 42. Os quatro tipos de cenário e as oito categorias de RNF embutidos no pedido.*

```
[CONTEXTO]
História historias/CF-101-lembrete-whatsapp.md.
Restrições em PRODUCT.md secao 6 (LGPD, acessibilidade,
Android 8 / 3G). DoD na secao 10.

[TAREFA]
acceptance-criteria: escrever os critérios em Gherkin.

[RESTRIÇÕES]
- Mínimo 4 cenários: feliz, alternativo, erro, borda
- Máximo 8 cenários no total
- Um "Quando" por cenário
- Nenhum "Então" citando banco, fila ou classe
- Percorra as 8 categorias de RNF e declare, para
  cada uma, se aplica ou não aplica
- Limite de desempenho não definido em PRODUCT.md:
  escreva [A CONFIRMAR], NÃO invente um número

[CRITÉRIO DE PRONTO]
- Roteiro de verificação manual para a PO
- Premissas assumidas e perguntas em aberto
```

### 3.9.1 · `story-critic` — crítica adversarial

*Slide 44. "Está boa?" devolve elogio. Crítica útil precisa ser pedida com restrição.*

```
[CONTEXTO]
historias/CF-113-remarcacao.md, escrita por mim hoje.
Padrão de pronto: PRODUCT.md seções 9 (DoR) e 4 (personas).
Formato de critério: CLAUDE.md, seção Critérios de aceite.

[TAREFA]
story-critic: emitir parecer. NÃO corrigir, NÃO reescrever,
NÃO sugerir texto pronto.

[RESTRIÇÕES]
- Todo defeito cita o TRECHO exato, entre aspas
- Classifique cada um: bloqueante / ajuste / observação
- Confira todo número contra o arquivo que ele cita.
  Número sem fonte é bloqueante, sempre
- Diga o que você NÃO conseguiu verificar, e por quê
- NÃO abra com "no geral está bom". Comece pelo veredito

[CRITÉRIO DE PRONTO]
- Veredito: aprovada / aprovada com ajuste / reprovada
- A pergunta que você faria no refinamento
- O que está bom, em no máximo duas linhas
```

### 4.2.1 · `backlog-prioritizer` — priorização

*Slide 50. O cálculo sai do prompt e vai para o script. A nota de impacto continua sua.*

```
[CONTEXTO]
backlog/triagem.md: 10 histórias sobreviveram à triagem.
Capacidade: 26 pts/sprint (sprints 11-13) e volumes,
ambos em docs/kpis-e-metricas.md.

[TAREFA]
backlog-prioritizer: preencher backlog/rice-input.csv e
RODAR backlog/rice.py. NÃO calcule RICE de cabeça.

[RESTRIÇÕES]
- Toda linha cita arquivo e data em fonte_alcance.
  Sem fonte: [A CONFIRMAR] e confiança 0,3
- Impacto: proponha a nota E diga em que evidência se
  apoia. A nota final é minha, não sua
- Confiança reflete a qualidade do DADO, não otimismo
- NÃO arredonde nem altere a fórmula ou o script

[CRITÉRIO DE PRONTO]
Escreva backlog/ordenacao-vigente.md com:
- a saída LITERAL do script, sem reformatar
- a linha de corte em 26 pontos
- os ajustes que você propõe, e por quê
```

### 4.5.1 · `release-planner` — plano de release

*Slide 54. Contexto maior que o dos outros: prazo é a resposta que mais depende do que ele não sabe.*

```
[CONTEXTO]
backlog/ordenacao-vigente.md — 73 pontos no R1.
Velocidade 26 pts/sprint, média das sprints 11-13
(docs/kpis-e-metricas.md, medido em jun/2026).
Sprint 14 começa em 02/09. Duas pessoas de férias em out.
R1 prometido para 30/11/2026. Convênio vence 31/03/2027.

[TAREFA]
release-planner: montar releases/R1.md.

[RESTRIÇÕES]
- TRÊS cenários (otimista, provável, pessimista).
  Nunca uma data única, mesmo se eu insistir
- Cada cenário declara a velocidade assumida e por quê
- Desconte férias, sustentação e cerimônias. Diga quanto
- NÃO use velocidade que não esteja no arquivo citado
- Item sem estimativa fica FORA da conta, e listado

[CRITÉRIO DE PRONTO]
- A faixa em semanas, não em datas exatas
- As premissas que, se caírem, mudam a faixa
- O que EU preciso decidir para estreitar a faixa
```

### 4.6.1 · `stakeholder-comms` — a conversa difícil

*Slide 56. O texto padrão dele é educado, otimista e imprestável. Cada restrição existe contra isso.*

```
[CONTEXTO]
Fato: o R1 não cabe até 30/11. Faixa de 7 a 9 semanas a
partir de 02/09 (releases/R1.md, cenário provável).
Destinatária: Sandra, Secretária de Saúde (persona P5).
Ela soube da data de 30/11 no comitê de julho.
O convênio de 31/03/2027 NÃO está em risco.

[TAREFA]
stakeholder-comms: escrever o e-mail do atraso.

[RESTRIÇÕES]
- Situação na primeira linha. Sem preâmbulo
- Causa em UMA frase. Sem culpar pessoa ou time
- QUATRO alternativas, cada uma com o seu custo: cortar
  escopo / mover data / reduzir qualidade
  conscientemente / aumentar capacidade
- ZERO adjetivo: robusto, estratégico, otimizado
- NÃO prometa recuperar atraso sem plano escrito
- NÃO invente número. Só os de releases/R1.md

[CRITÉRIO DE PRONTO]
- Cabe em 12 linhas
- A decisão que eu peço a ela está explícita
```

### 5.3.1 · Criar um agente a partir de um defeito observado

*Slide 62. Agente que nasce de boa prática genérica vira parágrafo bonito. Agente que nasce de evidência funciona.*

```
[CONTEXTO]
Defeito observado hoje, 3 vezes: o story-writer escreveu
"Como usuário do sistema" mesmo com docs/personas.md no
repositório. Evidência: CF-201, CF-202 e CF-204.

[TAREFA]
Escreva .claude/agents/persona-checker.md — um revisor
SOMENTE LEITURA que reprova história sem persona nomeada.

[RESTRIÇÕES]
- tools: Read, Grep, Glob. E mais nada
- Procedimento numerado, não adjetivos
- Contrato de saída em bloco fixo
- Seção NÃO fazer com no mínimo 5 itens
- NÃO prometa capacidade que você não tem
- NÃO inclua métrica de qualidade no template

[CRITÉRIO DE PRONTO]
- Passa nos 4 testes: invocação, lacuna, fronteira,
  reprodutibilidade
- Reprova as 3 histórias acima quando eu rodar
```

### 5.5 · O fluxo inteiro — um pedido, seis agentes

*Slide 64. O encadeamento mora na seção de handoff de cada agente, não neste prompt.*

```
> product-owner: prepare o refinamento de quinta.

Contexto: backlog/backlog-bruto.md tem 6 itens novos desde
sexta. Capacidade da sprint 14: 26 pontos.

O que eu quero na quinta:
1. os itens triados                  (backlog-triage)
2. o que virou fatia, se for épico   (epic-splitter)
3. histórias das 3 fatias do topo    (story-writer)
4. critérios de cada uma       (acceptance-criteria)
5. o parecer em TODAS elas           (story-critic)
6. a ordem sugerida, via script (backlog-prioritizer)

PARE e me pergunte antes de:
- descartar qualquer item
- assumir prazo, número ou regra de negócio

Ao final: a lista do que ficou [A CONFIRMAR] e as decisões
que continuam sendo minhas.
```

---

## As regras de comportamento

Prompt corrige uma vez. Regra escrita corrige sempre. Estas quatro vão para o
`CLAUDE.md` ou para a descrição do agente, e são o entregável dos exercícios
PO-01 a PO-03.

### 2.2 · Regra de parada do `epic-splitter`

*Slide 23. Faz o agente devolver a lista de lacunas em vez de preencher com suposição.*

```
# .claude/agents/epic-splitter.md
## Procedimento

1. Antes de fatiar, verifique se o épico tem:
   - outcome com baseline, meta e prazo
   - persona nomeada em docs/personas.md
   - restrições aplicáveis declaradas
   - dependências externas listadas

2. Se QUALQUER item acima faltar:
   PARE. Não proponha fatias.
   Devolva exatamente:

   "Não fatiei. Faltam:
    - <item>: onde eu esperava encontrar
    - <item>: onde eu esperava encontrar
    Preencha e me chame de novo."

3. NUNCA supra a lacuna com suposição.
   NUNCA escreva "assumindo que...".
```

### 2.3 · `CLAUDE.md` — seção Fatiamento

*Slide 24. Proíbe o fatiamento horizontal, que é o comportamento padrão do modelo.*

```
# CLAUDE.md — seção Fatiamento

Toda fatia proposta DEVE:
- nomear a persona que percebe a mudança
- ser demonstrável na sprint review em
  até 90 segundos, sem abrir o banco
- atravessar todas as camadas
  necessárias para funcionar sozinha

É PROIBIDO propor fatia cujo título
comece com: criar tabela, criar API,
criar tela, criar modelo, configurar,
montar estrutura, preparar base.

Se a única divisão possível for por
camada, diga isso e explique por quê.
```

### 3.4 · `CLAUDE.md` — seção Critérios de aceite

*Slide 38. Sem ela ele troca de formato entre uma história e a seguinte.*

```
# CLAUDE.md — seção Critérios de aceite

## Formato padrão
Gherkin em português: Dado / Quando / Então.
Um Quando por cenário. Sem "E" encadeado
com mais de dois passos.

## Quando NÃO usar Gherkin
- Requisito estático (campo obrigatório,
  máscara, permissão): use lista.
- Mais de 12 combinações de entrada e
  saída: use tabela de regras.

## Sempre
- Título do cenário na primeira linha.
- Dados concretos do docs/dados-sinteticos.md.
  Nunca invente CPF, nome ou telefone.
- Cite a persona pelo nome.
```

### 4.5 · `release-planner` — seção NÃO fazer

*Slide 53. Impede a data única, inclusive sob insistência.*

```
# .claude/agents/release-planner.md — NÃO fazer
NUNCA devolva uma data única. Sempre três cenários, com a velocidade de cada um e a premissa que o sustenta.
NUNCA use velocidade que não esteja em docs/kpis-e-metricas.md com data e fonte. Sem ela: pare e peça.
Se o usuário insistir por uma data, repita a faixa e pergunte qual cenário ele quer assumir.
```

---

## Como usar sem fazer o curso

1. Copie `projeto-consulta-facil-GABARITO/` e troque o conteúdo de
   `PRODUCT.md` pelo do seu produto. Mantenha a estrutura das 12 seções.
2. Copie `agentes/` para `.claude/agents/` no seu repositório de produto.
3. Comece pela seção **NÃO fazer** do `CLAUDE.md` vazia. Preencha só com regras
   que nasceram de um defeito que você **viu** o agente cometer — não de boa
   prática que você já conhecia. Regra genérica não segura nada.
4. Rode os prompts na ordem da cadeia de arquivos acima.

## Onde cada coisa funciona

| | Chat (claude.ai) | Cowork | Claude Code |
|---|---|---|---|
| Skills | sim | sim | sim |
| Subagentes | **não** | sim | sim |
| Hooks | **não** | sim | sim |
| Histórico versionado | não | não | sim |

Os prompts deste README funcionam nas três superfícies. O kit de 12 agentes e o
hook validador exigem Cowork ou Claude Code. Detalhes em `ONDE-RODA-O-QUE.md`.

## Licença e uso

Material de treinamento. O Consulta Fácil, Vila Nova do Recôncavo, as personas
e todos os números do projeto são fictícios, criados para o curso. Nenhum dado
real de paciente ou de município foi usado.
