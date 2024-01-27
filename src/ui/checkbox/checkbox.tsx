import React from "react";
import styles from "./checkbox.module.scss";

export interface CheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  checked,
  onChange,
  value,
}) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <input
          name={name}
          className={
            checked === true ? styles.customСheckboxDone : styles.customСheckbox
          }
          type="checkbox"
          checked={checked}
          onChange={onChange}
          value={value}
        />
        <span className={styles.cust} />
      </label>
    </div>
  );
};

export default Checkbox;
