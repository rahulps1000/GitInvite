"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { signOut } from "next-auth/react";

const NavAvatar = ({ image, name = "" }: { image: string; name: string }) => {
  const [showMenu, setMenu] = useState(false);
  let menuRef: any = useRef(null);

  const toogleMenu = (_: any) => {
    setMenu((s) => !s);
  };

  const logOut = async () => {
    hideMenu();
    await signOut();
  };

  const hideMenu = () => {
    setMenu(false);
  };

  useEffect(() => {
    let handler = (e: any) => {
      if (!menuRef.current.contains(e.target)) {
        hideMenu();
      }
    };
    document.addEventListener("mousedown", handler);

    return document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={styles.avatar}>
      <Image
        src={image}
        alt={name}
        width={50}
        height={50}
        className={styles.avatarImg}
        onClick={toogleMenu}
        title={name}
      />
      <div
        className={styles.avatarMenu}
        data-classes={showMenu}
        onClick={logOut}
        ref={menuRef}
      >
        <span>Logout</span>
      </div>
    </div>
  );
};

export default NavAvatar;
