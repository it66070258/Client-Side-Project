import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 px-4 md:px-8 border-t border-gray-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <Link
            to="/"
            className="flex items-center space-x-2 text-blue-600 font-bold mb-4 text-xl"
          >
            <Briefcase className="w-6 h-6" />
            <span>JobPortal</span>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed">
            แพลตฟอร์มจัดหางานออนไลน์ที่ดีที่สุด เชื่อมโยงผู้หางานกับบริษัทชั้นนำ
          </p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-4">สำหรับผู้หางาน</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li>
              <Link
                to="/"
                className="hover:text-blue-600 transition-colors"
              >
                ค้นหางาน
              </Link>
            </li>
            <li>
              <Link
                to="/bookmark"
                className="hover:text-blue-600 transition-colors"
              >
                งานที่บันทึก
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="hover:text-blue-600 transition-colors"
              >
                โปรไฟล์
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-4">เกี่ยวกับเรา</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li>
              <Link
                to="#"
                className="hover:text-blue-600 transition-colors"
              >
                เกี่ยวกับบริษัท
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-blue-600 transition-colors"
              >
                ติดต่อเรา
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-blue-600 transition-colors"
              >
                นโยบายความเป็นส่วนตัว
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-4">ติดตามเรา</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition-colors">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto text-center text-sm text-gray-500 pt-8 border-t border-gray-100">
        © 2026 JobPortal. All rights reserved.
      </div>
    </footer>
  );
}
