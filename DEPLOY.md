# Деплой Grand City (фронтенд)

## 1. Локальный запуск / тест

```bash
npm install
cp .env.example .env.local
npm run dev
```

Откройте http://localhost:3000.

`.env.local` уже настроен на бэкенд `http://localhost:8080` — если backend
(Spring Boot) поднят локально, каталог, агенты, заявки и админка сразу заработают
на реальных данных.

**Важно:** раньше сайт мог "зависать" при `npm run dev`/`npm run build` и не
показывать ссылку на localhost — это была загрузка шрифтов Google Fonts
(`next/font/google`) в момент сборки, требующая живого интернета до
fonts.googleapis.com. Шрифты теперь зашиты в сам проект (`@fontsource-variable/manrope`,
`@fontsource/cormorant-garamond`) — сборка и `npm run dev` больше не обращаются в
сеть за шрифтами и не зависают, даже без интернета/за VPN.

## 2. Продакшен-сборка (проверка перед деплоем)

```bash
npm run build
npm run start     # поднимет прод-сервер локально на порту 3000, для финальной проверки
```

Если `npm run build` прошёл без ошибок — сайт готов к деплою.

## 3. Перед пушем на сервер — правим переменные окружения

На проде **обязательно** замените `.env.local` (или создайте `.env.production`)
на реальные адреса:

```
NEXT_PUBLIC_SITE_URL=https://ваш-домен.kg
NEXT_PUBLIC_API_URL=https://api.ваш-домен.kg
```

`NEXT_PUBLIC_API_URL` должен указывать на реально доступный извне бэкенд (Spring
Boot), а не на `localhost`. Также убедитесь, что на бэкенде `CORS_ALLOWED_ORIGINS`
включает `https://ваш-домен.kg` (см. `README.md`/`DEPLOY` бэкенда).

`.env.local`/`.env.production` не коммитятся в git (см. `.gitignore`) — на сервере
их нужно создать заново или передать через переменные окружения хостинга/CI.

## 4. Варианты деплоя

### А) Node-сервер (VPS, свой домен) — самый простой вариант под ваш кейс

```bash
npm install
npm run build
npm run start -- -p 3000   # или просто npm run start, порт по умолчанию 3000
```

Дальше — Nginx как реверс-прокси на 80/443 → `127.0.0.1:3000`, плюс Let's Encrypt
для HTTPS. Процесс держите живым через `pm2` или systemd-юнит, например:

```bash
npm install -g pm2
pm2 start "npm run start" --name grand-city-frontend
pm2 save
```

### Б) Vercel (если нужен деплой одной кнопкой, без своего VPS)

Импортировать репозиторий в Vercel → указать `NEXT_PUBLIC_SITE_URL` и
`NEXT_PUBLIC_API_URL` в Environment Variables проекта → Deploy. Домен
подключается в настройках проекта Vercel.

### В) Docker (если бэкенд тоже в контейнере / нужен единый деплой)

Минимальный `Dockerfile` (добавьте, если нужно контейнеризировать):

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app ./
EXPOSE 3000
CMD ["npm", "run", "start"]
```

## 5. Чеклист перед пушем

- [ ] `npm run build` проходит без ошибок локально.
- [ ] `.env.production`/переменные окружения на сервере указывают на реальный
      домен сайта и реальный публичный адрес бэкенда (не `localhost`).
- [ ] Бэкенд поднят, доступен по HTTPS, `CORS_ALLOWED_ORIGINS` включает домен фронта.
- [ ] Пройден чеклист приёмки бэкенда (см. `BACKEND_TASK.md` §11) — каталог,
      заявки, админка, загрузка фото работают через `NEXT_PUBLIC_API_URL`.
- [ ] Домен привязан, HTTPS настроен (Let's Encrypt/Vercel/облако — на ваш выбор).
