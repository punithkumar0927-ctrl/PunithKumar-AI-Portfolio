export type ProjectCategory = "AI & ML" | "Data" | "Web" | "Additional";

export type Project = {
  number: string;
  title: string;
  category: ProjectCategory;
  description: string;
  detail: string;
  technologies: string[];
  highlights?: string[];
};

export const projects: Project[] = [
  {
    number: "01",
    title: "Smart Vision Assistant for Visually Impaired Persons",
    category: "AI & ML",
    description:
      "An AI-powered assistive system developed to help visually impaired users understand their surroundings.",
    detail:
      "Major project applying computer vision and deep-learning techniques to identify and interpret objects and scenes through an accessible interface.",
    technologies: ["Python", "AI", "Machine Learning", "Computer Vision", "Deep Learning"],
    highlights: [
      "Identifies and interprets objects and scenes.",
      "Designed as an accessible interface for visually impaired users.",
    ],
  },
  {
    number: "02",
    title: "MediScan AI",
    category: "AI & ML",
    description:
      "A web-based AI medical-screening platform demonstrating preliminary health-risk assessment.",
    detail:
      "Educational and demonstration platform with brain-tumor image analysis and heart-disease risk-prediction modules.",
    technologies: ["Python", "AI", "Machine Learning", "Deep Learning", "Flask", "HTML", "CSS", "JavaScript"],
    highlights: [
      "Brain-tumor image analysis module.",
      "Heart-disease risk-prediction module.",
      "For educational and demonstration purposes only.",
    ],
  },
  {
    number: "03",
    title: "HumanTalk AI",
    category: "AI & ML",
    description:
      "An AI-powered interview platform for structured interviews and more efficient candidate screening.",
    detail:
      "Supports AI-assisted interviews, real-time candidate evaluation, reporting, and HR handoff, with human oversight in hiring decisions.",
    technologies: ["Python", "AI", "Machine Learning", "NLP", "Flask", "HTML", "CSS", "JavaScript"],
    highlights: [
      "AI-assisted structured interviews.",
      "Real-time candidate evaluation and reporting.",
      "HR handoff with human oversight in hiring decisions.",
    ],
  },
  {
    number: "04",
    title: "SQL to MongoDB Converter Using Flask",
    category: "Web",
    description:
      "A Python and Flask web application that converts SQL database structures and queries into MongoDB-compatible formats.",
    detail:
      "Mini project demonstrating backend development and SQL-to-NoSQL integration.",
    technologies: ["Python", "Flask", "SQL", "MongoDB", "HTML", "CSS"],
    highlights: ["Converts SQL database structures and queries to MongoDB-compatible formats."],
  },
  {
    number: "05",
    title: "Medical Cost Prediction",
    category: "Data",
    description:
      "A medical-cost prediction system built with Random Forest and Linear Regression.",
    detail:
      "Built during the data science internship with engineered features for age, BMI, smoking status, and region.",
    technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Jupyter Notebook"],
    highlights: ["Improved prediction reliability by approximately 18%."],
  },
  {
    number: "06",
    title: "U-Turn Accident Prevention System",
    category: "Additional",
    description:
      "Listed as an additional project in the resume; no further project description, technologies, or metrics are provided.",
    detail:
      "The resume provides the project title only.",
    technologies: [],
  },
  {
    number: "07",
    title: "Automatic Street Light System",
    category: "Additional",
    description:
      "Listed as an additional project in the resume; no further project description, technologies, or metrics are provided.",
    detail:
      "The resume provides the project title only.",
    technologies: [],
  },
];

export const skillGroups = [
  {
    title: "Languages",
    skills: ["Python", "Java", "SQL", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "Frameworks & APIs",
    skills: ["Django", "Flask", "FastAPI", "React", "REST APIs"],
  },
  {
    title: "Machine learning",
    skills: ["Scikit-learn", "TensorFlow", "PyTorch", "Keras", "Pandas", "NumPy"],
  },
  {
    title: "AI & data",
    skills: ["Computer vision", "NLP", "Data analytics", "EDA", "Feature engineering"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "Power BI", "Tableau", "Excel", "Jupyter", "MongoDB", "AWS"],
  },
  {
    title: "Working style",
    skills: ["Problem solving", "Collaboration", "Technical writing", "Continuous learning"],
  },
];

export const certificates = [
  { title: "AI Skills Passport", issuer: "EY & Microsoft", year: "2025" },
  {
    title: "Generative AI for All & Prompt Engineering for ML",
    issuer: "Infosys",
    year: "March 2025",
  },
  { title: "Power BI Data Analytics Workshop", issuer: "OfficeMaster", year: "April 2025" },
  { title: "SQL Roadmap Certification", issuer: "OneRoadmap", year: "May 2025" },
  {
    title: "AI For All — AI Aware",
    issuer: "Intel & Ministry of Education, India",
    year: "2025",
  },
  {
    title: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
    issuer: "Oracle",
    year: "2025",
  },
];

export const emailAddress = "punithkumar0927@gmail.com";
export const githubUrl = "https://github.com/punithkumar0927-ctrl";
export const linkedInUrl = "https://www.linkedin.com/in/punithkumarab/";
