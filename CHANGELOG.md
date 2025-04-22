# Changelog – shelly-elprisSE

Här dokumenteras ändringar mellan olika versioner av skriptet `shelly-elprisSE`, från release candidate till stabila utgåvor.


## Version [3.1.2SE] (kommer strax)

**Stabil version baserad på tidigare 3.1.1SE, med förfinade förbättringar för tillförlitlighet och smartare beteende kring API och tidsövergångar.**

#### ✅ Förbättringar:

- **Smartare hantering av API-förfrågningar:**  
  Om morgondagens priser ännu inte finns tillgängliga efter den schemalagda tiden (`14:MM`), väntar systemet automatiskt i 60 minuter innan nästa försök görs. Ett tydligt konsolmeddelande visas vid 404-svar.

- **Midnattshändelse 00:00 – ingen API-belastning:**  
  Inga nya API-förfrågningar görs vid midnatt. Om priserna för imorgon (`p[1]`) redan är tillgängliga, kopieras de direkt till dagens array (`p[0]`). Det förhindrar onödig belastning på API:et runt 00:00 och minskar risken för samtidig åtkomst från flera enheter.

- **Ny skyddsflagga `dayUpdated`:**  
  Systemet markerar när data har kopierats vid midnatt och blockerar oavsiktliga ytterligare hämtningar för idag. Denna flagga återställs automatiskt när en ny dag etableras.

- **Förbättrad stabilitet i tidslogik:**  
  Bättre synkronisering mellan datumkontroller och interna epoch-värden, vilket minimerar risken för oönskade upprepade `logic()`-körningar.


## Version [3.1.1SE](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/shelly-elpris3.1.1SE.js) (2025-04-17)

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
