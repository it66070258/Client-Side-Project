import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  FileText,
  Camera,
  Save,
  X,
  Plus,
} from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    position: "",
    experience: "",
    bio: "",
    skills: [],
    resume: null,
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  // ดึงข้อมูล currentUser หรือ profile ที่เคยเซฟไว้
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      // ลองดึง profile เฉพาะคน (ใช้ email เป็น key อ้างอิง) หรือดึงข้อมูลปกติ
      const profileKey = `profile_${currentUser.email}`;
      const savedProfile = JSON.parse(localStorage.getItem(profileKey));

      if (savedProfile) {
        setProfile(savedProfile);
        setEditedProfile(savedProfile);
      } else {
        // ดึงแค่ค่าตั้งต้นจากตอนสมัคร/login ถ้ายังไม่ได้สร้าง profile ลึกซึ้ง
        const initialProfile = {
          fullName: currentUser.fullName || currentUser.email.split("@")[0],
          email: currentUser.email,
          phone: currentUser.phone || "",
          location: "",
          position: "",
          experience: "",
          bio: "",
          skills: [],
          resume: null,
        };
        setProfile(initialProfile);
        setEditedProfile(initialProfile);
      }
    }
  }, []);

  const handleChange = (e) => {
    setEditedProfile({
      ...editedProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSkill = () => {
    if (
      newSkill.trim() &&
      !(editedProfile.skills || []).includes(newSkill.trim())
    ) {
      setEditedProfile({
        ...editedProfile,
        skills: [...(editedProfile.skills || []), newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditedProfile({
      ...editedProfile,
      skills: (editedProfile.skills || []).filter(
        (skill) => skill !== skillToRemove,
      ),
    });
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedProfile({
        ...editedProfile,
        resume: file.name,
      });
    }
  };

  const handleSave = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      const profileKey = `profile_${currentUser.email}`;
      localStorage.setItem(profileKey, JSON.stringify(editedProfile));

      // อัปเดต currentUser ให้มีข้อมูลชื่อใหม่เผื่อไว้ใช้กับ Navbar ด้วย
      const updatedUser = {
        ...currentUser,
        fullName: editedProfile.fullName,
        phone: editedProfile.phone,
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      // Update Users array as well
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = users.findIndex((u) => u.email === updatedUser.email);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem("users", JSON.stringify(users));
      }
      window.dispatchEvent(new Event("storage"));
    }

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
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700 transition"
              >
                แก้ไขโปรไฟล์
              </button>
            )}
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
                    value={editedProfile.fullName || ""}
                    placeholder="ใส่ชื่อ-นามสกุลของคุณ"
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
                    value={editedProfile.email || ""}
                    placeholder="example@email.com"
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
                    value={editedProfile.phone || ""}
                    placeholder="08X-XXX-XXXX"
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
                    value={editedProfile.location || ""}
                    placeholder="เช่น กรุงเทพมหานคร"
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
                    value={editedProfile.position || ""}
                    placeholder="เช่น Frontend Developer"
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
                    value={editedProfile.experience || ""}
                    placeholder="เช่น 1 ปี, 3 ปี"
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
                  value={editedProfile.bio || ""}
                  placeholder="อธิบายเกี่ยวกับตัวคุณ..."
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ทักษะ
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(editedProfile.skills || []).map((skill, idx) => (
                    <span
                      key={idx}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="p-1 hover:bg-blue-200 rounded-full transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleAddSkill())
                    }
                    placeholder="เพิ่มทักษะใหม่..."
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center space-x-1 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    <span>เพิ่ม</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  อัปโหลดเรซูเม่ (PDF, DOCX)
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    id="resume-upload"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                  />
                  <label
                    htmlFor="resume-upload"
                    className="cursor-pointer px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2 transition"
                  >
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 font-medium">เลือกไฟล์</span>
                  </label>
                  <span className="text-sm text-gray-500 truncate max-w-xs">
                    {editedProfile.resume
                      ? editedProfile.resume
                      : "ยังไม่ได้เลือกไฟล์"}
                  </span>
                  {editedProfile.resume && (
                    <button
                      type="button"
                      onClick={() =>
                        setEditedProfile({ ...editedProfile, resume: null })
                      }
                      className="text-red-500 hover:text-red-600 text-sm font-medium"
                    >
                      ลบไฟล์
                    </button>
                  )}
                </div>
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
                {profile.bio && profile.bio.trim() !== "" ? (
                  <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 text-center border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 italic">
                      ยังไม่มีข้อมูลแนะนำตัว
                    </p>
                  </div>
                )}
              </div>

              {/* Experience Section */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    ประสบการณ์ทำงาน
                  </h2>
                </div>
                {profile.experience && profile.experience.trim() !== "" ? (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 font-medium">
                      {profile.experience}
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 text-center border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 italic">
                      ยังไม่ได้ระบุประสบการณ์ทำงาน
                    </p>
                  </div>
                )}
              </div>

              {/* Skills Section */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <User className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">ทักษะ</h2>
                </div>
                {profile.skills && profile.skills.length > 0 ? (
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
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 text-center border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 italic">
                      ยังไม่มีทักษะที่ระบุไว้
                    </p>
                  </div>
                )}
              </div>

              {/* Resume Section */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">เรซูเม่</h2>
                </div>
                {profile.resume ? (
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-6 h-6 text-blue-600" />
                      <span className="text-gray-700 font-medium">
                        {profile.resume}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center px-6 py-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex-col">
                    <span className="text-gray-500 font-medium mb-2">
                      ยังไม่มีเรซูเม่
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
