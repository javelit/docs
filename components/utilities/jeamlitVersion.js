import React from "react";
import getConfig from "next/config";

const JavelitVersion = () => {
  const { publicRuntimeConfig } = getConfig();
  return publicRuntimeConfig.LATEST_VERSION;
};

export default JavelitVersion;
