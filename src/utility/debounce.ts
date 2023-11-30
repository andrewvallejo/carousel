/**
 * Returns a debounced version of the provided function.
 * @param func - The function to be debounced.
 * @param delay - The delay (in milliseconds) before the debounced function is called.
 * @returns The debounced function.
 */
export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    /**
     * Clears the existing timeout and sets a new one to delay the execution of the provided function.
     * @param args - The arguments to be passed to the debounced function.
     */
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
