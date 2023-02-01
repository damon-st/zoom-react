import React, { useEffect, useState } from "react";
import { FieldErrorType, MeetingType, UserType } from "../utils/Types";
import useAuth from "../hooks/useAuth";
import useFetchUsers from "../hooks/useFetchUsers";
import useToast from "../hooks/useToast";
import { useAppSelector } from "../app/hooks";
import moment from "moment";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../utils/FirebaseCondig";
import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiSwitch,
  EuiTitle,
} from "@elastic/eui";
import CreateMeetingButtons from "./formComponents/CreateMeetingButtons";
import MeetingDateField from "./formComponents/MeetingDateField";
import MeetingMaximunUserField from "./formComponents/MeetingMaximunUserField";
import MeetingNameFiled from "./formComponents/MeetingNameFiled";
import MeetingUsersField from "./formComponents/MeetingUsersField";

export default function EditFlyout({
  closeFlyout,
  meetings,
}: {
  closeFlyout: (dataChanged?: boolean) => void;
  meetings: MeetingType;
}) {
  useAuth();
  const [users] = useFetchUsers();
  const [createToast] = useToast();
  const uid = useAppSelector((zoom) => zoom.auth.userInfo?.uid);
  const [meetingName, setMeetingName] = useState(meetings.meetingName);
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
  const [startDate, setStartDate] = useState(moment(meetings.meetingDate));
  const [size, setSize] = useState(1);
  const [anyoneCanJoin, setanyoneCanJoin] = useState(false);
  const [meetingType] = useState(meetings.meetingType);
  const [status, setStatus] = useState(false);
  const [showErrors, setshowErrors] = useState<{
    meetingName: FieldErrorType;
    meetingUser: FieldErrorType;
  }>({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUser: {
      show: false,
      message: [],
    },
  });

  useEffect(() => {
    if (users) {
      const foundUsers: Array<UserType> = [];
      meetings.invitedUsers.forEach((user) => {
        const findUser = users.find((tempUser) => tempUser.uid == user);
        if (findUser) foundUsers.push(findUser);
      });
      setSelectedUsers(foundUsers);
    }
  }, [meetings, users]);

  const onUserChange = (selectedOptiones: any) => {
    setSelectedUsers(selectedOptiones);
  };
  const validateForm = () => {
    let erros = false;
    let cloneShowErros = { ...showErrors };
    if (!meetingName.length) {
      cloneShowErros.meetingName.show = true;
      cloneShowErros.meetingName.message = ["Please Enter Meeting Name"];
      erros = true;
    } else {
      cloneShowErros.meetingName.show = false;
      cloneShowErros.meetingName.message = [];
      erros = false;
    }
    if (!selectedUsers.length) {
      cloneShowErros.meetingUser.show = true;
      cloneShowErros.meetingUser.message = ["Please Select a User"];
      erros = true;
    } else {
      cloneShowErros.meetingUser.show = false;
      cloneShowErros.meetingUser.message = [];
      erros = false;
    }
    setshowErrors(cloneShowErros);
    return erros;
  };

  const editMeeting = async () => {
    const editedMeeting: any = {
      ...meetings,
      meetingName,
      meetingType,
      invitedUsers: selectedUsers.map((u) => u.uid),
      maxUsers: size,
      meetingDate: startDate.format("L"),
      status: !status,
    };
    const docRef = doc(firebaseDB, "meetings", meetings.docId!);
    await updateDoc(docRef, editedMeeting);
    createToast({ title: "Meeting update succesfully", type: "success" });
    closeFlyout(true);
  };

  return (
    <EuiFlyout ownFocus onClose={() => closeFlyout()}>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h3>{meetings.meetingName}</h3>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiForm>
          <EuiFormRow display="columnCompressedSwitch" label="Anyone can Join">
            <EuiSwitch
              showLabel={false}
              label="Anyone can Join"
              checked={anyoneCanJoin}
              onChange={(e) => setanyoneCanJoin(e.target.checked)}
              compressed
            />
          </EuiFormRow>
          <MeetingNameFiled
            label="Meeting Name"
            placeHolder="Meeting Name"
            value={meetingName}
            setMeetingName={setMeetingName}
            isInvalidad={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
          />
          {anyoneCanJoin ? (
            <MeetingMaximunUserField value={size} setValue={setSize} />
          ) : (
            <MeetingUsersField
              label="Invite Users"
              options={users}
              onChange={onUserChange}
              selectedOptions={selectedUsers}
              singleSelection={
                meetingType === "1-on-1" ? { asPlainText: true } : false
              }
              isClearable={false}
              placeHolder="Select a user"
              isInvalidad={showErrors.meetingUser.show}
              error={showErrors.meetingUser.message}
            />
          )}

          <MeetingDateField selected={startDate} setStartDate={setStartDate} />
          <EuiFormRow display="columnCompressedSwitch" label="Cancel Meeting">
            <EuiSwitch
              showLabel={false}
              label="Cancel Meeting"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            ></EuiSwitch>
          </EuiFormRow>
          <EuiSpacer />
          <CreateMeetingButtons
            isEdit
            closeFlyout={closeFlyout}
            createMeeting={editMeeting}
          />
        </EuiForm>
      </EuiFlyoutBody>
    </EuiFlyout>
  );
}
