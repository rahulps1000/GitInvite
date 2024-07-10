import { IRepo } from "@/models/Repo";
import styles from "./styles.module.css";
import Link from "next/link";

const RepoCard = ({ repo }: { repo: IRepo }) => {
  return (
    <div className={styles.card}>
      <div className={styles.title}>
        <h3 title={repo.full_name}>{repo.name}</h3>
        <span
          className="material-symbols-outlined"
          title={repo.private ? "private" : "public"}
        >
          {repo.private ? "lock" : "public"}
        </span>
      </div>
      <span className={styles.description}>
        {repo.description ?? "No Description"}
      </span>
      <div className={styles.buttons}>
        <Link
          href={{ pathname: `/repo/${repo.id}` }}
          title="Manage Repo"
          className={styles.button}
        >
          <span className="material-symbols-outlined">settings</span>Manage
        </Link>
        <Link
          href={repo.html_url}
          target="_blank"
          title="Visit Repo"
          className={styles.button}
        >
          <span className="material-symbols-outlined">north_east</span>Visit
        </Link>
      </div>
    </div>
  );
};

export default RepoCard;
