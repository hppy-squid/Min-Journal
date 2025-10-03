# Min-Journal
Inlämningsuppgift - Min Journal


Detta är frontend-delen av Journal-applikationen. Frontend är byggd i **Angular 17+** och kommunicerar med Journal API (backend). Applikationen tillåter användaren att registrera sig, logga in, skriva inlägg samt visa statistik över inlägg.

## Funktioner

* **Inloggning och registrering**
* **Skriv nya inlägg med status**
* **Lista inlägg för inloggad användare**
* **Statistik** för valfri tidsperiod
* **Visualisering av statistik** med `ng2-charts` (Chart.js)

## Teknologier

* Angular 17+
* RxJS
* ng2-charts (Chart.js)
* TypeScript
* HTML & CSS

## Kom igång

1. Klona repot

   ```bash
   git clone <frontend-repo-url>
   cd Journal-Frontend
   ```

2. Installera dependencies

   ```bash
   npm install
   ```

3. Starta utvecklingsservern

   ```bash
   ng serve
   ```

4. Frontend körs på:

   ```
   http://localhost:4200
   ```

## Struktur

* **services/**

  * `auth.service.ts` – hanterar API-anrop till login, logout, register
  * `api.service.ts` – hanterar API-anrop till inlägg och statistik
* **components/**

  * `login/` – login-sida
  * `register/` – registreringssida
  * `posts/` – lista och skapa inlägg, samt visa statistik
  * `header/` – header med användarnamn och logout

