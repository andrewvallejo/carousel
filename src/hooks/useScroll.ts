import { useEffect, useRef, useCallback } from "react";

/**
 * ScrollHandler is a function type that will be invoked on scroll events.
 * It accepts a number which will either be 20 or -20 based on the scroll direction.
 */
type ScrollHandler = (value: number) => void;

/**
 * useScroll is a custom React hook that triggers a function when a user scrolls.
 *
 * @param {ScrollHandler} func Function to be called upon scroll. It is passed a number indicating scroll direction (-20 or 20).
 * @param {number} [throttleTime=200] The minimum wait time in milliseconds between each function execution.
 */

export function useScroll(func: ScrollHandler, throttleTime: number = 200) {
  const lastEventTimeRef = useRef(0);

  /**
   * handleScroll is a callback function that gets called upon scrolling.
   * It calculates the rotation degree based on the scroll direction and executes the provided function.
   * It also updates the reference time for throttling events.
   *
   * @param {React.WheelEvent} event The native DOM scroll event
   */
  const handleScroll = useCallback(
    (event: React.WheelEvent) => {
      const currentTime = new Date().getTime();

      if (currentTime - lastEventTimeRef.current > throttleTime) {
        const rotateDegree = 20;
        func(Math.sign(event.deltaY) * rotateDegree);
        lastEventTimeRef.current = currentTime;
      }
    },
    [func, throttleTime]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleScroll as any);
    return () => {
      window.removeEventListener("wheel", handleScroll as any);
    };
  }, [handleScroll]);
}
