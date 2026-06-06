import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Super Admin
  const adminPassword = await bcrypt.hash("Admin@KM2025", 12);
  const admin = await prisma.adminUser.upsert({
    where: { email: "admin@khargharmaharaja.org" },
    update: {},
    create: { name: "Super Admin", email: "admin@khargharmaharaja.org", passwordHash: adminPassword, role: "SUPER_ADMIN" },
  });
  console.log("✅ Admin created:", admin.email);

  // Sample Events
  const events = [
    { titleEn: "Ganesh Utsav 2025", titleMr: "गणेश उत्सव २०२५", titleHi: "गणेश उत्सव 2025", description: "Grand 11-day Ganesh festival", type: "GANESH_UTSAV" as const, status: "UPCOMING" as const, date: new Date("2025-08-27"), time: "10:00 AM", venue: "Sector 20, Kharghar", capacity: 5000, imageUrl: "/images/Ganesh1.jpeg" },
    { titleEn: "Dahi Handi 2025", titleMr: "दही हंडी २०२५", titleHi: "दही हांडी 2025", description: "Thrilling Dahi Handi competition", type: "DAHI_HANDI" as const, status: "UPCOMING" as const, date: new Date("2025-08-26"), time: "09:00 AM", venue: "Kharghar Central Park", capacity: 2000, imageUrl: "/images/Dahihandi1.jpeg" },
    { titleEn: "Blood Donation Camp", titleMr: "रक्तदान शिबीर", titleHi: "रक्तदान शिविर", description: "Voluntary blood donation camp", type: "BLOOD_DONATION" as const, status: "UPCOMING" as const, date: new Date("2025-07-15"), time: "08:00 AM", venue: "Community Hall, Sector 12", capacity: 500, imageUrl: "/images/bloodDonation1.jpeg" },
  ];

  for (const e of events) {
    await prisma.event.upsert({ where: { id: e.titleEn }, update: {}, create: { id: e.titleEn, ...e } }).catch(() => prisma.event.create({ data: e }));
  }
  console.log("✅ Events seeded");

  // Sample News
  await prisma.newsItem.createMany({
    skipDuplicates: true,
    data: [
      { titleMr: "गणेश उत्सव २०२५ची तारीख जाहीर", titleHi: "गणेश उत्सव 2025 की तारीखें घोषित", titleEn: "Ganesh Utsav 2025 Dates Announced", contentMr: "यावर्षी गणेश उत्सव २७ ऑगस्ट ते ७ सप्टेंबर दरम्यान साजरा होईल.", contentHi: "इस वर्ष गणेश उत्सव 27 अगस्त से 7 सितंबर तक मनाया जाएगा।", contentEn: "Ganesh Utsav 2025 will be celebrated from August 27 to September 7.", category: "Announcement", isPublished: true, publishedAt: new Date() },
    ],
  });
  console.log("✅ News seeded");

  console.log("\n🎉 Database seeded successfully!");
  console.log("📧 Admin login: admin@khargharmaharaja.org");
  console.log("🔑 Password: Admin@KM2025");
}

main().catch(console.error).finally(() => prisma.$disconnect());
