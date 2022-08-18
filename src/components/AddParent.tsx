import React, { useState } from "react";
import { toast } from "react-toastify";

export type TTab = "MINE" | "CHILD";

interface Props {
  inputValue: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submit: () => void;
}

export function AddParent({ inputValue, onChange, submit }: Props) {
  return (
    <div className="add-parent">
      <p>부모를 등록하세요!</p>
      <div className="input-box">
        <input
          id="parent-email"
          type="string"
          value={inputValue || ""}
          placeholder="email"
          onChange={onChange}
        />
      </div>
      <button onClick={submit}>등록</button>
    </div>
  );
}
