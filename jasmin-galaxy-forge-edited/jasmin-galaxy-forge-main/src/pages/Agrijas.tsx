import { motion } from "framer-motion";
import GalaxyLayout from "../components/GalaxyLayout";
import Navbar from "../components/Navbar";
import agri1 from "@/assets/agri-1.jpg";
import agri2 from "@/assets/agri-2.jpg";
import agri3 from "@/assets/agri-3.jpg";
import agri4 from "@/assets/agri-4.jpg";

const cards = [
  { img: agri1, title: "Green Farming Fields" },
  { img: agri2, title: "Farmers Working" },
  { img: agri3, title: "Crop Plantations" },
  { img: agri4, title: "Irrigation Systems" },
];

const Agrijas = () => (
  <GalaxyLayout>
    <Navbar />
    <div className="pt-24 pb-16 px-4 container mx-auto max-w-6xl">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl gold-gradient-text text-center mb-4">
        AGRIJAS
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 font-body">
        Celebrating the beauty of farming, nature, and sustainable agricultural practices.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass-card-hover overflow-hidden group"
          >
            <div className="aspect-video overflow-hidden">
              <img src={c.img} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-4">
              <h3 className="font-heading font-semibold text-foreground">{c.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass-card p-8 max-w-3xl mx-auto text-center">
        <p className="text-foreground font-body leading-relaxed text-lg">
          Agriculture is the foundation of human survival and economic stability. AGRIJAS celebrates the beauty of farming, nature, and sustainable agricultural practices that support life and global business.
        </p>
      </motion.div>
    </div>
  </GalaxyLayout>
);

export default Agrijas;
