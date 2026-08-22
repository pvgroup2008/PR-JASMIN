import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PRLogo from "../components/PRLogo";
import GalaxyLayout from "../components/GalaxyLayout";
import Navbar from "../components/Navbar";
import { TrendingUp, BarChart3, Leaf, Users } from "lucide-react";

const features = [
  { icon: BarChart3, title: "Business Calculator", desc: "Track income, spending, and profit with real-time analytics." },
  { icon: TrendingUp, title: "AI Predictions", desc: "Get intelligent forecasts on your business performance." },
  { icon: Leaf, title: "Agrijas", desc: "Explore agriculture knowledge and sustainability." },
  { icon: Users, title: "PV Groups", desc: "Visionary leadership driving innovation." },
];

const Index = () => (
  <GalaxyLayout>
    <Navbar />
    {/* Hero */}
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute"
      >
        <PRLogo size="xl" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="font-display text-5xl md:text-7xl font-bold gold-gradient-text text-center tracking-wider mb-6 relative"
      >
        JASMIN BUSINESS
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="text-muted-foreground text-lg md:text-xl text-center max-w-2xl mb-10 font-body"
      >
        Smart business intelligence and financial calculation platform designed for modern entrepreneurs.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link
          to="/dashboard"
          className="px-8 py-3 rounded-lg font-heading font-semibold text-sm tracking-wide bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20"
        >
          Explore Business Dashboard
        </Link>
        <Link
          to="/agrijas"
          className="px-8 py-3 rounded-lg font-heading font-semibold text-sm tracking-wide glass-card text-foreground hover:border-primary/50 transition-all duration-300"
        >
          Learn More
        </Link>
      </motion.div>
    </section>

    {/* Features */}
    <section className="py-24 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="glass-card-hover p-6 text-center"
          >
            <f.icon className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  </GalaxyLayout>
);

export default Index;
