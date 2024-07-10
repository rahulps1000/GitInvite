"use client";

import { signIn } from "next-auth/react";
import GithubIcon from "../Logo/GithubIcon";
import React, { useState } from "react";
import styles from "./styles.module.css";

const LoginForm = () => {
  const [isLoading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    await signIn("github", { callbackUrl: "/" });
    setLoading(false);
  };
  return (
    <button className={styles.buttonstyle} onClick={login}>
      {isLoading ? (
        <span className={styles.loader}></span>
      ) : (
        <>
          <GithubIcon /> &nbsp; Sign In With GitHub
        </>
      )}
    </button>
  );
};

export default LoginForm;
