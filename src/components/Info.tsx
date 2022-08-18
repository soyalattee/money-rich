import React, { useState } from "react";
import { toast } from "react-toastify";

export type TTab = "MINE" | "CHILD";

interface Props {
  name: string;
  imgUrl?: string;
}

export function Info({ name, imgUrl }: Props) {
  return (
    <div className="info">
      <img src={imgUrl} alt="profile" />
      <p>{name}</p>
    </div>
  );
}
