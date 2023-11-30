/**
 * Returns a throttled version of the provided function.
 * @param func - The function to be throttled.
 * @param limit - The time limit (in milliseconds) between function invocations.
 * @returns The throttled function.
 */
export const throttle = (func: (...args: any[]) => void, limit: number) => {
  let inThrottle: boolean;
  return function () {
    /**
     * Calls the provided function if not currently in the throttling period.
     * Sets a timeout to exit the throttling period after the specified limit.
     */
    const args = arguments;
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
