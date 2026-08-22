# PO-03 — Histórias, critérios de aceite e auditoria (70 min)

**Módulo 3 · individual e depois em duplas**

## Parte A — diagnóstico (15 min)
Abra `historias/RUIM-CF-999-exemplo.md`. **Sem usar o Claude**, liste todos os
defeitos que encontrar. Depois rode:

```bash
node .claude/hooks/validar-historia.js historias/RUIM-CF-999-exemplo.md
```

Compare: quantos defeitos o hook pegou que você não pegou? E o contrário?
O hook pega formato. Você pega sentido. Nenhum dos dois substitui o outro.

## Parte B — provar que os defeitos são previsíveis (30 min)
Escolha 3 fatias do seu fatiamento do PO-02.
1. Peça ao `story-writer` uma história para cada, **sem nenhuma instrução
   corretiva**. Guarde as três.
2. Marque nas três, com caneta, quais dos cinco defeitos aparecem: persona
   genérica, benefício circular, número sem fonte, solução embutida, escopo
   adicionado sem aviso. Conte quantos se repetem nas três.
3. Escreva no `CLAUDE.md` a linha que bloqueia cada defeito que apareceu em
   duas ou mais. Regenere as três histórias.
4. Peça ao `acceptance-criteria` os cenários. Se vier só o caminho feliz, a sua
   instrução dos quatro tipos está faltando — escreva e rode de novo.
5. Rode o validador. Corrija o que ele apontar.

## Parte C — auditoria cruzada (25 min)
1. Rode o `story-critic` nas suas 3 histórias. Anote o veredito.
2. **Troque de histórias com a dupla ao lado.** Audite as dela na mão.
3. Compare: o `story-critic` encontrou algo que você não encontraria?
   Você encontrou algo que ele deixou passar?
4. Corrija as suas com base nos dois pareceres.

## Entrega
1. 3 histórias em `historias/`, com os pareceres.
2. O diff do `CLAUDE.md`, com a linha correspondente a cada defeito observado.
3. `licoes-po-03.md` respondendo duas perguntas:
   - Quais defeitos você conseguiu bloquear por escrito, e quais **voltaram**
     mesmo com a regra? (Regra que não segura é informação valiosa.)
   - Que tipo de defeito o `story-critic` pegou que o hook não pegaria nunca?

## Critério de pronto
Nenhuma história com defeito bloqueante. Toda história com os 4 tipos de
cenário e os requisitos não-funcionais decididos (aplica ou não aplica).
