'use client';

import { useGSAP } from "@gsap/react";
import { AdaptiveDpr, Preload, ScrollControls, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { Suspense, useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";

import { useThemeStore } from "@stores";

import Preloader from "./Preloader";
import ProgressLoader from "./ProgressLoader";
import { ScrollHint } from "./ScrollHint";
import ThemeSwitcher from "./ThemeSwitcher";
// import {Perf} from "r3f-perf"

const CanvasLoader = (props: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundColor = useThemeStore((state) => state.theme.color);
  const { progress } = useProgress();
  const [canvasStyle, setCanvasStyle] = useState<React.CSSProperties>({
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0,
    overflow: "hidden",
  });

  useEffect(() => {
    if (!isMobile) {
      const borderStyle = {
        inset: '1rem',
        width: 'calc(100% - 2rem)',
        height: 'calc(100% - 2rem)',
      };
      setCanvasStyle({ ...canvasStyle, ...borderStyle })
    }
  }, [isMobile]);

  useGSAP(() => {
    if (progress === 100) {
      gsap.to('.base-canvas', { opacity: 1, duration: 3, delay: 1 });
    }
  }, [progress]);

  useGSAP(() => {
    gsap.to(ref.current, {
      backgroundColor: backgroundColor,
      duration: 1,
    });
    gsap.to(canvasRef.current, {
      backgroundColor: backgroundColor,
      duration: 1,
      ...noiseOverlayStyle,
    });

    if (typeof window !== 'undefined') {
      // Dynamically update the mobile browser theme-color to inherit the site color
      const updateMetaTag = (name: string, content: string) => {
        let metaTag = document.querySelector(`meta[name='${name}']`);
        if (!metaTag) {
          metaTag = document.createElement("meta");
          metaTag.setAttribute("name", name);
          document.head.appendChild(metaTag);
        }
        metaTag.setAttribute("content", content);
      };

      // Keep Safari toolbar white always
      updateMetaTag("theme-color", "#ffffff");
      updateMetaTag("apple-mobile-web-app-status-bar-style", "black-translucent");
      updateMetaTag("apple-mobile-web-app-capable", "yes");
      updateMetaTag("mobile-web-app-capable", "yes");
    }
  }, [backgroundColor]);

  const noiseOverlayStyle = {
    backgroundBlendMode: "soft-light",
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E\")",
    backgroundRepeat: "repeat",
    backgroundSize: "100px",
  };

  return (
    <div className="wrapper relative">
      <div className="relative w-full h-full" ref={ref}>
        <Canvas className="base-canvas"
          shadows
          style={canvasStyle}
          ref={canvasRef}
          dpr={[1, 2]}>
          {/* <Perf/> */}
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />

            <ScrollControls pages={4} damping={0.4} maxSpeed={1} distance={1} style={{ zIndex: 1 }}>
              {props.children}
              <Preloader />
            </ScrollControls>

            <Preload all />
          </Suspense>
          <AdaptiveDpr pixelated />
        </Canvas>
        <ProgressLoader progress={progress} />
        {/* White fade from top */}
        <div
          className="absolute top-0 left-0 w-full pointer-events-none"
          style={{
            height: '180px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 35%, rgba(255,255,255,0.15) 65%, rgba(255,255,255,0) 100%)',
            zIndex: 1,
          }}
        />
        {/* White fade from bottom */}
        <div
          className="absolute bottom-0 left-0 w-full pointer-events-none"
          style={{
            height: '180px',
            background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 35%, rgba(255,255,255,0.15) 65%, rgba(255,255,255,0) 100%)',
            zIndex: 1,
          }}
        />
      </div>
      <ThemeSwitcher />
      <ScrollHint />
    </div>
  );
};

export default CanvasLoader;