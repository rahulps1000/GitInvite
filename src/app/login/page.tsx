import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import styles from "./page.module.css";

export default async function Home() {
  const session = await getServerSession();

  if (session?.user) redirect("/");
  return (
    <div className={styles.page}>
      <div className={styles.box}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome back!</h1>
          <p className={styles.subtitle}>
            Sign in to your account to continue.
          </p>
        </div>
        <div className={styles.login}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
