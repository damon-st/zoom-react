import {
  EuiGlobalToastList,
  EuiProvider,
  EuiThemeColorMode,
  EuiThemeProvider,
} from "@elastic/eui";

import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect, useState } from "react";
import ThemeSelector from "./components/ThemeSelector";
import CreateMeeting from "./pages/CreateMeeting";
import OneOnOneMeeting from "./pages/OneOnOneMeeting";
import { setToast } from "./app/slices/MeetingSlice";
import VideoConference from "./pages/VideoConference";
import MyMeetings from "./pages/MyMeetings";
import Meetings from "./pages/Meeting";
import JoinMeetings from "./pages/JoinMeetings";

function App() {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector((zoom) => zoom.meeting.toasts);
  const isDarkTtheme = useAppSelector((zoom) => zoom.auth.isDarkTheme);

  const [theme, setTheme] = useState<EuiThemeColorMode>("light");
  const [isinitalTheme, setIsinitalTheme] = useState(true);
  useEffect(() => {
    const theme = localStorage.getItem("zoom-theme");
    if (theme) {
      setTheme(theme as EuiThemeColorMode);
    } else {
      localStorage.setItem("zoom-theme", "light");
    }
  }, []);

  useEffect(() => {
    if (isinitalTheme) {
      setIsinitalTheme(false);
    } else {
      window.location.reload();
    }
  }, [isDarkTtheme]);

  const overrides = {
    colors: {
      LIGTH: { primary: "#0b5cff" },
      DARK: { primary: "#0b5cff" },
    },
  };

  const removeToast = (toastRemove: { id: string }) => {
    dispatch(setToast(toasts.filter((t) => t.id !== toastRemove.id)));
  };

  return (
    <ThemeSelector>
      <EuiProvider colorMode={theme}>
        <EuiThemeProvider modify={overrides}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<CreateMeeting />} />
            <Route path="/create1on1" element={<OneOnOneMeeting />} />
            <Route path="/videoconference" element={<VideoConference />} />
            <Route path="/mymeetings" element={<MyMeetings />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="/join/:id" element={<JoinMeetings />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
          <EuiGlobalToastList
            toasts={toasts}
            dismissToast={removeToast}
            toastLifeTimeMs={5000}
          />
        </EuiThemeProvider>
      </EuiProvider>
    </ThemeSelector>
  );
}

export default App;
