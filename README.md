# BrodWine – web stranica

Statična web stranica udruge **BrodWine** (Udruga za promicanje vina i vinske kulture, Slavonski Brod).
Dizajn i izrada: **MakeIT Pro d.o.o.**

Uživo (GitHub Pages): https://makeit-pro.github.io/brodwine-web/

## Stranice

| Datoteka | Sadržaj |
|---|---|
| `index.html` | Početna (video uvod, vino mjeseca, udruga, večeri, Wine Club, mediji) |
| `udruga.html` | Priča, načela, ljudi |
| `vinske-veceri.html` | Sljedeća večer, tijek večeri, arhiva, galerija |
| `vecer.html` | Pojedina večer – program, vinska karta, prijava |
| `vino-mjeseca.html` | Vino mjeseca s bilješkama i arhivom |
| `wine-club.html` | Članstvo, pogodnosti, česta pitanja |
| `privatne-degustacije.html` | Ponuda i upit za privatne degustacije |
| `kontakt.html` | Kontakt i obrazac |
| `privatnost.html` | Politika privatnosti (predložak – provjeriti prije objave) |
| `en.html` | Početna na engleskom |
| `en-*.html` | Engleske verzije svih podstranica (about, wine-evenings, evening, wine-of-the-month, wine-club, private-tastings, contact, privacy) |
| `404.html` | Stranica „nije pronađeno“ (HR/EN) |

## Tehničke napomene

- Slike su u WebP formatu u dvije veličine (800 i 1600 px) sa `srcset` i odgođenim učitavanjem; `og-brodwine.jpg` je slika za dijeljenje na mrežama (1200×630).
- Fontovi se poslužuju lokalno, bez poziva prema Googleu.
- HR/EN prekidač nalazi se u zaglavlju svake stranice; stranice su povezane `hreflang` oznakama.

## Pokretanje lokalno

Nema build koraka – otvorite `index.html` ili u ovoj mapi pokrenite `python3 -m http.server` i otvorite http://localhost:8000.

## Što još treba prije službene objave

- Zamijeniti oznake u uglatim zagradama (`[DATUM]`, `[VINARIJA]`, `[OIB]`, `[IZNOS]` …) stvarnim podacima.
- Obrasci trenutno samo prikazuju potvrdu i **ništa ne šalju** (`form[data-demo]` u `assets/js/site.js`) – povezati s backendom ili servisom za obrasce.
- Portrete ljudi i fotografije s večeri zamijeniti originalnim fotografijama udruge.
- Video (`assets/video/brodwine-vecer.mp4`) složen je od stock fotografija – zamijeniti snimkom s večeri.
- Politiku privatnosti uskladiti sa stvarnim alatima i rokovima te dati na provjeru.
- Kad stranica dobije vlastitu domenu, promijeniti adrese u `sitemap.xml`, `robots.txt` i `<link rel="canonical">`.

## Zasluge

- Fotografije: [Unsplash](https://unsplash.com) (Unsplash License – slobodna komercijalna upotreba), tonski ujednačene.
- Fontovi: Cinzel, Cormorant Garamond, Montserrat, Great Vibes – SIL Open Font License, poslužuju se lokalno iz `assets/fonts/`.
