import React from "react";
import shp from "../../../images/Desktop-1.png";
import styles from "./PartialCode.module.scss";

export default function PartialCode(props) {
  return (
    <div className={`(styles.root, 'partial-code')`}>
      <img src={shp} alt="alt text" className={styles.root1} />
    </div>
  );
}
