#!/usr/bin/env node
/**
 * validar-historia.js — validação determinística de histórias do Consulta Fácil.
 *
 * Por que um hook e não um prompt: o modelo pode "achar" que a história está no
 * padrão. O hook não acha nada — ele confere. Determinismo é o complemento do
 * agente, não um concorrente dele.
 *
 * Uso:  node .claude/hooks/validar-historia.js historias/
 *       node .claude/hooks/validar-historia.js historias/CF-101-lembrete.md
 *
 * Como PostToolUse em .claude/settings.json:
 * {
 *   "hooks": {
 *     "PostToolUse": [{
 *       "matcher": "Write|Edit",
 *       "hooks": [{ "type": "command",
 *                   "command": "node .claude/hooks/validar-historia.js historias/" }]
 *     }]
 *   }
 * }
 */
const fs = require("fs");
const path = require("path");

const CAMPOS = ["id", "titulo", "epico", "outcome", "persona", "estimativa", "status"];
const PROIBIDO = [
  { re: /\bcomo\s+usu[áa]rio\b/i, msg: 'persona genérica ("como usuário")' },
  { re: /\bdeve ser (r[áa]pido|intuitiv|f[áa]cil|bonit)/i, msg: "critério não testável" },
  { re: /\bmelhores pr[áa]ticas\b/i, msg: "critério vago (melhores práticas)" },
  { re: /\b100% de satisfa/i, msg: "meta inventada" },
];

function validar(arquivo) {
  const txt = fs.readFileSync(arquivo, "utf8");
  const erros = [], avisos = [];

  const fm = txt.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) erros.push("sem frontmatter YAML");
  else CAMPOS.filter(c => !new RegExp(`^${c}:`, "m").test(fm[1]))
             .forEach(c => erros.push(`frontmatter sem campo obrigatório: ${c}`));

  if (!/\*\*Como\*\*/.test(txt) || !/\*\*quero\*\*/.test(txt) || !/\*\*para\*\*/.test(txt))
    erros.push("história fora do formato Como/quero/para");

  const cenarios = (txt.match(/^\s*Quando /gm) || []).length;
  if (cenarios < 4) erros.push(`apenas ${cenarios} cenário(s); mínimo 4 (feliz, alternativo, erro, borda)`);

  if (!/```gherkin/.test(txt)) avisos.push("nenhum bloco gherkin encontrado");
  if (!/##\s*Requisitos n[ãa]o-funcionais/i.test(txt))
    avisos.push("sem seção de requisitos não-funcionais");
  if (/\[A CONFIRMAR/i.test(txt))
    avisos.push(`${(txt.match(/\[A CONFIRMAR/gi) || []).length} pendência(s) [A CONFIRMAR]`);

  PROIBIDO.forEach(p => { if (p.re.test(txt)) erros.push(p.msg); });

  // números soltos sem fonte próxima
  const linhasComPct = txt.split("\n").filter(l => /\d+([.,]\d+)?%/.test(l));
  linhasComPct.forEach(l => {
    if (!/(fonte|e-SUS|n=|\/2026|\[A CONFIRMAR)/i.test(l))
      avisos.push(`percentual sem fonte aparente: "${l.trim().slice(0, 60)}"`);
  });

  return { erros, avisos };
}

const alvo = process.argv[2] || "historias/";
let arquivos = [];
if (fs.existsSync(alvo) && fs.statSync(alvo).isDirectory()) {
  arquivos = fs.readdirSync(alvo)
    .filter(f => f.endsWith(".md") && !f.startsWith("RUIM"))
    .map(f => path.join(alvo, f));
} else arquivos = [alvo];

let totalErros = 0;
for (const a of arquivos) {
  const { erros, avisos } = validar(a);
  totalErros += erros.length;
  if (!erros.length && !avisos.length) { console.log(`OK    ${a}`); continue; }
  console.log(`\n${erros.length ? "FALHA" : "AVISO"} ${a}`);
  erros.forEach(e => console.log(`  [erro]  ${e}`));
  avisos.forEach(v => console.log(`  [aviso] ${v}`));
}
console.log(`\n${arquivos.length} arquivo(s), ${totalErros} erro(s).`);
process.exit(totalErros > 0 ? 2 : 0);
