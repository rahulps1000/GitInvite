import { decodeFromUrlSafeBase64, verifyAndDecryptToken } from "@/services/jwt";
import styles from "./styles.module.css";
import { IRepo } from "@/models/Repo";
import InvitationCard from "@/components/InvitationCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// http://localhost:3000/invite/ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjFjMlZ5WDJsa0lqbzFPRFUxT0RNME1Td2ljbVZ3YjE5cFpDSTZORFV3TVRrME1UWTNMQ0pqY21WaGRHVmtYMjl1SWpvaU1qQXlOQzB3TnkweE0xUXhNRG8xT0RvMU5pNHdOVGRhSWl3aVpYaHdhWEo1SWpveU5Dd2lhR0Z6YUNJNklqUmxZV1F4TURkaFpUazVPV1ppTnpjNE56RTJPVEpoTmpJNVpHUXlNV0prTkRjeU9XVTBOV1UwWWpCaE9ESmhZVEk1TldWaE1URmpZbVEwT1RkaU1UVWlMQ0pwWVhRaU9qRTNNakE0Tmpnek16WjkuX1p2VTEtNnc0U1k3SFRWZ2J3MG5JY0E2X2NsMm45Z29BNkJJU0xHd1dpOA

const Page = async ({
  params,
  props,
}: {
  params: { hash: string };
  props: any;
}) => {
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
