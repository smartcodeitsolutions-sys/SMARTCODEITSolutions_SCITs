import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ExternalLink, Mail, UserPlus } from "lucide-react";

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url: string) => {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([^&\n?#]+)/);
  return match ? match[1] : null;
};

const caseStudiesData = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    caseStudyName: "⚡ Velocity Revamp System",
    category: "DEVELOPMENT",
    description: "Revitalizing corporate identity through high-speed, scalable, modern web architecture.",
    youtubeUrl: "https://youtu.be/1_chW8QiJSE",
    details: {
      overview: "Performance-driven full-stack development for modern, scalable, and conversion-optimized digital platforms.",
      problem: "Legacy platform had 8+ second load times, poor UX, and high bounce rates causing lead loss.",
      solution: "Rebuilt with React and Next.js architecture, mobile-first design, and SSR for speed, SEO, and experience.",
      developedBy: "Smart Code IT Solutions",
      features: ["Lightning-fast optimization", "Mobile-first architecture", "Modern UI/UX system", "SEO-friendly SSR", "Scalable component structure", "Optimized rendering flow"],
      technologies: ["React.js", "Next.js (SSR/SSG)", "HTML5/CSS3/Tailwind", "JavaScript/TypeScript", "REST/API Integration", "Cloud deployment"],
      approachNote: "Solutions are tailored by requirement and budget, from simple static websites to fully custom applications.",
      impact: ["1.2s load time", "50% higher retention", "Improved SEO and lead conversion"],
      future: ["AI UI personalization", "Edge performance optimization", "PWA integration", "Automated SEO systems"],
      note: "Conceptual case study created for demonstration purposes.",
    },
  },
  {
    id: 2,
    title: "E-commerce Setup & Infrastructure",
    caseStudyName: "🌍 Global Commerce Engine",
    category: "DEVELOPMENT",
    description: "From local shop to global storefront with scalable multi-platform e-commerce infrastructure.",
    youtubeUrl: "https://youtu.be/Rr1hTdk-yCU",
    details: {
      overview: "Complete e-commerce setup designed for launch, scale, and multi-market growth.",
      problem: "Brand lost potential customers due to slow checkout and manual inventory handling errors.",
      solution: "Built high-performance infrastructure with automated inventory sync and optimized checkout flow.",
      developedBy: "Smart Code IT Solutions",
      features: ["Multi-platform setup", "Checkout optimization", "Inventory sync", "Global marketplace integration", "Order automation", "Mobile storefront"],
      technologies: ["Shopify", "WooCommerce", "Amazon Seller", "eBay", "Etsy", "Cloud APIs"],
      approachNote: "Platform selection and architecture are based on business goals, scale, and budget; add-ons are separate.",
      impact: ["45% higher conversion", "Reduced manual errors", "Faster order processing"],
      future: ["AI recommendations", "Forecasting tools", "Omnichannel dashboard", "Dynamic pricing automation"],
      note: "Conceptual case study created for demonstration purposes.",
    },
  },
  {
    id: 3,
    title: "Premium Ebooks & Lead Magnets",
    caseStudyName: "📘 Authority Magnet Publishing System",
    category: "MARKETING",
    description: "High-conversion visual storytelling for lead generation and global digital publishing.",
    youtubeUrl: "https://youtu.be/NUKDKsoYkqE",
    details: {
      overview: "Premium ebook and lead magnet design service focused on authority-building and conversion.",
      problem: "Text-heavy content lacked engagement and failed to convert prospects into qualified leads.",
      solution: "Redesigned assets with structured layouts and publishing-ready formats for major platforms.",
      developedBy: "Smart Code IT Solutions",
      features: ["Premium ebook design", "Publishing support", "Visual layouts", "Typography optimization", "Conversion structure", "Brand authority focus"],
      technologies: ["Adobe InDesign", "Illustrator", "Figma", "Canva Pro", "EPUB/PDF formatting", "Publishing optimization tools"],
      approachNote: "Assets are created for both visual impact and bookstore compatibility across major distribution channels.",
      impact: ["35% more lead generation", "Higher engagement", "Global multi-platform distribution"],
      future: ["Interactive ebooks", "AI-assisted design", "Dynamic lead magnets", "Advanced conversion tracking"],
      note: "Conceptual case study created for demonstration purposes.",
    },
  },
  {
    id: 4,
    title: "Custom Template Design",
    caseStudyName: "🎯 Unified Brand Identity System",
    category: "DESIGN",
    description: "Automated master template systems for consistent, scalable brand communication.",
    youtubeUrl: "https://youtu.be/-GNHrJvQarE",
    details: {
      overview: "Unified brand kit architecture for pitch decks, reports, social assets, and client documents.",
      problem: "A startup used inconsistent visual styles across channels, reducing trust and brand recall.",
      solution: "Built a master template ecosystem with matching formats for presentations, PDFs, and digital assets.",
      developedBy: "Smart Code IT Solutions",
      features: ["Master brand kit", "Automated templates", "Cross-format consistency", "Fast production flow", "Reusable systems", "Approval-ready outputs"],
      technologies: ["Figma", "Adobe Creative Suite", "Canva Pro", "Google Slides", "PowerPoint", "PDF tooling"],
      approachNote: "Design systems prioritize cohesion, speed, and repeatability across all communication channels.",
      impact: ["60% faster creation", "100% brand consistency", "Higher perceived professionalism"],
      future: ["AI template personalization", "Brand compliance checks", "Live design tokens", "Auto content mapping"],
      note: "Conceptual case study created for demonstration purposes.",
    },
  },
  {
    id: 5,
    title: "Visual Content & Motion Graphics",
    caseStudyName: "🎬 3-Second Hook Creative Engine",
    category: "DESIGN",
    description: "Scroll-stopping motion systems engineered to capture attention in the first 3 seconds.",
    youtubeUrl: "https://youtu.be/biyR7eZx75Y",
    details: {
      overview: "High-impact short-form visual production for social ads, reels, and conversion-first campaigns.",
      problem: "Audiences dropped within 2 seconds, causing weak retention and poor ad performance.",
      solution: "Implemented 9:16 hook-first motion frameworks with dynamic transitions and high-contrast storytelling.",
      developedBy: "Smart Code IT Solutions",
      features: ["Motion graphics", "Vertical ad creatives", "3-second hook strategy", "Macro visual style", "Retention-first pacing", "Pro post-production"],
      technologies: ["After Effects", "Premiere Pro", "DaVinci Resolve", "Final Cut Pro", "Blender", "Audio sync tools"],
      approachNote: "Creative structure is optimized for platform behavior, attention psychology, and rapid message delivery.",
      impact: ["300% retention uplift", "4x CTR improvement", "Significant engagement growth"],
      future: ["AI editing assistance", "Personalized ad creatives", "Real-time optimization", "Interactive motion formats"],
      note: "Conceptual case study created for demonstration purposes.",
    },
  },
  {
    id: 6,
    title: "Faceless Content Automation",
    caseStudyName: "🎥 Faceless Growth Automation System",
    category: "MARKETING",
    description: "Script-to-content production pipelines for scalable faceless brand growth.",
    youtubeUrl: "https://youtu.be/dYaUhn2E2-Y",
    details: {
      overview: "Structured faceless production workflows for creators and brands needing consistent output at scale.",
      problem: "Creators lacked time and capacity for regular scripting, editing, and publishing.",
      solution: "Built AI-assisted script, voice, footage assembly, and editing pipelines for repeatable publishing.",
      developedBy: "Smart Code IT Solutions",
      features: ["Faceless production", "Niche script systems", "AI voice integration", "Stock-visual assembly", "Automated workflows", "Multi-platform adaptation"],
      technologies: ["AI script tools", "TTS engines", "Premiere Pro", "DaVinci Resolve", "After Effects", "Workflow automation tools"],
      approachNote: "Focus is on sustainable systems and visibility growth, not guaranteed platform monetization.",
      impact: ["Consistent publishing", "Higher production efficiency", "Scalable content operations"],
      future: ["Personalized pipelines", "Auto multi-platform publishing", "Analytics optimization", "Trend detection systems"],
      note: "Conceptual case study created for demonstration purposes.",
    },
  },
  {
    id: 7,
    title: "Strategic Infographic Design",
    caseStudyName: "📊 Clarity Intelligence Design System",
    category: "DESIGN",
    description: "Turning technical complexity into clear, high-authority visual communication.",
    youtubeUrl: "https://youtu.be/nQbq82IV6_0",
    details: {
      overview: "Strategic infographic systems that simplify data-heavy information for stakeholder clarity.",
      problem: "A SaaS team struggled to explain complex architecture to non-technical investors.",
      solution: "Created layered visual narratives and clean infographic structures for fast comprehension.",
      developedBy: "Smart Code IT Solutions",
      features: ["Data visualization", "Complex-to-simple mapping", "Brand-aligned systems", "Investor-ready design", "Structured hierarchy", "Scannable layouts"],
      technologies: ["Illustrator", "Photoshop", "Figma", "Canva Pro", "Data viz tools", "Presentation systems"],
      approachNote: "Designs reduce explanation friction and improve communication speed in high-stakes conversations.",
      impact: ["30% shorter meetings", "Higher investor approval confidence", "Faster technical understanding"],
      future: ["Interactive infographics", "AI data visualization", "Dynamic dashboards", "Real-time storytelling"],
      note: "Conceptual case study created for demonstration purposes.",
    },
  },
  {
    id: 8,
    title: "Digital Marketing & Performance",
    caseStudyName: "🚀 ROI Growth Engine",
    category: "MARKETING",
    description: "Full-funnel performance systems built to maximize return on ad spend.",
    youtubeUrl: "https://youtu.be/P92LdaTieJw",
    details: {
      overview: "Data-driven marketing framework optimizing targeting, creatives, funnels, and conversion.",
      problem: "Low ROAS caused by weak targeting, poor creative testing, and limited funnel strategy.",
      solution: "Applied segmentation, A/B testing, CRO, retargeting, and analytics-based budget allocation.",
      developedBy: "Smart Code IT Solutions",
      features: ["Full-funnel strategy", "Audience segmentation", "Creative testing", "CRO execution", "Retargeting automation", "Analytics reporting"],
      technologies: ["Meta Ads", "Google Ads", "GA4", "Meta Pixel/CAPI", "Shopify", "Hotjar"],
      approachNote: "Channels are selected by ROI efficiency and audience fit instead of one-size-fits-all execution.",
      impact: ["Stronger ROAS trajectory", "Higher conversion efficiency", "Scalable growth foundation"],
      future: ["AI campaign optimization", "Predictive targeting", "Advanced attribution", "Omnichannel orchestration"],
      note: "Conceptual case study created for demonstration purposes.",
    },
  },
  {
    id: 9,
    title: "Technical Maintenance & Support",
    caseStudyName: "🛡️ Digital Guardian Support System",
    category: "SUPPORT",
    description: "Post-deployment protection, optimization, and reliability for digital systems.",
    youtubeUrl: "https://youtu.be/NTr0Xxd3Tac",
    details: {
      overview: "Optional support package ensuring security, uptime, and performance for delivered systems.",
      problem: "Production systems degrade without ongoing updates, monitoring, and incident response.",
      solution: "Implemented monitoring, patching, backups, bug fixing, and optimization workflows.",
      developedBy: "Smart Code IT Solutions",
      features: ["System monitoring", "Backup management", "Security patching", "Bug fixes", "Performance tuning", "Issue resolution"],
      technologies: ["Server tools", "Cloud services", "Security/firewall tooling", "Monitoring suites", "DevOps utilities", "API health tooling"],
      approachNote: "Maintenance support is offered for systems developed by Smart Code IT Solutions under separate agreements.",
      impact: ["Improved stability", "Reduced downtime", "Better security posture"],
      future: ["AI health monitoring", "Predictive incident detection", "Auto-recovery", "Advanced performance layers"],
      note: "Optional support service under dedicated package terms.",
    },
  },
  {
    id: 10,
    title: "Social Media Management",
    caseStudyName: "📣 Authority Growth System",
    category: "MARKETING",
    description: "Structured social growth engine for community engagement and brand authority.",
    youtubeUrl: "https://youtu.be/bYOsosbTB_8",
    details: {
      overview: "Dedicated social management for strategic visibility, trust, and inbound lead generation.",
      problem: "Inactive social channels lowered perceived credibility and stalled audience growth.",
      solution: "Executed a 90-day content and engagement framework with targeted interactions.",
      developedBy: "Smart Code IT Solutions",
      features: ["90-day strategy", "High-value content", "Community engagement", "Authority positioning", "Targeted campaigns", "Performance insights"],
      technologies: ["LinkedIn", "X (Twitter)", "Instagram", "Facebook", "Scheduling tools", "Analytics dashboards"],
      approachNote: "Platform focus is determined by audience relevance and lead quality, not vanity metrics.",
      impact: ["400% follower growth", "50+ qualified inbound leads", "Stronger authority perception"],
      future: ["AI scheduling", "Social listening", "Influencer workflows", "Cross-platform automation"],
      note: "Conceptual case study created for demonstration purposes.",
    },
  },
  {
    id: 11,
    title: "AI-Powered Workflow Automation",
    caseStudyName: "🤖 Intelligent Automation Core",
    category: "AUTOMATION",
    description: "Business process automation systems that remove repetitive manual operations.",
    youtubeUrl: "https://youtu.be/G5QLcHTEKFM",
    details: {
      overview: "Intelligent workflow engineering for faster operations, fewer errors, and scalable execution.",
      problem: "Teams spent 40+ man-hours weekly on repetitive coordination and data operations.",
      solution: "Built AI-assisted orchestration with integrations and event-triggered automation layers.",
      developedBy: "Smart Code IT Solutions",
      features: ["AI workflow automation", "System integrations", "Automated communications", "Smart data handling", "End-to-end workflows", "Real-time execution"],
      technologies: ["OpenAI", "Gemini", "Zapier", "Make", "n8n", "Supabase"],
      approachNote: "Only the most effective stack is selected based on business goals, cost, and complexity.",
      impact: ["90% less manual workload", "Higher operational efficiency", "More strategic team focus"],
      future: ["Predictive automation", "Self-learning orchestration", "Decision intelligence", "Cross-system autonomy"],
      note: "Conceptual case study created for demonstration purposes.",
    },
  },
  {
    id: 12,
    title: "Mobile & App Development",
    caseStudyName: "📱 Seamless Mobility Suite",
    category: "DEVELOPMENT",
    description: "Cross-platform mobile app systems optimized for conversion, retention, and scale.",
    youtubeUrl: "https://youtu.be/MteeZWteeiA",
    details: {
      overview: "High-performance app development for iOS and Android with seamless user journeys.",
      problem: "A retail brand lacked app presence and lost significant mobile traffic and conversions.",
      solution: "Delivered cross-platform app with push notifications, secure checkout, and optimized UX.",
      developedBy: "Smart Code IT Solutions",
      features: ["Cross-platform build", "High-performance UX", "Push notifications", "Secure checkout", "Authentication", "Behavior analytics"],
      technologies: ["Flutter/React Native", "Firebase", "API integrations", "Payment gateways", "Analytics tools", "Cloud services"],
      approachNote: "Technology choices are aligned with budget, maintainability, and long-term performance.",
      impact: ["60% mobile conversion increase", "Improved retention", "Stronger in-app engagement"],
      future: ["AI personalization", "Behavior prediction", "Offline-first architecture", "Super app expansion"],
      note: "Conceptual case study created for demonstration purposes.",
    },
  },
  {
    id: 13,
    title: "Elite Merchandise & Custom Branding",
    caseStudyName: "👕 Elite Merchandise & Custom Branding System",
    category: "PRINT",
    description: "Premium DTF printing and apparel branding that extends brand identity into the physical world.",
    youtubeUrl: "https://youtu.be/X_UTRU_24mw",
    details: {
      overview: "Premium DTF printing solution for durable, high-resolution custom apparel and branded merchandise.",
      problem: "Low-quality prints faded and cracked quickly, reducing brand quality and increasing replacement cost.",
      solution: "Implemented high-definition DTF workflows with wash-resistant output and multi-fabric compatibility.",
      developedBy: "Smart Code IT Solutions",
      features: ["High-resolution DTF prints", "Vibrant long-lasting color", "Multi-fabric support", "Wash-resistant durability", "Corporate branding focus", "Bulk production scale"],
      technologies: ["DTF film transfer systems", "Heat press workflows", "Color calibration process", "Fabric-specific handling", "Bulk print workflows", "Quality assurance checks"],
      approachNote: "Printing is treated as a strategic brand extension system, not only a production task.",
      impact: ["Stronger uniform consistency", "Higher perceived professionalism", "Lower replacement frequency"],
      future: ["Textured multilayer prints", "AI design-to-print automation", "On-demand printing workflows", "Expanded fulfillment network"],
      note: "Structured case study for premium DTF and custom branding services.",
    },
  },
];

