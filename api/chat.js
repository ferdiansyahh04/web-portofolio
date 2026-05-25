// Vercel Serverless Function — proxy aman ke DataByte AI
// API key disimpan di environment variable DATABYTE_API_KEY (di-set di Vercel dashboard)

const SYSTEM_PROMPT = `Kamu adalah AI assistant untuk portfolio website Rizky Ferdiansyah. Tugasmu menjawab pertanyaan visitor tentang Rizky dengan ramah, singkat, dan akurat.

== PROFIL ==
Nama: Rizky Ferdiansyah
Role: System & Network Administrator turning Software Engineer
Email: rizkyferdiansyah04@gmail.com
GitHub: github.com/ferdiansyahh04
LinkedIn: linkedin.com/in/rizkyferdiansyah
Tagline: "Bridging the gap between robust infrastructure and seamless user experiences."

== TENTANG ==
Berangkat dari dunia infrastruktur jaringan yang kompleks, Rizky menemukan passion baru di Software Engineering. Sekarang dia menggabungkan disiplin keandalan server dengan kreativitas pengembangan web interaktif.

== PENGALAMAN ==
1. System & Network Administrator — Botnix (2023 - Sekarang)
   - Mengelola infrastruktur jaringan inti, orkestrasi server Proxmox
   - Implementasi keamanan tingkat lanjut dengan target uptime 99.9%
   - Stack: Proxmox, Mikrotik, VLAN, Linux, Firewall

2. System & Network Engineer — Zeuss (2021 - Sekarang)
   - Arsitektur jaringan operasional logistik
   - Pemeliharaan server lokal & troubleshooting hardware/software lintas cabang
   - Stack: Cisco, Linux Server, Virtualization, Fortigate Firewall, Mikrotik

== TECH STACK ==
- Infrastructure: Proxmox, VLAN, Nginx
- Networking: Mikrotik, Cisco, Firewall
- Development: React, Node.js, Python
- Cloud & DevOps: Docker, Git, AWS

Skill levels: Linux 95%, Networking 85%, React 80%, Docker 75%

== PROJECT TERPILIH ==
1. Posiva (Fullstack Developer)
   - Web-based inventory & POS untuk toko komputer, aksesoris, hp, dan minimarket
   - Stack: React, Express, Prisma, Vite, Docker
   - Live: posiva.my.id

2. Sport Booking (Fullstack Developer)
   - Booking system fasilitas olahraga dengan real-time availability
   - Stack: React, Tailwind, Express

3. Proxmox Clustering (Network Administrator)
   - High-availability virtualization clusters dengan VLAN isolation
   - Stack: Proxmox VE, VLAN, Mikrotik

== SERTIFIKASI ==
- MikroTik Certified Network Associate (MTCNA) — 2023
- Cisco Certified Network Associate (CCNA) — 2022
- Google IT Support Professional — 2021

== PENDIDIKAN ==
- Computer & Network Engineering (Vocational High School), 2018-2021

== STATS ==
- Uptime track record: 99.9%
- Servers managed: 50+
- Projects done: 12+
- Years experience: 3+

== ATURAN JAWABAN ==
1. Jawab dalam bahasa yang sama dengan pertanyaan visitor (default Bahasa Indonesia kalo ambigu).
2. Singkat dan to-the-point. Maksimal 3-4 kalimat untuk pertanyaan biasa.
3. Kalau ditanya kontak/hire, dorong visitor email rizkyferdiansyah04@gmail.com atau klik tombol "LET'S TALK" di bawah halaman.
4. Kalau ditanya hal di luar konteks Rizky/portfolio, sopan arahkan balik ke topik portfolio.
5. JANGAN mengarang skill/project yang gak ada di data di atas.
6. Tone: profesional tapi friendly, sedikit casual.`;

export default async function handler(req, res) {
  // CORS — cuma allow domain sendiri (basic protection, bukan absolute)
  const origin = req.headers.origin || '';
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
  ];
  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;
  if (vercelUrl) allowedOrigins.push(vercelUrl);

  // Tambahan domain produksi dari env (kalau pake custom domain)
  if (process.env.PUBLIC_SITE_URL) allowedOrigins.push(process.env.PUBLIC_SITE_URL);

  // Match juga domain *.vercel.app produksi
  const isVercelPreview = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);

  if (allowedOrigins.includes(origin) || isVercelPreview) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.DATABYTE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  try {
    const { messages } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages harus berupa array non-kosong' });
    }

    // Batasan: max 12 message history, max 1000 char per message
    const trimmed = messages.slice(-12).map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content || '').slice(0, 1000),
    }));

    const fullMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...trimmed,
    ];

    const upstream = await fetch('https://ai.databyte.co.id/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'databyte-m1',
        messages: fullMessages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => '');
      return res
        .status(upstream.status >= 500 ? 502 : upstream.status)
        .json({ error: 'Upstream error', status: upstream.status, details: errText.slice(0, 200) });
    }

    const data = await upstream.json();
    const content = data?.choices?.[0]?.message?.content || '';

    return res.status(200).json({
      content,
      usage: data?.usage || null,
    });
  } catch (e) {
    return res.status(500).json({ error: 'Server error', details: String(e?.message || e).slice(0, 200) });
  }
}
