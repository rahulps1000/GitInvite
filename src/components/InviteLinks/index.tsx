"use client";

import React from "react";
import styles from "./styles.module.css";
import CopyBox from "../CopyBox";

const InviteLinks = () => {
  const invites = [];
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>Invite Links</h3>
        <div className={styles.content}>
          <div className={styles.button}>
            <span className="material-symbols-outlined">add</span>
            Generate Invite Link
          </div>
        </div>
      </div>
      <hr />
      <div className="invites">
        {invites.length > 0 ? (
          "invites"
        ) : (
          <div className={styles.noInvite}>No Invite Links Generated</div>
        )}
      </div>
      <div className={styles.popup}>
        <div className={styles.card}>
          <h2>Generate Invite Link</h2>
          <CopyBox text="jhgasd kjhasg jkhsad" />
        </div>
      </div>
    </div>
  );
};

export default InviteLinks;
