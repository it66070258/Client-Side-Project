import {
  CATEGORIES,
  CATEGORY_KEYWORDS,
  CATEGORY_ICONS,
} from "../constants/categories";

/**
 * Get category from job tags with caching
 * @param {string[]} tags - Array of job tags
 * @returns {string} Category name
 */
export function getCategoryFromTags(tags) {
  if (!tags || tags.length === 0) return CATEGORIES.OTHER;

  const tagString = tags.join(" ");

  // Check each category's keywords
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((keyword) => tagString.includes(keyword))) {
      return category;
    }
  }

  return CATEGORIES.OTHER;
}

/**
 * Build categories array with job counts
 * @param {Array} jobs - Array of job objects
 * @returns {Array} Categories with count and icon
 */
export function buildCategoriesWithCounts(jobs) {
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
    categoryCounts[category]++;
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

/**
 * Search jobs by query across multiple fields
 * @param {Array} jobs - Array of job objects
 * @param {string} query - Search query
 * @returns {Array} Filtered jobs
 */
export function searchJobs(jobs, query) {
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

/**
 * Filter jobs by category
 * @param {Array} jobs - Array of job objects
 * @param {string} category - Category name
 * @returns {Array} Filtered jobs
 */
export function filterJobsByCategory(jobs, category) {
  if (category === CATEGORIES.ALL) return jobs;

  return jobs.filter((job) => {
    const jobCategory = getCategoryFromTags(job.tags);
    return jobCategory === category;
  });
}
