"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import styles from "./styles.module.css";
import CopyBox from "../CopyBox";
import Loader from "../Loader";
import axios from "axios";
import { getUrl } from "@/services/url";
import { IInvites } from "@/models/Invites";
import Link from "next/link";
import { Bounce, toast } from "react-toastify";

const InviteLinks = ({ userId }: { userId: string }) => {
  const { repo_id } = useParams<{ repo_id: string }>();

  const [showPopup, setPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [invites, setInvites] = useState<IInvites | null>(null);

  const generateInviteLink = async () => {
    setPopup(true);
    const url = getUrl();
    try {
      const { data } = await axios.post("/api/github/invite/create", {
        repo_id: repo_id,
        user_id: userId,
      });
      setInviteLink(url + "/invite/" + data.token);
      await getInviteLinks();
    } catch (error) {
      console.log(error);
      setError("Internal Server Error");
    }
  };
  const closePopup = () => {
    setInviteLink(null);
    setError(null);
    setPopup(false);
  };

  const cancelInvite = async (token: string) => {
    try {
      const { data } = await axios.post("/api/github/invite/cancel", {
        repo_id: repo_id,
        token: token,
      });
      toast.success(data.message);
      getInviteLinks();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.messge);
    }
  };

  const revokeInvite = async (token: string, username: string) => {
    try {
      const { data } = await axios.post("/api/github/invite/revoke", {
        repo_id: repo_id,
        token: token,
        username: username,
      });
      toast.success(data.message);
      getInviteLinks();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.messge);
    }
  };

  const options: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  };

  const getInviteLinks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/github/invite", {
        params: { repo_id: repo_id, user_id: userId, page: page },
      });
      setInvites(data.invites);
    } catch (error: any) {
      console.error(error.response);
    }
    setLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(getUrl() + "/invite/" + text);
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

  const changePage = (c_page: number | "next" | "prev") => {
    if (c_page == "prev" && page > 0) {
      setPage(page - 1);
    } else if (
      c_page == "next" &&
      page < Math.ceil(invites!.total / invites!.limit) - 1
    ) {
      setPage(page + 1);
    } else if (Number.isInteger(c_page)) {
      setPage(Number(c_page));
    }
  };

  useEffect(() => {
    getInviteLinks();
  }, [page]);

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
          {loading && <Loader />}
          {!loading && invites && invites?.invites.length > 0 ? (
            <div className={styles.tableContainer}>
              <div className={styles.tableWrapper}>
                <div className={styles.tableOverflow}>
                  <table className={styles.table}>
                    <thead className={styles.tableHead}>
                      <tr className={styles.tableHRow}>
                        <th className={styles.tableHeader}>Created</th>
                        <th className={styles.tableHeader}>Link</th>
                        <th className={styles.tableHeader}>User</th>
                        <th className={styles.tableHeader}>Status</th>
                        <th className={styles.tableHeader}>Action</th>
                      </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                      {invites.invites.map((i, index) => (
                        <tr className={styles.tableRow} key={index}>
                          <td className={styles.tableCell}>
                            {new Date(
                              i.created_on.toString()
                            ).toLocaleDateString("en-US", options)}
                          </td>
                          <td
                            className={`${styles.tableCell} ${styles.linkCell}`}
                          >
                            <Link
                              className={styles.link}
                              href={getUrl() + `/invite/${i.token}`}
                              target="_blank"
                              title={i.token}
                            >
                              {i.token}
                            </Link>
                            <span
                              title="copy"
                              onClick={() => copyToClipboard(i.token)}
                              className="material-symbols-outlined"
                            >
                              content_copy
                            </span>
                          </td>
                          <td className={styles.tableCell}>
                            {i.user ? i.user : "NA"}
                          </td>
                          <td className={styles.tableCell}>{i.status}</td>
                          <td className={styles.tableCell}>
                            {i.status == "Pending" && (
                              <button
                                className={styles.redbutton}
                                title="Cancel Invitation link"
                                onClick={() => cancelInvite(i.hash)}
                              >
                                Cancel
                              </button>
                            )}
                            {i.status == "Invited" && (
                              <button
                                className={styles.redbutton}
                                title="Revoke permission"
                                onClick={() => revokeInvite(i.hash, i.user)}
                              >
                                Revoke
                              </button>
                            )}
                            {i.status != "Pending" && i.status != "Invited" && (
                              <span>No Actions</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={styles.paginationContainer}>
                {page > 0 && (
                  <div
                    onClick={() => changePage("prev")}
                    className={`material-symbols-outlined ${styles.pageIcon}`}
                  >
                    chevron_left
                  </div>
                )}
                {Math.ceil(invites.total / invites.limit) > 1 &&
                  Array.from(
                    Array(Math.ceil(invites.total / invites.limit)).keys()
                  ).map((n, i) => {
                    return (
                      <div
                        key={i}
                        onClick={() => changePage(i)}
                        className={`${styles.pageIcon} ${
                          page == i ? styles.selectedPage : ""
                        }`}
                      >
                        {i + 1}
                      </div>
                    );
                  })}
                {page < Math.ceil(invites.total / invites.limit) - 1 && (
                  <div
                    onClick={() => changePage("next")}
                    className={`material-symbols-outlined ${styles.pageIcon}`}
                  >
                    chevron_right
                  </div>
                )}
              </div>
            </div>
          ) : (
            !loading && (
              <div className={styles.noInvite}>No Invite Links Generated</div>
            )
          )}
        </div>
      </div>
      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.pcard}>
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
