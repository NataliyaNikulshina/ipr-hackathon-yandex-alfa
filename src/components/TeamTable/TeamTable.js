import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './TeamTable.scss';
import FilterIcon from "../../ui/icons/filter";
import ButtonTableMore from "../../ui/buttons/buttonTableMore/buttonTableMore";

const TeamTable = () => {
  const table = React.createRef();
  const [filter, setFilter] = useState("");
  const [filterType, setFilterType] = useState("name");
  // моковые данные для верстки
  const [employees, setEmployees] = useState([
    { id: 1, name: "Чернявский Андрей Михайлович", position: "Менеджер по кредитованию" },
    { id: 2, name: "Самойлов Игорь Леонидович", position: "Начальник отдела IT" },
    { id: 3, name: "Трофимова Елена Аркадьевна", position: "Финансовый консультант" },
    { id: 4, name: "Лазаренко Инна Павловна", position: "Специалист по инвестициям" },
    { id: 5, name: "Новикова Ксения Денисовна", position: "HR-менеджер" },
    { id: 6, name: "Чернявский Андрей Михайлович", position: "Менеджер по кредитованию" },
    { id: 7, name: "Самойлов Игорь Леонидович", position: "Начальник отдела IT" },
    { id: 8, name: "Кириенко Мария Петрова", position: "Дизайнер" },
    { id: 9, name: "Новикова Ксения Денисовна", position: "HR-менеджер" },
    { id: 10, name: "Чернявский Андрей Михайлович", position: "Менеджер по кредитованию" },
    { id: 11, name: "Самойлов Игорь Леонидович", position: "Начальник отдела IT" },
    { id: 12, name: "Кириенко Мария Петрова", position: "Дизайнер" },
    { id: 13, name: "Чернявский Андрей Михайлович", position: "Менеджер по кредитованию" },
    { id: 14, name: "Самойлов Игорь Леонидович", position: "Начальник отдела IT" },
    { id: 15, name: "Кириенко Мария Петрова", position: "Дизайнер" },
    { id: 16, name: "Новикова Ксения Денисовна", position: "HR-менеджер" },
    { id: 17, name: "Чернявский Андрей Михайлович", position: "Менеджер по кредитованию" },
    { id: 18, name: "Самойлов Игорь Леонидович", position: "Начальник отдела IT" },
    { id: 19, name: "Кириенко Мария Петрова", position: "Дизайнер" },
  ]);

  const filteredEmployees = employees.filter((employee) =>
    employee[filterType].toLowerCase().includes(filter.toLowerCase())
  );
  const handleFilterChangeType = () => {
    console.log('click')
    filterType === "name" ? setFilterType('position') : setFilterType('name')
  }

  const navigate = useNavigate();
  const routeTo = (e) => {
    e.preventDefault();
    navigate("/employee-ipr", { state: [{ path: "/", url: "/", title: "Моя команда" }] });
  };

  return (
    <section className="team-table" >
      <div className="team-table__search">
        <input
          type="text"
          placeholder={filterType === "name" ? "Поиск по имени" : "Поиск по должности"}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={handleFilterChangeType}>
          <FilterIcon />
        </button>
      </div>
      <div className="team-table__table" ref={table}>
        <div className="team-table__head">
          <span>СОТРУДНИК (ФИО)</span>
          <span>ДОЛЖНОСТЬ</span>
        </div>
        <div className="team-table__body" >
          {filteredEmployees.map((employee) => (
            <a href="/employee-ipr" onClick={routeTo} key={employee.id}>
              <span>{employee.name}</span>
              <span>{employee.position}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamTable;