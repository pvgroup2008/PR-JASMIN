import { Link, useLocation } from "react-router-dom";
import PRLogo from "./PRLogo";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/agrijas", label: "Agrijas" },
  { path: "/pv-groups", label: "PV Groups" },
];

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <PRLogo size="sm" />
          <span className="font-display text-sm tracking-widest gold-gradient-text">JASMIN BUSINESS</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-heading tracking-wide transition-colors duration-300 ${
                location.pathname === item.path ? "text-primary gold-glow" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden glass-card border-t border-border/30 p-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`text-sm font-heading ${location.pathname === item.path ? "text-primary" : "text-muted-foreground"}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
export default Navbar;
