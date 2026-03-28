import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Briefcase, TrendingUp, Search } from "lucide-react";
import SearchBar from "../components/SearchBar";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import jsonData from "../data/jobs.json";

const {
  categories: CATEGORIES,
  categoryKeywords: CATEGORY_KEYWORDS,
  categoryIcons: CATEGORY_ICONS,
  jobs: jobsData,
} = jsonData;

// ฟังก์ชันสำหรับหาหมวดหมู่งานจาก Tags ของงานนั้นๆ
function getCategoryFromTags(tags) {
  if (!tags || tags.length === 0) return CATEGORIES.OTHER;

  const tagString = tags.join(" ");

  // ตรวจสอบ keyword ของแต่ละหมวดหมู่เทียบกับ tags
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((keyword) => tagString.includes(keyword))) {
      return category;
    }
  }

  return CATEGORIES.OTHER;
}

// ฟังก์ชันสำหรับเตรียมข้อมูลหมวดหมู่ พร้อมนับจำนวนงานที่มีในแต่ละหมวด
function buildCategoriesWithCounts(jobs) {
  const categoryCounts = {
    [CATEGORIES.ALL]: jobs.length,
    [CATEGORIES.TECHNOLOGY]: 0,
    [CATEGORIES.MARKETING]: 0,
    [CATEGORIES.DESIGN]: 0,
    [CATEGORIES.FINANCE]: 0,
    [CATEGORIES.SALES]: 0,
    [CATEGORIES.MANAGEMENT]: 0,
    [CATEGORIES.OTHER]: 0,
  };

  jobs.forEach((job) => {
    const category = getCategoryFromTags(job.tags);
    if (categoryCounts[category] !== undefined) {
      categoryCounts[category]++;
    }
  });

  return [
    {
      name: CATEGORIES.ALL,
      count: `${categoryCounts[CATEGORIES.ALL]} ตำแหน่ง`,
      icon: CATEGORY_ICONS[CATEGORIES.ALL],
    },
    {
      name: CATEGORIES.TECHNOLOGY,
      count: `${categoryCounts[CATEGORIES.TECHNOLOGY]} ตำแหน่ง`,
      icon: CATEGORY_ICONS[CATEGORIES.TECHNOLOGY],
    },
    {
      name: CATEGORIES.MARKETING,
      count: `${categoryCounts[CATEGORIES.MARKETING]} ตำแหน่ง`,
      icon: CATEGORY_ICONS[CATEGORIES.MARKETING],
    },
    {
      name: CATEGORIES.DESIGN,
      count: `${categoryCounts[CATEGORIES.DESIGN]} ตำแหน่ง`,
      icon: CATEGORY_ICONS[CATEGORIES.DESIGN],
    },
    {
      name: CATEGORIES.FINANCE,
      count: `${categoryCounts[CATEGORIES.FINANCE]} ตำแหน่ง`,
      icon: CATEGORY_ICONS[CATEGORIES.FINANCE],
    },
    {
      name: CATEGORIES.SALES,
      count: `${categoryCounts[CATEGORIES.SALES]} ตำแหน่ง`,
      icon: CATEGORY_ICONS[CATEGORIES.SALES],
    },
    {
      name: CATEGORIES.MANAGEMENT,
      count: `${categoryCounts[CATEGORIES.MANAGEMENT]} ตำแหน่ง`,
      icon: CATEGORY_ICONS[CATEGORIES.MANAGEMENT],
    },
  ];
}

// ฟังก์ชันสำหรับค้นหางานจากข้อความ (ค้นจากชื่อตำแหน่ง, บริษัท, สถานที่ หรือ tags)
function searchJobs(jobs, query) {
  if (!query || !query.trim()) return jobs;

  const lowerQuery = query.toLowerCase();

  return jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(lowerQuery) ||
      job.company.toLowerCase().includes(lowerQuery) ||
      job.location.toLowerCase().includes(lowerQuery) ||
      job.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  );
}

// ฟังก์ชันสำหรับกรองรายการงาน ตามหมวดหมู่ที่ผู้ใช้เลือก
function filterJobsByCategory(jobs, category) {
  if (category === CATEGORIES.ALL) return jobs;

  return jobs.filter((job) => {
    const jobCategory = getCategoryFromTags(job.tags);
    return jobCategory === category;
  });
}

