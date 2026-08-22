---
id: CF-101
titulo: Lembrete de consulta por WhatsApp com confirmação em um toque
epico: E3
outcome: O1
persona: P2 (Jefferson) e P1 (Marlene)
estimativa: 5
status: pronta
dependencias: [CF-098 (cadastro de telefone verificado)]
---

# CF-101 — Lembrete de consulta por WhatsApp com confirmação em um toque

## História

**Como** Jefferson, motoboy que agenda com semanas de antecedência e esquece,
**quero** receber um lembrete no WhatsApp no dia anterior à consulta, com um
botão para confirmar ou desmarcar,
**para** não perder a vaga por esquecimento e não ocupar um horário que eu já
sei que não vou usar.

## Por que agora

Absenteísmo de 31,2% (e-SUS, jan–jun/2026) é o maior desperdício da rede.
86% dos cidadãos têm WhatsApp ativo (n=412, abr/2026). E05 na descoberta:
"Se avisassem no zap um dia antes eu ia. Eu esqueço mesmo."
Hipótese de redução de 20–38% vem da literatura de outros contextos — **é
hipótese, não previsão**. Mediremos O1 nas 8 semanas seguintes ao lançamento.

## Fora de escopo desta história

- Lembrete por SMS (canal de contingência, história separada).
- Reoferta automática da vaga desmarcada (é E2 / CF-140).
- Mais de um lembrete (D-7 e D-0 ficam para CF-102 depois de medir o D-1).

## Critérios de aceite

### Cenário 1 — feliz: cidadão confirma
```gherkin
Dado que Jefferson tem consulta marcada para 12/09/2026 às 14h
  E que o telefone dele está verificado no cadastro
Quando o relógio marcar 18h do dia 11/09/2026
Então ele recebe uma mensagem no WhatsApp com data, hora e unidade da consulta
  E a mensagem oferece os botões "Confirmar" e "Não vou poder ir"
Quando ele tocar em "Confirmar"
Então a consulta fica com situação "confirmada pelo cidadão"
  E ele recebe uma resposta de confirmação em até 10 segundos
```

### Cenário 2 — alternativo: cidadão desmarca
```gherkin
Dado que Marlene recebeu o lembrete da consulta de 12/09/2026
Quando ela tocar em "Não vou poder ir"
Então a consulta fica com situação "cancelada pelo cidadão"
  E a vaga é devolvida à agenda da unidade em até 1 minuto
  E ela recebe a confirmação do cancelamento e a orientação de como remarcar
```

### Cenário 3 — erro: entrega falha
```gherkin
Dado que o número de telefone de um cidadão não tem WhatsApp ativo
Quando o sistema tentar enviar o lembrete
Então a falha é registrada com o motivo retornado pelo provedor
  E o cidadão entra na lista de contingência por SMS do dia seguinte
  E nenhuma nova tentativa por WhatsApp é feita para a mesma consulta
```

### Cenário 4 — borda: consulta marcada com menos de 24h
```gherkin
Dado que uma consulta é agendada às 20h do dia 11/09/2026 para 12/09/2026
Quando o agendamento for confirmado
Então o lembrete de D-1 não é enviado
  E o comprovante de agendamento faz o papel do lembrete
```

### Cenário 5 — borda: cidadão responde texto livre
```gherkin
Dado que Marlene recebeu o lembrete
Quando ela responder "não sei ainda" em vez de tocar nos botões
Então o sistema responde repetindo as duas opções em linguagem simples
  E a situação da consulta permanece inalterada
```

## Requisitos não-funcionais aplicáveis

- **LGPD:** a mensagem **não** cita especialidade, profissional nem motivo da
  consulta — apenas data, hora e unidade. Especialidade é dado clínico e o
  WhatsApp é canal de terceiro. Base legal: execução de política pública de
  saúde; o cidadão pode optar por não receber (CF-103).
- **Linguagem:** nível de leitura ~6º ano. Sem "comparecimento", "deferido",
  "usuário SUS". Texto revisado antes do go-live.
- **Desempenho:** resposta ao toque no botão em ≤ 10s no p95.
- **Volume:** ~9.340 mensagens/mês, pico de ~450/dia. Confirmar limite do provedor.
- **Auditoria:** todo envio e toda resposta gravados com data/hora e origem.

## Medição

- Evento `lembrete_enviado`, `lembrete_confirmado`, `lembrete_cancelado`.
- KPI acompanhado: taxa de absenteísmo das consultas que receberam lembrete
  vs. as que não receberam (grupo de controle nas 4 primeiras semanas).

## Premissas assumidas

- O provedor de WhatsApp Business já está contratado pela Secretaria. `[A CONFIRMAR]`
- Templates de mensagem precisam de aprovação prévia da Meta (prazo de 1–3 dias
  úteis) — considerar no planejamento da sprint.

## Perguntas em aberto

- [ ] Se o cidadão desmarcar, oferecemos remarcação na mesma conversa ou só o link?
- [ ] Existe restrição do jurídico sobre uso de canal de terceiro para saúde?
