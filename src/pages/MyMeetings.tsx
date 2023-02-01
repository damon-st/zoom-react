import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { MeetingType } from "../utils/Types";
import { getDocs, query, where } from "firebase/firestore";
import { meetingsRef } from "../utils/FirebaseCondig";
import { useAppSelector } from "../app/hooks";
import Header from "../components/Header";
import {
  EuiBadge,
  EuiBasicTable,
  EuiButtonIcon,
  EuiCopy,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
} from "@elastic/eui";
import moment from "moment";
import { Link } from "react-router-dom";
import EditFlyout from "../components/EditFlyout";

export default function MyMeetings() {
  useAuth();
  const [meetings, setMeetings] = useState<Array<MeetingType>>([]);
  const uid = useAppSelector((zoom) => zoom.auth.userInfo?.uid);
  const getMyMeetings = async () => {
    const firestoreQuery = query(meetingsRef, where("createBy", "==", uid));
    const fetchedMeetings = await getDocs(firestoreQuery);

    if (fetchedMeetings.docs.length) {
      const myMeetings: Array<MeetingType> = [];
      fetchedMeetings.forEach((meeting) => {
        myMeetings.push({
          docId: meeting.id,
          ...(meeting.data() as MeetingType),
        });
      });
      setMeetings(myMeetings);
      console.log(myMeetings);
    }
  };
  useEffect(() => {
    if (uid) {
      getMyMeetings();
    }
  }, [uid]);

  const [showEditFlyout, setShowEditFlyout] = useState(false);
  const [editMeeting, setEditMeeting] = useState<MeetingType>();

  const openEditFlyout = (meeting: MeetingType) => {
    setShowEditFlyout(true);
    setEditMeeting(meeting);
    console.log(showEditFlyout);
  };

  const closeEditFlyout = (dataChanged = false) => {
    setShowEditFlyout(false);
    setEditMeeting(undefined);
    if (dataChanged) getMyMeetings();
  };

  const colums: Array<{
    field: string;
    name: string;
    render?: (data: any) => React.ReactNode;
  }> = [
    {
      field: "meetingName",
      name: "Meeting Name",
    },
    {
      field: "meetingType",
      name: "Meeting Type",
    },
    {
      field: "meetingDate",
      name: "Meeting Date",
    },
    {
      field: "",
      name: "Status",
      render: (meeting: MeetingType) => {
        if (meeting.status) {
          if (meeting.meetingDate === moment().format("L")) {
            return (
              <EuiBadge color="success">
                <Link
                  to={`/join/${meeting.meetingId}`}
                  style={{ color: "black" }}
                >
                  Join Now
                </Link>
              </EuiBadge>
            );
          } else if (
            moment(meeting.meetingDate).isBefore(moment().format("L"))
          ) {
            return <EuiBadge color="default">Ended</EuiBadge>;
          } else {
            return <EuiBadge color="primary">Upconming</EuiBadge>;
          }
        } else {
          return <EuiBadge color="danger">Cancelled</EuiBadge>;
        }
      },
    },
    {
      field: "",
      name: "Edit",
      render: (meeting: MeetingType) => {
        return (
          <EuiButtonIcon
            aria-label="meeting-edit"
            iconType={"indexEdit"}
            color="danger"
            display="base"
            isDisabled={
              !meeting.status ||
              moment(meeting.meetingDate).isBefore(moment().format("L"))
            }
            onClick={() => openEditFlyout(meeting)}
          />
        );
      },
    },
    {
      field: "meetingId",
      name: "Copy Link",
      render: (meetingId: string) => {
        return (
          <EuiCopy
            textToCopy={`${
              import.meta.env.VITE_REACT_APP_HOST
            }/join/${meetingId}`}
          >
            {(copy: any) => (
              <EuiButtonIcon
                iconType={"copy"}
                onClick={copy}
                display="base"
                aria-label="button-copy"
              ></EuiButtonIcon>
            )}
          </EuiCopy>
        );
      },
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <EuiFlexGroup
        justifyContent="center"
        style={{
          margin: "1rem",
        }}
      >
        <EuiFlexItem>
          <EuiPanel>
            <EuiBasicTable items={meetings} columns={colums}></EuiBasicTable>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
      {showEditFlyout && (
        <EditFlyout closeFlyout={closeEditFlyout} meetings={editMeeting!} />
      )}
    </div>
  );
}
