import React from 'react';
import './ProgressBar.scss';

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  // Ограничиваем значение в пределах от 0 до 100
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  // Создаем стили для ширины полосы прогресса
  const progressStyle: React.CSSProperties = {
    width: `${clampedPercentage}%`,
  };
   // Создаем стили для позиционирования числа
  const numberStyle: React.CSSProperties = {
    marginLeft: `${clampedPercentage - 5}%`,
  };

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-background">
        <div className="progress-bar" style={progressStyle}></div>
      </div>
      <span className="progress-bar-span" style={numberStyle}>{percentage}%</span>
    </div>
  );
};

export default ProgressBar;