const filterLiftStatus = (lifts, userFloor) => {
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

export default filterLiftStatus;
