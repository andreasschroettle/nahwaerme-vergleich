#!/usr/bin/env python3
"""Erzeugt laub/index.html: gleiche Rechnung, Logo „Nahwärme Laub“ statt ENERPIPE-Logo.
Aufruf: python3 werkzeug/variante-laub.py  (nach jeder Änderung an index.html erneut ausführen)"""
import base64, re, pathlib
wurzel = pathlib.Path(__file__).resolve().parent.parent
s = (wurzel / 'index.html').read_text(encoding='utf-8')
neu = 'data:image/png;base64,' + base64.b64encode((wurzel / 'werkzeug/logos/nahwaerme-laub.png').read_bytes()).decode()
alt = re.search(r'class="logo logo-enerpipe" src="(data:image/png;base64,[^"]+)"', s).group(1)
assert s.count(alt) == 2, s.count(alt)
s = s.replace(alt, neu)
s = s.replace('alt="ENERPIPE – Wir bringen Wärme auf den Weg!" width="494" height="180"', 'alt="Nahwärme Laub" width="469" height="220"')
s = s.replace('class="qrlogo" src="' + neu + '" alt="ENERPIPE"', 'class="qrlogo" src="' + neu + '" alt="Nahwärme Laub"')
s = s.replace('header.top .logo-enerpipe { height: 54px; margin: 0; }', 'header.top .logo-enerpipe { height: 64px; margin: 0; }')
s = s.replace('<title>Vergleich Bestandsheizung – Nahwärme</title>', '<title>Vergleich Bestandsheizung – Nahwärme Laub</title>')
ziel = wurzel / 'laub' / 'index.html'; ziel.parent.mkdir(exist_ok=True); ziel.write_text(s, encoding='utf-8')
print('geschrieben:', ziel, len(s), 'Zeichen')
