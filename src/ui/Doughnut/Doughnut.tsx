import React from 'react';
import './Doughnut.scss'; // Подключите свои стили

interface DoughnutProps {
  percentage: number; // Процентное значение от 0 до 100
}

const Doughnut: React.FC<DoughnutProps> = ({ percentage }) => {
  // Ограничиваем значение в пределах от 0 до 100
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  // Создаем стили для заливки пирога
  const doughnutStyle: React.CSSProperties = {
    background: `conic-gradient(#EF3124 ${clampedPercentage}%, #DEE1E6 ${clampedPercentage}% 100%)`,
  };

  return (
    <div className="doughnut-container">
      <div className="doughnut-background"></div>
      <div className="doughnut" style={doughnutStyle}>
        <span className="doughnut-text">{percentage}%</span>
        <div className="center-circle"></div>
      </div>
    </div>
  );
};

export default Doughnut;