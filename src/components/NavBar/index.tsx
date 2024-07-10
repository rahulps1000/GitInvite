import React from "react";
import GitInviteLogo from "../Logo/GitInviteLogo";
import styles from "./styles.module.css";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import NavAvatar from "./NavAvatar";

const NavBar = async () => {
  const session = await getServerSession();
  const image = session?.user.image ?? "/images/avatar.png";

  return (
    <nav className={styles.nav}>
      <Link href={{ pathname: "/" }} className={styles.logoGrp}>
        <GitInviteLogo className={styles.logo} />
        <div>
          <span>Git</span>
          <span>Invite</span>
        </div>
      </Link>
      {session && <NavAvatar image={image} name={session.user.name ?? ""} />}
    </nav>
  );
};

export default NavBar;
