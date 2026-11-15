#!/usr/bin/env python3
"""Erzeugt laub/index.html: gleiche Rechnung, Logo „Nahwärme Laub“ statt ENERPIPE-Logo.
Aufruf: python3 werkzeug/variante-laub.py [quelle.html ziel.html]  (nach jeder Änderung an index.html erneut ausführen)"""
import base64, re, pathlib
wurzel = pathlib.Path(__file__).resolve().parent.parent
import sys
quelle = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else wurzel / 'index.html'
s = quelle.read_text(encoding='utf-8')
neu = 'data:image/png;base64,' + base64.b64encode((wurzel / 'werkzeug/logos/nahwaerme-laub.png').read_bytes()).decode()
alt = re.search(r'class="logo logo-enerpipe" src="(data:image/png;base64,[^"]+)"', s).group(1)
assert s.count(alt) == 2, s.count(alt)
s = s.replace(alt, neu)
s = s.replace('alt="ENERPIPE – Wir bringen Wärme auf den Weg!" width="494" height="180"', 'alt="Nahwärme Laub" width="469" height="220"')
s = s.replace('class="qrlogo" src="' + neu + '" alt="ENERPIPE"', 'class="qrlogo" src="' + neu + '" alt="Nahwärme Laub"')
s = s.replace('header.top .logo-enerpipe { height: 54px; margin: 0; }', 'header.top .logo-enerpipe { height: 64px; margin: 0; }')
s = s.replace('href="https://andreasschroettle.github.io/nahwaerme-vergleich/">andreasschroettle.github.io/nahwaerme-vergleich</a>', 'href="https://andreasschroettle.github.io/nahwaerme-vergleich/laub/">andreasschroettle.github.io/nahwaerme-vergleich/laub</a>')
s = s.replace('<title>Vergleich Bestandsheizung – Nahwärme</title>', '<title>Vergleich Bestandsheizung – Nahwärme Laub</title>')
ziel = pathlib.Path(sys.argv[2]) if len(sys.argv) > 2 else wurzel / 'laub' / 'index.html'; ziel.parent.mkdir(exist_ok=True); ziel.write_text(s, encoding='utf-8')
print('geschrieben:', ziel, len(s), 'Zeichen')
