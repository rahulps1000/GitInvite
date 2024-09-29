"use client";

import { User } from "next-auth";
import styles from "./styles.module.css";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AcceptInviteButton = ({
  user,
  token,
  repo_id,
}: {
  user: User;
  token: string;
  repo_id: number;
}) => {
  const router = useRouter();

  const acceptInvite = async () => {
    try {
      const response = await axios.post("/api/github/invite/accept", {
        token: token,
        user_name: "",
        repo_id: repo_id,
        type: "auto",
      });
      if (response.data.status) {
        router.replace(response.data.repo_url);
      } else {
        console.log("asdkjhgasdjhasdgjskyhd");

        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to Accept Invite. Please Contact Admin");
    }
  };
  return (
    <button className={styles.buttonstyle} onClick={() => acceptInvite()}>
      Accept Invite as {user.name}
      {user.image && (
        <Image
          className={styles.image}
          src={user.image}
          alt={user.name ?? ""}
          height={25}
          width={25}
          title={user.name ?? ""}
        />
      )}
    </button>
  );
};

export default AcceptInviteButton;
