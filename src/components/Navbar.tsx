import { useEffect, useRef } from "react";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

// Export lenis instance so other modules can use it (e.g. initialFX)
export let lenis: Lenis;

const Navbar = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenis = lenisInstance;
    lenisRef.current = lenisInstance;

    // Connect Lenis to GSAP ScrollTrigger
    lenisInstance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Start paused (will be unpaused by initialFX after loading)
    lenisInstance.stop();

    // Handle nav link clicks — smooth scroll to section
    const links = document.querySelectorAll(".header ul a");
    const handleClick = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const sectionId = target.getAttribute("data-href");
      if (sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
          lenisInstance.scrollTo(section as HTMLElement, { offset: 0 });
        }
      }
    };

    links.forEach((link) => {
      link.addEventListener("click", handleClick);
    });

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleClick);
      });
      window.removeEventListener("resize", handleResize);
      lenisInstance.destroy();
      gsap.ticker.remove(() => {});
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          KJ
        </a>
        <a
          href="mailto:jadhavkrishna25751@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          jadhavkrishna25751@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
