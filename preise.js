/* Marktpreise und KfW-Konditionen für den Wirtschaftlichkeitsvergleich.
 * Diese Datei wird täglich automatisch aktualisiert (geplante Aufgabe).
 * Heizöl: €/100 l bei 3.000 l Abnahme inkl. MwSt. (HeizOel24)
 * Gas:    ct/kWh brutto inkl. Grundpreis, 20.000 kWh/a (Verivox); Aufteilung über gas.grundpreisMonat
 * Flüssiggas: €/100 l inkl. MwSt. je Region (Brennstoffboerse.de, Tagespreise)
 * Pellets: €/t inkl. MwSt. und Lieferung, ENplus A1 (DEPI-Pelletpreis, monatlich)
 * Fehlt ein Landeswert, wird der Bundesdurchschnitt verwendet.
 */
window.PREISE = {
  aktualisiert: '09.11.2026',
  oel: {
    quelle: 'HeizOel24',
    einheit: '€/100 l (3.000 l)',
    de: { wert: 169.42, datum: '08.11.2026' },
    laender: {
      BW: { wert: 171.98, datum: '09.11.2026' },
      BY: { wert: 170.30, datum: '09.11.2026' },
      BE: { wert: 165.00, datum: '07.11.2026' },
      BB: { wert: 166.79, datum: '04.11.2026' },
      HH: { wert: 155.81, datum: '06.11.2026' },
      HE: { wert: 175.49, datum: '09.11.2026' },
      MV: { wert: 172.83, datum: '31.10.2026' },
      NI: { wert: 164.89, datum: '08.11.2026' },
      NW: { wert: 170.63, datum: '08.11.2026' },
      RP: { wert: 173.33, datum: '09.11.2026' },
      SL: { wert: 174.32, datum: '07.11.2026' },
      SN: { wert: 167.25, datum: '08.11.2026' },
      ST: { wert: 168.80, datum: '06.11.2026' },
      SH: { wert: 159.07, datum: '06.11.2026' },
      TH: { wert: 170.15, datum: '06.11.2026' }
    }
  },
  gas: {
    quelle: 'Verivox',
    einheit: 'ct/kWh inkl. Grundpreis (20.000 kWh/a)',
    de: { wert: 14.0, datum: '09.11.2026', art: 'Ø Neukundenpreis' },
    laender: {
      BW: { wert: 14.05, datum: '06.11.2026' }, BY: { wert: 13.53, datum: '06.11.2026' },
      BE: { wert: 12.59, datum: '06.11.2026' }, BB: { wert: 13.25, datum: '06.11.2026' },
      HB: { wert: 14.12, datum: '06.11.2026' }, HH: { wert: 12.98, datum: '06.11.2026' },
      HE: { wert: 13.47, datum: '06.11.2026' }, MV: { wert: 14.07, datum: '06.11.2026' },
      NI: { wert: 13.62, datum: '06.11.2026' }, NW: { wert: 13.71, datum: '06.11.2026' },
      RP: { wert: 13.90, datum: '06.11.2026' }, SL: { wert: 14.66, datum: '06.11.2026' },
      SN: { wert: 14.14, datum: '06.11.2026' }, ST: { wert: 14.15, datum: '06.11.2026' },
      SH: { wert: 14.01, datum: '06.11.2026' }, TH: { wert: 14.23, datum: '06.11.2026' }
    },
    laenderArt: 'günstigster empfohlener Tarif je Bundesland',
    // Die Verivox-Werte enthalten den Grundpreis (umgelegt auf bezugKwh). Die Seite teilt sie auf:
    // Arbeitspreis = Wert − grundpreisMonat × 12 / bezugKwh; Grundpreis = grundpreisMonat (€/Monat).
    // Verivox veröffentlicht den Grundpreis-Anteil nicht – typischer Neukunden-Grundpreis, vom Berater änderbar.
    grundpreisMonat: 12.00,
    bezugKwh: 20000,
    grundQuelle: 'typischer Neukunden-Grundpreis, Verivox weist ihn nicht gesondert aus'
  },
  /* Flüssiggas: Tagespreise von Brennstoffboerse.de (€/100 l inkl. MwSt., Lieferung in Tanks im Eigentum des Kunden)
   * je Referenzstadt; Zuordnung über die ersten zwei PLZ-Ziffern zur nächstgelegenen Stadt der Tabelle (plz2).
   * Preis: Abnahme 3.000 l je Lieferung, ab 5.000 l Jahresbedarf der 5.000-l-Preis. Heizwert 6,57 kWh/l.
   * tank: Tankmiete (Grundgebühr €/Monat) bzw. anteilige Prüfkosten beim eigenen Tank (€/Jahr):
   *   äußere Prüfung alle 2 J. ca. 50–120 €, innere Prüfung alle 10 J. ab ca. 300–550 €, Rohrleitungsprüfung alle 10 J. */
  fluessiggas: {
    quelle: 'Brennstoffboerse.de, Flüssiggas-Tagespreise',
    link: 'https://brennstoffboerse.de/fluessiggas/fluessiggas-tagespreise.html',
    einheit: '€/100 l inkl. MwSt.',
    stand: '10.11.2026',
    heizwert: 6.57,
    schnitt: { l1000: 97.33, l3000: 93.29, l5000: 92.92 },
    staedte: {
      'Berlin': { l1000: 100.18, l3000: 94.64, l5000: 94.13 },
      'Bielefeld': { l1000: 94.78, l3000: 91.81, l5000: 91.38 },
      'Bochum': { l1000: 93.95, l3000: 90.50, l5000: 90.02 },
      'Bonn': { l1000: 96.33, l3000: 92.88, l5000: 92.40 },
      'Bremen': { l1000: 94.18, l3000: 91.21, l5000: 90.78 },
      'Chemnitz': { l1000: 101.77, l3000: 97.24, l5000: 96.87 },
      'Cottbus': { l1000: 101.77, l3000: 96.27, l5000: 95.86 },
      'Dortmund': { l1000: 93.95, l3000: 90.50, l5000: 90.02 },
      'Dresden': { l1000: 101.77, l3000: 97.24, l5000: 96.87 },
      'Düsseldorf': { l1000: 93.95, l3000: 90.50, l5000: 90.02 },
      'Erfurt': { l1000: 94.78, l3000: 90.36, l5000: 89.92 },
      'Flensburg': { l1000: 95.72, l3000: 91.62, l5000: 91.11 },
      'Frankfurt': { l1000: 95.98, l3000: 91.42, l5000: 91.28 },
      'Freiburg': { l1000: 95.24, l3000: 92.55, l5000: 92.36 },
      'Gera': { l1000: 101.19, l3000: 96.89, l5000: 96.54 },
      'Göttingen': { l1000: 97.36, l3000: 94.40, l5000: 93.97 },
      'Halle': { l1000: 101.77, l3000: 95.67, l5000: 95.20 },
      'Hamburg': { l1000: 95.37, l3000: 92.28, l5000: 91.81 },
      'Hannover': { l1000: 94.18, l3000: 91.21, l5000: 90.78 },
      'Kaiserslautern': { l1000: 95.24, l3000: 92.55, l5000: 92.36 },
      'Karlsruhe': { l1000: 95.24, l3000: 92.55, l5000: 92.36 },
      'Kassel': { l1000: 98.19, l3000: 94.74, l5000: 94.26 },
      'Kiel': { l1000: 95.72, l3000: 91.62, l5000: 91.11 },
      'Koblenz': { l1000: 96.08, l3000: 92.40, l5000: 92.00 },
      'Köln': { l1000: 93.95, l3000: 90.50, l5000: 90.02 },
      'Landshut': { l1000: 98.18, l3000: 92.42, l5000: 92.23 },
      'Leipzig': { l1000: 101.77, l3000: 97.24, l5000: 96.87 },
      'Magdeburg': { l1000: 99.25, l3000: 94.49, l5000: 94.01 },
      'Mainz': { l1000: 96.70, l3000: 93.46, l5000: 93.14 },
      'München': { l1000: 99.36, l3000: 96.19, l5000: 95.98 },
      'Neunkirchen': { l1000: 95.24, l3000: 92.55, l5000: 92.36 },
      'Nürnberg': { l1000: 97.04, l3000: 93.17, l5000: 93.05 },
      'Oldenburg': { l1000: 96.14, l3000: 92.61, l5000: 92.14 },
      'Passau': { l1000: 99.41, l3000: 93.65, l5000: 93.46 },
      'Potsdam': { l1000: 100.18, l3000: 94.64, l5000: 94.13 },
      'Regensburg': { l1000: 99.37, l3000: 93.61, l5000: 93.42 },
      'Rostock': { l1000: 100.69, l3000: 96.16, l5000: 95.80 },
      'Saarbrücken': { l1000: 95.24, l3000: 92.55, l5000: 92.36 },
      'Schwerin': { l1000: 97.66, l3000: 93.56, l5000: 93.08 },
      'Straubing': { l1000: 99.41, l3000: 93.65, l5000: 93.46 },
      'Stuttgart': { l1000: 95.24, l3000: 92.55, l5000: 92.36 },
      'Trier': { l1000: 96.33, l3000: 92.88, l5000: 92.40 },
      'Ulm': { l1000: 97.52, l3000: 93.24, l5000: 92.46 },
      'Wiesbaden': { l1000: 97.82, l3000: 93.26, l5000: 93.11 },
      'Würzburg': { l1000: 98.87, l3000: 92.86, l5000: 92.05 }
    },
    plz2: { '01': 'Dresden', '02': 'Dresden', '03': 'Cottbus', '04': 'Leipzig', '06': 'Halle', '07': 'Gera', '08': 'Chemnitz', '09': 'Chemnitz', '10': 'Berlin', '12': 'Berlin', '13': 'Berlin', '14': 'Potsdam', '15': 'Cottbus', '16': 'Berlin', '17': 'Rostock', '18': 'Rostock', '19': 'Schwerin', '20': 'Hamburg', '21': 'Hamburg', '22': 'Hamburg', '23': 'Kiel', '24': 'Kiel', '25': 'Flensburg', '26': 'Oldenburg', '27': 'Bremen', '28': 'Bremen', '29': 'Hannover', '30': 'Hannover', '31': 'Hannover', '32': 'Bielefeld', '33': 'Bielefeld', '34': 'Kassel', '35': 'Frankfurt', '36': 'Kassel', '37': 'Göttingen', '38': 'Hannover', '39': 'Magdeburg', '40': 'Düsseldorf', '41': 'Düsseldorf', '42': 'Düsseldorf', '44': 'Dortmund', '45': 'Bochum', '46': 'Dortmund', '47': 'Düsseldorf', '48': 'Dortmund', '49': 'Bielefeld', '50': 'Köln', '51': 'Köln', '52': 'Köln', '53': 'Bonn', '54': 'Trier', '55': 'Mainz', '56': 'Koblenz', '57': 'Köln', '58': 'Dortmund', '59': 'Dortmund', '60': 'Frankfurt', '61': 'Frankfurt', '63': 'Frankfurt', '64': 'Frankfurt', '65': 'Wiesbaden', '66': 'Saarbrücken', '67': 'Kaiserslautern', '68': 'Karlsruhe', '69': 'Karlsruhe', '70': 'Stuttgart', '71': 'Stuttgart', '72': 'Stuttgart', '73': 'Stuttgart', '74': 'Stuttgart', '75': 'Karlsruhe', '76': 'Karlsruhe', '77': 'Freiburg', '78': 'Freiburg', '79': 'Freiburg', '80': 'München', '81': 'München', '82': 'München', '83': 'München', '84': 'Landshut', '85': 'München', '86': 'Ulm', '87': 'Ulm', '88': 'Ulm', '89': 'Ulm', '90': 'Nürnberg', '91': 'Nürnberg', '92': 'Regensburg', '93': 'Regensburg', '94': 'Passau', '95': 'Nürnberg', '96': 'Nürnberg', '97': 'Würzburg', '98': 'Erfurt', '99': 'Erfurt' },
    tank: {
      miete:    { grundMonat: 12, pruefJahr: 0 },   // Miettank ca. 10–15 €/Monat, Prüfungen meist enthalten
      eigentum: { grundMonat: 0,  pruefJahr: 100 }  // eigener Tank: Prüfungen anteilig ca. 100 €/Jahr
    }
  },
  pellets: {
    quelle: 'DEPI (Deutsches Pelletinstitut)',
    einheit: '€/t inkl. MwSt. und Lieferung',
    monat: 'Oktober 2026',
    de6: 464.61,          // bundesweit, Abnahme 6 t
    de26: 448.45,         // bundesweit, Abnahme 26 t
    regionen6: { sued: 466.81, mitte: 462.84, nordost: 464.93 },
    // Zuordnung Bundesland -> DEPI-Region (nach geografischer Lage; vom DEPI nicht als Liste veröffentlicht)
    zuordnung: { BW: 'sued', BY: 'sued', HE: 'mitte', NW: 'mitte', RP: 'mitte', SL: 'mitte', TH: 'mitte',
                 BE: 'nordost', BB: 'nordost', HB: 'nordost', HH: 'nordost', MV: 'nordost', NI: 'nordost',
                 SN: 'nordost', ST: 'nordost', SH: 'nordost' }
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
