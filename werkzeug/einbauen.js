/* Baut die Marktpreise aus preise.js in index.html ein (zwischen PREISE-START und PREISE-ENDE).
 * Optional: node werkzeug/einbauen.js <ordner>  erzeugt zusätzlich <ordner>/index.html als Perplexity-Fassung
 * (Zwischenspeicher nur für die Sitzung statt Browserspeicher, Hosting-Hinweis Perplexity). */
'use strict';
const fs = require('fs'), path = require('path');
const wurzel = path.join(__dirname, '..');
const preise = fs.readFileSync(path.join(wurzel, 'preise.js'), 'utf8').trim();
const datei = path.join(wurzel, 'index.html');
let h = fs.readFileSync(datei, 'utf8');
const re = /(\/\* PREISE-START[^\n]*\*\/\n)[\s\S]*?(\/\* PREISE-ENDE \*\/)/;
if (!re.test(h)) throw new Error('Marker PREISE-START/PREISE-ENDE fehlen in index.html');
h = h.replace(re, (m, a, b) => a + preise + '\n' + b);
fs.writeFileSync(datei, h);
console.log('preise.js eingebaut in index.html');

const ziel = process.argv[2];
if (ziel) {
  const alt = "const speicherLesen = (k, def) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } };\nconst speicherSchreiben = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } };";
  if (!h.includes(alt)) throw new Error('Speicherfunktionen nicht gefunden');
  let px = h.replace(alt, "/* Perplexity-Fassung: Zwischenspeicher nur für die laufende Sitzung. Dauerhaft sichern über Datei → Speichern. */\nconst SITZUNG = new Map();\nconst speicherLesen = (k, def) => { try { const v = SITZUNG.get(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } };\nconst speicherSchreiben = (k, v) => { try { SITZUNG.set(k, JSON.stringify(v)); return true; } catch (e) { return false; } };");
  px = px.replace(/<p>Diese Seite wird über GitHub Pages bereitgestellt[\s\S]*?<\/a>\.<\/p>/, '<p>Diese Fassung wird über Perplexity bereitgestellt (Perplexity AI, Inc., USA). Beim Aufruf verarbeitet der Anbieter technisch notwendige Zugriffsdaten (u. a. IP-Adresse, Zeitpunkt). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.</p>')
         .replace('Der zuletzt bearbeitete Stand und von Ihnen gespeicherte Vergleiche werden nur lokal in Ihrem Browser abgelegt (lokaler Speicher), damit Sie weiterarbeiten können.\n      Sie können diese Daten jederzeit über die Einstellungen Ihres Browsers löschen.', 'In dieser Fassung bleibt der Zwischenstand nur, solange die Seite geöffnet ist.');
  if (/localStorage/.test(px)) throw new Error('localStorage in Perplexity-Fassung');
  fs.mkdirSync(ziel, { recursive: true });
  fs.writeFileSync(path.join(ziel, 'index.html'), px);
  console.log('Perplexity-Fassung geschrieben:', path.join(ziel, 'index.html'));
}
