---
id: CF-150
titulo: Lembrete de consulta por WhatsApp no dia anterior, com confirmação em um toque, para quem não pode parar o trabalho para avisar
epico: E3
outcome: O1
persona: P2 (Jefferson)
estimativa: 5
status: rascunho
dependencias: [CF-098 (cadastro de telefone verificado)]
---

# CF-150 — Lembrete D-1 com confirmação em um toque (Jefferson)

## História

**Como** Jefferson, motoboy que passa 10h por dia na rua e não pode parar o
trabalho para telefonar para a UBS,
**quero** receber um lembrete no WhatsApp no dia anterior à consulta, com um
botão para confirmar ou desmarcar em um toque,
**para** avisar em segundos quando eu já sei que não vou poder ir, sem perder
renda parando o trabalho, e sem segurar uma vaga que outra pessoa poderia usar.

## Por que agora

Absenteísmo de 31,2% (e-SUS, jan–jun/2026) é o maior desperdício da rede.
A pesquisa com Jefferson (`docs/personas.md`, P2) mostra um padrão diferente do
de outras personas: ele normalmente **já sabe com antecedência** que não vai
poder comparecer, mas hoje não avisa a UBS porque isso exige ligar durante o
expediente — o que ele não pode fazer sem perder parte do dia de trabalho
(R$ 90, segundo a mesma pesquisa). O problema dele não é esquecimento puro, é
o custo de avisar. 86% dos cidadãos têm WhatsApp ativo (n=412, abr/2026).
Um lembrete D-1 com confirmação em um toque reduz esse custo a quase zero.
A hipótese de redução de absenteísmo (20–38%, literatura de outros contextos)
já está registrada em CF-101 — **é hipótese, não previsão** — e será medida
em O1 nas semanas seguintes ao lançamento.

## Fora de escopo desta história

- Lembrete por SMS (canal de contingência, história separada).
- Reoferta automática da vaga desmarcada para outro cidadão (é E2 / CF-140).
- Fluxo de remarcação dentro da mesma conversa do WhatsApp (fica como pergunta
  em aberto abaixo).
- Comportamento de outras personas: P1 (Marlene) já está coberta por CF-101.
  Esta história trata especificamente do padrão de uso de P2.

## Critérios de aceite

### Cenário 1 — feliz: Jefferson confirma em um toque durante o trabalho
```gherkin
Dado que Jefferson tem consulta marcada para 12/09/2026 às 17h
  E que o telefone dele está verificado no cadastro
Quando o relógio marcar 18h do dia 11/09/2026
Então ele recebe uma mensagem no WhatsApp com data, hora e unidade da consulta
  E a mensagem oferece os botões "Confirmar" e "Não vou poder ir"
Quando ele tocar em "Confirmar" durante uma parada rápida no trabalho
Então a consulta fica com situação "confirmada pelo cidadão"
  E ele recebe uma resposta de confirmação em até 10 segundos
  E nenhuma outra ação além do toque é exigida dele
```

### Cenário 2 — alternativo: Jefferson já sabe que não vai poder ir
```gherkin
Dado que Jefferson recebeu o lembrete da consulta de 12/09/2026
  E que ele já sabe, no momento do lembrete, que vai estar trabalhando nesse horário
Quando ele tocar em "Não vou poder ir"
Então a consulta fica com situação "cancelada pelo cidadão"
  E a vaga é devolvida à agenda da unidade em até 1 minuto
  E ele recebe a confirmação do cancelamento sem precisar de nenhuma etapa extra
```

### Cenário 3 — erro: entrega do lembrete falha
```gherkin
Dado que o número de telefone de Jefferson não tem WhatsApp ativo no momento do envio
Quando o sistema tentar enviar o lembrete
Então a falha é registrada com o motivo retornado pelo provedor
  E Jefferson entra na lista de contingência por SMS do dia seguinte
  E nenhuma nova tentativa por WhatsApp é feita para a mesma consulta
```

### Cenário 4 — borda: consulta marcada com menos de 24h de antecedência
```gherkin
Dado que uma consulta de Jefferson é agendada às 20h do dia 11/09/2026 para 12/09/2026
Quando o agendamento for confirmado
Então o lembrete de D-1 não é enviado
  E o comprovante do agendamento faz o papel do lembrete
```

## Requisitos não-funcionais aplicáveis

- **LGPD:** a mensagem não cita especialidade, profissional nem motivo da
  consulta — apenas data, hora e unidade. Base legal: execução de política
  pública de saúde; o cidadão pode optar por não receber (CF-103).
- **Linguagem:** nível de leitura ~6º ano, mesmo que o perfil de Jefferson
  não exija simplificação extra — é restrição do produto (§6 do PRODUCT.md),
  não específica desta persona.
- **Desempenho:** resposta ao toque no botão em ≤ 10s no p95, incluindo em
  conexão 4G instável durante deslocamento.
- **Acessibilidade:** WCAG 2.1 AA se aplica ao componente de mensagem/botões
  como em qualquer outra história de interface, ainda que o aparelho de
  Jefferson não seja o caso limite de acessibilidade do produto (esse é o
  caso de Marlene, coberto em CF-101).
- **Auditoria:** todo envio e toda resposta gravados com data/hora e origem.

## Medição

- Evento `lembrete_enviado`, `lembrete_confirmado`, `lembrete_cancelado`
  (mesmos eventos de CF-101 — o instrumental não distingue persona).
- KPI acompanhado: taxa de absenteísmo das consultas que receberam lembrete
  vs. grupo de controle, como já definido em CF-101. Não há hoje um recorte
  isolado para o padrão de uso "cancela mas não avisa" de Jefferson —
  `[A CONFIRMAR]` se dá para inferir esse subgrupo a partir do tempo entre
  cancelamento e horário da consulta.

## Premissas assumidas

- O provedor de WhatsApp Business já está contratado pela Secretaria
  (mesma premissa de CF-101). `[A CONFIRMAR]`
- A estimativa de 5 pontos é um placeholder alinhado ao esforço técnico de
  CF-101 (fatia tecnicamente equivalente, canal e botões já definidos naquela
  história) — precisa ser reestimada pelo time em planning, não é compromisso.
- Esta história registra especificamente a motivação e o contexto de uso de
  Jefferson (P2). O comportamento técnico do lembrete (envio, botões, prazos)
  é o mesmo já descrito em CF-101 para P1+P2 juntas.

## Perguntas em aberto

- [ ] CF-101 já cobre este mesmo comportamento para P1 e P2 juntas. Esta
  história deve **substituir/fundir-se** com CF-101, ou faz sentido manter
  uma história por persona para citar motivações diferentes nos critérios de
  aceite? Recomendo decidir isso antes de estimar em sprint planning.
- [ ] Faz sentido oferecer remarcação na mesma conversa do WhatsApp quando
  Jefferson toca em "Não vou poder ir", já que ele não pode parar para
  telefonar depois?
- [ ] Existe um jeito de medir separadamente o padrão "sabia com antecedência
  mas não avisava" (perfil Jefferson) do padrão "esqueceu" (perfil Marlene)
  para validar a hipótese de redução por causa raiz?
