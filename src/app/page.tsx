"use server";
import Image from "next/image";
import styles from "./page.module.css";
import { getServerSession } from "next-auth/next";

import { redirect } from "next/navigation";
import { getUser } from "@/services/db/users";
import { getRepos } from "@/services/github";
import { IRepo, Repos } from "@/models/Repo";
import { authOptions } from "@/services/auth";
import RepoCard from "@/components/RepoCard";

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/login");

  const userId = session?.user?.id;
  const user = await getUser(userId ?? "0");

  const repos: Repos = await getRepos(user.token);

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1>Select a Repo</h1>
        <div className={styles.repos}>
          {repos.map((r) => (
            <RepoCard key={r.id} repo={r} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
