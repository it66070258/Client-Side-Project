import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  FileText,
  Camera,
  Save,
} from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "สมชาย ใจดี",
    email: "somchai@email.com",
    phone: "081-234-5678",
    location: "กรุงเทพมหานคร",
    position: "Frontend Developer",
    experience: "3 ปี",
    bio: "Frontend Developer ที่มีประสบการณ์ด้าน React และ TypeScript กำลังมองหางานใหม่ที่ท้าทายและมีโอกาสเติบโต",
    skills: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Git"],
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleChange = (e) => {
    setEditedProfile({
      ...editedProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {profile.fullName.charAt(0)}
                </div>
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {profile.fullName}
                </h1>
                <p className="text-gray-600 mb-3">{profile.position}</p>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-1.5" />
                    {profile.email}
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-1.5" />
                    {profile.phone}
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1.5" />
                    {profile.location}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700 transition"
            >
              {isEditing ? "ยกเลิก" : "แก้ไขโปรไฟล์"}
            </button>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {isEditing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ชื่อ-นามสกุล
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={editedProfile.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    อีเมล
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editedProfile.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={editedProfile.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    สถานที่
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={editedProfile.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ตำแหน่งงาน
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={editedProfile.position}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ประสบการณ์
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={editedProfile.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เกี่ยวกับ
                </label>
                <textarea
                  name="bio"
                  value={editedProfile.bio}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>
              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700 transition"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>บันทึก</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* About Section */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">เกี่ยวกับ</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
              </div>

              {/* Experience Section */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    ประสบการณ์ทำงาน
                  </h2>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 font-medium">
                    {profile.experience}
                  </p>
                </div>
              </div>

              {/* Skills Section */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <User className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">ทักษะ</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {profile.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Resume Section */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">เรซูเม่</h2>
                </div>
                <button className="flex items-center space-x-2 px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition w-full justify-center">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 font-medium">
                    อัปโหลดเรซูเม่
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
