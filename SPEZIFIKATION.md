# Spezifikation – Vergleich Bestandsheizung – Nahwärme (Biowärme Bechhofen)

Stand: 13.11.2026. Referenz-Umsetzung: `index.html` + `preise.js` (beiliegend). Bei Widersprüchen gilt die Referenz-Umsetzung.

---

## 1. Zweck und Rahmen

- Web-Rechner für Hausbesitzer: Vergleicht die **jährlichen Vollkosten** einer Erneuerung der bestehenden Heizung mit einem **Anschluss an das Nahwärmenetz**.
- Betreiber und Partner: **Biowärme Bechhofen** und **Tobias Ulfig – Heizung · Sanitär**.
  - Beide Logos stehen oben links im Kopf, getrennt durch einen dünnen senkrechten Strich.
  - Logodateien: `logo-bb.png` und `logo-ulfig.png`.
- Technik:
  - Eine HTML-Seite mit eingebettetem CSS/JS; Preise in einer separaten Datei `preise.js` (`window.PREISE = {…}`).
  - Kein Server, kein Login, keine externen Abrufe.
- Datenschutz:
  - Jeder Besucher startet mit einem leeren Vergleich.
  - Daten nur lokal im Browser (localStorage, in try/catch); nichts wird übertragen.
- Sprache und Zahlen: Oberfläche komplett deutsch. Zahlen im deutschen Format (1.234,56 €); Eingabe mit Komma oder Punkt.
- Bedienung:
  - Assistent mit Schritt-Leiste oben (anklickbar) und Buttons „Zurück“ / „Weiter“ unten fixiert.
  - Windows-Konventionen und Tastaturkürzel (siehe Abschnitt 10).
  - Gut nutzbar auf Handy, Tablet und PC.
