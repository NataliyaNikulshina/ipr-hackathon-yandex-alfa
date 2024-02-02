import './Statistics.scss';
import Doughnut from '../../ui/Doughnut/Doughnut';

const statistics = {
  total: {
    name: 'Вовлечённость',
    count: 68,
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

function Statistics() {
  return (
    <section className="statistics">
      <ul className="statistics__list">
        <li className="statistics__item">
          <p className="statistics__title">{statistics.total.name}</p>
          <Doughnut percentage={statistics.total.count} />
        </li>
        {statistics.items.map((item) => (
          <li className="statistics__item" key={item.id}>
            <p className="statistics__title">{item.name}</p>
            <span className="statistics__count">{item.count}</span>
          </li>
        ))}
      </ul>
    </section >
  );
}

export default Statistics;
