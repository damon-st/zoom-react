import React, { useState } from "react";
import Header from "../components/Header";
import { EuiFlexGroup, EuiFlexItem, EuiForm, EuiSpacer } from "@elastic/eui";
import MeetingNameFiled from "../components/formComponents/MeetingNameFiled";
import MeetingUsersField from "../components/formComponents/MeetingUsersField";
import useAuth from "../hooks/useAuth";
import useFetchUsers from "../hooks/useFetchUsers";
import moment from "moment";
import MeetingDateField from "../components/formComponents/MeetingDateField";
import CreateMeetingButtons from "../components/formComponents/CreateMeetingButtons";
import { FieldErrorType, UserType } from "../utils/Types";
import { addDoc } from "firebase/firestore";
import { meetingsRef } from "../utils/FirebaseCondig";
import { generateMeetingID } from "../utils/genereteMeetingID";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";

export default function OneOnOneMeeting() {
  useAuth();
  const navigate = useNavigate();
  const uid = useAppSelector((zoom) => zoom.auth.userInfo?.uid);
  const [users] = useFetchUsers();
  const [createToast] = useToast();
  const [meetingName, setMeetingName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
  const [startDate, setStartDate] = useState(moment());
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
  const createMeeting = async () => {
    if (!validateForm()) {
      const meetingId = generateMeetingID();
      await addDoc(meetingsRef, {
        createBy: uid,
        meetingId,
        meetingName,
        meetingType: "1-on-1",
        invitedUsers: [selectedUsers[0].uid],
        meetingDate: startDate.format("L"),
        maxUsers: 1,
        status: true,
      });
      createToast({
        title: "One on One Meeting Created Succefully",
        type: "success",
      });
      navigate("/");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <EuiFlexGroup justifyContent="center" alignItems="center">
        <EuiForm>
          <MeetingNameFiled
            label="Meeting Name"
            placeHolder="Meeting Name"
            value={meetingName}
            setMeetingName={setMeetingName}
            isInvalidad={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
          />
          <MeetingUsersField
            label="Invite Users"
            options={users}
            onChange={onUserChange}
            selectedOptions={selectedUsers}
            singleSelection={{ asPlaintText: true }}
            isClearable={false}
            placeHolder="Select a user"
            isInvalidad={showErrors.meetingUser.show}
            error={showErrors.meetingUser.message}
          />
          <MeetingDateField selected={startDate} setStartDate={setStartDate} />
          <EuiSpacer />
          <CreateMeetingButtons createMeeting={createMeeting} />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  );
}
