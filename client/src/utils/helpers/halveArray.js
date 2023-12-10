const halveArray = (arr) => {
  const middleIndex = Math.ceil(arr.length / 2);
  return [arr.slice(0, middleIndex), arr.slice(middleIndex)];
};

export default halveArray;
