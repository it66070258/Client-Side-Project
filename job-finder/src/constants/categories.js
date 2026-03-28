// Category names
export const CATEGORIES = {
  ALL: "ทั้งหมด",
  TECHNOLOGY: "เทคโนโลยี",
  MARKETING: "การตลาด",
  DESIGN: "การออกแบบ",
  FINANCE: "การเงิน",
  SALES: "ขาย",
  MANAGEMENT: "บริหารงาน",
  OTHER: "อื่นๆ",
};

// Category keywords for classification
export const CATEGORY_KEYWORDS = {
  [CATEGORIES.TECHNOLOGY]: [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "Java",
    "JavaScript",
    "Flutter",
    "Docker",
    "AWS",
    "MongoDB",
    "PostgreSQL",
    "Linux",
    "Windows Server",
    "Kubernetes",
    "Firebase",
  ],
  [CATEGORIES.DESIGN]: [
    "Figma",
    "UI Design",
    "Photoshop",
    "Illustrator",
    "Branding",
    "Video Editing",
    "After Effects",
    "Premiere Pro",
  ],
  [CATEGORIES.MARKETING]: [
    "Digital Marketing",
    "SEO",
    "Content",
    "Copywriting",
  ],
  [CATEGORIES.FINANCE]: ["Financial Analysis", "Excel", "SAP"],
  [CATEGORIES.SALES]: ["Sales", "B2B", "CRM"],
  [CATEGORIES.MANAGEMENT]: [
    "Project Management",
    "Product Strategy",
    "Agile",
    "Scrum",
    "HR Management",
    "Business Analysis",
    "Recruitment",
    "Training",
    "Jira",
  ],
};

// Category icons
export const CATEGORY_ICONS = {
  [CATEGORIES.ALL]: "📂",
  [CATEGORIES.TECHNOLOGY]: "💻",
  [CATEGORIES.MARKETING]: "📈",
  [CATEGORIES.DESIGN]: "🎨",
  [CATEGORIES.FINANCE]: "💰",
  [CATEGORIES.SALES]: "🤝",
  [CATEGORIES.MANAGEMENT]: "📋",
};
