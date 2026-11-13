/* Pauschale Brennstoff-Richtwerte der ENERPIPE GmbH für den Wirtschaftlichkeitsvergleich.
 * Die Werte sind bewusst pauschal und bundesweit einheitlich. Sie werden NICHT automatisch aus Preisportalen übernommen.
 * Nutzer ermitteln ihren aktuellen Preis selbst (Links im Preisfenster) und tragen ihn in der Tabelle ein.
 * Nach jeder Änderung: node werkzeug/einbauen.js <ordner> && node werkzeug/pruefen.js index.html <ordner>/index.html
 */
window.PREISE = {
  stand: '01.11.2026',
  herausgeber: 'ENERPIPE GmbH',
  hinweis: 'Pauschale Richtwerte ohne Gewähr für Aktualität und Richtigkeit. Brennstoffpreise schwanken täglich und regional.',
  oel:         { preis: 1.70,  einheit: '€/l',         text: 'Heizöl EL, inkl. MwSt. und Lieferung' },
  gas:         { preis: 0.133, grundMonat: 12, einheit: '€/kWh', text: 'Erdgas, Arbeitspreis inkl. MwSt., zzgl. Grundpreis' },
  fluessiggas: { preis: 0.95,  einheit: '€/l',         text: 'Flüssiggas, inkl. MwSt. und Lieferung', heizwert: 6.57,
    tank: {
      miete:    { grundMonat: 12, pruefJahr: 0 },   // Miettank: Tankmiete als Grundgebühr, Prüfungen meist enthalten
      eigentum: { grundMonat: 0,  pruefJahr: 100 }  // eigener Tank: Prüfungen anteilig ca. 100 €/Jahr
    } },
  pellets:     { preis: 465,   einheit: '€/t',         text: 'Holzpellets ENplus A1, lose, inkl. MwSt. und Lieferung' },
  holz:        { preis: 145,   einheit: '€/Ster',      text: 'Scheitholz Buche 33 cm, ofenfertig, inkl. MwSt. und Lieferung (auch Kaminofen)' },
  hack:        { mwh: 33,      einheit: '€/MWh',       text: 'Waldhackschnitzel, Wassergehalt 35 %, inkl. MwSt. und Lieferung' },
  /* Links zu Anbietern, bei denen Nutzer ihren aktuellen Preis selbst nachsehen. Es werden keine Preise von dort übernommen. */
  links: {
    oel:         { name: 'HeizOel24', url: 'https://www.heizoel24.de/heizoelpreise' },
    gas:         { name: 'Verivox', url: 'https://www.verivox.de/gas/' },
    fluessiggas: { name: 'Brennstoffbörse', url: 'https://brennstoffboerse.de/fluessiggas/fluessiggas-tagespreise.html' },
    pellets:     { name: 'Deutsches Pelletinstitut (DEPI)', url: 'https://www.depi.de/pelletpreis-wirtschaftlichkeit/' },
    holz:        { name: 'TFZ Bayern', url: 'https://www.tfz.bayern.de/biogenefestbrennstoffe/scheitholz/380613/index.php' },
    hack:        { name: 'C.A.R.M.E.N. e.V.', url: 'https://www.carmen-ev.de/service/marktueberblick-erneuerbare-energien/marktpreise-energieholz/marktpreise-hackschnitzel/' }
  },
  /* KfW 458 – BEG Heizungsförderung für Privatpersonen (Wohngebäude).
   * Datumsangaben 'ab' im Format JJJJ-MM-TT; es gilt jeweils der letzte Eintrag mit ab <= heute. */
  kfw: {
    stand: '06.11.2026',
    quelle: 'KfW 458 (BEG EM), Konditionen seit 21.07.2026',
    grund: 0.30,
    klimabonus: [['2026-07-21', 0.16], ['2027-02-01', 0.12], ['2027-08-01', 0.08], ['2028-02-01', 0.04], ['2028-08-01', 0]],
    einkommen: [[30000, 0.40], [40000, 0.30], [50000, 0.10]],
    familienzuschlag: 10000,
    deckel: 0.70,
    deckelNiedrig: 0.80,
    niedrigBis: 30000,
    kosten: {
      we1: [['2026-07-21', 28000], ['2027-02-01', 27250], ['2027-08-01', 26500], ['2028-02-01', 25750], ['2028-08-01', 25000],
            ['2029-02-01', 24250], ['2029-08-01', 23500], ['2030-02-01', 22750], ['2030-08-01', 22000]],
      we2_6: 15000,
      we7: 8000
    },
    hinweis: 'Angekündigt ab 1. Quartal 2027: Grundförderung für Wärmepumpen 15 % (zzgl. ggf. 15 % Bonus für Geräte aus EU-Fertigung) – noch nicht endgültig.'
  }
};
