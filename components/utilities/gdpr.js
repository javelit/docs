import React, { useEffect } from "react";
import classNames from "classnames";

import content from "../../content/gdpr-banner.md";

import styles from "./gdpr.module.css";

const TELEMETRY_PREFERENCE = "InsertTelemetry";
const TELEMETRY_PREFERENCE_DATE = "TelemetryDate";

export function setTelemetryPreference(accepted) {
  localStorage.setItem(TELEMETRY_PREFERENCE, JSON.stringify(accepted));
  localStorage.setItem(TELEMETRY_PREFERENCE_DATE, JSON.stringify(Date.now()));
}

// Check if the stored date is > 6 months old
const isConsentStale = (timestamp) => {
  const consent_date = new Date(parseInt(timestamp * 1000));
  const today = new Date();

  const six_months_in_ms =
    1000 /*ms*/ * 60 /*s*/ * 60 /*min*/ * 24 /*h*/ * 30 /*days*/ * 6; /*months*/
  return today - consent_date > six_months_in_ms;
};

function getTelemetryPreference() {
  // Returns true/false if user accepted/denied telemetry.
  // Returns null if user never accepted/denied or consent is stale.

  const telemetryPref = localStorage.getItem(TELEMETRY_PREFERENCE);
  const consentIsStale = isConsentStale(
    localStorage.getItem(TELEMETRY_PREFERENCE_DATE),
  );

  if (telemetryPref == null || consentIsStale) return null;

  return telemetryPref == "true";
}

export default function GDPRBanner({
  isTelemetryModalVisible,
  setIsTelemetryModalVisible,
  isTelemetryBannerVisible,
  setIsTelemetryBannerVisible,
  insertTelemetryCode,
  setInsertTelemetryCode,
  allowTelemetryAndCloseBanner,
  declineTelemetryAndCloseBanner,
}) {
  useEffect(() => {
    const pref = getTelemetryPreference();

    switch (pref) {
      case true:
        setInsertTelemetryCode(true);
        return;

      case false:
        // This is already false at initialization, but it doesn't hurt to do the right thing
        // here and make sure it's indeed false.
        setInsertTelemetryCode(false);
        return;

      case null:
        localStorage.clear(); // Do we even need this line?? Seems dangerous to just clear the entire localStorage, as maybe some other library could be using it.
        setIsTelemetryBannerVisible(true);
        return;

      default:
        console.log(`Unexpected telemetry preference: ${pref}`);
        return;
    }
  }, []);

  useEffect(() => {
    if (insertTelemetryCode) {
      insertTelemetry();
    }
  }, [insertTelemetryCode]);

  return (
    <>
      {isTelemetryBannerVisible && (
        <div
          className={classNames(
            isTelemetryBannerVisible === false ? "hidden" : "",
            "z-30 fixed",
            "bottom-2 inset-x-2 md:bottom-4 md:inset-x-4",
          )}
        >
          <div
            className={classNames(
              "flex flex-col xl:flex-row xl:items-end gap-4",
              "pl-4 pr-4 sm:pl-8 sm:pr-8",
              "rounded-lg border border-gray-30",
              "shadow-lg",
              "container mx-auto py-8",
              styles.Container,
            )}
          >
            <div
              className={classNames("flex-1", styles.Markdown)}
              dangerouslySetInnerHTML={{ __html: content.html }}
            />
            <div className="flex flex-col lg:flex-row lg:justify-end gap-2 lg:gap-4">
              <button
                className={classNames(
                  "text-gray-90 hover:text-gray-70 hover:underline",
                  "py-2",
                  "order-last lg:order-none",
                  styles.Button,
                )}
                onClick={() =>
                  setIsTelemetryModalVisible(!isTelemetryModalVisible)
                }
              >
                Cookie settings
              </button>
              <button
                className={classNames(
                  "py-2 px-3",
                  "text-gray-90",
                  "border-gray-90 border",
                  "rounded",
                  "hover:bg-red-70 hover:border-red-70",
                  "hover:text-white",
                  styles.Button,
                )}
                onClick={declineTelemetryAndCloseBanner}
              >
                Reject all
              </button>
              <button
                className={classNames(
                  "py-2 px-3",
                  "rounded",
                  "border",
                  "text-white",
                  "bg-gray-90 border-gray-90",
                  "hover:bg-red-70 hover:border-red-70",
                  styles.Button,
                )}
                onClick={allowTelemetryAndCloseBanner}
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function insertTelemetry() {
  (function () {
    var i = "analytics",
      analytics = (window[i] = window[i] || []);
    if (!analytics.initialize)
      if (analytics.invoked)
        window.console &&
          console.error &&
          console.error("Segment snippet included twice.");
      else {
        analytics.invoked = !0;
        analytics.methods = [
          "trackSubmit",
          "trackClick",
          "trackLink",
          "trackForm",
          "pageview",
          "identify",
          "reset",
          "group",
          "track",
          "ready",
          "alias",
          "debug",
          "page",
          "screen",
          "once",
          "off",
          "on",
          "addSourceMiddleware",
          "addIntegrationMiddleware",
          "setAnonymousId",
          "addDestinationMiddleware",
          "register",
        ];
        analytics.factory = function (e) {
          return function () {
            if (window[i].initialized)
              return window[i][e].apply(window[i], arguments);
            var n = Array.prototype.slice.call(arguments);
            if (
              ["track", "screen", "alias", "group", "page", "identify"].indexOf(
                e,
              ) > -1
            ) {
              var c = document.querySelector("link[rel='canonical']");
              n.push({
                __t: "bpc",
                c: (c && c.getAttribute("href")) || void 0,
                p: location.pathname,
                u: location.href,
                s: location.search,
                t: document.title,
                r: document.referrer,
              });
            }
            n.unshift(e);
            analytics.push(n);
            return analytics;
          };
        };
        for (var n = 0; n < analytics.methods.length; n++) {
          var key = analytics.methods[n];
          analytics[key] = analytics.factory(key);
        }
        analytics.load = function (key, n) {
          var t = document.createElement("script");
          t.type = "text/javascript";
          t.async = !0;
          t.setAttribute("data-global-segment-analytics-key", i);
          t.src =
            "https://cdn.segment.com/analytics.js/v1/" +
            key +
            "/analytics.min.js";
          var r = document.getElementsByTagName("script")[0];
          r.parentNode.insertBefore(t, r);
          analytics._loadOptions = n;
        };
        analytics._writeKey = "qXL0WxKkXwhtEhm5BgiYXnZbZvKFIBmA";
        analytics.SNIPPET_VERSION = "5.2.0";
        analytics.load("qXL0WxKkXwhtEhm5BgiYXnZbZvKFIBmA");
        analytics.page();
      }
  })();
}
