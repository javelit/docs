import Link from "next/link";
import classNames from "classnames";

import styles from "./inlineCallout.module.css";
import colors from "../colors.module.css";

const InlineCallout = ({ children, icon, color, bold, href }) => {
  const backgroundColor = BG_CLASS[color];
  const textColor = FG_CLASS[color];
  return (
    <section className={styles.Container}>
      <Link
        href={href}
        className={classNames(
          styles.IconContainer,
          backgroundColor,
          "not-link",
        )}
      >
        <i className={styles.Icon}>{icon}</i>
      </Link>
      <article>
        <p className={styles.Text}>
          <Link
            href={href}
            className={classNames("not-link", styles.Link, textColor)}
          >
            {bold}
          </Link>{" "}
          {children}
        </p>
      </article>
    </section>
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

const FG_CLASS = {
  "red-70": colors.RedForeground,
  "orange-70": colors.OrangeForeground,
  "yellow-70": colors.YellowForeground,
  "green-70": colors.GreenForeground,
  "acqua-70": colors.AcquaForeground,
  "lightBlue-70": colors.LightBlueForeground,
  "darkBlue-70": colors.DarkBlueForeground,
  "indigo-70": colors.IndigoForeground,
  "gray-70": colors.GrayForeground,
  unset: styles.TransparentForeground,
};

export default InlineCallout;
