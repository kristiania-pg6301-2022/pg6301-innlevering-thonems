[![Coverage Status](https://coveralls.io/repos/github/kristiania-pg6301-2022/pg6301-innlevering-thonems/badge.svg?branch=main)](https://coveralls.io/github/kristiania-pg6301-2022/pg6301-innlevering-thonems?branch=main)
[![Run tests](https://github.com/kristiania-pg6301-2022/pg6301-innlevering-thonems/actions/workflows/test.yml/badge.svg)](https://github.com/kristiania-pg6301-2022/pg6301-innlevering-thonems/actions/workflows/test.yml)

# Quiz innlevering
Laget av Thomas Nemeth og Mathias Løkken
Heroku appen finner du her: https://pg6301-innlevering-thonems.herokuapp.com/

Denne innleveringen er anbefalt, men ikke påkrevd for å ta eksamen (PG6301 har ingen obligatoriske øvelser)

Dersom du gjør innleveringen vil du få verdifull input og kontroll opp mot eksamen. Innleveringen skal gjøres parvis. Det er tillatt og anbefalt at man samarbeider med andre par for å hjelpe hverandre.

Målet med innleveringen er at man skal kjøre en webapplikasjon på skytjenesten Heroku. Applikasjonen skal være en quiz der brukeren får et quiz-spørsmål og skal velge riktig svar.

Applikasjonen skal vise at dere behersker:

- Parcel
- React
- React Router
- Jest
- Github Actions
- Coveralls
- Express
- Heroku

Oppsummert:

* [x] Få en Parcel til å bygge en React applikasjon
* [x] Få React Router til å navigere rundt i applikasjonen
* [ ] Få React til å hente og lagre informasjon til et API
* [ ] Få Github Actions til å kjøre Jest-testene og publisere coverage til Coveralls
* [ ] Få Heroku til å publisere websidene

Express-serveren skal ha følgende API:

* [ ] GET /api/question - returnerer et tilfeldig spørsmål med { id, category, question, answers }
* [ ] POST /api/question - tar inn { id, answer } og returnerer "true" eller "false"
* [ ] Dere kan ta utgangspunkt i følgende eksempel på spørsmål, men dere må endre på formatet som returneres til klienten slik at klienten ikke vet hvilket alternativ som er riktig: https://quizapi.io/ (Lenker til en ekstern side.)

For å få vurdert innleveringen dere løse den med følgende GitHub classroom og alle gruppedeltagerne skal levere link i Canvas: https://classroom.github.com/a/lCmgaF2I

hei