export default function Home() {
  // State สำหรับเก็บหมวดหมู่ที่กำลังเลือก และข้อความที่ใช้ค้นหา
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES.ALL);
  const [searchQuery, setSearchQuery] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("currentUser"),
  );

  // อัปเดตสถานะเมื่อ localStorage เปลี่ยน (เช่น logout หรือ login จาก tab อื่น)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("currentUser"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userKey = currentUser ? `bookmarkedJobs_${currentUser.email}` : null;

  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    if (!userKey) return;
    const data = JSON.parse(localStorage.getItem(userKey)) || [];
    setBookmarkedJobs(data);

    const handleStorage = () => {
      const newData = JSON.parse(localStorage.getItem(userKey)) || [];
      setBookmarkedJobs(newData);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [userKey]);

  const handleToggleBookmark = (job) => {
    if (!currentUser) {
      alert("กรุณาเข้าสู่ระบบเพื่อบันทึกงาน");
      navigate("/login");
      return;
    }

    let updated;
    if (bookmarkedJobs.find((j) => j.id === job.id)) {
      updated = bookmarkedJobs.filter((j) => j.id !== job.id);
    } else {
      updated = [
        ...bookmarkedJobs,
        { ...job, savedAt: new Date().toLocaleDateString() },
      ];
    }

    setBookmarkedJobs(updated);
    localStorage.setItem(userKey, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  // สร้างรายการหมวดหมู่พร้อมนับจำนวนงานจริง (ใช้ useMemo เพื่อไม่ให้คำนวณใหม่ทุกครั้งที่เรนเดอร์)
  const categories = useMemo(() => buildCategoriesWithCounts(jobsData), []);

  // กรองข้อมูลงานตามหมวดหมู่และคำค้นหา (อัพเดทเมื่อ selectedCategory หรือ searchQuery เปลี่ยน)
  const filteredJobs = useMemo(() => {
    let filtered = filterJobsByCategory(jobsData, selectedCategory);
    filtered = searchJobs(filtered, searchQuery);
    return filtered;
  }, [selectedCategory, searchQuery]);

  // ฟังก์ชันสำหรับล้างค่าการค้นหาและตัวกรองทั้งหมด
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(CATEGORIES.ALL);
  };

  return (
    <div className="w-full">
      {/* ส่วนแบนเนอร์หลักและส่วนค้นหางาน */}
      <section className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ค้นหางานที่ใช่สำหรับคุณ
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10">
            เชื่อมต่อกับโอกาสใหม่ๆ จากบริษัทชั้นนำกว่า {jobsData.length}{" "}
            ตำแหน่งงาน
          </p>
          <SearchBar onSearch={setSearchQuery} searchQuery={searchQuery} />
        </div>
      </section>

      {/* ส่วนแสดงหมวดหมู่งานยอดนิยม */}
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
                <h3
                  className={`font-bold text-sm ${
                    selectedCategory === cat.name
                      ? "text-blue-600"
                      : "text-gray-900"
                  }`}
                >
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{cat.count}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ส่วนแสดงรายการงานตามที่ถูกค้นหาหรือกรองไว้ */}
      <section className="bg-[#f9fafb] py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <Briefcase className="text-blue-600 w-6 h-6" />
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === CATEGORIES.ALL
                  ? "งานทั้งหมด"
                  : `งาน${selectedCategory}`}
              </h2>
              <span className="text-gray-500 text-lg">
                ({filteredJobs.length})
              </span>
            </div>
            {searchQuery && (
              <button
                onClick={handleClearFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                ล้างตัวกรอง
              </button>
            )}
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onToggleBookmark={handleToggleBookmark}
                  isBookmarked={!!bookmarkedJobs.find((j) => j.id === job.id)}
                />
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
                onClick={handleClearFilters}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                ดูงานทั้งหมด
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ส่วนเชิญชวนให้สมัครสมาชิก (Call to Action) */}
      {!isLoggedIn && (
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
      )}

      {/* ส่วนท้ายของเว็บไซต์ */}
      <Footer />
    </div>
  );
}
