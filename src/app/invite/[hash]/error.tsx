"use client";

import { useEffect } from "react";
import styles from "./error-styles.module.css";
import LinkIcon from "@/components/Logo/LinkIcon";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.iconContainer}>
          <LinkIcon className={styles.icon} />
        </div>
        <h1 className={styles.title}>Oops, something went wrong!</h1>
        <p className={styles.message}>
          We're sorry, but an unexpected error has occurred. Please try again
          later or contact support if the issue persists.
        </p>
        <p className={styles.message}>Error : {error.message}</p>
        <div className={styles.buttonContainer}>
          <Link className={styles.button} href="/" prefetch={false}>
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
