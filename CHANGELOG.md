# Changelog – shelly-elprisSE

Här dokumenteras ändringar mellan olika versioner av skriptet `shelly-elprisSE`, från release candidate till stabila utgåvor.

## Version [3.1.2SEgit](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/shelly-elpris3.1.2SEgit.js) (2025-10-01)

**Anpassad version för övergången till 15-minuterspriser (96 punkter per dygn).**  
Tidigare hämtades data direkt från [elprisetjustnu.se](https://www.elprisetjustnu.se/) via deras JSON-API.  
Nu hämtas färdigbehandlade filer **day0.json** (idag) och **day1.json** (imorgon) direkt från detta GitHub-repo.

#### ✅ Förbättringar:

- Stöd för det nya 15-minutersformatet: data aggregeras externt (privat Raspberry Pi 3) från 96 kvartstimmar till 24 hela timmar.
- Stabil hämtning av day0/day1 från GitHub i stället för direkt från API:t.
- Förbättrad kompatibilitet med Shelly-enheter med begränsat minne (optimerad datahantering).
- Tydligare README med information om den nya datakällan och övergångslösningen.

#### ⚠️ Noteringar:

- **day1.json** kan saknas en stund efter midnatt fram till nästa uppdatering.
- Detta är en tillfällig lösning. Utvecklingen fortsätter för att i framtiden stödja 96-intervall mer direkt.


## Version [3.1.2SE](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/shelly-elpris3.1.2SE.js) (2025-04-27)

**Stabil version baserad på tidigare 3.1.1SE, med förfinade förbättringar för tillförlitlighet, tidshantering och konsolloggning.**

#### ✅ Förbättringar:

- **Centraliserad tidshantering (`_.s.now`):**  
  Alla delar av systemet använder nu en gemensam tidsreferens från `updateState()`. Detta förbättrar synkronisering, minskar risk för tidsavvikelser mellan olika moduler och möjliggör framtida testlägen.

- **Smartare hantering av API-förfrågningar:**  
  Om morgondagens priser ännu inte finns tillgängliga efter den schemalagda tiden (`14:MM`), väntar systemet automatiskt i 60 minuter innan nästa försök görs. Ett tydligt konsolmeddelande visas vid 404-svar.

- **00:00 - midnattshantering utan onödig API-belastning:**  
  Inga nya API-förfrågningar görs vid midnatt. Om priser för morgondagen (`p[1]`) redan är tillgängliga, kopieras de direkt till dagens array (`p[0]`). Detta minskar risken för samtidig belastning på API:et runt 00:00.

- **Ny skyddsflagga `dayUpdated`:**  
  Systemet markerar när prisdata har kopierats vid midnatt och förhindrar onödiga ytterligare hämtningar under samma dag. Flaggan återställs automatiskt vid dagsskifte.

- **Förbättrade konsolloggar och endpoint-meddelanden:**  
  Viktiga status- och felmeddelanden har skrivits om för att vara tydligare och mindre alarmistiska. Exempelvis ersattes "Time changed 5 min+ -> refresh" med "Time sync detected -> refreshing data". Även endpoint-fält som beskriver priskontroll (t.ex. "High price interval", "Low price interval") har harmoniserats.

- **Optimerad historikhantering för minnessnålt arbete:** 
  Historik för utgångar (`_.h`) skrivs nu alltid baserat på förändringar i tillstånd (On-change). Vid aktivering av "Detailed console log" kan även stabila tillstånd registreras i konsollen för mer detaljerad överblick.


- **Förbättrad stabilitet i tidslogik:**  
  Synkronisering mellan datumkontroller och interna epoch-värden har förbättrats för att minimera risken för oönskade upprepade `logic()`-körningar.

#### 🔧 Övriga mindre justeringar:

- Terminologi i Settings (`Log outputs`) har förfinats: "On-change", "Detailed console log".
- Smärre grammatiska och stilistiska förbättringar i interna och externa texter.
- Ingen ändring av baslogik i styrning eller API-hantering sedan 3.1.1SE — endast förbättringar i stabilitet, presentation och testbarhet.


## Version [3.1.1SE](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/arch/shelly-elpris3.1.1SE.js) (2025-04-17)

**Stabil version baserad på tidigare 3.1.1SE-rc, med omfattande förbättringar i stabilitet och kompatibilitet.**

#### ✅ Förbättringar:

- **Nytt parsersystem:** Funktionen `pTime` har tagits bort. Ny parsning i `getPrices()` använder enklare, effektivare metod inspirerad av [@MikaelUlvesjo](https://github.com/MikaelUlvesjo)
- **Endimensionell struktur:** Prislistan `p[r]` är nu en enkel array  `[pris]` istället av originala varianten med `[epoch, pris]`, vilket sparar minne.
- **Omskrivning av logik:** Funktion `logic()` och tillhörande endpoint-delar har anpassats till den nya datamodellen.
- **Stöd för sommar-/vintertid:** Konsolmeddelande visas vid skifte. För enkelhetens skull används alltid 24 datapunkter – en timme dupliceras eller hoppas över.
- **API-hämtningens klockslag:** Standardtid för hämtning är nu definierad som variabel `ah` (standard = 14). Minut randomiseras en gång för att minska simultan belastning.
- **Endpoint-förbättringar:** Menylista `Control` har bytt namn till `Config`.
- **Tidsintervall för "Transfer fees"** har ändrats till 06–22 för att spegla svenska elnätsaktörers tariffzoner.
- **Förkortad historik:** Antalet historikposter per instans har minskats från 24 till 12 för att minska minnesbelastning.
- **Ny standard för loggning:** Logging sker nu som standard endast vid ändring av utgång (On-Change).
- **Skydd mot API-loopar:** Om priser för imorgon saknas, visas ett konsolmeddelande och nästa försök förskjuts med 1 timme.

---

## Version [3.1.1SE-rc](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/arch/shelly-elprisSE_3.1.1se-rc.js) (2025-03-20)

**Första svenska testanpassade versionen av shelly-porssisahko för SE1–SE4.**

#### 🚧 Förändringar jämfört med original (jisotalo):
- API-adress ändrad från `elering.ee (.csv)` till `elprisetjustnu.se (.json)`.
- Funktionerna `bldU()` och `pTimeL()` introducerades för svensk JSON-struktur.
- Stöd för elområden SE1–SE4. Baltikum och Finland togs bort.
- Justerade färgkoder och rubriker i HTTP-gränssnittet.
- Kompatibilitet testad på Shelly Plus 1 / 1PM / Plug S / Pro 3.
- Teststatus: instabil vid vissa prisförfrågningar (minnesproblem).

> ⚠️ Detta var en "release candidate" – fungerande men med kända begränsningar.
