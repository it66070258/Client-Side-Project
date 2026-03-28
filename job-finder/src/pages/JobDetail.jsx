import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Building2,
  Users,
  Calendar,
  Bookmark,
  Share2,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

export default function JobDetail() {
  const { id } = useParams();

  // Dummy job data - in real app, fetch based on id
  const job = {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Tech Innovation Co.",
    location: "กรุงเทพมหานคร",
    type: "Full-time",
    postedAt: "2 วันที่แล้ว",
    salary: "60,000 - 80,000 บาท",
    experience: "3-5 ปี",
    education: "ปริญญาตรี วิทยาการคอมพิวเตอร์หรือสาขาที่เกี่ยวข้อง",
    positions: "2 ตำแหน่ง",
    icon: "🏢",
    description: `
เรากำลังมองหา Senior Frontend Developer ที่มีความสามารถและมีประสบการณ์ในการพัฒนาเว็บแอปพลิเคชันด้วย React และเทคโนโลยีสมัยใหม่

คุณจะได้ทำงานร่วมกับทีมที่มีความสามารถและมีโอกาสในการพัฒนาผลิตภัณฑ์ที่ส่งผลกระทบต่อผู้ใช้งานหลายล้านคน
    `,
    responsibilities: [
      "พัฒนาและดูแล web applications ด้วย React และ TypeScript",
      "ทำงานร่วมกับ UX/UI designers เพื่อสร้าง user interfaces ที่ใช้งานง่าย",
      "เขียน clean, maintainable, และ testable code",
      "ทำ code reviews และให้ feedback กับทีม",
      "ปรับปรุง performance และ optimize applications",
    ],
    requirements: [
      "ประสบการณ์ 3-5 ปีในการพัฒนา frontend ด้วย React",
      "มีความเชี่ยวชาญใน JavaScript/TypeScript",
      "เข้าใจ state management (Redux, Context API)",
      "มีประสบการณ์ในการทำงานกับ RESTful APIs",
      "เข้าใจ responsive design และ mobile-first approach",
      "มีประสบการณ์ในการใช้ Git และ version control",
    ],
    benefits: [
      "ประกันสุขภาพและประกันชีวิต",
      "โบนัสตามผลงาน",
      "ทำงาน Work from Home ได้",
      "วันหยุดพักผ่อนประจำปี 15 วัน",
      "งบประมาณสำหรับการฝึกอบรมและพัฒนาทักษะ",
      "อุปกรณ์ทำงานที่ทันสมัย",
      "สภาพแวดล้อมการทำงานที่ดี",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Redux", "Git"],
    companyInfo: {
      name: "Tech Innovation Co.",
      size: "100-500 คน",
      industry: "เทคโนโลยี",
      website: "www.techinnovation.com",
      about:
        "บริษัทชั้นนำด้านเทคโนโลยีที่มุ่งเน้นการพัฒนาผลิตภัณฑ์และบริการที่ใช้เทคโนโลยีทันสมัย เรามีทีมงานที่มีความสามารถและสภาพแวดล้อมการทำงานที่ส่งเสริมความคิดสร้างสรรค์",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>กลับไปหน้าหลัก</span>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="text-5xl">{job.icon}</div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h1>
                    <div className="flex items-center space-x-2 text-lg text-gray-700 mb-3">
                      <Building2 className="w-5 h-5" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1.5" />
                        {job.location}
                      </div>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1.5" />
                        {job.type}
                      </div>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1.5" />
                        {job.postedAt}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    <Bookmark className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Salary & Tags */}
              <div className="flex items-center justify-between py-6 border-y border-gray-200">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                  <span className="text-2xl font-bold text-blue-600">
                    {job.salary}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                รายละเอียดงาน
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                หน้าที่ความรับผิดชอบ
              </h2>
              <ul className="space-y-3">
                {job.responsibilities.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                คุณสมบัติผู้สมัคร
              </h2>
              <ul className="space-y-3">
                {job.requirements.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                สวัสดิการ
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {job.benefits.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Apply Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition mb-4">
                สมัครงานตำแหน่งนี้
              </button>
              <button className="w-full border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg transition">
                บันทึกงานนี้
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">ประสบการณ์</span>
                  <span className="font-medium text-gray-900">
                    {job.experience}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">การศึกษา</span>
                  <span className="font-medium text-gray-900 text-right">
                    {job.education}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">จำนวนที่รับ</span>
                  <span className="font-medium text-gray-900">
                    {job.positions}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">โพสต์เมื่อ</span>
                  <span className="font-medium text-gray-900">
                    {job.postedAt}
                  </span>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                เกี่ยวกับบริษัท
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">
                    {job.companyInfo.name}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {job.companyInfo.about}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-200 space-y-3 text-sm">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">
                      ขนาดบริษัท:{" "}
                      <span className="text-gray-900 font-medium">
                        {job.companyInfo.size}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">
                      อุตสาหกรรม:{" "}
                      <span className="text-gray-900 font-medium">
                        {job.companyInfo.industry}
                      </span>
                    </span>
                  </div>
                </div>
                <button className="w-full mt-4 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-lg transition text-sm">
                  ดูข้อมูลบริษัท
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
