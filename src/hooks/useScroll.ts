// Packages
import { useEffect, useRef, useCallback } from "react";

/**
 * useScroll is a custom React hook that triggers a function when a user scrolls.
 *
 * @param {ScrollHandler} func Function to be called upon scroll. It is passed a number indicating scroll direction (-20 or 20).
 * @param {number} [throttleTime=200] The minimum wait time in milliseconds between each function execution.
 */

export function useScroll(func: ScrollHandler, throttleTime: number = 1000) {
  // Increase throttleTime to 500ms
  const lastEventTimeRef = useRef(0);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const handleScroll = useCallback(
    (event: React.WheelEvent) => {
      const currentTime = new Date().getTime();

      // If the function was called less than throttleTime milliseconds ago, return
      if (currentTime - lastEventTimeRef.current < throttleTime) {
        return;
      }

      const rotateDegree = 20;
      func(Math.sign(event.deltaY) * rotateDegree);

      // Update the last event time
      lastEventTimeRef.current = currentTime;
    },
    [func, throttleTime],
  );

  const handleTouchStart = useCallback((event: TouchEvent) => {
    touchStartRef.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }, []);

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      const touchEnd = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
      const diffX = touchStartRef.current.x - touchEnd.x;

      if (Math.abs(diffX) > 50) {
        const rotateDegree = 20;
        const direction = diffX > 0 ? -1 : 1;
        func(direction * rotateDegree);
        touchStartRef.current = touchEnd;
      }
    },
    [func],
  );

  useEffect(() => {
    window.addEventListener("wheel", handleScroll as any);
    window.addEventListener("touchstart", handleTouchStart as any);
    window.addEventListener("touchmove", handleTouchMove as any);
    return () => {
      window.removeEventListener("wheel", handleScroll as any);
      window.removeEventListener("touchstart", handleTouchStart as any);
      window.removeEventListener("touchmove", handleTouchMove as any);
    };
  }, [handleScroll, handleTouchStart, handleTouchMove]);
}
