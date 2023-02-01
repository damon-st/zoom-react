import React from "react";
import { EuiFieldText, EuiFormRow } from "@elastic/eui";

export default function MeetingNameFiled({
  label,
  placeHolder,
  value,
  setMeetingName,
  isInvalidad,
  error,
}: {
  label: string;
  placeHolder: string;
  value: string;
  setMeetingName: React.Dispatch<React.SetStateAction<string>>;
  isInvalidad: boolean;
  error: Array<string>;
}) {
  return (
    <EuiFormRow label={label} isInvalid={isInvalidad} error={error}>
      <EuiFieldText
        placeholder={placeHolder}
        value={value}
        onChange={(e) => setMeetingName(e.target.value)}
      ></EuiFieldText>
    </EuiFormRow>
  );
}
