# Backlog bruto — como ele chegou até a PO

> Este é o material do **exercício PO-04**. São itens reais como aparecem na
> vida: mal escritos, duplicados, misturando bug, tarefa técnica, pedido de
> stakeholder e solução já decidida. O trabalho do PO (com apoio dos agentes)
> é triar, reescrever e priorizar — **não** aceitar tudo.

| # | Item como chegou | Origem |
|---|------------------|--------|
| 1 | "App de agendamento" | Ata da reunião com a Secretária |
| 2 | Fazer login com gov.br | TI da Secretaria |
| 3 | Colocar índice na tabela de agendamentos, está lento | Dev backend |
| 4 | Como usuário, quero agendar consulta | PO (rascunho antigo) |
| 5 | Tela de agendamento | Designer |
| 6 | Mandar SMS lembrando da consulta | Secretária |
| 7 | Mandar WhatsApp lembrando da consulta | Ouvidoria |
| 8 | Bug: comprovante sai com data errada quando o mês vira | Homologação |
| 9 | Painel com gráfico de pizza de ocupação | Dr. Ivan |
| 10 | Cancelar consulta | Ata |
| 11 | O cidadão precisa poder desmarcar | Ouvidoria (duplicata de 10?) |
| 12 | Integração e-SUS | TI |
| 13 | Dark mode | Dev frontend |
| 14 | Acessibilidade | Designer |
| 15 | Recepcionista agendar pelo paciente | UBS Centro |
| 16 | Bloquear quem falta 3 vezes | Secretária |
| 17 | Relatório mensal em PDF pro Ministério da Saúde | Prestação de contas |
| 18 | Fila de espera automática quando cancela | Enfermeira Vila Rica |
| 19 | Migrar o banco para Postgres 16 | Dev backend |
| 20 | Chatbot com IA para tirar dúvidas | Assessoria do prefeito |
| 21 | Buscar paciente pelo nome da mãe | Recepcionista Cajueiro |
| 22 | Tem que funcionar em celular ruim | PO |

## Pistas para a triagem

- Alguns itens são **solução**, não problema (1, 5, 9, 20). Descubra a necessidade.
- Alguns são **requisito não-funcional** que atravessa várias histórias (14, 22).
- Alguns são **trabalho técnico** sem valor de negócio declarado (3, 19).
- Alguns são **bug**, não história (8).
- Alguns são **duplicata** (10/11) ou **variação de canal** (6/7).
- Item 16 tem implicação **jurídica e ética** — não é decisão de sprint.
- Item 17 é obrigação legal com prazo: verifique antes de despriorizar.
