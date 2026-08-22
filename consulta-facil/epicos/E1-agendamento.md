---
id: E1
titulo: Agendamento de consulta
outcome: [O2, O3]
status: em-refinamento
dono: PO Atendimento Digital
---

# E1 — Agendamento de consulta

## Problema

O cidadão só consegue vaga enfrentando fila presencial a partir das 5h da manhã
(3h50 de espera mediana, fonte: observação de campo mai/2026). Quem trabalha em
horário comercial é sistematicamente excluído — Jefferson (P2) faltou 2 das
últimas 3 consultas por conflito com trabalho, não por descaso.

## Hipótese de valor

Se o cidadão puder ver a agenda real da rede e marcar do próprio celular em até
3 minutos, então o tempo de esforço cai de ~4h para minutos (O2) e pelo menos
60% dos agendamentos migram para o canal digital em 12 meses (O3).

## Quem é afetado

Marlene (P1), Jefferson (P2) como usuários finais; Cláudia (P3) como canal
assistido; Dr. Ivan (P4) porque a distribuição de vagas fica visível.

## Fronteiras

**Dentro:** buscar vaga por especialidade e unidade, escolher horário, confirmar,
receber comprovante, cancelar, remarcar.

**Fora:** exames de imagem, teleconsulta, agendamento para terceiros sem vínculo
(fica em E6, atendimento assistido), pagamento.

## Restrições que já conhecemos

- Identidade vem do E5 (CNS/gov.br). E1 assume cidadão já identificado.
- Agenda vive no e-SUS, integração assíncrona instável (~2 quedas/semana, sem SLA).
- Precisa funcionar em Android 8, 3G, 1 GB de RAM. Orçamento: 1,5 MB no 1º load.
- WCAG 2.1 AA. Marlene aumenta a fonte no máximo — layout não pode quebrar.
- Dado de saúde é sensível (LGPD): especialidade da consulta **é** dado clínico.

## Perguntas em aberto

- [ ] Podemos exibir o nome do profissional ou só a especialidade? (jurídico)
- [ ] Quantas vagas por especialidade ficam reservadas para o canal presencial?
- [ ] Qual a janela mínima de antecedência para cancelar sem penalidade?
  (Existe penalidade? A Secretaria já falou em bloquear reincidente — decidir.)
- [ ] O que acontece se o e-SUS estiver fora no momento da confirmação?

## Critérios de aceite do épico (nível alto)

- Um cidadão identificado consegue sair com uma vaga confirmada sem falar com
  ninguém, em ≤ 3 minutos e ≤ 5 telas.
- A vaga confirmada existe de fato no e-SUS (nada de confirmação otimista sem
  reconciliação).
- O comprovante chega por WhatsApp e pode ser mostrado na recepção offline.
- O fluxo inteiro é operável por leitor de tela e com fonte a 200%.

## Sinais de que este épico está grande demais para uma sprint

Toca 4 telas novas, 1 integração externa instável, 1 canal de mensagem e 2 perfis
de usuário. **Estimativa grossa do time: 45–60 pontos.** Precisa ser fatiado.
