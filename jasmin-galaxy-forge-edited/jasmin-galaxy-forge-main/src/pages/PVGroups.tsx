import { motion } from "framer-motion";
import GalaxyLayout from "../components/GalaxyLayout";
import Navbar from "../components/Navbar";
import PRLogo from "../components/PRLogo";
import ceoPortrait from "@/assets/ceo-portrait.png";

const PVGroups = () => (
  <GalaxyLayout>
    <Navbar />
    <div className="pt-24 pb-16 px-4 container mx-auto max-w-4xl">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl gold-gradient-text text-center mb-12">
        PV GROUPS
      </motion.h1>

      {/* Hero */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="relative flex flex-col items-center mb-16">
        <div className="absolute opacity-10">
          <PRLogo size="xl" />
        </div>
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-primary/30 shadow-[0_0_60px_hsl(42,80%,55%,0.2)]">
          <img src={ceoPortrait} alt="P. R. Karthik Varshan" className="w-full h-full object-cover object-top" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground mt-6">P. R. Karthik Varshan</h2>
        <p className="text-primary font-heading text-sm tracking-widest mt-1">Visionary Entrepreneur</p>
      </motion.div>

      {/* Bio */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass-card p-8 mb-8">
        <p className="text-foreground font-body leading-relaxed mb-4">
          P. R. Karthik Varshan is a visionary young entrepreneur and the founder behind the concept of JASMIN BUSINESS. With a strong passion for business intelligence, financial management, and innovative thinking, he aims to build digital platforms that help people understand and manage their businesses effectively.
        </p>
        <p className="text-foreground font-body leading-relaxed">
          Through initiatives like JASMIN BUSINESS and PV GROUPS, he focuses on combining technology, financial awareness, and agricultural appreciation to create a balanced approach to modern entrepreneurship.
        </p>
      </motion.div>

      {/* Vision & Mission */}
      {[
        { title: "VISION", text: "To build intelligent platforms that empower individuals to manage finances, understand business growth, and respect the importance of agriculture in the global economy." },
        { title: "MISSION", text: "To simplify business management using digital technology and inspire future entrepreneurs through innovation and knowledge." },
      ].map((section, i) => (
        <motion.div key={section.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="glass-card p-8 mb-8">
          <h3 className="font-display text-lg gold-gradient-text mb-3 tracking-wider">{section.title}</h3>
          <p className="text-foreground font-body leading-relaxed">{section.text}</p>
        </motion.div>
      ))}
    </div>
  </GalaxyLayout>
);

export default PVGroups;
