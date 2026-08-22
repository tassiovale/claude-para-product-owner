# PRODUCT.md — Consulta Fácil

> Este arquivo é a **constituição do produto**. Todo agente que trabalhar neste
> repositório deve lê-lo antes de escrever qualquer história, critério de aceite
> ou plano de release. Se algo aqui estiver desatualizado, corrija por PR.

---

## 1. Visão

Permitir que qualquer morador de Vila Nova do Recôncavo marque uma consulta na
rede municipal de saúde **em menos de 3 minutos, do próprio celular**, sem
precisar enfrentar fila presencial de madrugada.

**Frase de posicionamento**
Para o morador do município que hoje acorda às 4h para pegar senha na UBS,
o Consulta Fácil é um serviço digital de agendamento que devolve a vaga de
consulta sem custo de deslocamento e sem incerteza. Diferente do balcão
presencial, ele mostra a agenda real da rede e confirma a vaga na hora.

## 2. Contexto e problema

- Município de ~78.000 habitantes, 12 UBS e 3 policlínicas.
- Agendamento atual: fila presencial por ordem de chegada, senhas distribuídas
  a partir das 5h. Quem trabalha em horário comercial simplesmente não consegue.
- **31% de absenteísmo** nas consultas agendadas (jan–jun/2026). Cada falta é
  uma vaga perdida em uma rede que já tem fila de 42 dias para especialidades.
- Não existe visibilidade de vagas: a Secretaria só descobre o buraco na agenda
  no fim do mês, no relatório.

## 3. Resultados esperados (outcomes, não features)

| # | Resultado | Métrica | Baseline | Meta | Prazo |
|---|-----------|---------|----------|------|-------|
| O1 | Reduzir faltas | Taxa de absenteísmo | 31% | ≤ 15% | 6 meses pós-lançamento |
| O2 | Reduzir esforço do cidadão | Tempo médio para agendar | ~4h (fila) | ≤ 3 min | Lançamento |
| O3 | Migrar demanda para o digital | % agendamentos por canal digital | 0% | ≥ 60% | 12 meses |
| O4 | Aproveitar vagas ociosas | % de vagas canceladas reocupadas | ~0% | ≥ 40% | 9 meses |
| O5 | Satisfação | CSAT pós-atendimento | — | ≥ 4,2 / 5 | 6 meses |

**Regra de ouro do backlog:** toda história precisa apontar para um destes
outcomes. História que não aponta para nenhum vira candidata a corte.

## 4. Personas

Detalhes completos em [`docs/personas.md`](docs/personas.md).

| Persona | Papel | O que trava hoje |
|---------|-------|------------------|
| Dona Marlene, 65 | Paciente, hipertensa, consulta a cada 3 meses | Android 8, 3G instável, letra pequena, não confia em "aplicativo de banco" |
| Jefferson, 28 | Paciente, motoboy | Não pode faltar ao trabalho para pegar senha |
| Cláudia, 34 | Recepcionista de UBS | Agenda no papel, remarca no grito, sem visão da rede |
| Dr. Ivan, 47 | Médico regulador da rede | Não sabe onde estão as vagas ociosas |
| Sandra, 52 | Secretária de Saúde (patrocinadora) | Cobrada por indicadores que não consegue medir |

## 5. Escopo

### Dentro (release 1 e 2)
Agendamento de consulta básica e especialidade; fila de espera com
remanejamento; confirmação e lembrete por WhatsApp/SMS; atendimento assistido
pela recepcionista; painel de ocupação para a regulação.

### Fora (explicitamente NÃO faremos agora)
Prontuário eletrônico; prescrição digital; teleconsulta; agendamento de exames
de imagem; pagamento (a rede é 100% SUS, gratuita); app nativo iOS na release 1.

## 6. Restrições inegociáveis

| Tipo | Restrição | Impacto no backlog |
|------|-----------|--------------------|
| Legal | LGPD — dado de saúde é **dado pessoal sensível** (art. 5º, II) | Toda história que exibe ou transporta dado clínico precisa de CA de consentimento, minimização e log de acesso |
| Legal | Lei 13.460/2017 (defesa do usuário de serviço público) | Canal de reclamação obrigatório |
| Integração | Cartão Nacional de Saúde (CNS) e login gov.br | Identidade não é problema nosso para resolver do zero |
| Técnica | Android 8+, 3G, aparelhos de 1 GB de RAM | Sem SPA pesada; orçamento de 1,5 MB no primeiro carregamento |
| Acessibilidade | WCAG 2.1 nível AA | Contraste, alvo de toque ≥ 44px, leitor de tela, fonte ajustável |
| Idioma | Português do Brasil, linguagem simples (nível de leitura ~6º ano) | Nada de "solicitação de agendamento deferida" |
| Time | 5 devs, 1 designer, sprints de 2 semanas | Velocidade média das últimas 3 sprints: **26 pontos** |
| Orçamento | Convênio federal encerra em 31/03/2027 | Release 1 precisa estar em produção até 30/11/2026 |

