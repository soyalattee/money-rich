import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { toast } from "react-toastify";

export type TTab = "MINE" | "CHILD";

interface Props {
  setCredential: (credential: string | undefined) => void;
}

export function GoogleOAuth({ setCredential }: Props) {
  return (
    <div className="google-login">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          if (credentialResponse.clientId !== undefined) {
            setCredential(credentialResponse.credential);
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      ;
    </div>
  );
}
