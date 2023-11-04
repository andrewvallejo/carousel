/**
 * An interface representing the center coordinates of an HTML element.
 */
interface ElementCenter {
  /** The x-coordinate of the center of the element. */
  x: number;
  /** The y-coordinate of the center of the element. */
  y: number;
}

/**
 * Returns the center coordinates of the given HTML element.
 * @param element - The HTML element to get the center coordinates of.
 * @returns An object containing the x and y coordinates of the center of the element.
 */
export const getCenterOfElement = (element: HTMLElement): ElementCenter => {
  const computedStyle = getComputedStyle(element);

  const x = element.offsetLeft + element.offsetWidth / 2;
  const y = element.offsetTop + element.offsetHeight / 2;

  return { x, y };
};

/**
 * Calculates the x and y coordinates of a point on a circle given the angle and radius.
 * @param theta - The angle in radians.
 * @param radius - The radius of the circle.
 * @returns An object containing the x and y coordinates of the point.
 */
export const getCoordinates = (theta: number, radius: number) => {
  const xCoordinates = Math.cos(theta) * radius;
  const yCoordinates = Math.sin(theta) * radius;
  return {
    x: convertPxToRem(xCoordinates),
    y: convertPxToRem(yCoordinates),
  };
};

/**
 * Converts pixels to rems.
 * @param px - The number of pixels to convert.
 * @returns The converted value in rems.
 */
export const convertPxToRem = (px: number): string => {
  const rem = px / 16 || 0;
  return `${rem}rem`;
};
