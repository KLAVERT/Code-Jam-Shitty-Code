# Gebruik van PNPM & Shitty Code code jam

_Voor deze kennisdeling & code jam ga je leren met code te werken van slechte developers & leer je hoe je pnpm moet installeren en gebruiken. Ook leer je te werken met tailwind als je dit nog niet kan of ga je het gebruiken! Veel succes en plezier namens ons!_

## PNPM installation

Om dit project te runnen heb je `pnpm` nodig. Dit installeer je door het volgende in je terminal te typen van je code editor of windows terminal:

```bash
Invoke-WebRequest https://get.pnpm.io/install.ps1 -UseBasicParsing | Invoke-Expression
```

Als je al npm hebt kan je ook

```bash
npm install -g pnpm@latest-10
```

of op macos

```bash
brew install pnpm
```

Hierna restart je je code editor of open je een nieuwe terminal. Sommige code editors hebben een restart nodig om `pnpm` te kunnen gebruiken

## Het draaien van het project

Om dit project te draaien voer je het volgende command uit:

```bash
pnpm i
```

Laat `pnpm` eventjes zijn ding doen om het project te installeren
vervolgens doe je het project starten. Dit doe je door het volgende command uit te voeren:

```bash
pnpm start
```

Wanneer de code compiled zonder errors is het gelukt! Je kan officieel beginnen aan de code jam! Veel plezier en succes!

## Opdrachten

- Fix de meeste bad practices die je kan vinden in de code
- Zorg dat de html structuur klopt, zoals h1 h2 of divs die als button worden gebruikt
- Zorg dat er 1 keuze wordt gemaakt voor styling, tailwind of css
- Voor de echte handige harries. Implementeer een routing library zoals react-router of tanstack router en zorg dat we naar een andere pagina kunnen gaan.
