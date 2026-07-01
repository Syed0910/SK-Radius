import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

const Privacy = () => {
  const sections = [
    {
      title: 'Overview',
      content: 'This Privacy Policy describes how AaniRids Technologies Private Limited collects, uses, processes, transfers, and protects user/subscriber data in connection with services and website usage.'
    },
    {
      title: 'Personal Data Collected',
      content: `The company may collect the following types of information:
      
      • Full name
      • Contact details (email, phone number)
      • Subscriber service information
      • Location and service usage statistics
      • Technical data related to internet service provision
      • Nature or profile of data transmissions
      • Other information necessary for provisioning, billing, or maintenance of services`
    },
    {
      title: 'Data Use and Sharing',
      content: `The company may use, process, or transfer subscriber data under the following circumstances:
      
      • Provision of services to the customer
      • Administrative and support functions
      • Legal compliance with authorities or regulatory bodies
      • Communication with third parties (e.g., debt collection, credit bureaus)
      • Market and usage analysis and internal reporting
      • Fraud detection and revenue analysis`
    },
    {
      title: 'User Consent',
      content: `By using the services or accessing the website, users:
      
      • Consent to the collection, processing, and use of data as described
      • Agree that the data may be used for the purposes outlined above`
    },
    {
      title: 'Data Protection Measures',
      content: `The company endeavours to take adequate measures for data protection and privacy, which may include:
      
      • Administrative safeguards
      • Physical security measures
      • Technical/engineering controls
      • Procedures to protect against unauthorized access
      
      Note: Absolute security cannot be guaranteed; laws, government requests, or legal procedures may require disclosure.`
    },
    {
      title: 'Legal Compliance',
      content: 'The collection, processing, and sharing of subscriber data may be required to comply with applicable telecommunication and privacy laws in India.'
    }
  ];

  return (
    <div className="bg-[#161719] min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-[#e3dbd8] mb-8">Privacy Policy</h1>
          <p className="text-gray-300 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {sections.map((section, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-[#161719]/50 border border-[#161719] rounded-lg px-6">
                <AccordionTrigger className="text-white hover:text-[#fa6e43] transition-colors">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 whitespace-pre-line">
                  {section.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 bg-[#161719]/50 border border-[#161719] rounded-lg p-8">
            <h3 className="text-xl font-semibold text-[#c0c0c0] mb-4">Contact Us</h3>
            <p className="text-gray-400">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-[#fa6e43] mt-2">
              Email: info@skradius.com
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;