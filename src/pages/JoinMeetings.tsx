import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../hooks/useToast";
import { getDocs, query, where } from "firebase/firestore";
import { meetingsRef } from "../utils/FirebaseCondig";
import { MeetingType, UserType } from "../utils/Types";
import moment from "moment";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { generateMeetingID } from "../utils/genereteMeetingID";
import useAuth from "../hooks/useAuth";

export default function JoinMeetings() {
  useAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [createToast] = useToast();
  const [isAllowed, setIsAllowed] = useState(false);
  const [user, setUser] = useState<UserType>();
  const [userLoaded, setUserLoaded] = useState(false);
  const userTemp = useAppSelector((zoom) => zoom.auth.userInfo);

  const goToBack = () => navigate(user ? "/" : "/login");

  useEffect(() => {
    if (userTemp) {
      setUser(userTemp);
      setUserLoaded(true);
    }
  }, [userTemp]);
  useEffect(() => {
    const getMeetingData = async () => {
      if (params.id && userLoaded) {
        const firestoreQuery = query(
          meetingsRef,
          where("meetingId", "==", params.id)
        );
        const fetchMeetings = await getDocs(firestoreQuery);
        if (fetchMeetings.docs.length) {
          const meeting = fetchMeetings.docs[0].data() as MeetingType;
          const isCreator = meeting.createBy === user?.uid;
          if (meeting.meetingType === "1-on-1") {
            if (meeting.invitedUsers[0] === user?.uid || isCreator) {
              if (meeting.meetingDate === moment().format("L")) {
                setIsAllowed(true);
              } else if (
                moment(meeting.meetingDate).isBefore(moment().format("L"))
              ) {
                createToast({ title: "Meeting has ended.", type: "danger" });
                goToBack();
              } else if (moment(meeting.meetingDate).isAfter()) {
                createToast({
                  title: `Meeting is on ${meeting.meetingDate}`,
                  type: "warning",
                });
                goToBack();
              } else {
                goToBack();
              }
            }
          } else if (meeting.meetingType === "vide-conference") {
            const index = meeting.invitedUsers.findIndex((u) => u == user?.uid);
            if (index >= 0 || isCreator) {
              if (meeting.meetingDate === moment().format("L")) {
                setIsAllowed(true);
              } else if (
                moment(meeting.meetingDate).isBefore(moment().format("L"))
              ) {
                createToast({ title: "Meeting has ended", type: "danger" });
                goToBack();
              } else if (moment(meeting.meetingDate).isAfter()) {
                createToast({
                  title: `Meeting is on ${meeting.meetingDate}`,
                  type: "warning",
                });
              }
            } else {
              createToast({
                title: "Your are not invited to the meeting",
                type: "danger",
              });
              goToBack();
            }
          } else {
            setIsAllowed(true);
          }
        } else {
          navigate("/");
        }
      }
    };
    getMeetingData();
  }, [userLoaded]);
  const appId = 459171011;
  const serverSecret = "0775d0ac26202a60cd3a19cdce5a0a38";

  const myMeeting = async (element: any) => {
    console.log("Hola");

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      params.id as string,
      user?.uid ?? generateMeetingID(),
      user?.name
    );
    console.log(kitToken);
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      maxUsers: 100,
      sharedLinks: [
        {
          name: "Personal Link",
          url: window.location.origin,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };

  return (
    <div>
      {isAllowed && (
        <div
          className="myCallContainer"
          ref={myMeeting}
          style={{ width: "100%", height: "100vh" }}
        ></div>
      )}
    </div>
  );
}
