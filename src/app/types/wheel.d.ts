global {
  /**
   * ScrollHandler is a function type that will be invoked on scroll events.
   * It accepts a number which will either be 20 or -20 based on the scroll direction.
   */
  type ScrollHandler = (value: number) => void;

  /** The wheel properties interface */
  interface IWheel {
    /** The radius of the wheel */
    radius: number;
    /** The x and y coordinates at the center of the wheel */
    center: {
      /** The x Coordinate at the center of the wheel */
      x: number;
      /** The y Coordinate at the center of the wheel */
      y: number;
    };
    /** The rotational angle of the wheel with respect to its initial position */
    theta: number;
    /** The ID value of the scheduled animation, `null` if not scheduled */
    animationId: NodeJS.Timeout | null;
    /** The amount of degrees the wheel has been rotated */
    rotation: number;
    /** Temporary value for `theta` used while calculating rotation */
    tempTheta: number;
  }
}

export {};
