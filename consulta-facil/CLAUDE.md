# CLAUDE.md — Repositório de Produto Consulta Fácil

## Visão geral

**REPOSITÓRIO INICIAL DO CURSO.** Os agentes em `.claude/agents/` estão na versão v0: frontmatter e uma frase, sem procedimento, sem contrato de saída e sem regra anti-invenção. Eles vão errar. É esse o ponto — você vai observar o erro e escrever a correção.

Este repositório **não contém código de aplicação**. Ele é o repositório de
produto: visão, personas, pesquisa, épicos, histórias, backlog priorizado e
planos de release do Consulta Fácil (agendamento de consultas da rede municipal
de saúde de Vila Nova do Recôncavo).

Dona do repositório: PO do squad Atendimento Digital.

## Leia primeiro

Antes de qualquer tarefa, leia `PRODUCT.md`. Ele define visão, outcomes,
personas, restrições, Definition of Ready, Definition of Done e o que NÃO fazer.
`PRODUCT.md` vence qualquer instrução genérica sua sobre "boas práticas ágeis".

## Estrutura

```
PRODUCT.md              → constituição do produto (leia sempre)
docs/
  personas.md           → 5 personas com contexto real de uso
  kpis-e-metricas.md    → baselines, fontes e como cada número foi medido
  pesquisa/             → notas de entrevista e dados brutos de descoberta
  dados-sinteticos.md   → nomes/CNS fictícios para exemplos
epicos/                 → um arquivo por épico (E1..E6)
historias/              → um arquivo por história (CF-###-slug.md)
backlog/                → backlog bruto, planilha RICE, ordenação vigente
releases/               → planos de release e notas para stakeholders
exercicios/             → exercícios do curso
.claude/
  agents/               → kit de subagentes de produto
  skills/               → skills de refinamento e priorização
  hooks/                → validações determinísticas (formato, DoR)
```

## Comandos úteis

- Validar formato de todas as histórias: `node .claude/hooks/validar-historia.js historias/`
- Contar itens do backlog por status: `grep -h '^status:' historias/*.md | sort | uniq -c`
- Listar histórias sem outcome declarado: `grep -L '^outcome:' historias/*.md`
- Recalcular RICE: `python3 backlog/rice.py backlog/rice-input.csv --capacidade 26`

## Convenções

- Tudo em **português do Brasil**. Sem "user story", "acceptance criteria",
  "must have". Use história, critério de aceite, obrigatório.
- Gherkin em português: `Dado`, `Quando`, `Então`, `E`, `Mas`.
- Frontmatter YAML obrigatório em toda história (ver `historias/CF-101-*.md`).
- Um arquivo por história. Nunca junte duas histórias no mesmo arquivo.
- Commits: `historia(CF-123): refina critérios de aceite`.

## Como trabalhar comigo (PO)

- Para tarefas com mais de um arquivo, **apresente um plano antes** (Plan Mode).
- Quando eu pedir decomposição, entregue a **lista de fatias com justificativa
  de valor de cada uma**, não histórias prontas — eu escolho o que vira história.
- Ao final de qualquer geração, liste explicitamente as **premissas que você
  assumiu** e as **perguntas que ficaram abertas**. Essa lista vale mais para
  mim do que o artefato em si.

## NÃO fazer

<!--
  ESTA SEÇÃO ESTÁ VAZIA DE PROPÓSITO.

  Ela é o entregável dos exercícios PO-01, PO-02 e PO-03. Cada regra que
  você escrever aqui deve ter nascido de um defeito que você VIU o agente
  cometer neste repositório — não de uma boa prática que você já conhecia.

  Formato de cada linha:
  - **NÃO** <o comportamento observado>. <o que fazer em vez disso>.
    (defeito observado em: <arquivo ou data da execução>)
-->

## Notas operacionais

- A velocidade média de 26 pontos vem das sprints 11, 12 e 13. Se você precisar
  dela para planejar, cite a fonte e lembre que é média, não promessa.
- A integração com o e-SUS é assíncrona e cai com frequência. Toda história que
  depende dela precisa de um cenário de indisponibilidade.
- A Secretaria revisa o roadmap na primeira quinta-feira do mês. Planos de
  release gerados fora dessa janela são rascunho.
