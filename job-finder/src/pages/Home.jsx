import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Briefcase, TrendingUp, Search } from "lucide-react";
import SearchBar from "../components/SearchBar";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import jobsData from "../data/jobs.json";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");

  // จัดหมวดหมู่งานตาม tags
  const getCategoryFromTags = (tags) => {
    const techKeywords = ["React", "TypeScript", "Node.js", "Python", "Java", "JavaScript", "Flutter", "Docker", "AWS", "MongoDB", "PostgreSQL", "Linux", "Windows Server"];
    const designKeywords = ["Figma", "UI Design", "Photoshop", "Illustrator", "Branding", "Video Editing"];
    const marketingKeywords = ["Digital Marketing", "SEO", "Content", "Copywriting"];
    const financeKeywords = ["Financial Analysis", "Excel", "SAP"];
    const salesKeywords = ["Sales", "B2B", "CRM"];
    const managementKeywords = ["Project Management", "Product Strategy", "Agile", "Scrum", "HR Management", "Business Analysis"];

    const tagString = tags.join(" ");

    if (techKeywords.some(keyword => tagString.includes(keyword))) return "เทคโนโลยี";
    if (designKeywords.some(keyword => tagString.includes(keyword))) return "การออกแบบ";
    if (marketingKeywords.some(keyword => tagString.includes(keyword))) return "การตลาด";
    if (financeKeywords.some(keyword => tagString.includes(keyword))) return "การเงิน";
    if (salesKeywords.some(keyword => tagString.includes(keyword))) return "ขาย";
    if (managementKeywords.some(keyword => tagString.includes(keyword))) return "บริหารงาน";

    return "อื่นๆ";
  };

  // สร้าง categories พร้อมนับจำนวนจริง
  const categories = useMemo(() => {
    const categoryCounts = {
      "ทั้งหมด": jobsData.length,
      "เทคโนโลยี": 0,
      "การตลาด": 0,
      "การออกแบบ": 0,
      "การเงิน": 0,
      "ขาย": 0,
      "บริหารงาน": 0,
      "อื่นๆ": 0,
    };

    jobsData.forEach(job => {
      const category = getCategoryFromTags(job.tags);
      categoryCounts[category]++;
    });

    return [
      { name: "ทั้งหมด", count: `${categoryCounts["ทั้งหมด"]} ตำแหน่ง`, icon: "📂" },
      { name: "เทคโนโลยี", count: `${categoryCounts["เทคโนโลยี"]} ตำแหน่ง`, icon: "💻" },
      { name: "การตลาด", count: `${categoryCounts["การตลาด"]} ตำแหน่ง`, icon: "📈" },
      { name: "การออกแบบ", count: `${categoryCounts["การออกแบบ"]} ตำแหน่ง`, icon: "🎨" },
      { name: "การเงิน", count: `${categoryCounts["การเงิน"]} ตำแหน่ง`, icon: "💰" },
      { name: "ขาย", count: `${categoryCounts["ขาย"]} ตำแหน่ง`, icon: "🤝" },
      { name: "บริหารงาน", count: `${categoryCounts["บริหารงาน"]} ตำแหน่ง`, icon: "📋" },
    ];
  }, []);

  // กรองงานตาม category และ search query
  const filteredJobs = useMemo(() => {
    let filtered = jobsData;

    // กรองตาม category
    if (selectedCategory !== "ทั้งหมด") {
      filtered = filtered.filter(job => {
        const category = getCategoryFromTags(job.tags);
        return category === selectedCategory;
      });
    }

    // กรองตาม search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ค้นหางานที่ใช่สำหรับคุณ
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10">
            เชื่อมต่อกับโอกาสใหม่ๆ จากบริษัทชั้นนำกว่า {jobsData.length} ตำแหน่งงาน
          </p>
          <SearchBar onSearch={handleSearch} />

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold">{jobsData.length}+</div>
              <div className="text-blue-100 text-sm mt-1">ตำแหน่งงาน</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-blue-100 text-sm mt-1">บริษัทชั้นนำ</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-blue-100 text-sm mt-1">ผู้สมัครงาน</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold">95%</div>
              <div className="text-blue-100 text-sm mt-1">ความพึงพอใจ</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white py-12 px-4 md:px-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2 text-2xl font-bold text-gray-900">
              <TrendingUp className="text-blue-600 w-6 h-6" />
              <h2>หมวดหมู่งานยอดนิยม</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat.name)}
                className={`border p-4 rounded-xl flex flex-col items-center justify-center text-center transition-all ${
                  selectedCategory === cat.name
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-blue-300 hover:shadow-sm"
                }`}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <h3 className={`font-bold text-sm ${
                  selectedCategory === cat.name ? "text-blue-600" : "text-gray-900"
                }`}>
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{cat.count}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="bg-[#f9fafb] py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <Briefcase className="text-blue-600 w-6 h-6" />
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === "ทั้งหมด" ? "งานทั้งหมด" : `งาน${selectedCategory}`}
              </h2>
              <span className="text-gray-500 text-lg">
                ({filteredJobs.length})
              </span>
            </div>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("ทั้งหมด");
                }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                ล้างตัวกรอง
              </button>
            )}
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                ไม่พบงานที่ตรงกับการค้นหา
              </h3>
              <p className="text-gray-600 mb-6">
                ลองค้นหาด้วยคำอื่นหรือเลือกหมวดหมู่อื่น
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("ทั้งหมด");
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                ดูงานทั้งหมด
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            พร้อมที่จะเริ่มต้นอาชีพใหม่?
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg">
            สมัครสมาชิกวันนี้และรับการแจ้งเตือนงานที่เหมาะกับคุณ
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-bold text-lg transition-colors"
          >
            สมัครสมาชิกฟรี
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