- Design:
  - Weiß und grün (Primär #9DC241, dunkel #4F7319), große Karten mit runden Ecken.
  - Schrift Inter (Text) und Barlow Semi Condensed (Überschriften).
- Kopfzeile:
  - Titel „Vergleich Bestandsheizung – Nahwärme“, darunter der Objektname.
  - Rechts die Buttons „QR-Code“ und „Datei ▾“.

## 2. Schritte des Assistenten

1. **Bestand** – „Welche Heizungen sind vorhanden?“
   - Felder: Objekt / Kunde, PLZ des Objekts, Bundesland. Das Bundesland wird aus der PLZ ermittelt und bestimmt die regionalen Öl-, Gas- und Flüssiggaspreise.
   - Überschrift **Hauptheizungssystem**, Kacheln mit Checkbox: Ölheizung (Liter), Gasheizung (kWh), Scheitholzheizung (Ster), Einzel-/Kaminofen (Holz) (Ster), Pelletheizung (kg), Hackgut/Sonstiges (m³ Schüttraummeter).
     - Hinweis darunter: „Die Hauptheizung wird in der Rechnung durch die neue Anlage ersetzt.“
   - Überschrift **Zusatzheizung**, Kachel: Einzel-/Kaminofen (Holz) – Zusatzheizung (Ster).
     - Hinweis darunter: „Bleibt die Zusatzheizung in Betrieb, wird sie nicht neu investiert und ihr Wärmeanteil nicht über die Nahwärme ersetzt.“
2. **Eine Eingabeseite je angekreuzter Heizung**
   - Felder: Verbrauch pro Jahr (Pflicht), Leistung kW, Baujahr, bei Öl/Gas „Brennwert ja/nein“.
   - Aufklappbar „Verbrauch mehrerer Jahre eingeben“; bei leerem Jahresverbrauch zählt der Mittelwert.
   - Aufklappbar „Heizwert und Wirkungsgrad“ (nur Anzeige, fest).
   - Unten eine Info-Leiste: Endenergie, Nutzwärme dieser Anlage, Nutzwärme gesamt.
   - Nur bei **Gasheizung** die Auswahl **Erdgas / Flüssiggas** (siehe Abschnitt 5).
   - Nur bei Scheitholz und Kaminofen-Zusatzheizung die Frage „Bleibt … in Betrieb?“ (siehe Abschnitt 4).
3. **Nahwärme** – Eingabe durch den Berater, keine Vorgabe:
   - Arbeitspreis in ct/kWh.
   - Grundpreis in €/Monat.
   - Einmalige Anschlusskosten in €.
   - Ohne Arbeitspreis oder Anschlusskosten wird Nahwärme nicht bewertet; dann erscheint ein Hinweis.
4. **Erneuerung Bestand**
   - Verglichen wird **nur die Erneuerung der vorhandenen Heizart(en)** gegen Nahwärme (Zuordnung in Abschnitt 4).
   - Oben die Marktpreis-Box (Abschnitt 6) mit dem Button „Marktpreise verwenden (…) – alle auf einmal“.
   - Die Auswahl Erdgas/Flüssiggas samt Tank erscheint hier **nur, wenn im Bestand eine Gasheizung angekreuzt ist**.
   - Tabelle je Spalte, alles änderbar: Energiepreis, Grundgebühr, Wartung, Kaminkehrer, Investition.
5. **Förderung** – KfW 458 (Abschnitt 7).
6. **Ergebnis** (Abschnitt 8).

## 3. Feste Werte der Bestandsheizungen

| Heizung | Einheit | Heizwert kWh/Einheit | Wirkungsgrad (fest) |
|---|---|---|---|
| Öl | Liter | 10 | 0,80 |
| Erdgas | kWh | 1 | 0,80 |
| Flüssiggas | Liter | 6,57 | 0,80 |
| Scheitholz | Ster | 1.450 | 0,75 |
| Kaminofen (Haupt- und Zusatzheizung) | Ster | 1.450 | 0,50 |
| Pellets | kg | 4,8 | 0,85 |
| Hackgut / Sonstiges | m³ (SRM) | 679 | 0,80 |

- Endenergie = Menge × Heizwert.
- Nutzwärme = Endenergie × Wirkungsgrad, summiert über alle angekreuzten Heizungen.
- **Heizleistung** = Auslegungsbedarf / 2.000 Volllaststunden. Die Vollaststunden sind fest und werden nicht angezeigt.

## 4. Vergleichsspalten, Zusatzheizung, weiter genutztes Holz

### Zuordnung Bestand → Vergleichsspalte („Erneuerung gleicher Art“)

| Bestand | Spalte |
|---|---|
| Öl | Öl |
| Gas | Gas (Erdgas oder Flüssiggas) |
| Scheitholz | Scheitholz |
| Kaminofen (Haupt) | Kaminofen |
| Kaminofen (Zusatz), **nicht** weiter betrieben | Kaminofen |
| Kaminofen (Zusatz), weiter betrieben | **keine Spalte** (keine Neuinvestition) |
| Pellets | Pellets |
| Hackgut | Hackgut |

Dazu kommt immer die Spalte **Nahwärme**. Ist keine vergleichbare Heizung angekreuzt, erscheint ein Hinweis.

### Vorgaben je Spalte (alle änderbar)

| Spalte | Investition | Wartung €/a | Kaminkehrer €/a | Wirkungsgrad | KfW-förderfähig |
|---|---|---|---|---|---|
| Öl | 20.000 € | 200 | 180 | 0,80 | nein |
| Gas / Flüssiggas | 20.000 € | 160 | 180 | 0,80 | nein |
| Scheitholz | 25.000 € | 300 | 180 | 0,75 | ja |
| Kaminofen | 10.000 € | 100 | 180 | 0,50 | nein (Einzelraumfeuerstätte) |
| Pellets | 30.000 € | 180 | 180 | 0,85 | ja |
| Hackgut | 35.000 € | 300 | 180 | 0,80 | ja |
| Nahwärme | Anschlusskosten lt. Angebot | 0 | 0 | 1,0 | ja |

- Kapitalkosten: Zins 4 %, Abschreibung 15 Jahre. Annuität wie Excel PMT auf die Investition nach Abzug der Förderung.
- Keine Preissteigerung.

### Holz, das weiter verheizt wird

- **Scheitholzheizung bleibt zusätzlich in Betrieb:**
  - Feld „Weiterhin verheizen“ in Ster/Jahr.
  - Diese Wärme muss keine Variante liefern; sie wird von der Nutzwärme aller Varianten abgezogen.
  - Die Nahwärme wird trotzdem für den **vollen** Bedarf ausgelegt.
- **Kaminofen als Zusatzheizung bleibt in Betrieb:**
  - Feld „Weiterhin verheizen“ ist leer = gesamter bisheriger Verbrauch.
  - Diese Wärme wird von der Nutzwärme abgezogen **und** nicht in die Auslegung der Nahwärme einbezogen. Auslegungsbedarf = Nutzwärme gesamt − Wärme des weiter betriebenen Kaminofens.
  - Keine Neuinvestition, keine Spalte.
  - Beispiel: 2.000 l Öl + 4 Ster Kaminofen bleibt → Nutzwärme 16.000 statt 18.900 kWh/a, Auslegung 8,0 statt 9,4 kW.

## 5. Gas: Erdgas oder Flüssiggas

- Auswahlknöpfe „Erdgas“ / „Flüssiggas“ auf der Gasseite.
  - Im Schritt „Erneuerung Bestand“ erscheint die Auswahl nur, wenn Gas im Bestand angekreuzt ist.
  - Beim Flüssiggas wird der Verbrauch in **Liter** eingegeben, Heizwert 6,57 kWh/l.
- **Erdgas:**
  - Verivox-Wert in ct/kWh inkl. Grundpreis (bei 20.000 kWh/a).
  - Er wird aufgeteilt in Grundpreis 12 €/Monat und Arbeitspreis = Wert/100 − 12·12/20.000 €/kWh.
  - Beispiel: Ø Deutschland 14,00 ct → 13,28 ct/kWh + 12 €/Monat.
- **Flüssiggas:**
  - Preis €/100 l aus Brennstoffboerse.de (Tagespreise je Region).
  - Zuordnung über die ersten 2 Ziffern der PLZ zur nächsten Stadt.
  - Es gilt der Preis für 3.000 l; ab 5.000 l Jahresverbrauch der Preis für 5.000 l. Fehlt die PLZ, gilt der Bundesschnitt.
  - Tank:
    - **Mietbehälter:** Eingabefeld „Tankmiete (Grundgebühr)“, vorbelegt **12 €/Monat**, änderbar.
    - **Eigener Tank:** Eingabefeld „Prüfkosten Tank (anteilig)“, vorbelegt **100 €/Jahr**, änderbar.
  - Ergebnisname „Flüssiggas“.

## 6. Marktpreise (Box „Marktpreise“ und Button „alle auf einmal“)

Ein Klick setzt **alle** Preise gleichzeitig:

| Energieträger | Quelle | Einheit im Rechner |
|---|---|---|
| Heizöl | HeizOel24, €/100 l bei 3.000 l je Bundesland (sonst Ø DE) | €/l |
| Erdgas | Verivox je Bundesland, aufgeteilt wie oben | €/kWh + €/Monat |
| Flüssiggas | Brennstoffboerse.de, PLZ-Region | €/l + Tank |
| Pellets | DEPI-Pelletpreis (ENplus A1, inkl. Lieferung) | €/kg |
| Scheitholz und Kaminofen | TFZ Bayern, Ø Deutschland, Buche 33 cm ofenfertig, Juli 2026: **144,66 €/Ster** | €/Ster |
| Hackgut | C.A.R.M.E.N. e.V., Waldhackschnitzel WG 35 %, Ø DE, 3. Quartal 2026: 102,82 €/t = **33,17 €/MWh** brutto inkl. Lieferung | €/SRM = 33,17 × Heizwert/1000 (Standard 22,52 €/SRM) |

- Ändert der Berater einen Preis von Hand, wird „Marktpreise automatisch“ abgeschaltet und sein Wert bleibt erhalten.
- Unter der Box stehen Links zu den Quellen: HeizOel24, Verivox, Brennstoffboerse.de, DEPI, C.A.R.M.E.N.
- Die Werte für Öl, Gas, Flüssiggas, Pellets und KfW stehen in `preise.js`.

## 7. Förderung KfW 458 (aus `preise.js`, Konditionen seit 21.07.2026)

- Antragsart: selbst nutzender Eigentümer / Vermieter / Mieter (dann keine Förderung) / keine / sonstige mit manuellem Satz.
- Grundförderung **30 %** für die förderfähigen Spalten (Scheitholz, Pellets, Hackgut, Nahwärme). Öl, Gas und Kaminofen erhalten 0 %.
- **Klimageschwindigkeitsbonus** (nur Selbstnutzer, Austausch einer funktionstüchtigen Öl-/Gas-/Kohle-/Nachtspeicherheizung oder Gas/Biomasse ≥ 20 Jahre).
  - Stufen nach Datum: ab 21.07.2026 16 %, ab 01.02.2027 12 %, ab 01.08.2027 8 %, ab 01.02.2028 4 %, ab 01.08.2028 0 %.
  - Kaminöfen zählen nicht.
- **Einkommensbonus** (nur Selbstnutzer, zu versteuerndes Einkommen):
  - **„bis“ heißt immer: unter der Grenze**, also bis 1 € darunter.
  - Ohne Kind: bis 29.999 € → 40 %, bis 39.999 € → 30 %, bis 49.999 € → 10 %.
  - Mit Kind: Familienzuschlag +10.000 € je Grenze, also bis 39.999 / 49.999 / **59.999 €**. 60.000 € erhält keinen Bonus.
  - Die Stufen stehen als Hinweis unter dem Einkommensfeld und ändern sich sofort beim Häkchen „Kind“.
- Deckel: Summe höchstens **70 %**, bei Einkommen unter 30.000 € (ggf. + Familienzuschlag) höchstens **80 %**.
- Förderfähige Kosten:
  - 1. Wohneinheit 28.000 € (ab 01.02.2027 sinkend: 27.250 / 26.500 / … / 22.000 €).
  - 2.–6. WE je 15.000 €, ab 7. WE je 8.000 €.
  - Mehrere WE: Boni nur für die selbst bewohnte WE, übrige WE nur Grundförderung, Satz gemittelt.
- Neubau (Bauantrag nach Stichtag): keine KfW-458-Förderung.
- Hinweis-Text aus `preise.js` anzeigen (angekündigte WP-Änderung 2027).

## 8. Berechnung und Ergebnis

Je Spalte gilt:

- **Endenergie** = Nutzwärme / Wirkungsgrad.
- **Menge** = Endenergie / Heizwert.
- **Förderung** = min(Investition, Höchstbetrag) × Fördersatz.
- **Kapitalkosten** = PMT(4 %, 15 J., Investition − Förderung).
- **Energiekosten** = Menge × Preis.
- **Grundkosten** = Grundgebühr × 12.
- **Nebenkosten** = Wartung + Kaminkehrer + Sonstiges (bei Flüssiggas-Eigentank inkl. Prüfkosten).
- **Gesamt €/a** = Kapital + Energie + Grund + Nebenkosten.
- **ct/kWh effektiv** = Gesamt / Nutzwärme × 100.
- **Rang** aufsteigend; die günstigste Variante wird hervorgehoben.
- **Differenz zur Nahwärme** in €/a.

Darstellung auf der Ergebnisseite:

- Ergebniskarten je Spalte.
- Balkendiagramm Vollkosten €/a.
- Verlaufsdiagramm der kumulierten Kosten über **60 Jahre**: nach Ablauf der Abschreibung (15 J.) eine Ersatzinvestition ohne Förderung, bei Nahwärme die Anschlusskosten in voller Höhe.
- Tabelle aller Zwischenwerte.
- Annahmen-Liste mit allen Quellen und Ständen.

### FibreFLEX-Abschnitt

- Bild `fibreflex.jpg`.
- Überschrift „FibreFLEX – Mehr Leistung. Weniger Verluste. Längere Lebensdauer.“
- Text: „Das Mediumrohr ist mit Aramidfasern verstärkt – für höchste Druckbeständigkeit und eine besonders lange Lebensdauer. Die geringere Wandstärke verbessert die Wärmeübertragung und schafft Platz für mehr Dämmung: erheblich weniger Wärmeverluste. Effizient, sparsam und zukunftssicher.“
- Darunter eine Tabelle zur Lebensdauer (FibreFLEX PN 10, PE-Xa mit Aramidfasergeflecht) wie in der Referenz.
- Grünes Sanduhr-Symbol. **Kein** Schutzwesten-Vergleich.

## 9. Datei-Menü, Teilen, Drucken

- Menü „Datei“:
  - Neu.
  - Speichern als JSON-Datei, Öffnen einer JSON-Datei.
  - „Letzten Stand wiederherstellen“ aus localStorage.
  - Ergebnis kopieren, CSV-Export.
  - Drucken / PDF (Druckansicht: Ergebnisseite auf A4).
- Button „QR-Code“: Dialog mit BB-Logo, QR-Code zur öffentlichen Seiten-URL und dem Button „Link kopieren“. Eingaben werden nicht übertragen.

## 10. Tastaturkürzel (in Tooltips und unten rechts anzeigen)

| Taste | Funktion |
|---|---|
| Enter / Alt+W | Weiter |
| Alt+Z | Zurück |
| Alt+1…9 | Schritt springen |
| Strg+S | Speichern |
| Strg+O | Öffnen |
| Strg+Alt+N | Neu |
| Strg+Umschalt+C | Ergebnis kopieren |
| Alt+D | Datei-Menü |
| Alt+K | Förderung |
| Alt+Q | QR-Code |
| F1 | Hilfe |

## 11. Prüffälle (müssen stimmen)

1. Öl 2.000 l → Nutzwärme 16.000 kWh/a, Heizleistung 8,0 kW.
2. Öl 2.000 l + Kaminofen-Zusatzheizung 4 Ster, **bleibt in Betrieb**:
   - Nutzwärme 16.000 kWh/a, Auslegung 8,0 kW.
   - Spalten: nur Öl + Nahwärme.
3. Wie Fall 2, aber der Kaminofen **wird nicht weiter betrieben**:
   - Nutzwärme 18.900 kWh/a, 9,4 kW.
   - Spalten: Öl, Kaminofen (10.000 €), Nahwärme.
4. Nur Hackgut 30 m³ → Nutzwärme 16.296 kWh/a, Hackgutpreis 22,52 €/SRM.
5. Einkommensbonus mit Kind:
   - 59.999 € → 10 %.
   - 60.000 € → 0 %.
   - 39.999 € → 40 % und Deckel 80 %.
6. Flüssiggas, Mietbehälter:
   - Grundgebühr 12 €/Monat vorbelegt.
   - Ein eigener Wert (z. B. 15 €) bleibt nach dem Neurechnen erhalten.
7. Ohne Gas im Bestand → im Schritt „Erneuerung Bestand“ keine Erdgas/Flüssiggas-Auswahl.