const caseStudyVerbatimContent: Record<number, string> = {
  1: `FULL-STACK WEB DEVELOPMENT
Case Study: ⚡ Velocity Revamp System

Overview
Full-Stack Web Development is a performance-driven approach to building modern, scalable, and high-speed web applications. It focuses on transforming outdated digital platforms into fast, responsive, and conversion-optimized experiences.

Problem
A legacy corporate website suffered from 8+ second loading times, poor UX, and a cluttered interface, causing high bounce rates and lead loss.

Solution
We rebuilt the platform with a modern React + Next.js architecture, mobile-first design, and SSR for better speed, SEO, and conversion.

Developed By
Smart Code IT Solutions

Approach Note
Solutions are built by client requirements and budget, from simple static websites to fully dynamic custom-coded systems.

Impact
Loading time dropped from 8s to 1.2s, user retention improved, and search visibility and lead conversion increased.

Future Improvements
• AI-based UI/UX personalization
• Edge performance optimization
• PWA integration
• Automated SEO optimization

Note
Conceptual case study created for demonstration purposes.`,
  2: `E-COMMERCE SETUP & INFRASTRUCTURE
Case Study: 🌍 Global Commerce Engine

Overview
E-commerce Setup & Infrastructure is a complete store development solution designed to help brands launch, structure, and scale their online business across multiple global platforms. It focuses on building fast, conversion-optimized, and fully integrated e-commerce ecosystems.

Problem
A niche brand was losing up to 70% of potential customers due to a slow, non-responsive checkout system and manual inventory handling errors, resulting in poor conversion rates and operational inefficiencies.

Solution
We developed a high-performance e-commerce infrastructure featuring a custom Shopify-to-Amazon integration, an automated inventory synchronization system, and a high-speed one-page checkout flow to streamline the entire purchasing process and reduce friction.
We build e-commerce solutions based on client needs and budget — from basic store setups to fully customized multi-platform infrastructures.
We also provide setup across multiple global marketplaces including Amazon, eBay, Etsy, Walmart, Shopify, WooCommerce, Lazada, and other major platforms, depending on business requirements.

Developed By
Smart Code IT Solutions

Key Features
🛒 Multi-Platform Store Setup
⚡ High-Speed Checkout Optimization
🔗 Inventory Synchronization Systems
🌍 Global Marketplace Integration
📦 Order Processing Automation
📱 Mobile-Optimized Storefront Design

Technologies & Platforms
🛍️ Shopify
🛒 WooCommerce
📦 Amazon Seller Central
🏪 eBay Seller Systems
🛍️ Etsy Store Setup
🌐 Walmart Marketplace
🧩 Custom API Integrations
☁️ Cloud-Based E-commerce Infrastructure

Approach Note
We design scalable e-commerce systems based on business size, goals, and budget. Our focus is on building reliable and high-conversion storefronts rather than offering unrelated services.
We do not provide product hunting, advanced product sourcing, or virtual assistant services as part of this package. These services can be offered separately as add-ons if required by the client.
Similarly, digital marketing services are not included in e-commerce setup packages and are handled under a separate performance marketing service category.
Developed stores are fully platform-ready and optimized for launch, while additional services can be requested as independent packages.

Impact
Achieved a 45% increase in conversion rates, eliminated manual data entry errors, and significantly improved order processing speed and customer experience across multiple sales channels.

Future Improvements
• AI-powered product recommendation systems
• Advanced inventory forecasting tools
• Multi-channel automation dashboards
• Smart pricing optimization systems

Note
Conceptual case study created for demonstration purposes.`,
  3: `PREMIUM EBOOKS & LEAD MAGNETS
Case Study: 📘 Authority Magnet Publishing System

Overview
Premium Ebooks & Lead Magnets is a high-conversion content design and publishing service focused on transforming technical or informational content into visually compelling digital assets. It enhances readability, engagement, and brand authority through strategic design, storytelling, and multi-platform publishing.

Problem
A technical brand was struggling to generate leads because their whitepapers and guides were presented in plain, text-heavy formats that failed to engage readers or communicate value effectively.

Solution
We redesigned their content into a cohesive, premium visual system featuring structured layouts, high-impact typography, and modern design elements. The final assets are optimized for both lead generation funnels and global ebook distribution platforms, ensuring maximum reach and visibility.
We also provide publishing support across major digital bookstores and reading platforms, enabling brands to distribute their content professionally worldwide.

Developed By
Smart Code IT Solutions

Key Features
📘 Premium Ebook & Digital Guide Design
🌍 Multi-Platform Publishing Support
🎨 High-Impact Visual Layouts
✍️ Typography-Focused Composition
📊 Conversion-Oriented Content Structuring
💡 Brand Authority Enhancement

Technologies & Tools
🎨 Adobe InDesign
🧩 Adobe Illustrator
🖥️ Figma
📄 Canva Pro
📚 EPUB / PDF / Print-Ready Formatting Tools
📊 Digital Publishing Optimization Tools

Publishing Platforms (Supported Distribution)
📖 Amazon Kindle / Amazon KDP
📚 Barnes & Noble Press
🍏 Apple Books
📱 Google Play Books
📘 Kobo Writing Life

Approach Note
We design and format ebooks not only for visual excellence but also for global publishing compatibility. Each asset is optimized according to platform requirements to ensure smooth approval and professional presentation across all major digital bookstores.
Our focus is on transforming content into high-conversion, authority-building digital products that strengthen brand positioning and audience trust.

Impact
Increased lead generation by 35%, improved content engagement, and successfully positioned the brand as a thought leader with multi-platform global distribution.

Future Improvements
• Interactive ebooks
• AI-assisted content design automation
• Personalized dynamic lead magnets
• Advanced conversion tracking integration

Note
Conceptual case study created for demonstration purposes.`,
  4: `CUSTOM TEMPLATE DESIGN
Case Study: 🎯 Unified Brand Identity System

Concept
Unified Brand Identity (Efficiency and Cohesion).

Challenge
A startup had inconsistent styles across pitch decks, reports, invoices, and social assets.

Solution
We developed a master brand kit with matching templates for presentations, reports, and digital assets.

Impact
Document creation time dropped by 60% while maintaining consistent brand identity across channels.

Note
Conceptual case study created for demonstration purposes.`,
  5: `VISUAL CONTENT & MOTION GRAPHICS
Case Study: 🎬 3-Second Hook Creative Engine

Overview
Visual Content & Motion Graphics is a high-impact creative service focused on producing engaging short-form visuals, motion graphics, and social media ads designed to capture attention within the first few seconds. It enhances brand visibility, engagement, and conversion through dynamic storytelling.

Problem
An innovative product (such as a smart fitness wearable) was struggling with extremely low social media retention, with users scrolling past ads in under 2 seconds, resulting in poor engagement and weak campaign performance.

Solution
We developed a high-performance 9:16 motion graphics strategy using extreme macro visuals, dynamic transitions, and attention-grabbing text overlays to create an immediate visual hook. Each creative is designed to stop the scroll and maximize viewer retention within the first 3 seconds.
We also provide video editing and post-production services for brands that require professional editing support for their existing content.

Developed By
Smart Code IT Solutions

Key Features
🎬 High-Impact Motion Graphics
📱 Short-Form Vertical Video Ads (9:16)
⚡ 3-Second Hook Strategy Execution
🎨 Extreme Macro & Dynamic Visuals
🧠 Attention-Based Creative Design
✂️ Professional Video Editing Services

Technologies & Tools
🎥 Adobe After Effects
🎞️ Adobe Premiere Pro
🟣 DaVinci Resolve
🍎 Final Cut Pro
🎨 Photoshop / Illustrator
🧩 Blender (3D Motion Elements)
📱 CapCut / Mobile Editing Tools
🔊 Audio Sync & Sound Design Tools

Approach Note
We create visually engineered content designed to maximize retention in the first few seconds. Every video is structured around psychological attention triggers, motion pacing, and platform-specific engagement behavior.
Video editing services are also available as a separate offering for clients who require post-production, refinement, or enhancement of their existing footage.

Impact
Increased social media video retention rates by 300%, significantly improved engagement metrics, and achieved up to 4x higher click-through rates through optimized visual storytelling.

Future Improvements
• AI-assisted video editing automation
• Personalized dynamic ad creatives
• Real-time performance-based creative optimization
• Interactive motion content formats

Note
Conceptual case study created for demonstration purposes.`,
  6: `FACELESS CONTENT AUTOMATION
Case Study: 🎥 Faceless Growth Automation System

Overview
Faceless Content Automation is a structured content production system designed to help creators and brands produce high-quality digital content without the need for on-camera presence. It focuses on niche-based content creation, scripting, editing workflows, and distribution strategy to support scalable content growth.

Problem
A content creator wanted to launch a professional YouTube channel but lacked the time, technical resources, and production capacity required for scripting, filming, and editing consistent content.

Solution
We developed a complete faceless content workflow system including niche-based script structuring, AI-assisted voice generation, stock footage-based video assembly, and automated editing pipelines.
This system is designed for content production and branding support, not monetization guarantees. We focus on building the infrastructure required for consistent content output and audience growth.
We also provide content editing, faceless video production, product-based ads, and niche-specific content creation depending on client requirements.
Additionally, we assist in YouTube channel branding and multi-platform social media presence setup to improve visibility and organic growth potential. Growth-related services (content strategy, branding, distribution support) are offered as separate packages.

Developed By
Smart Code IT Solutions

Key Features
🎥 Faceless Content Production System
🧠 Niche-Based Script Creation
🎙️ AI Voiceover Integration
📦 Stock Footage Video Assembly
⚙️ Automated Content Workflow
📱 Multi-Platform Content Adaptation

Technologies & Tools
🤖 AI Script Tools
🎙️ Text-to-Speech Engines
🎬 Adobe Premiere Pro
🟣 DaVinci Resolve
🎞️ After Effects
📹 Stock Footage Libraries
🧩 Automation & Workflow Tools

Approach Note
We create structured content systems based on client niche and goals. Services are flexible and may include faceless content creation, product ads, or editing support depending on requirements.
We do not guarantee monetization or platform earnings. Instead, we focus on building strong content systems, branding, and distribution strategies that improve visibility and growth potential.
YouTube channel branding and multi-platform social media optimization can be provided as separate services under dedicated packages.

Impact
Enabled consistent content production workflows, improved publishing efficiency, and supported scalable content strategies across multiple niches, leading to stronger audience engagement and long-term growth potential.

Future Improvements
• AI-driven content personalization
• Fully automated multi-platform publishing systems
• Advanced analytics-based content optimization
• Smart trend detection for niche growth

Note
Conceptual case study created for demonstration purposes.`,
  7: `STRATEGIC INFOGRAPHIC DESIGN
Case Study: 📊 Clarity Intelligence Design System

Overview
Strategic Infographic Design is a visual communication service focused on transforming complex technical, business, or data-heavy information into clear, structured, and high-impact visual assets. It enhances understanding, engagement, and decision-making through simplified storytelling.

Problem
A technical SaaS company struggled to explain its complex AI architecture to non-technical investors, resulting in long sales cycles and reduced clarity during pitch meetings.

Solution
We designed a series of structured, brand-aligned infographics that converted complex backend logic into clean, layered visual systems. These visuals made technical information easily understandable for investors and stakeholders, improving communication efficiency and decision-making speed.

Developed By
Smart Code IT Solutions

Key Features
📊 Data Visualization Design
🧠 Complex-to-Simple Information Mapping
🎨 Brand-Aligned Visual Systems
📈 Investor-Friendly Presentation Design
🧩 Structured Content Hierarchy
⚡ High-Impact Scannable Layouts

Technologies & Tools
🎨 Adobe Illustrator
🧩 Adobe Photoshop
📊 Figma
📄 Canva Pro
📄A.I Tools
📈 Data Visualization Tools
🖥️ Presentation Design Software

Approach Note
We specialize in converting complex technical and business concepts into visually structured, easy-to-understand formats. Each infographic is designed to improve clarity, reduce explanation time, and enhance communication efficiency.
We work across multiple use cases including SaaS architecture, business reports, investor decks, and technical breakdowns — always focusing on clarity, precision, and visual authority.

Impact
Reduced average sales meeting time by 30% and significantly improved investor deck approval rates by making complex information easier to understand and more visually engaging.

Future Improvements
• Interactive infographic systems
• AI-generated data visualization
• Dynamic investor dashboards
• Real-time data storytelling tools

Note
Conceptual case study created for demonstration purposes.`,
  8: `DIGITAL MARKETING & PERFORMANCE
Case Study: 🚀 ROI Growth Engine

Overview
The ROI Engine is a data-driven digital marketing system designed to help brands scale revenue through structured performance strategies. It focuses on optimizing the entire customer journey — from targeting to conversion — using analytics, automation, and continuous testing.

Problem
Many e-commerce brands struggle with low returns on ad spend due to poor targeting, weak creatives, lack of funnel strategy, and limited performance tracking.

Solution
The ROI Engine applies a full-funnel marketing approach, combining advanced audience segmentation, creative testing, conversion optimization, and retargeting systems to maximize ROI and turn ad spend into a scalable growth engine.

Developed By
Smart Code IT Solutions

Key Features
⚙️ Full-Funnel Marketing Strategy
🎯 Audience Segmentation (Cold, Warm, Hot)
🧪 Creative A/B Testing System
📈 Conversion Rate Optimization (CRO)
🔁 Retargeting & Automation
📊 Performance Tracking & Analytics

Technologies & Platforms
📌 Meta Ads Manager
📌 Google Ads
📌 Google Analytics 4 (GA4)
📌 Meta Pixel & Conversion API
📌 Shopify
📌 Hotjar

Paid Media & Distribution Channels (Used When Relevant)
📱 Meta (Facebook & Instagram Ads)
🔎 Google Search & Display Network
▶️ YouTube Ads
💼 LinkedIn Ads (B2B campaigns only)
🎵 TikTok Ads (high-performance creative campaigns)
📌 Pinterest Ads (niche/product-based campaigns)
❌ X (Twitter) Ads (selective use for specific audiences)
🛒 Amazon Ads
🏪 eBay Ads
🛍️ Etsy Ads
🪟 Microsoft Ads (Bing PPC)

Approach Note
We do not run campaigns on every platform by default. Each channel is selected based on audience behavior, conversion potential, and ROI efficiency. This ensures budget is invested only where it produces measurable results, minimizing unnecessary ad spend.

Impact
This conceptual system demonstrates how brands can scale from low-performing campaigns to high-ROI growth by implementing structured, data-driven marketing strategies.

Future Improvements
• AI-based campaign optimization
• Predictive audience targeting
• Advanced attribution models
• Omnichannel marketing automation

Note
Conceptual case study created for demonstration purposes.`,
  9: `TECHNICAL MAINTENANCE & SUPPORT
Case Study: 🛡️ Digital Guardian Support System

Overview
Optional post-deployment maintenance for long-term performance, stability, and security.

Problem
Digital systems require consistent monitoring, patching, and optimization to remain reliable.

Solution
We provide monitoring, bug fixing, security updates, backups, and performance optimization for supported systems.

Developed By
Smart Code IT Solutions

Approach Note
Maintenance is provided under separate support agreements for systems developed by Smart Code IT Solutions.

Impact
Improved uptime, stronger security posture, and more reliable user experience.

Future Improvements
• AI-based health monitoring
• Predictive issue detection
• Automated recovery
• Advanced optimization layers

Note
Optional service under separate maintenance agreements.`,
  10: `DEDICATED SOCIAL MEDIA MANAGEMENT
Case Study: 📣 Authority Growth System

Overview
Structured social media growth system focused on authority, engagement, and consistent presence.

Problem
Inactive profiles created low credibility and weak inbound trust.

Solution
We deployed a 90-day strategy with high-value content, engagement workflows, and targeted interaction campaigns.

Developed By
Smart Code IT Solutions

Approach Note
Platform prioritization is based on audience relevance and lead quality.

Impact
Organic growth, stronger authority, and improved inbound lead quality.

Future Improvements
• AI content planning
• Sentiment analysis
• Influencer workflows
• Cross-platform automation

Note
Conceptual case study created for demonstration purposes.`,
  11: `AI-POWERED WORKFLOW AUTOMATION
Case Study: 🤖 Intelligent Automation Core

Overview
Intelligent automation systems that reduce repetitive manual tasks and improve operational speed.

Problem
Teams spent excessive time on repetitive data and communication workflows.

Solution
We built automation layers with AI models, orchestration tools, and API integrations for real-time execution.

Developed By
Smart Code IT Solutions

Approach Note
Tool stacks are selected by business need, scalability, and cost efficiency.

Impact
Manual workload decreased significantly and teams shifted focus to strategic execution.

Future Improvements
• Predictive automation
• Multi-platform orchestration
• Self-learning workflows
• AI decision support layers

Note
Conceptual case study created for demonstration purposes.`,
  12: `MOBILE & APP DEVELOPMENT
Case Study: 📱 Seamless Mobility Suite

Overview
Cross-platform mobile app development for fast, intuitive, and scalable user experiences.

Problem
A retail business lacked a dedicated app and lost mobile engagement and conversion opportunities.

Solution
We delivered a cross-platform mobile app with high-performance UI, secure checkout, and push workflows.

Developed By
Smart Code IT Solutions

Approach Note
Technology decisions are based on scalability, budget efficiency, and long-term maintainability.

Impact
Mobile conversion and retention improved with stronger app-based engagement.

Future Improvements
• AI personalization
• Predictive engagement
• Offline-first architecture
• Expanded app ecosystem

Note
Conceptual case study created for demonstration purposes.`,
  13: `ELITE MERCHANDISE & CUSTOM BRANDING
Case Study: Elite Merchandise & Custom Branding (DTF & More)

Overview
Premium DTF printing and apparel branding system designed for durable, high-quality brand presentation.

Problem
Low-grade apparel printing faded quickly, reduced professionalism, and increased replacement costs.

Solution
Implemented high-resolution DTF workflows with strong adhesion, wash resistance, and multi-fabric compatibility.

Use Cases
• Corporate uniforms
• Restaurant and retail staff apparel
• Event merchandise
• Promotional brand kits

Approach Note
Printing is treated as a physical extension of brand identity with precision in color, placement, and material matching.

Impact
Improved perceived professionalism, stronger brand consistency, and lower apparel replacement frequency.

Future Improvements
• Multi-layer texture effects
• AI design-to-print automation
• On-demand printing systems
• Expanded fulfillment capabilities

Note
Structured case study for premium DTF and custom branding services.`
};

