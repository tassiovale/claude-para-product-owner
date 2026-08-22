# PO-05 — Seu kit de agentes (45 min)

**Módulo 5 · individual**

## Objetivo
Sair do curso com um agente **seu**, criado para um problema que só você tem.

## Parte A — leitura crítica (10 min)
Abra dois agentes do kit e um dos agentes "de mercado" entregues no material
de apoio (`material-apoio/agentes-originais/`). Compare:
- Onde está o contrato de saída?
- O que acontece quando falta informação?
- Que ferramentas o agente tem, e ele **precisa** de todas?
- Existe alguma métrica inventada no texto do agente?

## Parte B — criar (25 min)
Crie `.claude/agents/<seu-agente>.md` para uma tarefa recorrente sua
(ex.: transformar ata de reunião com cliente em itens de backlog; revisar
histórias contra a norma do seu setor; preparar a pauta da sua review).

Obrigatório no seu agente:
1. `description` com 3+ gatilhos reais que **você** usaria.
2. `tools` com o mínimo necessário — se ele só analisa, **não dê Write**.
3. Procedimento numerado.
4. Contrato de saída com formato fixo.
5. Regra anti-invenção.
6. Seção "NÃO fazer" com 5+ itens.
7. Autoverificação.

## Parte C — testar (10 min)
1. Teste com 3 prompts diferentes **sem citar o nome do agente**. Ele foi
   invocado sozinho? Se não, a `description` está fraca — reescreva.
2. Teste um **modo de falha esperado**: dê a ele uma tarefa com informação
   faltando. Ele inventou ou marcou `[A CONFIRMAR]`?

## Entrega
O arquivo do agente e `teste-agente.md` com os 4 testes e os resultados,
incluindo os que falharam.
