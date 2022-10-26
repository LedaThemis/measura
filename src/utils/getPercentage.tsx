const getPercentage = (current: number | null, goal: number | null) => {
  if (current === null || goal === null) {
    return 0;
  }

  return (current * 100) / goal;
};

export default getPercentage;
