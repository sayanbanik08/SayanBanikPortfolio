// import "react-crud-icons/dist/react-crud-icons.css";

import { useGSAP } from "@gsap/react";
import { usePortalStore, useThemeStore } from "@stores";
import gsap from "gsap";
import Image from 'next/image';
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";

const ThemeSwitcher = () => {
  const themeSwitcherRef = useRef<HTMLDivElement>(null);
  const { nextTheme } = useThemeStore();
  const isActive = usePortalStore((state) => state.activePortalId);
  const [positionClass, setPositionClass] = useState<string>('top-6 right-6');
  const [mobileTopStyle, setMobileTopStyle] = useState<React.CSSProperties>({});
  const toggleTheme = () => nextTheme();

  useGSAP(() => {
    gsap.to(themeSwitcherRef.current, {
      opacity: isActive ? 0 : 1,
      duration: 1,
      delay: isActive ? 0 : 1,
    });
  }, [isActive]);

  useEffect(() => {
    // On mobile, offset by safe-area to stay clear of notch / status bar
    if (isMobile) {
      setPositionClass('right-2');
      setMobileTopStyle({ top: 'max(0.5rem, env(safe-area-inset-top, 0.5rem))' });
    } else {
      setPositionClass('top-6 right-6');
      setMobileTopStyle({});
    }
  }, [isMobile]);

  return (
    <div className={`fixed ${positionClass}`} ref={themeSwitcherRef} style={{ opacity: 0, zIndex: 2, ...mobileTopStyle }}>
      <div className="flex items-center justify-center gap-2">
        <a className="hover:cursor-pointer" onClick={toggleTheme}>
          <Image src="icons/night-mode.svg" width={24} height={24} alt="night mode" loading="lazy" />
        </a>
      </div>
    </div>
  );
};

export default ThemeSwitcher;