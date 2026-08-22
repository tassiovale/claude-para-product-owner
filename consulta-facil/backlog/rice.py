#!/usr/bin/env python3
"""RICE determinístico. O agente NÃO calcula de cabeça — ele roda isto.

Uso: python3 backlog/rice.py backlog/rice-input.csv --capacidade 26

Colunas obrigatórias: item, alcance_mes, impacto, confianca, esforco_pts
  impacto: 0.25=mínimo 0.5=baixo 1=médio 2=alto 3=massivo
  confianca: 0.5=baixa 0.8=média 1.0=alta
RICE = (alcance x impacto x confianca) / esforco
"""
import csv, sys, argparse

p = argparse.ArgumentParser()
p.add_argument("arquivo")
p.add_argument("--capacidade", type=float, default=None,
               help="pontos disponíveis na sprint/release")
a = p.parse_args()

linhas = []
with open(a.arquivo, encoding="utf-8") as f:
    for r in csv.DictReader(f):
        try:
            alc = float(r["alcance_mes"]); imp = float(r["impacto"])
            con = float(r["confianca"]);   esf = float(r["esforco_pts"])
        except (ValueError, KeyError) as e:
            print(f"!! linha ignorada ({e}): {r}", file=sys.stderr); continue
        if esf <= 0:
            print(f"!! esforço inválido: {r['item']}", file=sys.stderr); continue
        r["rice"] = (alc * imp * con) / esf
        linhas.append(r)

linhas.sort(key=lambda r: r["rice"], reverse=True)

print(f"{'#':<3}{'item':<45}{'RICE':>10}{'esf':>6}{'conf':>7}  acum")
print("-" * 82)
acum = 0.0
corte_marcado = False
for i, r in enumerate(linhas, 1):
    acum += float(r["esforco_pts"])
    marca = ""
    if a.capacidade and acum > a.capacidade and not corte_marcado:
        marca = "  <-- estoura a capacidade aqui"; corte_marcado = True
    print(f"{i:<3}{r['item'][:44]:<45}{r['rice']:>10.1f}"
          f"{r['esforco_pts']:>6}{r['confianca']:>7}{acum:>6.0f}{marca}")

baixa = [r["item"] for r in linhas if float(r["confianca"]) <= 0.6]
if baixa:
    print("\nATENCAO - confianca baixa, o RICE destes itens e frouxo:")
    for it in baixa:
        print(f"  - {it}")
print("\nLembrete: RICE ordena, nao decide. Dependencia, risco, obrigacao legal")
print("e coerencia de release ainda sao julgamento do PO.")
