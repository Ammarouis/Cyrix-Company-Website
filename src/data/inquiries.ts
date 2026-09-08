export interface Inquiry {
  id: string;
  serviceId: string;
  clientName: string;
  email: string;
  phone: string;
  budget: string;
  timeline: string;
  status: 'new' | 'in-progress' | 'closed';
  createdAt: Date;
}

// Mock inquiries data for demonstration
export const mockInquiries: Inquiry[] = [
  {
    id: "INQ001",
    serviceId: "software",
    clientName: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 555 010 0001",
    budget: "15k-50k",
    timeline: "1-3m",
    status: "new",
    createdAt: new Date("2026-01-10"),
  },
  {
    id: "INQ002",
    serviceId: "security",
    clientName: "Emma Wilson",
    email: "emma.wilson@email.com",
    phone: "+1 555 010 0002",
    budget: "5k-15k",
    timeline: "asap",
    status: "in-progress",
    createdAt: new Date("2026-01-12"),
  },
  {
    id: "INQ003",
    serviceId: "ai",
    clientName: "Michael Brown",
    email: "m.brown@email.com",
    phone: "+1 555 010 0003",
    budget: "50k+",
    timeline: "3-6m",
    status: "new",
    createdAt: new Date("2026-01-08"),
  },
  {
    id: "INQ004",
    serviceId: "software",
    clientName: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 555 010 0004",
    budget: "5k-15k",
    timeline: "1-3m",
    status: "in-progress",
    createdAt: new Date("2026-01-14"),
  },
  {
    id: "INQ005",
    serviceId: "ai",
    clientName: "David Lee",
    email: "d.lee@email.com",
    phone: "+1 555 010 0005",
    budget: "15k-50k",
    timeline: "flexible",
    status: "new",
    createdAt: new Date("2026-01-13"),
  },
  {
    id: "INQ006",
    serviceId: "security",
    clientName: "Jennifer Taylor",
    email: "jen.taylor@email.com",
    phone: "+1 555 010 0006",
    budget: "50k+",
    timeline: "3-6m",
    status: "closed",
    createdAt: new Date("2026-01-15"),
  },
  {
    id: "INQ007",
    serviceId: "software",
    clientName: "Robert Clark",
    email: "r.clark@email.com",
    phone: "+1 555 010 0007",
    budget: "< 5k",
    timeline: "flexible",
    status: "closed",
    createdAt: new Date("2026-01-05"),
  },
  {
    id: "INQ008",
    serviceId: "security",
    clientName: "Lisa Anderson",
    email: "lisa.a@email.com",
    phone: "+1 555 010 0008",
    budget: "15k-50k",
    timeline: "1-3m",
    status: "in-progress",
    createdAt: new Date("2026-01-14"),
  },
  {
    id: "INQ009",
    serviceId: "ai",
    clientName: "Chris Martinez",
    email: "c.martinez@email.com",
    phone: "+1 555 010 0009",
    budget: "5k-15k",
    timeline: "1-3m",
    status: "new",
    createdAt: new Date("2026-01-12"),
  },
  {
    id: "INQ010",
    serviceId: "software",
    clientName: "Amy Thompson",
    email: "amy.t@email.com",
    phone: "+1 555 010 0010",
    budget: "15k-50k",
    timeline: "3-6m",
    status: "in-progress",
    createdAt: new Date("2026-01-11"),
  },
];

export const getInquiriesByService = (serviceId: string) =>
  mockInquiries.filter((inquiry) => inquiry.serviceId === serviceId);

export const getRecentInquiries = () => {
  const today = new Date();
  return mockInquiries.filter(
    (inquiry) => inquiry.createdAt >= today && inquiry.status !== "closed"
  );
};

export const getInquiryStats = () => {
  const total = mockInquiries.length;
  const newInquiries = mockInquiries.filter((i) => i.status === "new").length;
  const inProgress = mockInquiries.filter((i) => i.status === "in-progress").length;
  const closed = mockInquiries.filter((i) => i.status === "closed").length;

  return { total, newInquiries, inProgress, closed };
};
