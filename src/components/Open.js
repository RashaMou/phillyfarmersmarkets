import { useState } from "react";
import styles from '../styles/open.module.css';

const Open = ({ setIsOpenFilter, isOpenFilter }) => {
  return (
        <label className={styles.toggleButton}>
          <input
            type="checkbox"
            checked={isOpenFilter}
            onChange={(e) => setIsOpenFilter(e.target.checked)}
          />
          <span className={styles.slider}></span>
          <span className={styles.text}>Open today</span>
        </label>
  );
};

export default Open;

