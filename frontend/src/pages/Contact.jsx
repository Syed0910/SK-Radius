import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "Our team will get back to you within 24 hours.",
        });
        setFormData({ name: '', email: '', company: '', message: '' }); // Reset form
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { 
      icon: Mail, 
      title: 'Email Sales & Support', 
      value: 'info@skradius.com', 
      href: 'mailto:info@skradius.com',
      desc: 'Drop us a line anytime.'
    },
    { 
      icon: Phone, 
      title: 'Call Us Directly', 
      value: '+91 8472360140', 
      href: 'tel:+918472360140',
      desc: 'Mon-Fri from 9am to 6pm.'
    },
    { 
      icon: MapPin, 
      title: 'Visit Our Office', 
      value: 'Zars Mansion Near Water Tank yadulla Colony Gulbarga, Gulbarga, India - 585104', 
      href: null,
      desc: 'Come say hello.'
    }
  ];

  const benefits = [
    { icon: Clock, text: "24/7 priority technical support" },
    { icon: ShieldCheck, text: "Enterprise-grade SLA guarantees" },
    { icon: MessageSquare, text: "Dedicated account manager" },
    { icon: CheckCircle2, text: "Custom implementation guidance" },
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen py-24 relative overflow-hidden font-sans">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#fa6e43]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#fa6e43]/5 blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-20 mt-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#fa6e43] text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[#fa6e43] animate-pulse"></span>
            We're here to help
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6 tracking-tight">
            Get in touch
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Whether you need a custom demo, have technical questions, or want to explore partnership opportunities, our experts are ready.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="h-full bg-white/[0.02] border border-white/5 hover:border-[#fa6e43]/30 rounded-2xl p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#fa6e43]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#fa6e43]/20 to-[#fa6e43]/5 border border-[#fa6e43]/20 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="h-6 w-6 text-[#fa6e43]" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2 relative z-10">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-6 relative z-10">{item.desc}</p>
                
                <div className="relative z-10">
                  {item.href ? (
                    <a href={item.href} className="text-[#fa6e43] hover:text-white font-medium transition-colors inline-flex items-center gap-2">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-300 font-medium leading-relaxed">{item.value}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Text & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Let's talk about <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fa6e43] to-[#ff8c42]">scaling your network.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Tell us about your infrastructure needs, and we'll show you how SKRadius can automate your operations and reduce overhead.
            </p>
            
            <div className="space-y-6">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <benefit.icon className="w-5 h-5 text-[#fa6e43]" />
                  </div>
                  <span className="text-gray-300 font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Glassmorphism Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-xl relative shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] pointer-events-none" />
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-300">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-[#0a0a0a]/50 border-white/10 text-white placeholder:text-gray-600 focus:border-[#fa6e43]/50 focus:ring-1 focus:ring-[#fa6e43]/50 h-12 rounded-xl transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-300">Work Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-[#0a0a0a]/50 border-white/10 text-white placeholder:text-gray-600 focus:border-[#fa6e43]/50 focus:ring-1 focus:ring-[#fa6e43]/50 h-12 rounded-xl transition-all"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium text-gray-300">Company (Optional)</Label>
                  <Input
                    id="company"
                    placeholder="Your ISP or Enterprise name"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-[#0a0a0a]/50 border-white/10 text-white placeholder:text-gray-600 focus:border-[#fa6e43]/50 focus:ring-1 focus:ring-[#fa6e43]/50 h-12 rounded-xl transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-gray-300">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you scale your network?"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-[#0a0a0a]/50 border-white/10 text-white placeholder:text-gray-600 focus:border-[#fa6e43]/50 focus:ring-1 focus:ring-[#fa6e43]/50 rounded-xl resize-none transition-all p-4"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-14 bg-gradient-to-r from-[#fa6e43] to-[#ff8c42] hover:from-[#ff8c42] hover:to-[#fa6e43] text-white rounded-xl font-semibold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(250,110,67,0.3)] hover:shadow-[0_0_30px_rgba(250,110,67,0.5)] group flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </Button>
              </form>
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;