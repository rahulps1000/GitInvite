import React from "react";
import styles from "./styles.module.css";
import { Bounce, toast } from "react-toastify";

const CopyBox = ({ text }: { text: string }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast.info("Copied to Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      transition: Bounce,
    });
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
