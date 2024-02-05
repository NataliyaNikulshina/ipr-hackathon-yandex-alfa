import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styles from "./iprCreateOrEdit.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss";

import Button from "../../ui/buttons/button/button";
import Input from "../../ui/inputs/input/input";
import InputCalendar from "../../components/InputCalendar/InputCalendar";
import useForm from "../../utils/use-form";

import { isContainRoute } from "../../utils/breadcrumbs";

import { addIprApi, editIprApi } from "../../api/ipr";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { selectUser } from "../../services/slice/userSlice";
import { fetchIpr } from "../../services/slice/iprSlice";
import { selectIpr } from "../../services/slice/iprSlice";

export interface IIprCreateOrEdit {
  role: string;
  ipr?: object;
}

const IprCreateOrEdit: FC<IIprCreateOrEdit> = ({ role }): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;
  const param = useParams();

  const { ipr } = useAppSelector(selectIpr);
  let iprEmployee = ipr.find((elem) => elem.id === Number(param.idIpr));
  const { values, handleChange, setValues } = useForm({
    name: {
      value: (iprEmployee && iprEmployee.title) || "",
      valueValid: false,
    },
  });
  const [startDate, setStartDate] = useState<Date | null>(
    (iprEmployee && new Date(iprEmployee.start_date)) || null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    (iprEmployee && new Date(iprEmployee.end_date)) || null
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      pathname.endsWith("create-ipr") &&
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
      pathname.endsWith("edit-ipr") &&
      state &&
      !isContainRoute(state, url)
    ) {
      navigate("", {
        state: [...state, { path: pathname, url, title: "Редактирование ИПР" }],
        replace: true,
      });
    }
  }, [pathname, url, state]);

  const clearInput = () => {
    setValues({
      name: {
        value: (iprEmployee && iprEmployee.title) || "",
        valueValid: false,
      },
    });
    setStartDate((iprEmployee && new Date(iprEmployee.start_date)) || null);
    setEndDate((iprEmployee && new Date(iprEmployee.end_date)) || null);
  };

  const handleDateChangeStart = (date: Date | null) => {
    setStartDate(date);
  };

  const handleDateChangeEnd = (date: Date | null) => {
    setEndDate(date);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    role === "create"
      ? endDate &&
        startDate &&
        addIprApi({
          title: values.name.value,
          end_date: endDate.toJSON().slice(0, 10),
          start_date: startDate.toJSON().slice(0, 10),
          executor: Number(param.id),
          status: "in_progress",
        }).then((res) => {
          dispatch(fetchIpr(Number(param!.id)));
          navigate(-1);
        })
      : endDate &&
        startDate &&
        iprEmployee &&
        editIprApi(
          {
            title: values.name.value,
            end_date: endDate.toJSON().slice(0, 10),
            start_date: startDate.toJSON().slice(0, 10),
            executor: Number(param.id),
            status: "in_progress",
          },
          Number(param.idIpr)
        ).then((res) => {
          dispatch(fetchIpr(Number(param!.id)));
          navigate(-1);
        });
  };

  return (
    <>
      <h2 className={`${styles.title} ${gridAreasLayout.wrapper_title}`}>
        {role === "create" ? "Создание нового ИПР" : "Редактирование ИПР"}
      </h2>
      <div className={`${styles.wrapper} ${gridAreasLayout.wrapper_work_info}`}>
        <section className={styles.listIpr}>
          <div className={styles.labelIpr}>
            <p className={styles.autorIpr}>Название</p>
            <Input
              onChange={handleChange}
              placeholder="Введите название ИПР"
              size="big"
              name="name"
              value={values.name.value}
              maxLength={100}
              close={false}
              required
            />
          </div>
          <div className={styles.dateIprWrapp}>
            <div className={styles.labelIpr}>
              <p className={styles.autorIpr}>Дата создания</p>
              <InputCalendar
                icon={true}
                name="dataCreator"
                value={startDate}
                onChange={handleDateChangeStart}
              />
            </div>
            <div className={styles.labelIpr}>
              <p className={styles.autorIpr}>Дата закрытия</p>
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
          <Button color="red" width="281" heigth="56" onClick={handleSubmit}>
            {role === "create" ? "Создать ИПР" : "Изменить ИПР"}
          </Button>
          <Button color="grey" width="281" heigth="56" onClick={clearInput}>
            {role === "create" ? "Очистить" : "Отмена"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default IprCreateOrEdit;
