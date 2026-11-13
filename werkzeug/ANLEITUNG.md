# Brennstoff-Richtwerte ändern

Der Rechner verwendet pauschale, bundesweit einheitliche Richtwerte der ENERPIPE GmbH (Feld `stand` in `preise.js`).
Es werden keine Preise aus Preisportalen übernommen. Nutzer ermitteln ihren aktuellen Preis selbst über die Links im Preisfenster
(„Preise und Links zu Anbietern“) und tragen ihn in der Tabelle ein.

1. Nur `preise.js` ändern: Werte und `stand` (TT.MM.JJJJ).
2. `npm install` (einmalig), dann `node werkzeug/einbauen.js /tmp/artefakt`
3. `node werkzeug/pruefen.js index.html /tmp/artefakt/index.html` – nur bei „Alle Prüfungen OK“ weiter.
4. Commit und Push auf `main` → GitHub Pages ist nach ca. 1 Minute aktuell.
5. Perplexity-Fassung: `/tmp/artefakt/index.html` neu bereitstellen.

| Bereich in preise.js | Bedeutung | Einheit |
|---|---|---|
| oel.preis | Heizöl EL inkl. MwSt. und Lieferung | €/l |
| gas.preis / gas.grundMonat | Erdgas Arbeitspreis / Grundpreis | €/kWh / €/Monat |
| fluessiggas.preis / tank | Flüssiggas; Tankmiete bzw. Prüfkosten eigener Tank | €/l |
| pellets.preis | Holzpellets ENplus A1 | €/t |
| holz.preis | Scheitholz Buche 33 cm (auch Kaminofen) | €/Ster |
| hack.mwh | Waldhackschnitzel WG 35 % | €/MWh |
| links | Anbieter-Links im Preisfenster (nur Verweise) | – |
| kfw | KfW 458 – nur von Hand bei Änderung der Konditionen | – |
