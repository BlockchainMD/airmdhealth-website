# AirMD Health

Landing page for AirMD Health, a free telehealth chatbot. The interface mimics the ChatGPT layout and includes a **Get Care Now** button to connect users with a doctor.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your Azure OpenAI details.
   ```bash
   cp .env.example .env
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` – start the development server
- `npm run build` – build the production bundle
- `npm start` – run the production server
- `npm test` – run project tests (currently none)
