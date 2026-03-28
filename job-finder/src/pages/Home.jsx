import { Link } from "react-router-dom";
import { Briefcase, TrendingUp } from "lucide-react";
import SearchBar from "../components/SearchBar";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";

export default function Home() {
  const categories = [
    { name: "เทคโนโลยี", count: "324 ตำแหน่ง", icon: "💻" },
    { name: "การตลาด", count: "156 ตำแหน่ง", icon: "📈" },
    { name: "การออกแบบ", count: "98 ตำแหน่ง", icon: "🎨" },
    { name: "การเงิน", count: "187 ตำแหน่ง", icon: "💰" },
    { name: "ขาย", count: "213 ตำแหน่ง", icon: "🤝" },
    { name: "บริหารงาน", count: "142 ตำแหน่ง", icon: "📋" },
  ];

  const recommendedJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Tech Innovation Co.",
      location: "กรุงเทพมหานคร",
      type: "Full-time",
      postedAt: "2 วันที่แล้ว",
      salary: "60,000 - 80,000 บาท",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      icon: "🏢",
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "Creative Studio Ltd.",
      location: "เชียงใหม่",
      type: "Full-time",
      postedAt: "1 สัปดาห์ที่แล้ว",
      salary: "40,000 - 55,000 บาท",
      tags: ["Figma", "UI Design", "User Research"],
      icon: "🎨",
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "Digital Solutions Inc.",
      location: "กรุงเทพมหานคร",
      type: "Full-time",
      postedAt: "3 วันที่แล้ว",
      salary: "50,000 - 70,000 บาท",
      tags: ["Node.js", "PostgreSQL", "AWS"],
      icon: "💻",
    },
    {
      id: 4,
      title: "Product Manager",
      company: "Startup Ventures",
      location: "กรุงเทพมหานคร",
      type: "Full-time",
      postedAt: "2 สัปดาห์ที่แล้ว",
      salary: "70,000 - 90,000 บาท",
      tags: ["Product Strategy", "Agile", "Jira"],
      icon: "🚀",
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "Analytics Pro",
      location: "ขอนแก่น",
      type: "Full-time",
      postedAt: "1 เดือนที่แล้ว",
      salary: "65,000 - 85,000 บาท",
      tags: ["Python", "Machine Learning", "SQL"],
      icon: "📊",
    },
    {
      id: 6,
      title: "Marketing Manager",
      company: "Brand Masters Co.",
      location: "กรุงเทพมหานคร",
      type: "Full-time",
      postedAt: "1 สัปดาห์ที่แล้ว",
      salary: "45,000 - 60,000 บาท",
      tags: ["Digital Marketing", "SEO", "Content"],
      icon: "📱",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-[#1e4def] text-white py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ค้นหางานที่ใช่สำหรับคุณ
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10">
            เชื่อมต่อกับโอกาสใหม่ๆ จากบริษัทชั้นนำกว่า 10,000 ตำแหน่งงาน
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Popular Categories */}
      <section className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-2 text-2xl font-bold mb-8 text-gray-900">
            <TrendingUp className="text-blue-600 w-6 h-6" />
            <h2>หมวดหมู่งานยอดนิยม</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="border border-gray-100 p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-bold text-gray-900">{cat.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{cat.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Jobs */}
      <section className="bg-[#f9fafb] py-16 px-4 md:px-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-2 text-2xl font-bold text-gray-900">
              <Briefcase className="text-blue-600 w-6 h-6" />
              <h2>งานแนะนำ</h2>
            </div>
            <button className="text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
              ดูทั้งหมด
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedJobs.map((job, idx) => (
              <JobCard key={idx} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#1e4def] text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            พร้อมที่จะเริ่มต้นอาชีพใหม่?
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg">
            สมัครสมาชิกวันนี้และรับการแจ้งเตือนงานที่เหมาะกับคุณ
          </p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-bold text-lg transition-colors">
            สมัครสมาชิกฟรี
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
