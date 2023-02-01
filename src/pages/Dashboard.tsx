import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from "@elastic/eui";
import dashboard1 from "../assets/dashboard1.png";
import dashboard2 from "../assets/dashboard2.png";
import dashboard3 from "../assets/dashboard3.png";
import Header from "../components/Header";
export default function Dashboard() {
  useAuth();
  const navigate = useNavigate();

  return (
    <>
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
              icon={
                <EuiImage size={"5rem"} src={dashboard1} alt="creat meeting" />
              }
              title={`Crated Meeting`}
              description="Create a new meetomg and invite people."
              onClick={() => navigate("/create")}
              paddingSize="xl"
            ></EuiCard>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              icon={
                <EuiImage size={"100%"} src={dashboard2} alt="creat meeting" />
              }
              title={`My Meetings`}
              description="View your created meetings."
              onClick={() => navigate("/mymeetings")}
              paddingSize="xl"
            ></EuiCard>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              icon={
                <EuiImage size={"100%"} src={dashboard3} alt="creat meeting" />
              }
              title={`Meetings`}
              description="View the meetings that you are invited to"
              onClick={() => navigate("/meetings")}
              paddingSize="xl"
            ></EuiCard>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </>
  );
}
