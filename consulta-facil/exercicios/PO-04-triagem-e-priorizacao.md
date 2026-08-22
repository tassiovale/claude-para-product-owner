# PO-04 — Triagem, priorização e plano de release (55 min)

**Módulo 4 · duplas**

## Parte A — triagem (20 min)
Abra `backlog/backlog-bruto.md`: 22 itens como chegaram na vida real.
1. Rode o `backlog-triage`.
2. Confira item por item. O agente:
   - reconheceu as **soluções disfarçadas** (1, 5, 9, 20)?
   - separou o **bug** (8) e a **duplicata** (10/11)?
   - percebeu que 14 e 22 são **requisitos transversais**, não histórias?
   - tratou o item 16 (bloquear quem falta 3 vezes) como **decisão de política
     pública**, e não como regra de sprint?
   - verificou o prazo do item 17 antes de despriorizar?
3. Corrija o que ele errou. Anote **o que** ele errou — isso vira regra no
   `CLAUDE.md`.

## Parte B — priorização (20 min)
1. Rode `python3 backlog/rice.py backlog/rice-input.csv --capacidade 26`.
2. Observe: o **relatório de prestação de contas** fica em último (RICE 0,3) e
   é obrigação legal com prazo. O **painel da regulação** tem alcance 12 e
   destrava o outcome O4. **RICE ordena; ele não decide.**
3. Produza a ordenação final com a seção "ajustes de julgamento": o que você
   subiu ou desceu contra o número, e por quê.

## Parte C — release (15 min)
Peça ao `release-planner` um plano até 30/11/2026 (prazo do convênio).
Verifique: as datas vieram em faixa? A velocidade citada tem fonte? Ele
declarou a folga? Se ele entregou data única, devolva e exija a faixa.

## Entrega
`backlog/triagem.md`, `backlog/ordenacao.md` e `releases/R1-plano.md`.
