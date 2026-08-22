---
name: refinamento
description: |
  Use esta skill quando a pessoa pedir para preparar, conduzir ou revisar um
  refinamento de backlog do Consulta Fácil. Dispara em pedidos como "prepara o
  refinamento de amanhã", "essas histórias estão prontas para a sprint?",
  "monta a pauta do grooming", "revisa o topo do backlog", "o que levar para o
  refinamento". Executa o pipeline completo de preparação: triagem, verificação
  de DoR, parecer crítico e pauta com as perguntas que travam decisão.
  NÃO usa esta skill para escrever histórias novas do zero nem para priorizar
  o backlog inteiro — para isso, chame story-writer ou backlog-prioritizer.
---

# Preparação de refinamento — Consulta Fácil

## Objetivo

Chegar no refinamento com o time discutindo **decisões**, não erros de
formatação. Todo defeito que poderia ter sido pego antes é tempo de 6 pessoas
desperdiçado ao vivo.

## Passos

1. **Delimite o escopo.** Pergunte quantas histórias entram na pauta (o padrão
   é o topo do backlog que cobre ~1,5 sprint de capacidade — hoje, ~40 pontos).
   Se a pessoa não souber, use `historias/` com `status: rascunho` ou `pronta`.

2. **Leia a base.** `PRODUCT.md` (DoR, DoD, restrições),
   `docs/kpis-e-metricas.md` (para conferir números) e `docs/personas.md`.

3. **Verificação mecânica primeiro.** Rode:
   ```bash
   node .claude/hooks/validar-historia.js historias/
   ```
   Erros de formato não vão para a pauta — vão para a lista de correção.

4. **Parecer crítico.** Para cada história, chame o subagente `story-critic`.
   Consolide os pareceres.

5. **Confira as fontes numéricas.** Toda afirmação numérica das histórias tem
   que existir em `docs/kpis-e-metricas.md`. Divergência é bloqueante.

6. **Monte a pauta**, ordenada por: bloqueantes primeiro, depois histórias com
   maior incerteza de estimativa, depois o resto.

## Formato da pauta

```markdown
# Refinamento — <data>
Duração sugerida: <N> min · Histórias: <N> · Pontos estimados em jogo: <N>

## Antes da reunião (correções mecânicas — não gastar tempo ao vivo)
| História | Correção | Responsável |

## Pauta
### 1. <CF-###> — <título>  (<N> min)
**Objetivo da discussão:** estimar | resolver dúvida | decidir escopo | fatiar
**Contexto em 2 linhas:**
**Perguntas que precisam de resposta AQUI:**
**Quem precisa estar presente:**
**Se não decidirmos hoje:** <consequência>

## Não entram nesta pauta (e por quê)
## Decisões que dependem só da PO (resolver antes, fora da reunião)
```

## Regras

- Nenhuma história vai para a pauta com defeito bloqueante não resolvido —
  ela vai para a lista de correção prévia.
- Máximo de 8 histórias por sessão de 1h. Acima disso a qualidade da discussão
  cai e o time perde a paciência com o processo.
- Toda história na pauta tem um objetivo de discussão declarado. "Falar sobre a
  história" não é objetivo.
- Números citados na pauta trazem a fonte junto.

## NÃO fazer

- **NÃO** estime pontos pelo time. A estimativa é feita na reunião, com o time.
- **NÃO** corrija as histórias silenciosamente — aponte a correção e quem faz.
- **NÃO** invente duração de discussão sem base; use 8–10 min por história como
  ponto de partida e diga que é ponto de partida.
- **NÃO** inclua na pauta item que depende de decisão externa ainda pendente.
  Isso vira pauta de outra conversa.
