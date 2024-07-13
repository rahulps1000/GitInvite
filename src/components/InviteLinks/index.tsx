"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import styles from "./styles.module.css";
import CopyBox from "../CopyBox";
import Loader from "../Loader";

const InviteLinks = ({ userId }: { userId: string }) => {
  const { repo_id } = useParams<{ repo_id: string }>();

  const invites = [];
  const [showPopup, setPopup] = useState<boolean>(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateInviteLink = async () => {
    setPopup(true);
  };
  const closePopup = () => {
    setInviteLink(null);
    setPopup(false);
  };
  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3>Invite Links</h3>
          <div className={styles.content}>
            <div className={styles.button} onClick={generateInviteLink}>
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
      </div>
      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.card}>
            <span className="material-symbols-outlined" onClick={closePopup}>
              close
            </span>
            <h2>
              {inviteLink
                ? "Invite Link Generated"
                : error
                ? "Failed to generate Invite Link"
                : "Generating Invite Link"}
            </h2>
            {!inviteLink && !error && <Loader />}
            {inviteLink && (
              <p>
                Note: This invite link can only be used by one person and will
                expire after 24h. Anyone (only one) with this link will be able
                to access your repo.
              </p>
            )}
            {error && (
              <p>
                {error}
                <br />
                Please Contact Site Admin
              </p>
            )}
            {inviteLink && <CopyBox text={inviteLink} />}
          </div>
        </div>
      )}
    </>
  );
};

export default InviteLinks;
