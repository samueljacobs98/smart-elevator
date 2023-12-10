const getAllServicedFloors = (lifts) =>
  Object.values(lifts).reduce((acc, lift) => {
    lift.serviced_floors.forEach((floor) => {
      if (!acc.includes(floor)) acc.push(floor);
    });

    return acc;
  }, []);

export default getAllServicedFloors;
