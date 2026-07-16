import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

const Terms = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing or using the SKRadius platform, provided by AANIRIDS, you agree to be bound by these Terms of Service. This agreement governs your use of our ISP Management software, including RADIUS, Syslog, TR-069 ACS features, and associated APIs.`
    },
    {
      title: '2. Software License & Usage',
      content: `AANIRIDS grants you a non-exclusive, non-transferable, revocable license to use SKRadius for your ISP operations, subject to your subscription plan.
      
      • You may not reverse engineer, decompile, or attempt to extract the source code of the SKRadius software.
      • The license is tied to your specific ISP operation and cannot be sub-licensed to third parties without explicit written consent from AANIRIDS.
      • Usage limits (e.g., maximum active subscribers or NAS devices) apply based on your chosen pricing tier.`
    },
    {
      title: '3. Telecommunication & Regulatory Compliance',
      content: `As an Internet Service Provider (ISP), you acknowledge that you are solely responsible for complying with all local and national telecommunication laws (e.g., DoT guidelines in India).
      
      • You must maintain valid ISP licenses required to operate in your jurisdiction.
      • SKRadius provides tools (like Syslog archiving) to help you meet compliance requirements, but AANIRIDS is not liable for your failure to comply with regulatory mandates.`
    },
    {
      title: '4. Service Availability & SLA',
      content: `AANIRIDS strives to ensure maximum uptime for the SKRadius platform.
      
      • Our standard SLA guarantees 99.9% uptime for cloud-hosted environments.
      • We reserve the right to perform scheduled maintenance, which will be communicated in advance.
      • In the event of unforeseen outages, our liability is limited to prorated service credits, up to the value of your current month's subscription fee.`
    },
    {
      title: '5. Acceptable Use Policy',
      content: `You agree not to use SKRadius for any unlawful or abusive activities.
      
      • You will not use the platform to facilitate network attacks, spam, or distribution of illegal content.
      • You will not intentionally overload the SKRadius APIs or infrastructure.
      • Violation of this policy may result in immediate suspension or termination of your account without a refund.`
    },
    {
      title: '6. Billing and Payments',
      content: `Subscription fees are billed in advance on a monthly or annual basis, as per your agreement.
      
      • Failure to pay invoices on time may lead to service interruption.
      • All fees are exclusive of applicable taxes unless stated otherwise.
      • Refunds are handled on a case-by-case basis and are generally not provided for partial months of service.`
    },
    {
      title: '7. Limitation of Liability',
      content: `AANIRIDS provides SKRadius on an "as is" and "as available" basis.
      
      • AANIRIDS shall not be liable for any indirect, incidental, special, or consequential damages, including loss of profits, revenue, or data.
      • Your sole remedy for dissatisfaction with the software or services is to stop using them.`
    },
    {
      title: '8. Termination',
      content: `Either party may terminate this agreement with 30 days written notice. AANIRIDS may terminate your access immediately if you breach these terms. Upon termination, your right to use SKRadius ceases, and you must safely extract your data before the service is decommissioned.`
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-[#fa6e43]/10 to-transparent -z-10"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Terms of Service</h1>
            <p className="text-xl text-gray-400">
              The rules and guidelines for using the SKRadius platform.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#fa6e43]/20 to-transparent border-l-4 border-[#fa6e43] rounded-r-xl p-6 mb-12">
            <p className="text-gray-300 text-lg">
              By deploying or accessing SKRadius services, you agree to be bound by these Terms and Conditions. Please review them carefully to understand your rights and obligations as an ISP.
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
            <h3 className="text-2xl font-semibold text-white mb-4">Have questions about our Terms?</h3>
            <p className="text-gray-400 mb-6">
              If you need clarification on any of the terms or require a custom Enterprise Agreement, our legal team is available.
            </p>
            <a href="mailto:legal@aanirids.com" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-[#fa6e43] hover:bg-[#ff8c66] transition-colors shadow-[0_0_20px_rgba(255,99,71,0.3)]">
              Contact Legal Team
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;