const checkAlreadyGoingToFloor = (liftStatus, toFloor) =>
  Object.entries(liftStatus).find(([_, { destinations }]) =>
    destinations.includes(toFloor)
  );

export default checkAlreadyGoingToFloor;
