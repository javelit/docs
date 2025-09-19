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
  "yellow-80": colors.YellowBackground80,
  "green-70": colors.GreenBackground,
  "acqua-70": colors.AcquaBackground,
  "acqua-100": colors.AcquaBackground100,
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
  "yellow-80": colors.YellowForeground80,
  "green-70": colors.GreenForeground,
  "acqua-70": colors.AcquaForeground,
  "acqua-100": colors.AcquaForeground100,
  "lightBlue-70": colors.LightBlueForeground,
  "darkBlue-70": colors.DarkBlueForeground,
  "indigo-70": colors.IndigoForeground,
  "gray-70": colors.GrayForeground,
  unset: styles.TransparentForeground,
};

export default InlineCallout;
