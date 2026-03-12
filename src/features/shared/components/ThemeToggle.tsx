import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/features/shared/context/ThemeContext";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { isDark, toggle } = useTheme();
  return (
    <Button variant="ghost" size="icon" onClick={toggle} className="rounded-full" aria-label="Toggle theme">
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
};

export default ThemeToggle;