## 7. Épicos

| ID | Épico | Outcome principal | Status |
|----|-------|-------------------|--------|
| E1 | Agendamento de consulta | O2, O3 | Em refinamento |
| E2 | Fila de espera e remanejamento de vagas | O4 | Descoberta |
| E3 | Lembretes e confirmação | O1 | Em refinamento |
| E4 | Painel de gestão e regulação | O4, O5 | Descoberta |
| E5 | Identidade do cidadão (CNS / gov.br) | O2 | Pronto para sprint |
| E6 | Atendimento assistido na UBS | O3 | Descoberta |

## 8. Convenções de backlog

- **ID de história:** `CF-<número>` sequencial. Nunca reaproveite ID.
- **Arquivo:** `historias/CF-<número>-<slug>.md`, um arquivo por história.
- **Formato de história:** `Como <persona>, quero <capacidade>, para <benefício>`.
  A persona precisa existir em `docs/personas.md` — nada de "Como usuário".
- **Critérios de aceite:** Gherkin em português (`Dado / Quando / Então`),
  mínimo 4 cenários: feliz, alternativo, erro e borda.
- **Estimativa:** Fibonacci (1, 2, 3, 5, 8, 13). Acima de 8 → fatiar.
- **Rastreabilidade:** toda história declara `epico:` e `outcome:` no frontmatter.
- **Idioma:** todos os artefatos de produto em **português do Brasil**.

## 9. Definition of Ready (DoR)

Uma história só entra em sprint planning se:

1. Tem persona real e benefício explícito ligado a um outcome de §3.
2. Tem critérios de aceite em Gherkin cobrindo os 4 tipos de cenário.
3. Tem os requisitos não-funcionais aplicáveis declarados (LGPD, acessibilidade,
   desempenho em 3G) — ou a declaração explícita de que não se aplicam.
4. Está estimada em ≤ 8 pontos pelo time.
5. Não tem dependência externa bloqueante em aberto.
6. Tem design anexado ou a marcação explícita `sem-ui`.

## 10. Definition of Done (DoD)

1. Critérios de aceite verificados em ambiente de homologação pelo PO.
2. Testes automatizados cobrindo pelo menos o cenário feliz e um de erro.
3. Acessibilidade validada (contraste, navegação por teclado/leitor de tela).
4. Medição instrumentada: o evento que alimenta o KPI da história está enviando.
5. Texto de interface revisado (linguagem simples).
6. Documentação de release atualizada.

## 11. NÃO fazer neste repositório

- **NÃO** inventar números. Se um dado de reach, impacto ou baseline não existe
  em `docs/kpis-e-metricas.md` ou em `docs/pesquisa/`, escreva
  `[A CONFIRMAR — fonte]` e siga. Estimativa sem fonte vira decisão errada.
- **NÃO** escrever histórias técnicas disfarçadas ("Como usuário, quero que o
  banco tenha índice..."). Trabalho técnico vira tarefa dentro da história ou
  item de habilitação com justificativa de negócio.
- **NÃO** fatiar épico em camadas (backend / frontend / banco). Fatias são
  verticais e entregam valor observável.
- **NÃO** colocar dado real de paciente (nome, CNS, CPF) em nenhum arquivo.
  Use os dados sintéticos de `docs/dados-sinteticos.md`.
- **NÃO** alterar `PRODUCT.md` sem PR com aprovação da PO e da Secretaria.

## 12. Glossário

| Termo | Significado |
|-------|-------------|
| UBS | Unidade Básica de Saúde |
| CNS | Cartão Nacional de Saúde (identificador do cidadão no SUS) |
| Regulação | Área que distribui vagas entre unidades da rede |
| Vaga ociosa | Horário aberto na agenda que ninguém ocupou |
| Absenteísmo | Paciente agendado que não comparece |
| Retaguarda | Sistema legado da Secretaria (e-SUS) |
| Cota | Número de vagas que uma UBS recebe por especialidade/mês |
