import React from "react";
import styles from "../styles/open.module.css";

const Open = ({ setIsOpenFilter, isOpenFilter, compact }) => {
  if (compact) {
    return (
      <div className="flex w-full rounded-2xl bg-gray-200">
        <button
          className={`text-xs flex-1 py-2 px-4 rounded-2xl ${!isOpenFilter ? "bg-white shadow" : ""}`}
          onClick={() => setIsOpenFilter(false)}
        >
          All Markets
        </button>
        <button
          className={` text-xs flex-1 py-2 px-4 rounded-2xl ${isOpenFilter ? "bg-white shadow" : ""}`}
          onClick={() => setIsOpenFilter(true)}
        >
          Open Today
        </button>
      </div>
    );
  }

  // Toggle for large screens
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
