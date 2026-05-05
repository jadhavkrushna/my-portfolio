import { lazy, PropsWithChildren, Suspense, useCallback, useEffect, useRef, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import ErrorBoundary from "./utils/ErrorBoundary";
import { isWebGLAvailable } from "./utils/webglCheck";
import { useLoading } from "../context/LoadingProvider";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const { setLoading, setIsLoading } = useLoading();
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const [webGLAvailable, setWebGLAvailable] = useState<boolean>(true);
  const isDesktopRef = useRef(window.innerWidth > 1024);

  const resizeHandler = useCallback(() => {
    setSplitText();
    const newIsDesktop = window.innerWidth > 1024;
    // Only trigger re-render if the breakpoint actually changed
    if (newIsDesktop !== isDesktopRef.current) {
      isDesktopRef.current = newIsDesktop;
      setIsDesktopView(newIsDesktop);
    }
  }, []);

  useEffect(() => {
    const available = isWebGLAvailable();
    setWebGLAvailable(available);
    if (!available) {
      setLoading(100);
      setTimeout(() => setIsLoading(false), 2000);
    }
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []); // Empty dependency array — no more re-running on isDesktopView change

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            {isDesktopView && webGLAvailable && (
              <ErrorBoundary fallback={<div className="tech-fallback">WebGL not supported</div>}>
                <Suspense fallback={<div>Loading....</div>}>
                  <TechStack />
                </Suspense>
              </ErrorBoundary>
            )}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
