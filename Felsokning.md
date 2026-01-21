
## Felsökning (Troubleshooting)

Om du upplever problem med att spara, starta eller köra skriptet korrekt, följ stegen nedan för att återställa stabil funktion:

### Skriptet sparas inte, startar inte, eller slutar oväntat

**1)** Stoppa alla aktiva skript <br>
    Gå till "Scripts" och klicka på "Stop" för varje aktivt skript.

**2)** Inaktivera "Run on startup" <br>
    Avmarkera rutan *Run on startup* för samtliga skript.

**3)** Kontrollera Matter (Gen 3 / Gen 4)<br>
- På Shelly Gen 3 och Gen 4-enheter **måste Matter vara inaktiverat**.
- Matter och skript delar samma minnesresurser, vilket kan förhindra att skriptet startar eller körs korrekt.

**4)** Starta om enheten <br>
- Gå till *Settings → Reboot Device*.

**5)** Aktivera "Run on startup" igen<br>
    - Efter omstart, markera *Run on startup* endast för det skript du vill köra ( shelly-elprisSE ). Undvik att aktivera denna inställning för andra skript samtidigt.

**6)** Rensa upp gamla skript och data <br>
    - Radera skript som inte längre används.
    - Ta bort eventuella stora skript som tar upp för mycket minne.

**7)** Töm KVS-lagringen <br>
    - Gå till KVS i Shelly GUI
    - Ta bort onödiga/gamla nycklar manuellt.

**8)** Starta skriptet på nytt <br>
    - Gå till "Scripts" → klicka på "Start" vid ditt aktiva skript.

---

> 💡 Tips: Kontrollera alltid konsolen för loggutskrifter. Använd `print()` i skriptet för felsökning vid behov.

Om problemet kvarstår kan du skapa ett nytt issue i [GitHub-projektet](https://github.com/Soviet9773Red/shelly-elprisSE/issues) eller kontakta utvecklaren.
