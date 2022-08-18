import React, { useState } from "react";
import { toast } from "react-toastify";

export type TTab = "MINE" | "CHILD";

interface Props {
  switchTab: (tab: TTab) => void;
  tabState: TTab;
}

export function Tab({ switchTab, tabState }: Props) {
  return (
    <div className="tab">
      <div
        className={`tab-mine ${tabState === "MINE" && "on"}`}
        onClick={() => switchTab("MINE")}
      >
        MINE
      </div>
      <div
        className={`tab-child ${tabState === "CHILD" && "on"}`}
        onClick={() => switchTab("CHILD")}
      >
        CHILD
      </div>
    </div>
  );
}
