import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

const Terms = () => {
  const sections = [
    {
      title: 'Contract & Agreement',
      content: `The Customer's Registration Form (CRF), Terms & Conditions (GTC), and any applicable Service Level Agreement (SLA) govern the agreement between you and AaniRids Technologies Private Limited.`
    },
    {
      title: 'Service Provision',
      content: `The company provides:
      
      • Delivery of subscribed broadband/internet service
      • Assignment of IP addresses for internet access
      • Services governed under Indian telecommunication laws such as the Telegraph Act and related statutes`
    },
    {
      title: 'Compliance Requirements',
      content: `Subscribers must:
      
      • Be legally eligible and properly licensed
      • Comply with statutory and operational requirements
      • Ensure premises rights for installation and use
      • Avoid pending liquidation or legal impediments affecting service performance`
    },
    {
      title: 'Billing and Payment',
      content: `• Invoices are sent electronically or via email
      • Subscribers may request physical bills at additional charge
      • Company reserves rights of assignment and billing verification
      • The company may disclose subscriber info required by law`
    },
    {
      title: 'Subscriber Usage Rules',
      content: `Subscribers must not use services to:
      
      • Harm or violate rights or laws
      • Upload/host unlawful or offensive content
      • Infringe intellectual property or privacy rights
      • Engage in abusive, harassing, or harmful activities`
    },
    {
      title: 'Suspension of Service',
      content: `Company may suspend services:
      
      • For legal compliance
      • For maintenance or emergencies
      • For non-compliance with terms
      • Without waiving subscriber's billing obligations during suspension`
    },
    {
      title: 'Limitation of Liability',
      content: `• Company's liability is limited to the charges payable for the month of the event causing liability
      • Subscriber undertakes not to reverse engineer or exploit proprietary software
      • Subscriber indemnifies the company against third-party claims`
    },
    {
      title: 'Confidentiality',
      content: `Each party must:
      
      • Maintain confidentiality post termination of agreement
      • Not disclose sensitive information except as required by law`
    }
  ];

  return (
    <div className="bg-slate-950 min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-white mb-8">Terms & Conditions</h1>
          <p className="text-gray-300 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="bg-orange-900/20 border border-orange-500/50 rounded-lg p-6 mb-8">
            <p className="text-gray-300">
              By using SKRadius services, you agree to be bound by these Terms and Conditions. 
              Please read them carefully.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {sections.map((section, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-slate-900/50 border border-slate-800 rounded-lg px-6">
                <AccordionTrigger className="text-white hover:text-orange-500 transition-colors">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 whitespace-pre-line">
                  {section.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 bg-slate-900/50 border border-slate-800 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-white mb-4">Questions?</h3>
            <p className="text-gray-400">
              If you have any questions about these Terms & Conditions, please contact us at:
            </p>
            <p className="text-orange-500 mt-2">
              Email: info@skradius.com
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;