const getPercentageFromGoal = (current: number | null, goal: number) => {
  if (current === null) {
    return 0;
  }

  return (current * 100) / goal;
};

export default getPercentageFromGoal;
