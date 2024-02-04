import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./iprCreateOrEdit.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss";

import Button from "../../ui/buttons/button/button";
import Input from "../../ui/inputs/input/input";
import InputCalendar from "../../components/InputCalendar/InputCalendar";
import useForm from "../../utils/use-form";

import { isContainRoute } from "../../utils/breadcrumbs";

export interface IIprCreateOrEdit {
  role: string;
  ipr?: object;
}

const IprCreateOrEdit: FC<IIprCreateOrEdit> = ({ role, ipr }): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;
  const { values, handleChange, setValues } = useForm({
    name: { value: "", valueValid: false },
  });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);


  useEffect(() => {
    if (
      pathname === "/employee-ipr/create-ipr" &&
      state &&
      !isContainRoute(state, url)
    ) {
      navigate("", {
        state: [
          ...state,
          { path: pathname, url, title: "Создание нового ИПР" },
        ],
        replace: true,
      });
    } else if (
      pathname === "/employee-ipr/list-tasks/edit-ipr" &&
      state &&
      !isContainRoute(state, url)
    ) {
      navigate("", {
        state: [...state, { path: pathname, url, title: "Редактирование ИПР" }],
        replace: true,
      });
    }
  }, [pathname, url, state]);

  function onClick(e: any) {
    e.preventDefault();
    navigate(-1);
  }

  const clearInput = () => {
    setValues({
      name: { value: "", valueValid: false },
    });
    setStartDate(null);
    setEndDate(null);
  };

  const handleDateChangeStart = (date: Date | null) => {
    setStartDate(date);
    console.log(date?.toLocaleDateString());
  };

  const handleDateChangeEnd = (date: Date | null) => {
    setEndDate(date);
    console.log(date?.toLocaleDateString());
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <h2 className={`${styles.title} ${gridAreasLayout.wrapper_title}`}>
        {role === "create" ? "Создание нового ИПР" : "Редактирование ИПР"}
      </h2>
      <form
        className={`${styles.wrapper} ${gridAreasLayout.wrapper_work_info}`}
        onSubmit={handleSubmit}
      >
        <section className={styles.listIpr}>
          <div className={styles.labelIpr}>
            <p className={styles.autorIpr}>
              Автор ИПР: Антонова Екатерина Владимировна
            </p>
            <Input
              onChange={handleChange}
              placeholder="Введите название ИПР"
              size="big"
              name="name"
              value={values.name.value}
              maxLength={100}
              required
            />
          </div>
          <div className={styles.dateIprWrapp}>
            <div className={styles.labelIpr}>
              <p className={styles.autorIpr}>Дата создания ИПР</p>
              <InputCalendar
                icon={true}
                name="dataCreator"
                value={startDate}
                onChange={handleDateChangeStart}
              />
            </div>
            <div className={styles.labelIpr}>
              <p className={styles.autorIpr}>Дата закрытия ИПР</p>
              <InputCalendar
                icon={true}
                name="dataEnd"
                value={endDate}
                onChange={handleDateChangeEnd}
              />
            </div>
          </div>
        </section>
        <div className={`${styles.wrapper_button}`}>
          <Button
            color="red"
            width="281"
            heigth="56"
            onClick={handleSubmit}
            buttonHtmlType="submit"
          >
            {role === "create" ? "Создать ИПР" : "Изменить ИПР"}
          </Button>
          <Button color="grey" width="281" heigth="56" onClick={clearInput}>
            {role === "create" ? "Очистить" : "Отмена"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default IprCreateOrEdit;
