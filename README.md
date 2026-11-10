# BozorGo — iPhone uchun o‘rnatiladigan marketplace (PWA)

BozorGo Next.js + TypeScript + Tailwind CSS asosida yaratilgan. PWA sozlamalari qo‘shildi:
- iPhone Home Screen'ga ilova kabi qo‘shish (`display: standalone`)
- Ilova nomi, ranglari va ikonkalari
- Service Worker orqali asosiy sahifa va statik resurslarni keshlash
- iPhone va desktop uchun mos interfeys

## Saytni ishga tushirish
Node.js 18.17+ kerak.

```bash
npm install
npm run dev
```

Lokal test: http://localhost:3000

## iPhone'ga ilova qilib o‘rnatish
PWA iPhone'da **HTTPS orqali ochilgan domen**da ishlaydi. `localhost` yoki oddiy ZIP faylni Safari'dan ilova qilib o‘rnatib bo‘lmaydi.

1. Loyihani GitHub repository'ga joylang.
2. Vercel'da GitHub orqali import qilib deploy qiling (HTTPS domen avtomatik beriladi).
3. iPhone'da Safari orqali deploy qilingan saytni oching.
4. Pastdagi **Share / Ulashish** tugmasini bosing.
5. **Add to Home Screen / Bosh ekranga qo‘shish** ni tanlang.
6. Nomini `BozorGo` qoldirib, **Add / Qo‘shish** ni bosing.

Shundan so‘ng BozorGo ikonka orqali to‘liq ekranli, ilova ko‘rinishida ochiladi.

## Demo cheklovlari
Bu PWA frontend demo hisoblanadi. Haqiqiy login, server bazasi, buyurtma/to‘lov, rasm yuklash, push-bildirishnomalar va admin huquqlarini tekshirish hali ulanmagan. Savat brauzerning localStorage xotirasida saqlanadi. Offline rejim avval keshlangan sahifalarga tayanadi; mahsulot rasmlari internet talab qilishi mumkin.

## Native App Store ilovasi haqida
Bu versiya App Store'da tarqatiladigan native iOS ilovasi emas; u iPhone bosh ekraniga o‘rnatiladigan PWA. App Store uchun keyinchalik Capacitor yoki React Native/Expo orqali alohida iOS build, Apple Developer hisob va App Review jarayoni kerak bo‘ladi.
