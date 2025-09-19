import React from "react";
import Link from "next/link";
import classNames from "classnames";

import { urlInChildren } from "../../lib/purejs/breadcrumbHelpers";
import NavChild from "./navChild";

import styles from "./navItem.module.css";
import colors from "../colors.module.css";

const NavItem = ({ page, slug, condensed, className }) => {
  let subNav;
  let navItem;
  let navBox;
  let active = urlInChildren(page, `/${slug.join("/")}`);
  let isCondensed = condensed ? condensed : false;

  // We only want the color to show when we're either active, or the menu is condensed.
  let fgColor = FG_CLASS[page.color];
  fgColor = isCondensed || active ? fgColor : "";

  const bgColor = BG_CLASS[page.color];

  navBox = (
    <section
      className={classNames(
        styles.HeadingContainer,
        isCondensed ? styles.CondensedHeadingContainer : "",
      )}
    >
      <div
        className={classNames(
          styles.HeadingIconContainer,
          isCondensed ? styles.CondensedHeadingIconContainer : "",
          bgColor,
        )}
      >
        <i className={styles.Icon}>{page.icon}</i>
      </div>
      <p
        className={classNames(
          styles.CategoryName,
          isCondensed ? styles.CondensedCategoryName : "",
          fgColor,
        )}
      >
        {page.name}
      </p>
    </section>
  );

  if (page.children && page.children.length > 0) {
    subNav = (
      <ul
        className={classNames(
          styles.SubNav,
          isCondensed ? styles.CondensedSubNav : styles.ExpandedSubNav,
        )}
      >
        {page.children.map((child) => (
          <NavChild
            slug={slug}
            page={child}
            color={page.color}
            key={child.menu_key}
            depth={child.depth + 1}
            className={className}
          />
        ))}
      </ul>
    );
  }

  if (page.url.startsWith("/")) {
    navItem = (
      <li className={styles.NavItem} id={page.menu_key}>
        <Link className="not-link" href={page.url}>
          {navBox}
        </Link>
        {subNav}
      </li>
    );
  } else {
    navItem = (
      <li className={styles.NavItem} id={page.menu_key}>
        <a className="not-link" href={page.url} target="_blank">
          {navBox}
        </a>
        {subNav}
      </li>
    );
  }

  return navItem;
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
  "red-70": colors.RedForegroundNormal,
  "orange-70": colors.OrangeForegroundNormal,
  "yellow-70": colors.YellowForegroundNormal,
  "green-70": colors.GreenForegroundNormal,
  "acqua-70": colors.AcquaForegroundNormal,
  "lightBlue-70": colors.LightBlueForegroundNormal,
  "darkBlue-70": colors.DarkBlueForegroundNormal,
  "indigo-70": colors.IndigoForegroundNormal,
  "gray-70": colors.GrayForegroundNormal,
  unset: styles.TransparentForeground,
};

export default NavItem;
