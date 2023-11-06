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
  const { width, height } = element.getBoundingClientRect();

  const x = width / 2;
  const y = height / 2;

  return { x, y };
};

/**
 * Calculates the x and y coordinates of a point on a circle given the angle and radius.
 * @param theta - The angle in radians.
 * @param radius - The radius of the circle.
 * @returns An object containing the x and y coordinates of the point.
 */
export const getCoordinates = (theta: number, radius: number) => {
  const coordinates = {
    x: Math.cos(theta) * radius,
    y: Math.sin(theta) * radius,
  };

  return {
    x: coordinates.x,
    y: coordinates.y,
  };
};

/**
 * Multiplies a number by PI divided by a given ratio.
 * @param index - The number to be multiplied by PI divided by the given ratio.
 * @param ratio - The ratio to divide PI by. Default value is 9.
 * @returns The result of the multiplication.
 */
export const multiplyByPi = (index: number, ratio = 9): number => {
  const result = (Math.PI / ratio) * index;

  return result;
};

/**
 * Converts pixels to rems.
 * @param px - The number of pixels to convert.
 * @returns The converted value in rems.
 */
export const convertPxToRem = (px: number) => {
  const rem = px / 16;

  return rem;
};

/**
 * Returns a string with the value in rems.
 * @param px - The number of pixels to convert.
 * @returns The converted value in rems as a string.
 */
export const getRem = (px: number) => `${convertPxToRem(px)}rem`;
