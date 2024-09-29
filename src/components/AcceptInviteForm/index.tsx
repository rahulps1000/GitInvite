"use client";

import React, { useRef, useState } from "react";
import styles from "./styles.module.css";
import InputBox from "../InputBox";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AcceptInviteForm = ({
  token,
  repo_id,
}: {
  token: string;
  repo_id: number;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const acceptInvite = async () => {
    if (!inputRef.current?.value) {
      setError("Username is required");
      return;
    }
    try {
      const response = await axios.post("/api/github/invite/accept", {
        token: token,
        user_name: inputRef.current?.value.trim(),
        repo_id: repo_id,
        type: "manual",
      });
      if (response.data.status) {
        router.replace(response.data.html_url);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to Accept Invite. Please Contact Admin");
    }
  };
  return (
    <div className={styles.inviteform}>
      <InputBox
        ref={inputRef}
        type="text"
        error_message={error}
        placeholder="Your Github Username"
      />
      <button className={styles.button} onClick={() => acceptInvite()}>
        Accept Invite
      </button>
    </div>
  );
};

export default AcceptInviteForm;
