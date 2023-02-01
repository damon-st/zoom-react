import React from "react";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from "@elastic/eui";
import meeting1 from "../assets/meeting1.png";
import meeting2 from "../assets/meeting2.png";
import { useNavigate } from "react-router-dom";

export default function CreateMeeting() {
  useAuth();

  const navigate = useNavigate();
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
        alignItems="center"
        style={{ margin: "5vh 10vw" }}
      >
        <EuiFlexItem>
          <EuiCard
            icon={<EuiImage size={"100%"} src={meeting1} alt="creat meeting" />}
            title={`Crated 1 on 1 Meeting`}
            description="Create a personal single person meeting."
            onClick={() => navigate("/create1on1")}
            paddingSize="xl"
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            icon={<EuiImage size={"100%"} src={meeting2} alt="creat meeting" />}
            title={`Create Video Conference`}
            description="Invite multiple persons to the meeting."
            onClick={() => navigate("/videoconference")}
            paddingSize="xl"
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
}
