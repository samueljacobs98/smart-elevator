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

export const filterLiftStatus = (lifts, userFloor) => {
  const filteredData = {};

  Object.keys(lifts).forEach((lift) => {
    if (
      lifts[lift].destinations.includes(userFloor) ||
      lifts[lift].floor === userFloor
    ) {
      filteredData[lift] = lifts[lift];
    }
  });

  return filteredData;
};
