const coupons: Record<string, number> = {
  WELCOME10: 10,
};

const contact = {
  phone: "",
  email: "",
  address: "",
  hours: "",
};

const social: Record<string, string> = {
  instagram: "",
  facebook: "",
  pinterest: "",
};

export const siteConfig = {
  name: "Maison Walnut",
  tagline: "Furniture made for the way you live.",
  description: "Discover thoughtfully designed furniture for living, dining, bedroom and work spaces.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  whatsappNumber: "",
  demoMode: true,
  contact,
  social,
  delivery: {
    fee: 2500,
    freeThreshold: 50000,
  },
  coupons,
  payments: [
    {
      id: "cod",
      label: "Cash on delivery",
      note: "Pay when your order arrives.",
      enabled: true,
    },
  ],
  promo: {
    enabled: true,
  },
};

export const faqs = [
  {
    q: "How do I place an order?",
    a: "Add your chosen pieces to the cart, enter your delivery details at checkout, and submit your order. Our team will contact you to confirm it.",
  },
  {
    q: "Which payment methods are available?",
    a: "Cash on delivery is currently available. Payment is collected when your order arrives.",
  },
  {
    q: "How much does delivery cost?",
    a: `Delivery is Rs. ${siteConfig.delivery.fee.toLocaleString("en-PK")} for orders below Rs. ${siteConfig.delivery.freeThreshold.toLocaleString("en-PK")}. Eligible orders receive free delivery.`,
  },
  {
    q: "When will my order arrive?",
    a: "Our team will confirm the estimated delivery window with you after reviewing your order and delivery address.",
  },
  {
    q: "Can I ask a question before ordering?",
    a: "Use the contact page to send us a message. You can also use WhatsApp once the store number is added to the configuration.",
  },
];