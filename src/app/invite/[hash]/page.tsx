import styles from "./styles.module.css";
import InvitationCard from "@/components/InvitationCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = async ({ params }: { params: { hash: string } }) => {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <InvitationCard hash={params.hash} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
