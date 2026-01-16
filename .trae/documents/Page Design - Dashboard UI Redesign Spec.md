# Page Design Document: Dashboard UI Redesign (Desktop-first)

## Global Styles (ใช้ร่วมกันทั้งหน้า)
- **Grid/Spacing**: ใช้ Tailwind spacing scale (4/6/8/12/16/24) ให้สม่ำเสมอ, ระยะห่างระหว่างการ์ด (gap) คงที่ทั้งหน้า
- **Max width**: คอนเทนต์หลัก max-w ~ 1120–1200px และจัดกึ่งกลางบนจอใหญ่ เพื่อลด “พื้นที่ว่างเกิน”
- **Typography scale**
  - H1: 24–28px / semibold
  - Section title (บนการ์ด): 14–16px / semibold
  - Body: 14px / normal
  - Meta: 12px / medium/regular (สีอ่อน)
  - KPI number: 28–36px / semibold (ขึ้นกับ breakpoint)
- **Color & Theme**: รองรับ light/dark เดิม; โทนหลัก gray + accent (blue/emerald/amber) สำหรับ liquid background
- **Card (Liquid glass)**: radius 16px, border 1px (alpha), background white/60 + backdrop-blur (light) และ white/5 (dark); shadow เบา; hover ยกเล็กน้อย (translateY -1 / shadow เพิ่ม)
- **Buttons**: ความสูงขั้นต่ำ 40px; primary/secondary/ghost ตามเดิม แต่เพิ่ม focus ring ที่ชัดเจน (ring-2)
- **Accessibility**: คอนทราสต์ข้อความบน glass ให้ผ่านเกณฑ์อ่านง่าย, ทุกปุ่ม/ลิงก์มี focus state, ระยะคลิกขั้นต่ำ 40px

---

## Page: Dashboard

### 1) Layout
- **Desktop-first**: โครงหน้า “Header (sticky optional) + Content (Bento Grid 12 คอลัมน์)”
- **CSS**: ใช้ CSS Grid เป็นหลัก (12 columns) + Flex ในแถบปุ่ม
- **Breakpoints**
  - Mobile (<640): 1 คอลัมน์, ปุ่มใน header เรียงเป็น 2 แถวถ้าพื้นที่ไม่พอ
  - Tablet (640–1024): 6–12 คอลัมน์, จัดการ์ดเป็น 2 แถวหลัก
  - Desktop (>=1024): 12 คอลัมน์ตามสเปค, คอนเทนต์ centered

### 2) Meta Information
- Title: `Dashboard`
- Description: `ภาพรวม session และสรุปงาน` (คงเป็นข้อความทั่วไป ไม่แตะ SEO เชิงลึก)
- Open Graph: ใช้ค่า default ของไซต์ (ไม่จำเป็นต้องเพิ่มใหม่ในสโคปนี้)

### 3) Page Structure (ลำดับส่วนประกอบ)
1. **Background Layer (Decorative)**
2. **Header** (ชื่อหน้า + subtitle + action buttons)
3. **Main Content: Bento Grid**
   - Session card
   - Task summary card (KPI)
   - Architecture card
   - Quick actions card

### 4) Sections & Components (รายละเอียด)

#### 4.1 Background Layer (Decorative blobs)
- เก็บเอฟเฟกต์วงกลม blur 3 จุดตามเดิม แต่ปรับ:
  - ลด opacity บนจอเล็กเพื่อไม่บังตัวอักษร
  - จำกัดพื้นที่ด้วย overflow-hidden + padding รอบนอก
  - ไม่รับ pointer-events

#### 4.2 Header
- **Left**
  - H1: “Dashboard”
  - Subtitle: “Bento Grid + Liquid Glass (POC)” (คงเดิม แต่ลดความเด่น: สี/ขนาด)
- **Right**
  - ปุ่ม “Open Tasks” (secondary) → ไป `/tasks`
  - ปุ่ม “Refresh” (primary) → เรียก `tasks.fetchList(...)` พร้อม loading state บนปุ่ม
- **Spacing**: ระยะระหว่าง title/subtitle 4px; ระยะระหว่างปุ่ม 8px

#### 4.3 Bento Grid (12 columns)
- **Card sizing (เดสก์ท็อป)**
  - Session: col-span 7
  - Task Summary: col-span 5
  - Architecture: col-span 6
  - Quick Actions: col-span 6
- **Card internal padding**: 16–20px
- **Card title area**: icon + title + subtitle จัด baseline เดียวกัน

#### 4.4 Card: Session
- แสดง
  - label “Signed in as” (meta)
  - ชื่อผู้ใช้ (เด่น)
  - อีเมล + role (meta)
  - ปุ่ม “View Login” (ghost) → `/login`
- **State**
  - Loading: แสดง skeleton 2 บรรทัดแทนชื่อ/อีเมล
  - Unauthorized: แสดงข้อความ “Session หมดอายุ” + ปุ่มไป `/login` (แต่ยังคง behavior redirect เดิมถ้ามี)

#### 4.5 Card: Task Summary (KPI 2x2)
- Grid 2 คอลัมน์ ภายในการ์ด
- KPI tiles (Total/Done/Doing/Todo)
  - label ขนาดเล็ก
  - ตัวเลขใหญ่
  - ระยะห่าง label→number 4–6px
- **State**
  - Loading: tiles เป็น skeleton blocks
  - Empty: แสดง 0 ตามเดิม (ไม่เปลี่ยนข้อมูล)

#### 4.6 Card: Architecture
- แสดงรายการ 4 แถว (UI/State/Service/API) ตามเดิม
- ปรับ:
  - badge ขนาดเท่ากัน, align กลาง
  - line-height 1.4–1.6 เพื่ออ่านง่าย

#### 4.7 Card: Quick Actions
- ปุ่มเต็มความกว้างภายในการ์ด
- Desktop: 2 ปุ่มเรียงแนวนอน (gap 12)
- Mobile: เรียงแนวตั้ง
- ปุ่ม
  - “Manage Tasks” → `/tasks`
  - “Re-Login” → `/login`

### 5) Interaction & Responsiveness Notes
- Hover บนการ์ด: เพิ่ม shadow เบาและยกเล็กน้อย
- Focus: ปุ่ม/ลิงก์มี ring ชัดเจน
- Reduced motion: ถ้า OS ตั้งลดการเคลื่อนไหว ให้ลด transition duration
- ควบคุม “ความกว้างคอนเทนต์” เพื่อแก้ปัญหาหน้าโล่งบนจอใหญ่ (ตามภาพปัจจุบัน)
