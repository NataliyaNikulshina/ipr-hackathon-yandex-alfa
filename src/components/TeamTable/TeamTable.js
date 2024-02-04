import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TeamTable.scss";
import FilterIcon from "../../ui/icons/filter";
import ButtonTableMore from "../../ui/buttons/buttonTableMore/buttonTableMore";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { fetchUsers } from "../../services/slice/usersTeamSlice";
import { selectUsersTeam } from "../../services/slice/usersTeamSlice";
import { selectUser } from "../../services/slice/userSlice";
// моковые данные для верстки
const mockData = [
  {
    id: 1,
    name: "Чернявский Андрей Михайлович",
    position: "Менеджер по кредитованию",
  },
  { id: 2, name: "Самойлов Игорь Леонидович", position: "Начальник отдела IT" },
  {
    id: 3,
    name: "Трофимова Елена Аркадьевна",
    position: "Финансовый консультант",
  },
  {
    id: 4,
    name: "Лазаренко Инна Павловна",
    position: "Специалист по инвестициям",
  },
  { id: 5, name: "Новикова Ксения Денисовна", position: "HR-менеджер" },
  {
    id: 6,
    name: "Чернявский Андрей Михайлович",
    position: "Менеджер по кредитованию",
  },
  { id: 7, name: "Самойлов Игорь Леонидович", position: "Начальник отдела IT" },
  { id: 8, name: "Кириенко Мария Петрова", position: "Дизайнер" },
  { id: 9, name: "Новикова Ксения Денисовна", position: "HR-менеджер" },
  {
    id: 10,
    name: "Чернявский Андрей Михайлович",
    position: "Менеджер по кредитованию",
  },
  {
    id: 11,
    name: "Самойлов Игорь Леонидович",
    position: "Начальник отдела IT",
  },
  { id: 12, name: "Кириенко Мария Петрова", position: "Дизайнер" },
  {
    id: 13,
    name: "Чернявский Андрей Михайлович",
    position: "Менеджер по кредитованию",
  },
  {
    id: 14,
    name: "Самойлов Игорь Леонидович",
    position: "Начальник отдела IT",
  },
  { id: 15, name: "Кириенко Мария Петрова", position: "Дизайнер" },
  { id: 16, name: "Новикова Ксения Денисовна", position: "HR-менеджер" },
  {
    id: 17,
    name: "Чернявский Андрей Михайлович",
    position: "Менеджер по кредитованию",
  },
  {
    id: 18,
    name: "Самойлов Игорь Леонидович",
    position: "Начальник отдела IT",
  },
  { id: 19, name: "Кириенко Мария Петрова", position: "Дизайнер" },
];

const TeamTable = () => {
  const table = React.createRef();
  const [filter, setFilter] = useState("");
  const [filterType, setFilterType] = useState("nameAll");
  const [employees, setEmployees] = useState([]);
  const dispatch = useAppDispatch();
  const { usersTeam } = useAppSelector(selectUsersTeam);
  const { user } = useAppSelector(selectUser);
  const url = window.location.href;

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  // console.log(usersTeam);

  function filteredItems() {
    let filteredEmployees = [];
    (user.is_boss===true) ?
      filteredEmployees = usersTeam.filter((employee) => employee.team === user.ruled_team && employee.team !== null)
    : filteredEmployees = usersTeam.filter((employee) => (employee.team === user.team || employee.ruled_team === user.team) && employee.team !== null && employee.id !== user.id)
    const initSelect = () => {
      return filteredEmployees.map((item) => ({
        ...item,
        nameAll: `${item.last_name} ${item.first_name} ${item.patronymic}`,
      }));
    };
    return initSelect().filter((employee) =>
      employee[filterType].toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => { 
      const aStartsWith = a[filterType].toLowerCase().startsWith(filter.toLowerCase()); 
      const bStartsWith = b[filterType].toLowerCase().startsWith(filter.toLowerCase()); 
   
      if (aStartsWith && !bStartsWith) { 
        return -1; 
      } else if (!aStartsWith && bStartsWith) { 
        return 1; 
      } else { 
        return 0; 
      } 
    });
  }

  const handleFilterChangeType = () => {
    console.log("click");
    filterType === "nameAll" ? setFilterType("position") : setFilterType("nameAll");
  };

  const navigate = useNavigate();
  const routeTo = (e) => {
    e.preventDefault();
    console.log(url);
    navigate("/employee-ipr", {
      state: [{ path: "/", url: url, title: "Моя команда" }],
    });
  };

  return (
    <section className="team-table">
      <div className="team-table__search">
        <input
          type="text"
          placeholder={
            filterType === "name" ? "Поиск по имени" : "Поиск по должности"
          }
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
        <div className="team-table__body">
          {usersTeam && user &&
            filteredItems().map((employee) => (
              <a href="/employee-ipr" onClick={routeTo} key={employee.id}>
                <span>{employee.nameAll}</span>
                <span>{employee.position}</span>
              </a>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TeamTable;
