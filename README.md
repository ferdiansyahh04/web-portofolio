# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## DataByte AI Chatbot Integration

Portfolio ini punya floating AI chatbot yang bisa jawab pertanyaan visitor tentang skill, pengalaman, dan project. Powered by [DataByte AI](https://ai.databyte.co.id/).

### Arsitektur

- `api/chat.js` — Vercel Serverless Function sebagai proxy aman ke DataByte AI. API key disimpan di environment variable, **tidak pernah** terbawa ke browser.
- `src/components/AIChat.jsx` — floating chat widget dengan style match portfolio.
- System prompt sudah diisi context lengkap dari portfolio (profil, pengalaman, project, sertifikasi).

### Setup

1. Daftar di [ai.databyte.co.id](https://ai.databyte.co.id/) → Dashboard → Keys → Create Key (key diawali `sk-db-`).
2. Di Vercel project dashboard → Settings → Environment Variables, tambahkan:
   - Key: `DATABYTE_API_KEY`
   - Value: `sk-db-xxxxxxxxx` (key dari step 1)
   - Environments: Production, Preview, Development
3. Redeploy. Done.

### Local development

Buat file `.env` di root (sudah di-`.gitignore`):

```
DATABYTE_API_KEY=sk-db-xxxxxxxxx
```

Jalankan dengan Vercel CLI biar `/api` routes ke-execute lokal:

```bash
npm i -g vercel
vercel dev
```

Atau jalan biasa `npm run dev` — chat akan tetep render tapi request ke `/api/chat` akan gagal kalau gak ada backend lokal.

### Catatan keamanan

- API key **tidak pernah** ada di kode frontend / bundle.
- Endpoint `/api/chat` cek origin → cuma allow request dari domain Vercel sendiri + localhost dev.
- History dibatasi 12 message terakhir, max 1000 char per message.
- `max_tokens` dibatasi 500 per response untuk hemat quota.
