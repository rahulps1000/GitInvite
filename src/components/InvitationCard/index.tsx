import styles from "./styles.module.css";
import { IUser } from "@/models/User";
import { IRepo } from "@/models/Repo";
import LoginForm from "../LoginForm";
import AcceptInviteForm from "../AcceptInviteForm";
import { IInvite } from "@/models/Invites";
import { decodeFromUrlSafeBase64, verifyAndDecryptToken } from "@/services/jwt";
import { getUser } from "@/services/db/users";
import { getRepo } from "@/services/github";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth";
import AcceptInviteButton from "../AcceptInviteButton";

const InvitationCard = async ({ hash }: { hash: string }) => {
  const session = await getServerSession(authOptions);
  const token = await decodeFromUrlSafeBase64(hash);
  const SECRET_KEY = process.env.TOKEN_ENCRYPTION_SECRET!;
  const decoded = await verifyAndDecryptToken(token, SECRET_KEY);
  const repo_user = await getUser(decoded?.user_id.toString()!);
  const repo: IRepo = await getRepo(
    repo_user.token,
    decoded?.repo_id.toString()!
  );

  const checkLoggedIn = () => {
    if (session?.user) {
      return true;
    }
    return false;
  };

  return (
    <div className={styles.card}>
      <h3>Collaborator Invitation to</h3>
      <h2>{repo.full_name}</h2>
      <p>
        Accept the invite to{" "}
        <a href={repo.html_url} target="_blank">
          {repo.name}
        </a>{" "}
        to gain access to the repository.
      </p>
      <div className={styles.section}>
        <h3>Auto Accept Invite</h3>
        <p>
          Sign in with your github account and accept invite using that account.
        </p>
        <div className={styles.button}>
          {checkLoggedIn() ? (
            <AcceptInviteButton
              user={session?.user!}
              token={decoded?.hash!}
              repo_id={repo.id}
            />
          ) : (
            <LoginForm />
          )}
        </div>
      </div>
      <div className={styles.seperator}>
        <hr />
        <span> OR </span>
        <hr />
      </div>
      <div className={styles.section}>
        <h3>Manually Accept Invite</h3>
        <p>Enter you github username and accept invite manually.</p>
        <AcceptInviteForm token={decoded?.hash!} repo_id={repo.id} />
      </div>
    </div>
  );
};

export default InvitationCard;
