# ---------- 1-bosqich: React'ni build qilish ----------
FROM node:20-bookworm AS build
WORKDIR /app

COPY package.json package-lock.json ./
# package-lock.json package.json bilan mos emas va eski kutubxonalar peer-dependency
# ziddiyatini beradi, shuning uchun hozircha "npm ci" emas, "npm install --legacy-peer-deps"
RUN npm install --legacy-peer-deps

COPY . .
# CRA REACT_APP_* o'zgaruvchilarini build paytida kodga yozib qo'yadi,
# shuning uchun API manzili runtime'da emas, build argument sifatida beriladi
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build

# ---------- 2-bosqich: tayyor statik fayllarni nginx bilan berish ----------
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
