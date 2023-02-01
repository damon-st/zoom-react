import { EuiComboBox, EuiFormRow } from "@elastic/eui";
import React from "react";

export default function MeetingUsersField({
  label,
  options,
  onChange,
  selectedOptions,
  isClearable,
  placeHolder,
  singleSelection = false,
  isInvalidad,
  error,
}: {
  label: string;
  options: any;
  onChange: any;
  selectedOptions: any;
  isClearable: boolean;
  placeHolder: string;
  singleSelection: any;
  isInvalidad: boolean;
  error: Array<string>;
}) {
  return (
    <EuiFormRow label={label} isInvalid={isInvalidad} error={error}>
      <EuiComboBox
        options={options}
        onChange={onChange}
        selectedOptions={selectedOptions}
        singleSelection={singleSelection}
        placeholder={placeHolder}
        isClearable={isClearable}
      />
    </EuiFormRow>
  );
}
