import { EuiFieldNumber, EuiFormRow } from "@elastic/eui";
import React from "react";

export default function MeetingMaximunUserField({
  value,
  setValue,
}: {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <EuiFormRow label="Maximun People">
      <EuiFieldNumber
        min={1}
        max={100}
        value={value}
        onChange={(v) => {
          const n = parseInt(v.target.value);
          if (n >= 1 && n <= 100) {
            setValue(parseInt(v.target.value));
          }
        }}
      />
    </EuiFormRow>
  );
}
