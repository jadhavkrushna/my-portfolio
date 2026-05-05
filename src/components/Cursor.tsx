import { useEffect, useRef } from "react";
import "./styles/Cursor.css";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let hover = false;
    const cursor = cursorRef.current!;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };
    let animationId: number;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    document.addEventListener("mousemove", onMouseMove, { passive: true });

    // Use direct CSS transforms instead of gsap for per-frame cursor updates
    function loop() {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        cursor.style.transform = `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`;
      }
      animationId = requestAnimationFrame(loop);
    }
    animationId = requestAnimationFrame(loop);

    // Set up hover interactions
    const elements = document.querySelectorAll("[data-cursor]");
    const overHandlers: Array<(e: MouseEvent) => void> = [];
    const outHandlers: Array<() => void> = [];

    elements.forEach((item, index) => {
      const element = item as HTMLElement;

      const overHandler = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");
          cursor.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`;
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      };

      const outHandler = () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      };

      overHandlers[index] = overHandler;
      outHandlers[index] = outHandler;

      element.addEventListener("mouseover", overHandler);
      element.addEventListener("mouseout", outHandler);
    });

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener("mousemove", onMouseMove);
      elements.forEach((item, index) => {
        const element = item as HTMLElement;
        element.removeEventListener("mouseover", overHandlers[index]);
        element.removeEventListener("mouseout", outHandlers[index]);
      });
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
