import React from 'react';
import { motion } from 'framer-motion';

const integrationsList = [
  "Mikrotik",
  "Cisco",
  "TR069",
  "RADIUS Integration",
  "PPPoE Authentication",
  "Captive Portal Integration",
  "Razorpay",
  "PhonePe",
  "UPI",
  "Invoice Generation",
  "GST Invoice Support",
  "SMS Integration",
  "WhatsApp Messaging",
  "Email Integration",
  "Push Notifications",
  "Subscriber Management",
  "Captive Portal Integration",
  "Lead Management",
  "Inventory Management",
  "Ticketing System",
  "Bandwidth Management",
  "Network Monitoring",
  "OLT Integration",
  "ONU/ONT Management",
  "Geo Location Tracking",
  "Document Management",
  "Role-Based Access Control",
  "Billing & Invoices",
  "Reseller / Franchise Distribution",
  "Audit Logs",
  "Analytics Dashboard"
];

// Colors for the little dots next to integration names
const dotColors = ["bg-[#fa6e43]", "bg-blue-400", "bg-purple-400", "bg-green-400", "bg-yellow-400"];

export default function IntegrationsMarquee() {
  const row1 = integrationsList.slice(0, Math.ceil(integrationsList.length / 2));
  const row2 = integrationsList.slice(Math.ceil(integrationsList.length / 2));

  const renderMarqueeRow = (items, direction = "left", duration = 100) => (
    <div className="flex items-center relative w-full mb-4 py-2">
      <motion.div
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration }}
        className="flex whitespace-nowrap items-center w-max"
      >
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center px-3">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#161719] border border-white/5 hover:border-[#fa6e43]/40 hover:shadow-[0_0_20px_rgba(250,110,67,0.15)] hover:bg-[#161719]/80 cursor-pointer transition-colors duration-300">

              <span className="text-[#c0c0c0] text-sm md:text-base font-medium tracking-wide">
                {item}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <section className="py-16 relative z-20 w-full overflow-hidden">
      {/* Enhanced Heading matching the provided design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-[#e3dbd8] tracking-tight">
          Seamless Integrations
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Two rows of scrolling chips */}
        {renderMarqueeRow(row1, "left", 90)}
        {renderMarqueeRow(row2, "right", 110)}

        {/* Fade gradients on edges for smooth entry/exit */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#161719] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#161719] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
