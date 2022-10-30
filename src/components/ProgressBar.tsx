interface ProgressBarProps {
  percentage: number;
  height?: string;
}

const getLineWidth = (
  lineIndex: number,
  lineCount: number,
  totalPercentage: number
) => {
  if (lineCount === 1) {
    return totalPercentage;
  } else {
    return Math.min(totalPercentage - lineIndex * 100, 100);
  }
};

const ProgressBar = ({ percentage, height = "8px" }: ProgressBarProps) => {
  const lineCount = Math.ceil(percentage / 100);

  return (
    <div className="relative rounded-lg bg-slate-100 p-1">
      <div className="relative overflow-clip rounded" style={{ height }}>
        {new Array(lineCount).fill(0).map((_, i) => (
          <div
            key={i}
            style={{
              width: `${getLineWidth(i, lineCount, percentage)}%`,
              height,
              // 10% darker for every extra 100%
              filter: `brightness(${100 - i * 10}%)`,
            }}
            className="absolute bg-blue-500"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
