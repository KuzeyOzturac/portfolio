export type Project = {
  id: string;
  name: string;
  category: string;
  tools: string;
  icon: string;
  description: string;
  details: string[];
  metric: string;
  metricLabel: string;
  url: string;
  skills: string[];
  sketch: string[];
  color: string;
};
export const projects: Project[] = [
  {
    id: "asl",
    name: "ASL Interpreter",
    category: "Computer vision",
    tools: "Python · PyTorch · Computer Vision",
    icon: "hand",
    description: "Turning hand gestures into written language.",
    details: [
      "Integrated the team’s CNN into a webcam inference pipeline for ASL alphabet gestures. The model achieved 85.27% test accuracy across 27 classes.",
      "Implemented webcam capture, hand isolation, and preprocessing into 256 × 256 grayscale inputs, with letter predictions generated at one-second intervals.",
    ],
    metric: "85.27%",
    metricLabel: "test accuracy · 27 classes",
    url: "https://github.com/SGuransh/ASL-Interpreter",
    skills: ["ml", "code"],
    sketch: ["Webcam", "Hand isolation", "CNN inference", "Text"],
    color: "blue",
  },
  {
    id: "eco",
    name: "EcoLoop",
    category: "NLP & retrieval",
    tools: "Python · Cohere · LangChain · Pinecone",
    icon: "leaf",
    description: "Giving circular-economy ideas a considered evaluation.",
    details: [
      "Used retrieval-augmented generation with LangChain and Pinecone to score business ideas and explain feasibility, market potential, scalability, and maturity.",
      "Used Cohere to classify business ideas for circular-economy relevance and “moonshot” potential, informed by circular-economy research.",
    ],
    metric: "RAG",
    metricLabel: "idea evaluation & explanation",
    url: "https://github.com/CaesarSaleh/EcoLoop",
    skills: ["nlp", "code"],
    sketch: ["Business idea", "Classification", "Retrieval", "Evaluation"],
    color: "green",
  },
  {
    id: "voice",
    name: "VoiceMintify",
    category: "Web3 application",
    tools: "JavaScript · Hedera SDK",
    icon: "mic",
    description: "NFT minting inside a chatbot with facial recognition.",
    details: [
      "Contributed NFT creation and minting to a chatbot with facial recognition using the Hedera JavaScript SDK on testnet.",
      "Implemented transaction signing and metadata submission. The team won Best Use of Hedera at Web3Apps.",
    ],
    metric: "Best Use of Hedera",
    metricLabel: "Web3Apps · team award",
    url: "https://github.com/CaesarSaleh/Voice-Mintify",
    skills: ["code"],
    sketch: ["Chatbot", "Metadata", "Sign transaction", "Mint NFT"],
    color: "red",
  },
  {
    id: "vax",
    name: "VaxOptima",
    category: "Data visualization",
    tools: "Python · Pandas · GeoPandas · Plotly",
    icon: "globe",
    description: "Making a vaccination-distribution simulation visible.",
    details: [
      "Built an animated map of country-level vaccination coverage toward a simulated 70% global target, with a timeline slider and playback controls.",
      "Visualized simulated time to the vaccination target across 100 genetic-algorithm generations to track optimization progress.",
    ],
    metric: "100",
    metricLabel: "genetic-algorithm generations",
    url: "https://github.com/ganeshasapu/VaxOptima",
    skills: ["data", "code"],
    sketch: ["Simulation", "Coverage data", "Map & timeline", "Progress"],
    color: "blue",
  },
  {
    id: "ttc",
    name: "TTC Tracker",
    category: "Interactive software",
    tools: "React · TTC API",
    icon: "train",
    description: "Toronto transit, plotted in real time.",
    details: [
      "Real-time public-transit tracker that consumes TTC data and plots buses on an interactive React map.",
    ],
    metric: "Live transit",
    metricLabel: "interactive Toronto map",
    url: "https://github.com/nsaroiu/TTC-Tracker",
    skills: ["code", "data"],
    sketch: ["TTC data", "Vehicle positions", "React map", "Live view"],
    color: "green",
  },
];
export const skills = [
  {
    id: "code",
    name: "Programming",
    subtitle: "Building the systems",
    icon: "code",
    items: ["Python", "SQL", "JavaScript", "Java", "C", "Assembly", "Pandas"],
    evidence:
      "Applied in the travel and expense application at Kale and the projects below.",
  },
  {
    id: "ml",
    name: "AI / ML",
    subtitle: "Reading the real world",
    icon: "brain",
    items: [
      "PyTorch",
      "CNNs",
      "RNNs",
      "Transformers",
      "Computer vision",
      "OCR",
      "Model inference",
      "Data preprocessing",
    ],
    evidence:
      "Applied in the receipt OCR pipeline at Kale and the ASL Interpreter.",
  },
  {
    id: "nlp",
    name: "NLP & LLMs",
    subtitle: "Working with language",
    icon: "book",
    items: ["NLP", "RAG", "LangChain", "OpenAI API", "Cohere API", "Pinecone"],
    evidence:
      "Applied in EcoLoop’s classification, retrieval, and business-idea evaluation.",
  },
  {
    id: "data",
    name: "Data Visualization",
    subtitle: "Making data legible",
    icon: "chart",
    items: ["Qlik Sense", "Plotly", "GeoPandas"],
    evidence:
      "Applied in seven pharmacy reports at Cencora, VaxOptima, and TTC Tracker.",
  },
];
export const experiences = [
  {
    year: "2026",
    role: "Software Engineer Intern",
    company: "Kale Endüstri Holding",
    icon: "code",
    text: "Developed a Python computer vision and OCR pipeline to isolate multiple receipts from images and extract dates, totals, and tax amounts. Built a travel and expense application with approval workflows, receipt attachments, and administrative tools, and presented it to company stakeholders.",
    tags: ["Computer vision & OCR", "Approval workflows", "Business software"],
  },
  {
    year: "2024",
    role: "Business Intelligence Intern",
    company: "Cencora",
    icon: "chart",
    text: "Built seven interactive Qlik Sense reports, one per pharmacy, for inventory and financial monitoring. Gathered on-site requirements for Crossist cross-selling and barcode inventory workflows across seven pharmacies for IT, logistics, and business development teams.",
    tags: ["Qlik Sense", "7 pharmacies", "Requirements gathering"],
  },
  {
    year: "2019–2022",
    role: "Tutor & Mentor",
    company: "The London Cross Cultural Learner Centre",
    icon: "book",
    text: "Tutored and mentored refugee and newcomer students in English and math in classes of 5–10, supporting their adjustment to Canadian schools.",
    tags: ["English & math", "5–10 students", "Mentoring"],
  },
];
export const awards = [
  "CCLC Youth Leadership Award",
  "Ontario Volunteer Service Award",
  "Platinum Jubilee Medal of Elizabeth II",
];
