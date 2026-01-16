เป้าหมายคือทำให้ repo นี้ดู “พร้อมใช้งานแบบ Enterprise” เวลาเปิดดูบน GitHub: มีฟีเจอร์เดโมชัดเจน, โครงสร้างตาม Atomic/Pinia/Service layer, มีเอกสาร/ไดอะแกรม, มีเทส/CI และรันด้วย Docker ได้ โดยจะยึดโครงสร้างที่เขียนไว้ใน [tech-req.md](file:///Users/porntepdannoi/github/poc-vue-nuxt-3/tech-req.md) และ config ปัจจุบันใน [nuxt.config.ts](file:///Users/porntepdannoi/github/poc-vue-nuxt-3/nuxt.config.ts)

## 1) ปรับเอกสารให้ “ขายของได้”
- อัปเดต [tech-req.md](file:///Users/porntepdannoi/github/poc-vue-nuxt-3/tech-req.md) ให้มี
  - Scope ของ POC (ฟีเจอร์เดโม, เส้นทางข้อมูล Component → Store → Service → API)
  - แนวปฏิบัติ naming/โฟลเดอร์ (Atomic Design, Repository/Service pattern)
  - Mermaid diagrams (เช่น Request flow, Auth flow)
  - Guideline เรื่อง error/loading, runtimeConfig/env
- เปลี่ยน [README.md](file:///Users/porntepdannoi/github/poc-vue-nuxt-3/README.md) จาก template ให้เป็น README ระดับ portfolio:
  - Features, Architecture, Folder conventions, How to run, Screenshots, Roadmap
  - เพิ่ม badges (CI, typecheck, license) และ “Demo credentials” (ถ้าใช้ mock)

## 2) สร้างระบบเดโมที่ดูเป็นโปรดักชัน (แต่ยังเป็น POC)
**ฟีเจอร์หลักที่จะโชว์บน GitHub**
- Auth (Mock แต่มี session cookie จริง)
  - หน้า `/login`, `/logout`, `/dashboard`
  - middleware ป้องกัน route และ redirect
  - `AuthStore` + `AuthService` + `server/api/auth/*`
- Task Management (CRUD)
  - หน้า `/tasks` แสดง list + filter + pagination (ขั้นต่ำ)
  - create/edit/delete ผ่าน modal หรือ form page
  - `TasksStore` + `TasksService` + `server/api/tasks/*`
- UI/UX ให้ดูดีด้วย Tailwind + Flowbite (ที่ติดตั้งไว้แล้ว)
  - layout มี topbar/sidebar, responsive, loading state, empty state, error state

## 3) ทำ UI ตาม Atomic Design ให้เห็นชัด
- Atoms: Button, Input, Select, Badge, Spinner, Icon
- Molecules: FormField, SearchBar, Pagination, ConfirmDialog
- Organisms: AppHeader, SideNav, DataTable, TaskForm
- Pages ใช้ components เหล่านี้ และ “ไม่มี business logic หนักใน component”

## 4) วาง Service Layer + Types ให้เป็นระบบ
- สร้าง `services/http` เป็น wrapper กลางสำหรับ `$fetch` (baseURL, error mapping)
- `services/auth.service.ts`, `services/tasks.service.ts`
- `types/` แยก DTO (API) กับ Model (UI) ให้ชัด
- `stores/` ใช้ Pinia Setup Store ตาม convention

## 5) ทำ Nitro Server API ให้เป็น POC ที่ demo ได้ทันที
- `server/api/auth/login.post.ts`, `me.get.ts`, `logout.post.ts`
- `server/api/tasks/index.get.ts`, `index.post.ts`, `[id].put.ts`, `[id].delete.ts`
- เก็บข้อมูลแบบ in-memory (seed data) เพื่อให้ clone แล้วรันได้เลย ไม่ต้องมี DB
- ใช้ cookie เป็น session id เพื่อให้มี “ของจริง” ให้โชว์เรื่อง auth guard

## 6) เพิ่มคุณภาพ repo ให้ดูโปร (Tests + Lint + CI)
- เพิ่ม ESLint/format (เช่น @nuxt/eslint) และสคริปต์ `lint`, `typecheck`
- เพิ่มชุดทดสอบขั้นต่ำ (Vitest/@nuxt/test-utils) เช่น
  - unit test สำหรับ service error mapping
  - store test สำหรับ auth/tasks flow
- เพิ่ม GitHub Actions workflow: install → lint → typecheck → test → build

## 7) Docker-ready เพื่อโชว์ความพร้อม deploy
- เพิ่ม Dockerfile (multi-stage) + docker-compose (ถ้าจำเป็น)
- อัปเดต README: วิธีรันด้วย Docker

## 8) ตรวจสอบและทำให้ demo “น่าเชื่อถือ”
- รัน: dev, typecheck, tests, build
- ตรวจ UI หน้า `/`, `/login`, `/dashboard`, `/tasks`
- เก็บภาพ screenshot/gif ใส่ใน README (ระบุขั้นตอนสร้างไฟล์ภาพ)

หมายเหตุเรื่องเวอร์ชัน: ตอนนี้ dependency ใน [package.json](file:///Users/porntepdannoi/github/poc-vue-nuxt-3/package.json) เป็น `nuxt ^4.x` แต่เอกสารพูดถึง Nuxt 3 — ในงานนี้จะปรับเอกสารให้สอดคล้องกับของจริง (หรือถ้าต้องการ “ยืนยันว่า Nuxt 3 เท่านั้น” จะวางแผน downgrade ให้ตรงตามชื่อโปรเจกต์ด้วย)