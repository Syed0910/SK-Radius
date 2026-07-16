import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

const Privacy = () => {
  const sections = [
    {
      title: '1. Introduction',
      content: `This Privacy Policy outlines how AANIRIDS (the creators of SKRadius) collects, uses, processes, transfers, and protects data. SKRadius is a comprehensive ISP Management Platform offering RADIUS, Syslog, and TR-069 ACS solutions. This policy applies to ISPs (our clients) and, by extension, the data processed on behalf of their end-users/subscribers.`
    },
    {
      title: '2. Information We Collect',
      content: `To provide the SKRadius services, we may collect and process:
      
      • Client Information: ISP business details, contact names, billing information, and email addresses.
      • Network Data: NAS configurations, router IPs, TR-069 CPE data, and equipment MAC addresses.
      • End-User Data (Processed on behalf of ISPs): Subscriber PPPoE/Hotspot credentials, connection logs, bandwidth usage, session durations, and IP assignments.
      • System Logs: Administrative audit logs, login attempts, and system telemetry to ensure optimal software performance.`
    },
    {
      title: '3. How We Use the Data',
      content: `Data collected through the SKRadius platform is utilized strictly for the following purposes:
      
      • Core Service Provision: Authenticating, authorizing, and accounting (AAA) for internet sessions.
      • Network Management: Provisioning devices via TR-069 ACS and maintaining syslog archives.
      • Customer Support: Assisting ISPs with troubleshooting, configuration, and bug resolution.
      • Billing & Invoicing: Processing subscription payments for the SKRadius software licenses.
      • Security & Analytics: Detecting fraudulent activities, anomalous network behaviour, and improving platform stability.`
    },
    {
      title: '4. Data Sharing & Third Parties',
      content: `AANIRIDS does not sell or rent your data. Information is only shared under these specific conditions:
      
      • Legal & Regulatory Compliance: Providing logs or user data to law enforcement or regulatory authorities (e.g., DoT/TRAI in India) when legally mandated.
      • Trusted Sub-processors: Utilizing secure cloud infrastructure providers (e.g., AWS, DigitalOcean) to host the SKRadius environment.
      • Business Transfers: In the event of a merger, acquisition, or sale of assets, data may be transferred with the business.`
    },
    {
      title: '5. Security Measures',
      content: `SKRadius implements robust security protocols to protect sensitive ISP and subscriber data:
      
      • Encryption of data in transit (TLS/SSL) and at rest.
      • Role-Based Access Control (RBAC) ensuring only authorized ISP administrators can access subscriber data.
      • Regular database backups and failover mechanisms to prevent data loss.
      • While we strive for maximum security, no system is entirely impenetrable, and ISPs must practice secure password management.`
    },
    {
      title: '6. ISP Responsibilities',
      content: `As an ISP using SKRadius, you act as the "Data Controller" for your subscribers' data, while AANIRIDS acts as the "Data Processor." You are responsible for ensuring that you have the appropriate legal basis and subscriber consent to collect and manage their data using our platform.`
    },
    {
      title: '7. Updates to this Policy',
      content: `We may update this Privacy Policy periodically to reflect changes in our platform features, legal requirements, or operational practices. ISPs will be notified of significant changes via the SKRadius administrative dashboard or email.`
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#fa6e43]/10 to-transparent -z-10"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
            <p className="text-xl text-gray-400">
              How AANIRIDS protects your data and privacy on the SKRadius platform.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {sections.map((section, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white/5 border border-white/10 rounded-xl px-6 backdrop-blur-sm overflow-hidden data-[state=open]:bg-white/[0.07] transition-all">
                <AccordionTrigger className="text-white hover:text-[#fa6e43] transition-colors py-6 text-lg font-medium">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 whitespace-pre-line pb-6 leading-relaxed">
                  {section.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-16 bg-gradient-to-r from-white/5 to-[#fa6e43]/10 border border-white/10 rounded-2xl p-10 text-center">
            <h3 className="text-2xl font-semibold text-white mb-4">Still have questions about privacy?</h3>
            <p className="text-gray-400 mb-6">
              Our support team is ready to clarify any details regarding data processing and security.
            </p>
            <a href="mailto:info@aanirids.com" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-[#fa6e43] hover:bg-[#ff8c66] transition-colors shadow-[0_0_20px_rgba(255,99,71,0.3)]">
              Contact Privacy Team
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;