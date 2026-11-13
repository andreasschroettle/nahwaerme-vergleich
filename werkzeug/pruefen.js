/* Prüft Marktpreise (Plausibilität) und die Prüffälle aus Abschnitt 11 der Spezifikation.
 * Aufruf: node werkzeug/pruefen.js [datei.html ...]   (Standard: index.html). Exit-Code 1 bei Fehler. */
'use strict';
const fs = require('fs'), path = require('path');
const { JSDOM } = require('jsdom');
const dateien = process.argv.slice(2).length ? process.argv.slice(2) : [path.join(__dirname, '..', 'index.html')];
let fehler = 0;
const f = (x, d = 0) => x.toLocaleString('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d });

for (const datei of dateien) {
  const errs = [];
  const d = new JSDOM(fs.readFileSync(datei, 'utf8'), { runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x.test/',
    beforeParse(w) { w.onerror = (m) => errs.push(m); w.HTMLCanvasElement.prototype.getContext = () => null; w.scrollTo = () => {}; } });
  const w = d.window, E = (s) => w.eval(s), rows = [];
  const ok = (n, e, b, c) => { rows.push(`| ${n} | ${e} | ${b} | ${c ? 'OK' : 'FEHLER'} |`); if (!c) fehler++; };

  // --- Plausibilität der Marktpreise ---
  const P = E('window.PREISE');
  const bereich = (n, x, lo, hi) => ok('Preis ' + n, `${lo}–${hi}`, String(x), typeof x === 'number' && x >= lo && x <= hi);
  bereich('Heizöl Ø DE €/100 l', P.oel.de.wert, 50, 300);
  Object.entries(P.oel.laender).forEach(([k, v]) => { if (!(v.wert >= 50 && v.wert <= 300)) ok('Heizöl ' + k, '50–300', String(v.wert), false); });
  bereich('Erdgas Ø DE ct/kWh', P.gas.de.wert, 5, 40);
  Object.entries(P.gas.laender).forEach(([k, v]) => { if (!(v.wert >= 5 && v.wert <= 40)) ok('Erdgas ' + k, '5–40', String(v.wert), false); });
  bereich('Flüssiggas Ø €/100 l (3.000 l)', P.fluessiggas.schnitt.l3000, 40, 200);
  Object.entries(P.fluessiggas.staedte).forEach(([k, v]) => { if (!(v.l3000 >= 40 && v.l3000 <= 200 && v.l5000 >= 40 && v.l5000 <= 200)) ok('Flüssiggas ' + k, '40–200', JSON.stringify(v), false); });
  bereich('Pellets Ø €/t (6 t)', P.pellets.de6, 200, 900);
  bereich('Scheitholz €/Ster', P.holz.preis, 60, 300);
  bereich('Hackgut €/MWh', P.hack.mwh, 15, 80);

  // --- Prüffälle Abschnitt 11 ---
  const reset = () => E(`S=WV.vorgabenAnwenden(WV.vorlageLeer());S.erhebung.forEach(z=>z.aktiv=false);aenderung(true);`);
  const Z = (k, o) => E(`Object.assign(S.erhebung.find(z=>z.key==='${k}'),${JSON.stringify(o)});aenderung(true);`);
  const R = () => E('R'), V = () => E('VGL.slice()'), kw = (x) => E('kwAb')(x);
  const leer = E('S.erhebung.every(z=>!z.aktiv)&&!S.titel');
  ok('Start leer', 'ja', leer ? 'ja' : 'nein', leer);
  reset(); Z('oel', { aktiv: true, menge: 2000 }); let r = R();
  ok('1 Öl 2.000 l', '16.000 kWh/a · 8,0 kW', `${f(r.nutzwaerme)} kWh/a · ${f(kw(r.heizleistung), 1)} kW`, Math.round(r.nutzwaerme) === 16000 && kw(r.heizleistung) === 8);
  Z('kamin', { aktiv: true, menge: 4, bleibt: true }); r = R(); let v = V();
  ok('2 + Kaminofen-Zusatz bleibt', '16.000 kWh/a · 8,0 kW · Öl', `${f(r.nutzwaerme)} kWh/a · ${f(kw(r.heizleistung), 1)} kW · ${v.join('+')}`, Math.round(r.nutzwaerme) === 16000 && kw(r.heizleistung) === 8 && v.join() === 'oel');
  Z('kamin', { bleibt: false }); r = R(); v = V(); const inv = r.ergebnisse.kofen.invAngesetzt;
  ok('3 Kaminofen nicht weiter', '18.900 kWh/a · 9,4 kW · Öl, Kaminofen 10.000 €', `${f(r.nutzwaerme)} kWh/a · ${f(kw(r.heizleistung), 1)} kW · ${v.join(', ')} ${f(inv)} €`, Math.round(r.nutzwaerme) === 18900 && kw(r.heizleistung) === 9.4 && v.join() === 'oel,kofen' && inv === 10000);
  reset(); Z('hack', { aktiv: true, menge: 30 }); E('marktpreiseAnwenden(true);aenderung(true)'); r = R();
  const hp = +(P.hack.mwh * 679 / 1000).toFixed(2);
  ok('4 Hackgut 30 m³', `16.296 kWh/a · ${f(hp, 2)} €/SRM`, `${f(r.nutzwaerme)} kWh/a · ${f(E('S.v.hack.preis'), 2)} €/SRM`, Math.round(r.nutzwaerme) === 16296 && E('S.v.hack.preis') === hp);
  reset(); Z('oel', { aktiv: true, menge: 2000 });
  const kb = (z) => E(`S.kfw=Object.assign(kfwStandard(),{zve:${z},kind:true,tausch:false});kfwErgebnis()`);
  const eb = (k) => (k.teile.find((t) => t[0] === 'Einkommensbonus') || [0, 0])[1];
  let k = kb(59999); ok('5a mit Kind 59.999 €', '10 %', f(eb(k) * 100) + ' %', Math.abs(eb(k) - 0.1) < 1e-9);
  k = kb(60000); ok('5b mit Kind 60.000 €', '0 %', f(eb(k) * 100) + ' %', eb(k) === 0);
  k = kb(39999); ok('5c mit Kind 39.999 €', '40 % · Deckel 80 %', `${f(eb(k) * 100)} % · ${f(k.deckel * 100)} %`, Math.abs(eb(k) - 0.4) < 1e-9 && Math.abs(k.deckel - 0.8) < 1e-9);
  reset(); Z('gas', { aktiv: true }); E(`gasArtSetzen('fluessig');S.erhebung.find(z=>z.key==='gas').menge=2000;aenderung(true)`);
  const g0 = E('S.v.gas.grund');
  E(`geheZu(schrittListe().findIndex(s=>s.id==='annahmen'))`); const sichtGas = !!w.document.querySelector('[data-gasart]');
  E(`(()=>{const z=S.erhebung.find(z=>z.key==='gas');z.tankMiete=15;S.v.gas.grund=15;aenderung(true);marktpreiseAnwenden(true);aenderung(true);})()`);
  const g1 = E('S.v.gas.grund'), nm = R().ergebnisse.gas.name;
  ok('6 Flüssiggas Mietbehälter', '12 €/Monat; 15 € bleibt', `${f(g0, 2)} → ${f(g1, 2)} €/Monat (${nm})`, g0 === 12 && g1 === 15 && nm === 'Flüssiggas');
  reset(); Z('oel', { aktiv: true, menge: 2000 }); E(`geheZu(schrittListe().findIndex(s=>s.id==='annahmen'))`);
  const has = !!w.document.querySelector('[data-gasart]');
  ok('7 ohne Gas im Bestand', 'keine Gas-Auswahl', has ? 'Auswahl sichtbar' : 'keine Auswahl', !has && sichtGas);
  ok('Skriptfehler', 'keine', errs.length ? errs.join('; ') : 'keine', errs.length === 0);
  console.log('\n## ' + path.basename(path.dirname(datei)) + '/' + path.basename(datei) + ' – Preise vom ' + P.aktualisiert);
  console.log('| Prüfung | erwartet | berechnet | OK |\n|---|---|---|---|\n' + rows.join('\n'));
}
console.log(fehler ? `\n${fehler} FEHLER – nicht veröffentlichen.` : '\nAlle Prüfungen OK.');
process.exit(fehler ? 1 : 0);
