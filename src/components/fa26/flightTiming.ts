// What does this file do? Turns out calculating the time of a rocket showing up the field is a bit
// complicated, I will try to explain it best.

// flight distance is measured on either axis: rockets move equally right and up.
export const routeStart = -900;

export function arrivalSeconds(
  progress: number, // <- from 0 to 1, how far the css animation is
  duration: number, // <- animation duration in secs
  distance: number, // <- total travel distance in a loop
  width: number, // <- h and w of the rocket, but you probably already know that
  height: number,
  offset: number, // <- offset of where the rocket comes from
) {
  // our start positions
  const startX = width / 2 + offset + routeStart;
  const startY = height / 2 + offset - routeStart;

  // how far the rocket must go before it enters the field
  const entry = Math.max(-startX, startY - height);
  // likewise, how far before it exits
  const exit = Math.min(width - startX, startY);
  const travelled = progress * distance;

  // now, if we are in between the entry and exit... we are in the field!
  if (travelled >= entry && travelled <= exit) return 0;

  // if we aren't in the field, how far are we from the entry?
  const remaining = (entry - travelled + distance) % distance;
  return (remaining / distance) * duration;
}

export type FlightStatus = {
  seconds: number | null;
  rocketsAhead: number | null;
};

export function flightStatus(
  arrivals: { contributor: number; seconds: number }[],
  selected: number,
): FlightStatus {
  // this filter was because there are duplicate rockets if there aren't enough contributors ( < 4 )
  const next = Math.min(
    ...arrivals.filter((a) => a.contributor === selected).map((a) => a.seconds),
  );
  if (!Number.isFinite(next)) return { seconds: null, rocketsAhead: null };

  return {
    seconds: Math.ceil(next),
    rocketsAhead: arrivals.filter((a) => a.seconds > 0 && a.seconds < next)
      .length,
  };
}
