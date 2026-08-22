const PRLogo = ({ size = "md", className = "" }: { size?: "sm" | "md" | "lg" | "xl"; className?: string }) => {
  const sizes = { sm: "w-10 h-10 text-lg", md: "w-16 h-16 text-2xl", lg: "w-24 h-24 text-4xl", xl: "w-40 h-40 text-6xl" };
  return (
    <div className={`${sizes[size]} flex items-center justify-center font-display font-bold gold-gradient-text relative ${className}`}>
      <div className="absolute inset-0 rounded-full border border-primary/30 animate-pulse-glow" />
      <span>PR</span>
    </div>
  );
};
export default PRLogo;
