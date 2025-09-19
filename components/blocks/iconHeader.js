import classNames from "classnames";

import styles from "./iconHeader.module.css";
import colors from "../colors.module.css";

const IconHeader = ({ icon, rotate, title, background, color }) => {
  return (
    <section className={classNames(styles.Container)}>
      <i
        className={classNames(styles.Icon, BG_CLASS[background])}
        style={{
          transform: `rotate(${rotate}deg)`,
        }}
      >
        {icon}
      </i>
      <h4 className={classNames(styles.Title, FG_CLASS[background])}>
        {title}
      </h4>
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

export default IconHeader;
