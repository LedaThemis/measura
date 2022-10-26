interface ProgressBarProps {
  percentage: number;
  height?: string;
}

const ProgressBar = ({ percentage, height = "8px" }: ProgressBarProps) => {
  const lineCount = Math.ceil(percentage / 100);

  return (
    <div className="relative rounded-lg bg-slate-100 p-1">
      <div className="relative overflow-clip rounded" style={{ height }}>
        {new Array(lineCount).fill(0).map((_, i) => (
          <div
            key={i}
            style={{
              width: `${i == lineCount - 1 ? percentage % 100 : 100}%`,
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
