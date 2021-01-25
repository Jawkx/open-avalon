const swapArray = (arr, idx, upDown) => {
  const x = idx;
  const y = upDown ? idx - 1 : idx + 1;

  var temp = arr[x];
  arr[x] = arr[y];
  arr[y] = temp;
  return arr;
};

export default swapArray;
