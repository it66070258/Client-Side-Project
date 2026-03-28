import { useParams, Link, Navigate } from "react-router-dom";
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
  ChevronLeft,
  Check,
} from "lucide-react";
import jsonData from "../data/jobs.json";
import jobDetailData from "../data/jobdetail.json";

export default function JobDetail() {
  const { id } = useParams();

  // Find job from complete job data
  const basicJobInfo = jsonData.jobs.find((j) => j.id.toString() === id);
  const extraJobInfo = jobDetailData[id];

  if (!basicJobInfo || !extraJobInfo) {
    return <Navigate to="/" replace />;
  }

  // รวมข้อมูลหลักและข้อมูลรายละเอียดเพิ่มเติม
  const job = {
    ...basicJobInfo,
    ...extraJobInfo,
    description: extraJobInfo.fullDescription || basicJobInfo.description,
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:space-x-6">
                {/* Icon */}
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-4xl mb-4 md:mb-0 shrink-0 border border-gray-100 shadow-sm">
                  {job.icon}
                </div>
                <div className="flex-1 w-full">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {job.title}
                  </h1>
                  <p className="text-gray-600 text-lg mb-6">{job.company}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-600 mb-6">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-3 text-gray-400" />
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-5 h-5 mr-3 text-gray-400" />
                      {job.type} {job.experience ? `• ${job.experience}` : ""}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-3 text-gray-400" />
                      โพสต์เมื่อ {job.postedAt}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                      สมัครได้ถึง 31 ธันวาคม 2026
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-3 text-gray-400" />
                      {job.positions}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {job.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-3 w-full">
                    <button className="flex-1 bg-[#0f172a] hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition">
                      สมัครงานนี้
                    </button>
                    <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-gray-600 shadow-sm">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                รายละเอียดงาน
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                หน้าที่ความรับผิดชอบ
              </h2>
              <ul className="space-y-4">
                {job.responsibilities.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-3 mt-2 shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                คุณสมบัติที่ต้องการ
              </h2>
              <ul className="space-y-4">
                {job.requirements.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-3 mt-2 shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                สวัสดิการและผลประโยชน์
              </h2>
              <ul className="space-y-4">
                {job.benefits.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-3 mt-2 shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Company Info */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  เกี่ยวกับบริษัท
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    <span className="font-semibold text-gray-900">
                      {job.companyInfo.name}
                    </span>{" "}
                    {job.companyInfo.about}
                  </p>
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    อุตสาหกรรม:{" "}
                    <span className="text-gray-900">
                      {job.companyInfo.industry}
                    </span>
                  </p>
                  <p>
                    ขนาดบริษัท:{" "}
                    <span className="text-gray-900">
                      {job.companyInfo.size}
                    </span>
                  </p>
                  <p>
                    เว็บไซต์:{" "}
                    <span className="text-gray-900">
                      {job.companyInfo.website}
                    </span>
                  </p>
                </div>

                <button className="w-full mt-2 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-2.5 rounded-xl transition text-sm shadow-sm">
                  ดูโปรไฟล์บริษัท
                </button>
              </div>
            </div>

            {/* Tips Container */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                เคล็ดลับการสมัครงาน
              </h3>
              <ul className="space-y-4">
                {[
                  "อัปเดตโปรไฟล์ให้ครบถ้วน",
                  "แนบเรซูเม่ที่เหมาะสม",
                  "เขียน Cover Letter ที่โดดเด่น",
                  "ตรวจสอบคุณสมบัติให้ดี",
                ].map((tip, idx) => (
                  <li
                    key={idx}
                    className="flex items-start text-sm text-gray-700"
                  >
                    <Check className="w-4 h-4 text-blue-600 mr-2 mt-0.5 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
