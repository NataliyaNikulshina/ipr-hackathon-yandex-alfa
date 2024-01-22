import './Statistics.scss';
import { Chart as ChartJS, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Legend);

const statistics = {
  total: {
    name: 'Вовлечённость',
    count: 70,
  },
  items: [
    {
      id: 0,
      name: 'Всего сотрудников',
      count: 55,
    },
    {
      id: 2,
      name: 'Завершено ИПР',
      count: 100,
    },
    {
      id: 3,
      name: 'В процессе работы',
      count: 20,
    },
    {
      id: 4,
      name: 'ИПР не начат',
      count: 4,
    },
    {
      id: 5,
      name: 'Просрочено выполнение',
      count: 1,
    },
    {
      id: 6,
      name: 'Всего ИПР',
      count: 25,
    },
    {
      id: 7,
      name: 'Проверить ИПР',
      count: 0,
    },
  ],
};

const data = {
  datasets: [
    {
      data: [statistics.total.count, 100 - statistics.total.count],
      backgroundColor: ['#EF3124', '#DEE1E6'],
    },
  ],
};
function Statistics() {
  return (
    <section className="statistics">
      <div className="statistics__container container">
        <div className="statistics__total">
          <p className="statistics__title">{statistics.total.name}</p>
          <Doughnut data={data} className="statistics__doughnut" />
          <span className="statistics__total-count">
            {statistics.total.count}%
          </span>
        </div>
        <div className="statistics__items">
          <ul className="statistics__list">
            {statistics.items.map((item) => (
              <li className="statistics__item" key={item.id}>
                <p className="statistics__title">{item.name}</p>
                <span className="statistics__count">{item.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Statistics;
