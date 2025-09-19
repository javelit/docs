import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";

import styles from "./tile.module.css";
import colors from "../colors.module.css";
import { useRouter } from "next/router";

const Tile = ({
  img,
  dark,
  icon,
  background,
  color,
  rotate,
  size,
  link,
  title,
  text,
  borderColor,
}) => {
  const [theme, setTheme] = useState("light-mode");

  const tileSize =
    size === "full"
      ? styles.Full
      : size === "half"
        ? styles.Half
        : size === "third"
          ? styles.Third
          : size === "two-third"
            ? styles.TwoThirds
            : styles.Third;

  useEffect(() => {
    window.addEventListener("ChangeTheme", handleTheme);

    return () => {
      window.removeEventListener("ChangeTheme", handleTheme);
    };
  }, []);

  const handleTheme = () => {
    setTheme(document.body.dataset.theme);
  };

  let image;
  if (img) {
    image = <img src={img} className={styles.Icon} />;
  } else {
    image = (
      <i className={classNames("material-icons-sharp", styles.Icon)}>
        {icon || "downloading"}
      </i>
    );
  }

  const backgroundColor = BG_CLASS[background];
  const router = useRouter();

  return (
    <div
      className={classNames(
        styles.Container,
        tileSize || "third",
        backgroundColor,
      )}
    >
      <Link
        href={{ pathname: link || "/", query: router.query }}
        className={classNames("not-link", styles.Link)}
      >
        {image}
        <div>
          <h4 className={styles.Title}>{title || "Install Streamlit"}</h4>
          <p className={styles.Text}>
            {text ||
              "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia."}
          </p>
        </div>
      </Link>
    </div>
  );
};

const BG_CLASS = {
  "red-70": colors.RedBackground,
  "orange-70": colors.OrangeBackground,
  "yellow-70": colors.YellowBackground,
  "green-70": colors.GreenBackground,
  "acqua-70": colors.AcquaBackground,
  "lightBlue-70": colors.LightBlueBackground,
  "darkBlue-70": colors.DarkBlueBackground,
  "indigo-70": colors.IndigoBackground,
  "gray-70": colors.GrayBackground,
  unset: styles.TransparentBackground,
};

export default Tile;
