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
    ((window.heapReadyCb = window.heapReadyCb || []),
      (window.heap = window.heap || []),
      (heap.load = function (e, t) {
        ((window.heap.envId = e),
          (window.heap.clientConfig = t = t || {}),
          (window.heap.clientConfig.shouldFetchServerConfig = !1));
        var a = document.createElement("script");
        ((a.type = "text/javascript"),
          (a.async = !0),
          (a.src =
            "https://cdn.eu.heap-api.com/config/" + e + "/heap_config.js"));
        var r = document.getElementsByTagName("script")[0];
        r.parentNode.insertBefore(a, r);
        var n = [
            "init",
            "startTracking",
            "stopTracking",
            "track",
            "resetIdentity",
            "identify",
            "getSessionId",
            "getUserId",
            "getIdentity",
            "addUserProperties",
            "addEventProperties",
            "removeEventProperty",
            "clearEventProperties",
            "addAccountProperties",
            "addAdapter",
            "addTransformer",
            "addTransformerFn",
            "onReady",
            "addPageviewProperties",
            "removePageviewProperty",
            "clearPageviewProperties",
            "trackPageview",
          ],
          i = function (e) {
            return function () {
              var t = Array.prototype.slice.call(arguments, 0);
              window.heapReadyCb.push({
                name: e,
                fn: function () {
                  heap[e] && heap[e].apply(heap, t);
                },
              });
            };
          };
        for (var p = 0; p < n.length; p++) heap[n[p]] = i(n[p]);
      }));
    heap.load("646205220");
  })();
}
