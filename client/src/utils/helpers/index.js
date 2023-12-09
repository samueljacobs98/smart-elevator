export const mapLiftStatusData = (liftsData, userFloor) => {
  const result = {};
  const updatedArrived = new Set();

  for (const lift in liftsData) {
    if (liftsData[lift].floor === userFloor) {
      updatedArrived.add(lift);
    }

    liftsData[lift].destinations.forEach((destination) => {
      if (!result[destination]) {
        result[destination] = [];
      }

      result[destination].push(lift);
    });
  }

  return [result, updatedArrived];
};
