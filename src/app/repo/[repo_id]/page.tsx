import Link from "next/link";
import styles from "./styles.module.css";
import { getRepo } from "@/services/github";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getUser } from "@/services/db/users";
import { authOptions } from "@/services/auth";
import { IRepo } from "@/models/Repo";
import InviteLinks from "@/components/InviteLinks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function Page({
  params,
}: {
  params: { repo_id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/login");

  const userId = session?.user?.id;
  const user = await getUser(userId ?? "0");
  const repo: IRepo = await getRepo(user.token, params.repo_id);

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.header}>Manage Repo Invites</div>
        <div className={styles.card}>
          <div className={styles.title} title={repo.full_name}>
            <h3 title={repo.full_name}>{repo.name}</h3>
            <span
              className="material-symbols-outlined"
              title={repo.private ? "private" : "public"}
            >
              {repo.private ? "lock" : "public"}
            </span>
          </div>
          <div className={styles.description}>
            {repo.description ?? "No Description"}
          </div>
          <div className={styles.buttons}>
            <Link
              href={repo.html_url}
              target="_blank"
              title="Visit Repo"
              className={styles.button}
            >
              <span className="material-symbols-outlined">north_east</span>Visit
            </Link>
            {repo.homepage && (
              <Link
                href={repo.homepage}
                target="_blank"
                title="Visit Homepage"
                className={styles.button}
              >
                <span className="material-symbols-outlined">web</span>HomePage
              </Link>
            )}
          </div>
        </div>
        <InviteLinks userId={userId} />
        <ToastContainer />
      </div>
    </div>
  );
}
