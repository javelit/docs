import React from "react";
import getConfig from "next/config";

const JeamlitVersion = () => {
  const { publicRuntimeConfig } = getConfig();
  return publicRuntimeConfig.LATEST_VERSION;
};

export default JeamlitVersion;
