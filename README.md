# judyboon AI Chat

เว็บแชทบอท AI สวยงาม ขับเคลื่อนโดย Gemini 2.5 Flash

## โครงสร้างไฟล์

```
judyboon-ai/
├── index.html        ← Frontend (ไม่มี API key)
├── api/
│   └── chat.js       ← Vercel Serverless Function (เก็บ key ปลอดภัย)
├── vercel.json       ← Vercel config
└── README.md
```

## วิธี Deploy บน Vercel (แนะนำ — ปลอดภัยสุด)

### 1. Push โค้ดขึ้น GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/judyboon-ai.git
git push -u origin main
```

### 2. Import Project ใน Vercel
1. ไปที่ [vercel.com](https://vercel.com) → Sign in ด้วย GitHub
2. กด **"Add New Project"** → เลือก repo `judyboon-ai`
3. กด **Deploy** (ไม่ต้องแก้อะไร Vercel detect ได้เอง)

### 3. ตั้งค่า Environment Variable (สำคัญมาก!)
1. ไปที่ **Settings → Environment Variables**
2. เพิ่ม:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** `AQ.Ab8RN6KNF90U8QfcZTTG3pYg2bfWvRM75pzsurhjvFY2vYH-rg`
3. กด **Save** แล้ว **Redeploy**

เสร็จแล้ว! เว็บจะได้ URL เช่น `https://judyboon-ai.vercel.app`

---

## ฟีเจอร์
- 💬 Multi-turn conversation (จำบทสนทนาต่อเนื่อง)
- 🖼️ รองรับการส่งรูปภาพ (Vision)
- 📱 Responsive — ใช้ได้ทั้งมือถือและ desktop
- 🌙 Dark mode UI สวยงาม
- 💾 บันทึกประวัติแชทใน LocalStorage
- 🔒 API key ซ่อนอยู่ใน server — ไม่โชว์ใน browser เด็ดขาด
- ⚡ Rate limiting 30 req/min/IP
- ✍️ Markdown rendering (bold, italic, code, lists ฯลฯ)
