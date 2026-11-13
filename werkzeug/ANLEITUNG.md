# Marktpreise aktualisieren

1. Nur `preise.js` ändern (Werte und Datum/Stand je Quelle, `aktualisiert` auf das heutige Datum).
2. `npm install` (einmalig), dann `node werkzeug/einbauen.js /tmp/artefakt`
3. `node werkzeug/pruefen.js index.html /tmp/artefakt/index.html` – nur bei „Alle Prüfungen OK“ weiter.
4. Commit und Push auf `main` → GitHub Pages ist nach ca. 1 Minute aktuell.
5. Perplexity-Fassung: `/tmp/artefakt/index.html` neu bereitstellen.

| Bereich in preise.js | Quelle | Einheit | Takt |
|---|---|---|---|
| oel.de / oel.laender | HeizOel24, Preis bei 3.000 l je Bundesland | €/100 l | täglich |
| gas.de / gas.laender | Verivox, Neukundenpreis inkl. Grundpreis bei 20.000 kWh/a | ct/kWh | täglich |
| fluessiggas.schnitt / staedte | Brennstoffboerse.de, Flüssiggas-Tagespreise (1.000/3.000/5.000 l) | €/100 l | täglich |
| pellets | DEPI-Pelletpreis ENplus A1 (6 t je Region, 26 t DE) | €/t | monatlich |
| holz | TFZ Bayern, Buche 33 cm ofenfertig, Ø DE | €/Ster | quartalsweise |
| hack | C.A.R.M.E.N., Waldhackschnitzel WG 35 %, Ø DE | €/MWh und €/t | quartalsweise |
| kfw | KfW 458 – nur von Hand bei Änderung der Konditionen | – | – |
