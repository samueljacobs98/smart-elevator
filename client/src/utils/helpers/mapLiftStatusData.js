const mapLiftStatusData = (liftsData, userFloor) => {
  const mappedData = {};
  const updatedArrived = new Set();

  for (const lift in liftsData) {
    if (liftsData[lift].floor === userFloor) {
      updatedArrived.add(lift);
    }

    liftsData[lift].destinations.forEach((destination) => {
      if (!mappedData[destination]) {
        mappedData[destination] = [];
      }

      mappedData[destination].push(lift);
    });
  }

  return [mappedData, updatedArrived];
};

export default mapLiftStatusData;
