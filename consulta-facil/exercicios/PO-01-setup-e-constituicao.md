# PO-01 — Setup e a constituição do produto (35 min)

**Módulo 1 · individual**

## Objetivo
Ter o ambiente funcionando e produzir o artefato mais importante do curso:
o `PRODUCT.md` de um produto **seu**.

## Passos
1. Verifique o ambiente: `node --version`, `git --version`, `claude --version`,
   depois `claude doctor`.
2. Crie um repositório de produto vazio para um produto real do seu trabalho:
   `mkdir meu-produto && cd meu-produto && git init`.
3. Inicie o Claude Code e peça a construção do `PRODUCT.md` a partir de uma
   descrição sua, usando a estrutura de 12 seções do projeto Consulta Fácil.
4. **Leia o arquivo inteiro antes de aceitar.** Marque com `[A CONFIRMAR]`
   tudo que o Claude preencheu e você não sabe se é verdade.
5. Escreva você mesmo, à mão, três seções: outcomes com baseline, restrições
   inegociáveis e a lista "NÃO fazer".
6. Rode um teste de obediência: peça algo que contrarie o `PRODUCT.md`
   (ex.: "escreve uma história para 'usuário'"). Registre em `validacao.md`
   se ele obedeceu ou não.

## Entrega
`PRODUCT.md` e `validacao.md` no seu repositório.

## Critério de pronto
- Todo número tem fonte ou `[A CONFIRMAR]`.
- A seção "NÃO fazer" tem pelo menos 5 itens específicos do seu contexto.
- O teste de obediência está documentado, inclusive se falhou.
