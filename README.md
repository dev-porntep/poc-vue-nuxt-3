# Nuxt Enterprise POC (Portfolio)

POC นี้ตั้งใจทำให้เป็น repo ที่ “เปิดดูแล้วน่าเชื่อถือ” บน GitHub: โครงสร้างแบบ Enterprise, มี Service Layer, Pinia Setup Stores, UI ตาม Atomic Design, มี Tests/CI และรันด้วย Docker ได้

## Features
- Auth (mock user) แต่ใช้ cookie session จริง: login/me/logout
- Task Management: CRUD + list + filter + pagination
- Architecture: Page/Organism → Store → Service → Nitro API
- Tech: Nuxt + Vue 3, TypeScript strict, Tailwind + Flowbite, Nuxt Icon

## Demo Credentials
- Email: `admin@example.com`
- Password: `admin123`

## Project Structure
รายละเอียดดูที่ [tech-req.md](file:///Users/porntepdannoi/github/poc-vue-nuxt-3/tech-req.md)

## Scripts
```bash
npm run dev
npm run build
npm run preview
```

## Local Setup
```bash
npm install
npm run dev
```

## Docker
```bash
docker build -t nuxt-enterprise-poc .
docker run -p 3000:3000 nuxt-enterprise-poc
```

## Screenshots
- วางภาพไว้ใน `public/screenshots/` แล้วลิงก์จาก README
- แนะนำ: หน้า Login, Dashboard, Tasks (list + create/edit)

## Architecture Notes
- ห้ามยิง API ใน component โดยตรง
- Service Layer อยู่ใน `services/`
- Pinia Setup Store อยู่ใน `stores/`
