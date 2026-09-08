import {
  Code2,
  Smartphone,
  Globe,
  Cloud,
  ShieldCheck,
  Lock,
  ScanSearch,
  ServerCog,
  BrainCircuit,
  Bot,
  LineChart,
  Cpu,
  type LucideIcon,
} from "lucide-react";

export interface Review {
  author: string;
  role: string;
  date: string;
  comment: string;
  rating: number;
}

export interface Service {
  id: string;
  name: string;
  tagline: string;
  location: string;
  description: string;
  rating: number;
  image: string;
  images: string[];
  features: string[];
  featured: boolean;
  amenities: {
    icon: LucideIcon;
    label: string;
    description: string;
  }[];
  details: string[];
  reviews: Review[];
}

export const services: Service[] = [
  {
    id: "software",
    name: "Software Development",
    tagline: "Custom software, engineered to last",
    location: "Web • Mobile • Desktop • Cloud",
    description:
      "From sleek web platforms to robust enterprise systems, we design and build software tailored to your exact needs. Our engineers combine clean architecture, modern stacks, and obsessive attention to detail to deliver products that scale with your ambition.",
    rating: 4.9,
    image: "/services/software.svg",
    images: [],
    features: ["Custom Builds", "Full-Stack", "Cloud Native"],
    featured: true,
    amenities: [
      { icon: Code2, label: "Custom Applications", description: "Purpose-built software for your unique workflows" },
      { icon: Smartphone, label: "Mobile Apps", description: "Native and cross-platform iOS & Android apps" },
      { icon: Globe, label: "Web Platforms", description: "High-performance sites and SaaS platforms" },
      { icon: Cloud, label: "Cloud Solutions", description: "Scalable, resilient cloud infrastructure" },
    ],
    details: [
      "Full-stack development (React, Node.js, Python, Go)",
      "API design & system integration",
      "CI/CD pipelines & DevOps automation",
      "Legacy system modernization",
      "Performance optimization & refactoring",
      "Ongoing maintenance & support plans",
    ],
    reviews: [
      { author: "Sarah M.", role: "CTO, FinTech Startup", rating: 5, date: "December 2025", comment: "CYRIX rebuilt our entire platform in 3 months. Performance improved 4x and our infrastructure costs dropped by 40%." },
      { author: "James T.", role: "Product Lead", rating: 5, date: "November 2025", comment: "Clean code, clear communication, on-time delivery. The best development partner we've worked with." },
      { author: "Emily R.", role: "Engineering Manager", rating: 4, date: "October 2025", comment: "Their architectural recommendations saved us months of rework. Truly senior-level engineering." },
    ],
  },
  {
    id: "security",
    name: "Cyber Security",
    tagline: "Protection that stays ahead of threats",
    location: "Audits • PenTesting • SOC • Compliance",
    description:
      "In a world where a single breach can end a business, CYRIX fortifies your digital assets. Our security experts perform deep penetration testing, harden your infrastructure, and build defense-in-depth strategies that keep you ahead of attackers.",
    rating: 5.0,
    image: "/services/security.svg",
    images: [],
    features: ["PenTesting", "Audits", "24/7 Monitoring"],
    featured: true,
    amenities: [
      { icon: ShieldCheck, label: "Penetration Testing", description: "Real-world attack simulation to find weaknesses first" },
      { icon: ScanSearch, label: "Security Audits", description: "Comprehensive code and infrastructure review" },
      { icon: Lock, label: "Hardening", description: "System and network defense configuration" },
      { icon: ServerCog, label: "Managed SOC", description: "24/7 monitoring, detection & response" },
    ],
    details: [
      "Web & mobile application penetration testing",
      "Vulnerability assessments & remediation",
      "SOC 2, ISO 27001 & GDPR compliance support",
      "Incident response & forensics",
      "Security awareness training for teams",
      "Zero-trust architecture design",
    ],
    reviews: [
      { author: "David L.", role: "CISO, Healthcare", rating: 5, date: "January 2026", comment: "Their pentest found critical flaws two previous vendors missed. The report was detailed and actionable." },
      { author: "Anna K.", role: "Head of IT", rating: 5, date: "December 2025", comment: "CYRIX took us from zero compliance to SOC 2 certified in six months. Exceptional team." },
      { author: "Chris P.", role: "Founder", rating: 5, date: "November 2025", comment: "Their 24/7 monitoring caught an attack attempt at 3 AM. That alone was worth every penny." },
    ],
  },
  {
    id: "ai",
    name: "AI Development",
    tagline: "Intelligence that drives your business",
    location: "LLMs • Automation • ML • Analytics",
    description:
      "Harness the power of artificial intelligence with CYRIX. We build custom AI solutions — from intelligent chatbots and workflow automation to predictive analytics and machine learning models — that turn your data into your competitive edge.",
    rating: 4.8,
    image: "/services/ai.svg",
    images: [],
    features: ["Custom LLMs", "Automation", "Predictive ML"],
    featured: true,
    amenities: [
      { icon: BrainCircuit, label: "Custom AI Solutions", description: "Tailored models trained on your data" },
      { icon: Bot, label: "Intelligent Automation", description: "AI agents that handle repetitive workflows" },
      { icon: LineChart, label: "Predictive Analytics", description: "Forecast trends before they happen" },
      { icon: Cpu, label: "LLM Integration", description: "GPT-class models woven into your products" },
    ],
    details: [
      "Custom chatbot & virtual assistant development",
      "ML model development & deployment",
      "LLM fine-tuning & RAG pipelines",
      "Business process automation with AI agents",
      "Data pipeline & analytics engineering",
      "AI strategy consulting",
    ],
    reviews: [
      { author: "Rachel W.", role: "COO, Logistics", rating: 5, date: "December 2025", comment: "Their automation agents cut our processing time by 70%. The ROI was visible within weeks." },
      { author: "Tom D.", role: "Data Director", rating: 4, date: "November 2025", comment: "They turned our messy data into a reliable forecasting engine. Impressive ML expertise." },
      { author: "Sophie N.", role: "CEO, Retail", rating: 5, date: "October 2025", comment: "The AI assistant they built handles 80% of our customer inquiries. Our team finally focuses on what matters." },
    ],
  },
];

export const getFeaturedServices = () => services.filter((s) => s.featured);

export const getServiceById = (id: string) => services.find((s) => s.id === id);
