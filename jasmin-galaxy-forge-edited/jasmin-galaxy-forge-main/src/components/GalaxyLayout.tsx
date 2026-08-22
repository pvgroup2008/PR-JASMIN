import StarField from "./StarField";

const GalaxyLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen galaxy-bg relative">
    <StarField />
    <div className="relative z-10">{children}</div>
  </div>
);
export default GalaxyLayout;
