/** Maps normalized tag text (lowercase, trimmed) to an English label for display. */
const TAG_LABELS_EN: Record<string, string> = {
  // Roles
  "ingeniero de software": "Software Engineer",
  "ingeniera de software": "Software Engineer",
  "software engineer": "Software Engineer",
  "developer": "Developer",
  "desarrollador": "Developer",
  "desarrolladora": "Developer",
  "machine learning engineer": "Machine Learning Engineer",
  "ingeniero de machine learning": "Machine Learning Engineer",
  "data engineer": "Data Engineer",
  "ingeniero de datos": "Data Engineer",
  "product manager": "Product Manager",
  "diseñador": "Designer",
  "diseñadora": "Designer",
  "designer": "Designer",
  "researcher": "Researcher",
  "investigador": "Researcher",
  "legal expert": "Legal Expert",
  "experto legal": "Legal Expert",
  "experts legal": "Legal Expert",

  // Tech / domains
  llm: "LLM",
  "large language model": "Large Language Model",
  ai: "AI",
  ia: "AI",
  nlp: "NLP",
  "computer vision": "Computer Vision",

  // Languages
  spanish: "Spanish",
  español: "Spanish",
  portuguese: "Portuguese",
  portugués: "Portuguese",
  portugues: "Portuguese",
  english: "English",
  inglés: "English",
  ingles: "English",
  bilingual: "Bilingual",
  bilingüe: "Bilingual",

  // Work setup
  remote: "Remote",
  remoto: "Remote",
  "full-time": "Full-time",
  "full time": "Full-time",
  "tiempo completo": "Full-time",
  "part-time": "Part-time",
  "media jornada": "Part-time",
  "hourly contract": "Hourly contract",
  "contrato por horas": "Hourly contract",
  hybrid: "Hybrid",
  híbrido: "Hybrid",

  // Regions
  india: "India",
  "san francisco": "San Francisco",
  "offers equity": "Offers equity",
  "ofrece equity": "Offers equity",
};

function normalizeKey(raw: string): string {
  return raw.trim().toLowerCase();
}

/** English label for UI; filtering still uses the original Sanity string. */
export function jobTagLabelEn(raw: string): string {
  const key = normalizeKey(raw);
  if (TAG_LABELS_EN[key]) return TAG_LABELS_EN[key];
  return raw
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function sortJobTagsForDisplay(tags: string[]): string[] {
  return [...tags].filter(Boolean).sort((a, b) =>
    jobTagLabelEn(a).localeCompare(jobTagLabelEn(b), "en", {
      sensitivity: "base",
    }),
  );
}
