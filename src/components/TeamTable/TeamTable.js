import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TeamTable.scss";
import FilterIcon from "../../ui/icons/filter";
import ButtonTableMore from "../../ui/buttons/buttonTableMore/buttonTableMore";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { fetchUsers } from "../../services/slice/usersTeamSlice";
import { selectUsersTeam } from "../../services/slice/usersTeamSlice";
import { selectUser } from "../../services/slice/userSlice";
import { Link } from "react-router-dom";
import { fetchEmployee } from "../../services/slice/employeeSlice";

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

  function filteredItems() {
    let filteredEmployees = [];
    user.is_boss === true
      ? (filteredEmployees = usersTeam.filter(
          (employee) =>
            employee.team === user.ruled_team && employee.team !== null
        ))
      : (filteredEmployees = usersTeam.filter(
          (employee) =>
            (employee.team === user.team ||
              employee.ruled_team === user.team) &&
            employee.team !== null &&
            employee.id !== user.id
        ));
    const initSelect = () => {
      return filteredEmployees.map((item) => ({
        ...item,
        nameAll: `${item.last_name} ${item.first_name} ${item.patronymic}`,
      }));
    };
    return initSelect()
      .filter((employee) =>
        employee[filterType].toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => {
        const aStartsWith = a[filterType]
          .toLowerCase()
          .startsWith(filter.toLowerCase());
        const bStartsWith = b[filterType]
          .toLowerCase()
          .startsWith(filter.toLowerCase());

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
    filterType === "nameAll"
      ? setFilterType("position")
      : setFilterType("nameAll");
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
          {usersTeam &&
            user &&
            filteredItems().map((employee) => (
              <Link
                to={`/employee-ipr/${employee.id}`}
                state={[{ path: "/", url: url, title: "Моя команда" }]}
                onClick={() => dispatch(fetchEmployee(employee.id))}
                key={employee.id}
              >
                <span>{employee.nameAll}</span>
                <span>{employee.position}</span>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TeamTable;