const sectionHeadings = new Set([
  "Overview",
  "Problem",
  "Solution",
  "Developed By",
  "Approach Note",
  "Impact",
  "Future Improvements",
  "Note",
  "Use Cases",
  "Challenge",
  "Concept",
]);

const renderStyledCaseStudyContent = (content: string) => {
  const lines = content.split("\n");

  return lines.map((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      return <div key={`spacer-${index}`} className="h-3" />;
    }

    if (index === 0) {
      return (
        <h3 key={`title-${index}`} className="text-sm sm:text-base font-extrabold tracking-wide text-foreground/95 uppercase">
          {trimmed}
        </h3>
      );
    }

    if (trimmed.startsWith("Case Study:")) {
      return (
        <p key={`case-study-${index}`} className="text-sm sm:text-base text-primary font-semibold">
          {trimmed}
        </p>
      );
    }

    if (sectionHeadings.has(trimmed)) {
      return (
        <h4 key={`heading-${index}`} className="mt-3 text-sm sm:text-base font-bold text-foreground">
          {trimmed}
        </h4>
      );
    }

    if (trimmed.startsWith("•")) {
      return (
        <div key={`bullet-${index}`} className="pl-4 relative text-sm text-muted-foreground leading-relaxed">
          <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-primary/80" />
          {trimmed.replace(/^•\s*/, "")}
        </div>
      );
    }

    return (
      <p key={`line-${index}`} className="text-sm text-muted-foreground leading-relaxed">
        {trimmed}
      </p>
    );
  });
};

