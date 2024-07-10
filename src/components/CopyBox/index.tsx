import React from "react";
import styles from "./styles.module.css";

const CopyBox = ({ text }: { text: string }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };
  return (
    <div className={styles.copybox}>
      <input type="text" readOnly value={text} />
      <button onClick={copyToClipboard}>
        <span className="material-symbols-outlined">content_copy</span>
      </button>
    </div>
  );
};

export default CopyBox;
