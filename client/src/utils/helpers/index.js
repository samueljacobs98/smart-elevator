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

export const filterLiftStatus = (liftStatus, userFloor) => {
  const filteredData = { lifts: {} };

  Object.keys(liftStatus.lifts).forEach((lift) => {
    if (
      liftStatus.lifts[lift].destinations.includes(userFloor) ||
      liftStatus.lifts[lift].floor === userFloor
    ) {
      filteredData.lifts[lift] = liftStatus.lifts[lift];
    }
  });

  return filteredData;
};
