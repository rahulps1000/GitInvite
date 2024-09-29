"use client";

import React, { forwardRef } from "react";
import { clsx } from "clsx";
import styles from "./styles.module.css";

type Props = {
  label?: string | undefined;
  placeholder?: string | undefined;
  error_message?: string | null;
  type: string | undefined;
};

const InputBox = forwardRef<HTMLInputElement, Props>(
  (props: Props, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <div className={styles.inputbox}>
        {props.label && <label>{props.label}</label>}
        <input
          ref={ref}
          type={props.type}
          placeholder={props.placeholder}
          className={clsx(styles.input, props.error_message && styles.error)}
        />
        {props.error_message && <span>{props.error_message}</span>}
      </div>
    );
  }
);

export default InputBox;
