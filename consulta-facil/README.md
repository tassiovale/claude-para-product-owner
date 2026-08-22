# Consulta Fácil — repositório de produto (projeto do curso)

Projeto de exemplo do curso **Claude Code para Product Owners** (8h).

Não há código de aplicação aqui. Este é o repositório onde o PO trabalha:
visão, pesquisa, épicos, histórias, backlog, releases — e os agentes que
apoiam esse trabalho.

## Cenário

Vila Nova do Recôncavo (78 mil habitantes) tem 31,2% de absenteísmo nas
consultas da rede municipal. O cidadão pega senha às 5h da manhã; quem trabalha
não consegue. O convênio federal que banca o projeto vence em 31/03/2027 e a
release 1 precisa estar em produção até 30/11/2026.

Você é a PO do squad Atendimento Digital.

## Comece por aqui

1. `PRODUCT.md` — a constituição do produto. Leia inteiro.
2. `CLAUDE.md` — como os agentes devem se comportar neste repositório.
3. `docs/personas.md` e `docs/pesquisa/entrevistas.md` — de onde vem a evidência.
4. `historias/CF-101-lembrete-whatsapp.md` — o padrão-ouro de história.
5. `historias/RUIM-CF-999-exemplo.md` — o contra-exemplo (material do PO-03).
6. `exercicios/` — os seis exercícios, na ordem.

## Ferramentas

```bash
# valida formato de todas as histórias
node .claude/hooks/validar-historia.js historias/

# recalcula RICE com a capacidade da sprint
python3 backlog/rice.py backlog/rice-input.csv --capacidade 26
```

## Agentes disponíveis

`backlog-triage` · `epic-splitter` · `story-writer` · `acceptance-criteria` ·
`story-critic` · `backlog-prioritizer` · `release-planner` ·
`discovery-researcher` · `feasibility-reviewer` · `acceptance-test-generator` ·
`stakeholder-comms` · `product-owner` (orquestrador)

## A regra que atravessa o curso inteiro

Nenhum número entra em artefato sem fonte. Quando faltar dado, escreva
`[A CONFIRMAR — o que medir e onde]`. Um plano com lacunas visíveis é
trabalhável; um plano com números plausíveis inventados é uma decisão errada
esperando para acontecer.
