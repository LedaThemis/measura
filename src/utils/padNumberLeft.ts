/**
 * Adds padding to postive numbers under 10, otherwise returns a stringified number
 * @param n number
 * @returns padded number
 * 
 * @example 0 -> "00"
 * @example 5 -> "05"
 * @example 10 -> "10"
 */
const padNumberLeft = (n: number) => {
  if (n >= 10) return `${n}`;
  else {
    return `0${n}`;
  }
};

export default padNumberLeft;
