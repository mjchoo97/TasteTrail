"use client";

import Link from "next/link";
import React, { useState } from "react";
import styles from "./navbar.module.css";
import AuthLinks from "../authlinks/AuthLinks";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  const linkoption = [
    {
      title: "Recipes",
      link: "/recipelist",
    },
    {
      title: "New",
      link: "/newrecipe",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">TasteTrail.</Link>
      </div>

      <div className={styles.links}>
        {linkoption.map((option) => (
          <Link
            key={option.title}
            className={`${styles.link} ${
              pathName === option.link && styles.active
            }`}
            href={option.link}
          >
            {option.title}
          </Link>
        ))}
        {/* <AuthLinks /> */}
      </div>
      {open && (
        <div className={styles.mobileLinks}>
          {linkoption.map((option) => (
            <Link
              key={option.title}
              className={`${styles.mobilelink} ${
                pathName === option.link && styles.active
              }`}
              href={option.link}
            >
              <span onClick={() => setOpen((prev) => !prev)}>
                {option.title}
              </span>
            </Link>
          ))}
        </div>
      )}
      <div
        className={styles.menucontainer}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Image src="/hamburger.png" alt="menu-icon" fill />
      </div>
    </div>
  );
};

export default Navbar;