const YouTubeModal = ({
  isOpen,
  videoId,
  onClose,
}: {
  isOpen: boolean;
  videoId: string | null;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && videoId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
            >
              <X size={24} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CaseStudyDetailsModal = ({
  isOpen,
  study,
  onClose,
}: {
  isOpen: boolean;
  study: (typeof caseStudiesData)[0] | null;
  onClose: () => void;
}) => {
  const verbatimContent = study ? caseStudyVerbatimContent[study.id] : "";

  return (
    <AnimatePresence>
      {isOpen && study && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative rounded-2xl max-w-3xl w-full max-h-[88vh] overflow-hidden border border-primary/20 bg-gradient-to-b from-card via-card to-card/90 shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-primary/15 via-transparent to-primary/10 pointer-events-none" />

            <div className="relative flex justify-between items-start p-6 sm:p-8 pb-5 border-b border-border/60">
              <div className="pr-6">
                <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary uppercase tracking-wider">
                  {study.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-3 leading-tight">{study.caseStudyName}</h2>
                <p className="text-sm sm:text-base text-muted-foreground mt-2">{study.title}</p>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 rounded-full bg-secondary/70 p-2 border border-border/70 hover:border-primary/40"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 sm:p-8 pt-6 max-h-[calc(88vh-170px)] overflow-y-auto">
              <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-secondary/60 to-secondary/20 p-5 sm:p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">View Case Study Description</h3>
                <div className="space-y-1">
                  {renderStyledCaseStudyContent(verbatimContent || study.details.overview)}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-border/60 flex gap-3">
                <button 
                  onClick={() => {
                    onClose();
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                >
                Get Started
                </button>
                <button 
                  onClick={() => {
                    onClose();
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/10 transition-colors"
                >
                Contact Us
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CaseStudiesSection = () => {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<(typeof caseStudiesData)[0] | null>(
    null
  );

  return (
    <section id="case-studies" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary tracking-wider uppercase">
            Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-3 mb-4">
            Our <span className="text-gradient-primary">Case Studies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore real-world implementations of our services. Watch videos, view detailed case studies, and see how we can help your business grow.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {caseStudiesData.map((study, index) => {
              const videoId = getYouTubeVideoId(study.youtubeUrl);
              return (
                <motion.div
                  key={study.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="group rounded-xl overflow-hidden glass hover:neon-glow-cyan transition-all duration-300 flex flex-col h-full"
                >
                  {/* Video Thumbnail */}
                  <div className="relative h-48 bg-gradient-to-br from-secondary to-muted overflow-hidden group">
                    {videoId && (
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                        alt={study.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => videoId && setSelectedVideoId(videoId)}
                        className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
                      >
                        <Play size={32} fill="currentColor" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">
                      {study.category}
                    </span>
                    <h3 className="font-bold text-foreground mt-2 mb-2 text-lg">
                      {study.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                      {study.description}
                    </p>

                    {/* Buttons */}
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => videoId && setSelectedVideoId(videoId)}
                          className="flex-1 px-3 py-2 rounded-lg border border-primary text-primary text-xs font-semibold hover:bg-primary/10 transition-colors flex items-center justify-center gap-1"
                        >
                          <Play size={14} />
                          Watch Video
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedCaseStudy(study)}
                          className="flex-1 px-3 py-2 rounded-lg border border-primary text-primary text-xs font-semibold hover:bg-primary/10 transition-colors flex items-center justify-center gap-1"
                        >
                          <ExternalLink size={14} />
                          View Case Study
                        </motion.button>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            const contactSection = document.getElementById("contact");
                            if (contactSection) {
                              contactSection.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                          className="flex-1 px-3 py-2 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors flex items-center justify-center gap-1"
                        >
                          <Mail size={14} />
                          Contact Us
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            window.open(`https://wa.me/923022120509?text=Hi! I'm interested in ${study.title}. Can you help?`, "_blank");
                          }}
                          className="flex-1 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-1"
                        >
                          <UserPlus size={14} />
                          Join Us
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modals */}
      <YouTubeModal
        isOpen={selectedVideoId !== null}
        videoId={selectedVideoId}
        onClose={() => setSelectedVideoId(null)}
      />
      <CaseStudyDetailsModal
        isOpen={selectedCaseStudy !== null}
        study={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </section>
  );
};

export default CaseStudiesSection;
