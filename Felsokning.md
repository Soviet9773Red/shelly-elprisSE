
## Felsökning (Troubleshooting)

Om du upplever problem med att spara, starta eller köra skriptet korrekt, följ stegen nedan för att återställa stabil funktion:

### ❗️ Problem: Skriptet sparas inte, startar inte, eller slutar oväntat

1. **Stoppa alla aktiva skript**
    - Gå till "Scripts" och klicka på "Stop" för varje aktivt skript.

2. **Inaktivera "Run on startup"**
    - Avmarkera rutan **Run on startup** för samtliga skript.

3. **Starta om enheten**
    - Gå till **Settings → Reboot Device**.

4. **Aktivera "Run on startup" igen**
    - Efter omstart, markera **Run on startup** endast för det skript du vill köra ( shelly-elprisSE ). Undvik att aktivera denna inställning för andra skript samtidigt.

5. **Rensa upp gamla skript och data**
    - Radera skript som inte längre används.
    - Ta bort eventuella stora skript som tar upp för mycket minne.

6. **Töm KVS-lagringen**
    - Gå till KVS i Shelly GUI
    - Ta bort onödiga nycklar manuellt.

7. **Starta skriptet på nytt**
    - Gå till "Scripts" → klicka på "Start" vid ditt aktiva skript.

---

> 💡 Tips: Kontrollera alltid konsolen för loggutskrifter. Använd `print()` i skriptet för felsökning vid behov.

Om problemet kvarstår kan du skapa ett nytt issue i [GitHub-projektet](https://github.com/Soviet9773Red/shelly-elprisSE/issues) eller kontakta utvecklaren.
