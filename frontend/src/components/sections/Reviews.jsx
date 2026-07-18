import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { GlassCard } from '../ui/premium';

const reviews = [
  {
    quote: 'Switching to ISP Radius cut our subscriber churn by 18% within the first quarter — the captive portal alone paid for itself.',
    name: 'Rohan Mehta',
    role: 'CTO, AeroISP',
    initials: 'RM',
    color: 'bg-blue-500',
  },
  {
    quote: "One of the best choice of ISP. Thanks for making beautiful product. Its an honor to being a customer of SK Radius.",
    name: 'Hammad',
    role: 'SignTel',
    initials: 'H',
    color: 'bg-indigo-500',
  },
  {
    quote: 'We migrated 12,000 subscribers from FreeRADIUS over a single weekend with zero downtime. The vendor support list made it painless.',
    name: 'Priya Nair',
    role: 'Network Lead, StreamNet',
    initials: 'PN',
    color: 'bg-purple-500',
  },
  {
    quote: "1. It is very user friendly, it helps us a lot to track data usage of our clients.\n2. Data usage, sorting for the clients in regions.\n3. Of course!",
    name: 'Dimitrija',
    role: 'Dominion',
    initials: 'D',
    color: 'bg-blue-600',
  },
  {
    quote: "SK Radius is best isp management isp software. This software help me to manage users and see activity and logs and usage. Also i can see live traffic graph.",
    name: 'Hasnain ali',
    role: 'TechLife Internet Network',
    initials: 'HA',
    color: 'bg-slate-700',
  },
  {
    quote: "The log server's real-time alerts caught a misconfigured NAS before it took down service for half our customer base.",
    name: 'David Chen',
    role: 'Founder, GridTel',
    initials: 'DC',
    color: 'bg-emerald-500',
  },
  {
    quote: "SK Radius software has revolutionized our ISP operations by streamlining the billing process for our PPPoE connected users and efficiently managing multiple routers.",
    name: 'Rehan Aqeel',
    role: 'Gigabit Networks (Pvt.) Ltd.',
    initials: 'RA',
    color: 'bg-orange-500',
  },
  {
    quote: "Dear SK Radius team requests users to display payment due details while browsing so they remember paying.",
    name: 'Shahid Ghumman',
    role: 'Metrofiber Pvt Ltd',
    initials: 'SG',
    color: 'bg-violet-600',
  },
  {
    quote: "Very reliable and well-designed software. Tracking bandwidth usage has never been easier.",
    name: 'Sheikh Usman',
    role: 'Prime Networks',
    initials: 'SU',
    color: 'bg-green-600',
  },
  {
    quote: "SK Radius has completely automated our billing cycle. We've seen a massive drop in late payments since the automatic reminders were enabled.",
    name: 'Tanya Y.',
    role: 'Director, SkyNet ISP',
    initials: 'TY',
    color: 'bg-rose-500',
  },
  {
    quote: "The seamless integration with MikroTik routers is unmatched. It took us less than a day to onboard our entire subscriber base.",
    name: 'Carlos Mendez',
    role: 'Lead Engineer, Global Connect',
    initials: 'CM',
    color: 'bg-cyan-600',
  },
  {
    quote: "Our customer support calls have dropped by 40% because clients can easily check their own usage and pay bills through the SK Radius portal.",
    name: 'Aisha K.',
    role: 'Operations Head, Urban Wi-Fi',
    initials: 'AK',
    color: 'bg-fuchsia-600',
  },
  {
    quote: "The live traffic graphs and proactive alerts give us the visibility we need to ensure 99.9% uptime for our premium corporate clients.",
    name: 'James Wilson',
    role: 'CEO, Enterprise Fiber',
    initials: 'JW',
    color: 'bg-amber-500',
  }
];

export default function Reviews() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#161719] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-[#c0c0c0] mb-4">Trusted by ISPs Worldwide</h2>
          <p className="text-xl text-gray-400">
            Real outcomes from teams running their network operations on our platform.
          </p>
        </motion.div>

        <div className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden pause-on-hover">
          {/* Top and Bottom Fade Masks */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#161719] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#161719] to-transparent z-10 pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-6 h-full">
            {[0, 1, 2].map((colIndex) => {
              const colReviews = reviews.filter((_, i) => i % 3 === colIndex);
              // Duplicate to ensure smooth infinite scrolling
              const displayReviews = [...colReviews, ...colReviews, ...colReviews, ...colReviews];

              return (
                <div 
                  key={colIndex} 
                  className={`flex-1 flex flex-col gap-6 animate-marquee-vertical ${colIndex === 1 ? 'hidden md:flex' : ''} ${colIndex === 2 ? 'hidden lg:flex' : ''}`}
                  style={{ animationDuration: `${20 + colIndex * 4}s` }}
                >
                  {displayReviews.map((r, i) => (
                    <GlassCard key={`${r.name}-${i}`} className="p-6 flex flex-col shrink-0 border border-white/[0.05] bg-white/[0.02]">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${r.color}`}>
                          {r.initials}
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-sm">{r.name}</h4>
                          <p className="text-gray-400 text-xs">{r.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>

                      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line flex-1">
                        {r.quote}
                      </p>
                    </GlassCard>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}