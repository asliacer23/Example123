import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { useTheme } from "@/features/shared/context/ThemeContext";

const ParticleBackground = () => {
  const [init, setInit] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options: ISourceOptions = {
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      color: { value: isDark ? "#ffffff" : "#000000" },
      links: {
        color: isDark ? "#ffffff" : "#000000",
        distance: 150,
        enable: true,
        opacity: 0.08,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        outModes: { default: "out" },
      },
      number: {
        density: { enable: true },
        value: 60,
      },
      opacity: { value: { min: 0.03, max: 0.15 } },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
};

export default ParticleBackground;
