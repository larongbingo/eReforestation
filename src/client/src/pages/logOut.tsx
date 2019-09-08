import React, { FunctionComponent, useEffect } from "react";

import { destroySessionKey } from "../libs/session";

export const LogOut: FunctionComponent = () => {
  useEffect(() => {
    destroySessionKey();
    window.location.replace("/");
  }, []);
  
  return (
    <>
      Goodbye
    </>
  );
};
