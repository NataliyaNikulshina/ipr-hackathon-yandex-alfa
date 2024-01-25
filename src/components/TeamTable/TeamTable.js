import React, { useState } from "react";
import './TeamTable.scss';

const TeamTable = () => {
  const [filter, setFilter] = useState("");
  const [employees, setEmployees] = useState([
    { id: 1, name: "Иван Иванов", position: "Разработчик" },
    { id: 2, name: "Мария Петрова", position: "Дизайнер" },
    { id: 3, name: "Иван Иванов", position: "Разработчик" },
    { id: 4, name: "Мария Петрова", position: "Дизайнер" },
    { id: 5, name: "Иван Иванов", position: "Разработчик" },
    { id: 6, name: "Мария Петрова", position: "Дизайнер" },
    { id: 7, name: "Иван Иванов", position: "Разработчик" },
    { id: 8, name: "Мария Петрова", position: "Дизайнер" },
    // Добавьте других сотрудников по аналогии
  ]);

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section className="team-table">
      <div>
        <input
          type="text"
          placeholder="Поиск по имени"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <table className="team-table__table" style={{ width: "100%", overflowX: "auto" }}>
          <thead>
            <tr>
              <th>Сотрудник</th>
              <th>Должность</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TeamTable;
