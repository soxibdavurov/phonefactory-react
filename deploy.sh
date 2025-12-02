#!/bin/bash


# PRODUCTION (kerak bo'lsa ochib ishlatasan)
git reset --hard
git checkout main
git pull origin main

# Yarn / dependencylar (bir marta o'rnatib qo'ygansan bo'lsa, quyidagilarni komment qilsang ham bo'ladi)
npm install -g yarn
yarn global add serve

# Loyihaning dependencylarini o'rnatish
yarn

# Production build
yarn run build

# Eski pm2 process bo'lsa o'chiramiz (bo'lmasa ham xato bermasin)
# pm2 delete BURAK-REACT 2>/dev/null || true

# pm2 orqali yarn scriptni ishga tushirish
pm2 start "yarn run start:prod" --name=BURAK-REACT

# # pm2 configni saqlab qo'yish (server qayta yoqilganda ham ishlashi uchun, agar pm2 startup qilgan bo'lsang)
# pm2 save