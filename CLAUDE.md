# PhoneFactory frontend

Telefon do'koni sayti: React 18 (Create React App) + TypeScript/JS aralash, Redux Toolkit, MUI, Bootstrap.
Backend alohida repo: `soxibdavurov/phonefactoryBackend` (Express + MongoDB, EJS admin).

Muallif Soxibjon, junior full-stack dasturchi. **Javoblarni o'zbek tilida (lotin)** bering,
qisqa va qadamma-qadam, buyruqlarni u o'zi ishga tushiradigan qilib.

## Tuzilma
- `src/app/screens`: sahifalar (homePage, shopPage, cartPage, ordersPage, userPage ...)
- `src/app/components`: header, footer, auth va boshqalar
- `src/app/services`: API so'rovlari (axios): `ProductService`, `MemberService`, `OrdersService`
- `src/app/stores`: Redux slice'lar va context
- `src/lib/config.ts`: `serverApi = process.env.REACT_APP_API_URL`
- `public/video`: bosh sahifa videolari (siqilgan, 540px, ovozsiz) va `poster` rasmlari

## Ishga tushirish (lokal)
- Node 20, `npm install --legacy-peer-deps` (package-lock.json package.json bilan mos emas), `npm start`
- `.env`: `REACT_APP_API_URL=http://localhost:3004`
- `REACT_APP_*` o'zgaruvchilar **build paytida** kodga yoziladi: o'zgarsa qayta build kerak.

## Deploy (Hostinger VPS, Docker)
- `Dockerfile`: node:20 da build (`REACT_APP_API_URL` build arg), keyin nginx:1.27-alpine
- `nginx.conf`: SPA uchun `try_files ... /index.html`, `/static/` 1 yil, video/rasm 7 kun kesh
- Prod: https://pf.dunyo.express, API https://api.pf.dunyo.express
- VPS (`72.61.127.164`) da `~/phonefactory` ichida, docker-compose backend repo'ning `deploy/` papkasidan

Yangilash:
```
cd ~/phonefactory
git -C phonefactory-react pull
docker compose --profile caddy up -d --build frontend
```

## Ma'lum holatlar
- `ProductService.ts` va `shopPage/index.tsx` da debug `console.log` lar bor, prod'da olib tashlash mumkin.
- Konsoldagi `contentscript.js` / "Receiving end does not exist" xatolari Chrome kengaytmalariniki, saytniki emas.

## Qoidalar
- O'zgarishlar lokalda qilinadi, GitHub'ga push, keyin VPS'da `git pull`. VPS'da kodni tahrirlamang.
- Sirlarni chatga, kodga yoki commit'ga yozmang.
