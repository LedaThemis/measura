const capitalFirstLetter = (str: string) => {
  const lowerCaseStr = str.toLowerCase();

  return lowerCaseStr[0]?.toUpperCase() + lowerCaseStr.slice(1);
};

export default capitalFirstLetter;
