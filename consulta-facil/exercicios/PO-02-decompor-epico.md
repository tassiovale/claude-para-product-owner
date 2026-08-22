# PO-02 — Decompor um épico (50 min)

**Módulo 2 · duplas**

## Objetivo
Você já sabe fatiar. O objetivo aqui é **calibrar o agente**: descobrir o que
ele erra sozinho no E1 e deixar essa correção escrita no repositório, de forma
que o próximo épico saia melhor sem você repetir nada.

## Parte A — a linha de base (12 min)
1. Leia `epicos/E1-agendamento.md` e `PRODUCT.md`.
2. Sozinho, sem o Claude, escreva 5 fatias em papel. 10 minutos. Cronometre.
   Isto não é para aprender a fatiar — é a régua contra a qual você vai medir
   o agente daqui a pouco.
3. Rode o `epic-splitter` **sem nenhuma instrução corretiva** e guarde a saída.

## Parte B — nomear os defeitos (13 min)
Compare a sua lista com a dele e responda por escrito:
- Que fatia é **horizontal com nome bonito**?
- Que fatia **assume uma decisão** que ninguém tomou (o E1 tem quatro perguntas
  em aberto)?
- Que fatia só entrega valor **junto com outra**?
- Ele parou em quantas? Você teria parado em quantas?

## Parte C — escrever a correção (15 min)
1. Escreva a seção **Fatiamento** do `CLAUDE.md`: o que toda fatia deve ter e a
   lista de títulos proibidos.
2. Escreva a **regra de parada** na descrição do `epic-splitter`: se faltar
   outcome com baseline, persona, restrição ou dependência, ele para e devolve
   a lista de lacunas.
3. Apague temporariamente uma dessas informações do `PRODUCT.md` e rode de
   novo. **Ele recusou?** Se propôs fatias mesmo assim, a sua regra está fraca:
   reescreva até ele recusar. Restaure o arquivo.

## Parte D — decidir (10 min)
Rode de novo com o repositório corrigido. Escolha o conjunto final, justifique
a ordem por valor e defenda a primeira fatia lançável em 30 segundos para a
dupla ao lado.

## Entrega
1. `epicos/E1-fatiamento.md` — conjunto final, justificativa e descartados.
2. O diff do `CLAUDE.md` e do `epic-splitter.md`.
3. `licoes-po-02.md` — o defeito que ele cometeu, a linha que você escreveu
   para bloqueá-lo, e a evidência de que funcionou (saída antes e depois).

## Armadilhas plantadas
O E1 tem quatro perguntas em aberto. Se o agente fatiar sem sinalizar que a
decisão sobre penalidade por falta muda o fatiamento, ele falhou — e você
também, se aceitar.
