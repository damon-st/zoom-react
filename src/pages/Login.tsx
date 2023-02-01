import {
  EuiFlexGroup,
  EuiProvider,
  EuiFlexItem,
  EuiImage,
  EuiSpacer,
  EuiText,
  EuiTextColor,
  EuiButton,
  EuiPanel,
} from "@elastic/eui";
import animation from "../assets/animation.gif";
import logo from "../assets/logo.png";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth, userRef } from "../utils/FirebaseCondig";
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/slices/AuthSlice";
export default function Login() {
  const navigate = useNavigate();
  const dispath = useAppDispatch();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      const { displayName, email, uid } = currentUser;
      dispath(
        setUser({
          name: displayName,
          email,
          uid,
        })
      );
      navigate("/");
    }
  });

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName, email, uid },
    } = await signInWithPopup(firebaseAuth, provider);
    if (email) {
      const firestoreQuery = query(userRef, where("uid", "==", uid));
      const fetchedUsers = await getDocs(firestoreQuery);
      if (fetchedUsers.docs.length == 0) {
        await addDoc(userRef, {
          uid,
          name: displayName,
          email,
        });
      }
      dispath(setUser({ uid, email, name: displayName }));
      navigate("/");
    }
  };

  return (
    <EuiProvider colorMode="dark">
      <EuiFlexGroup
        alignItems="center"
        justifyContent="center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <EuiFlexItem grow={false}>
          <EuiPanel paddingSize="xl">
            <EuiFlexGroup justifyContent="center" alignItems="center">
              <EuiFlexItem>
                <EuiImage src={animation} alt="logo"></EuiImage>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiImage src={logo} alt="logo" size={"230px"}></EuiImage>
                <EuiSpacer size="xs" />
                <EuiText textAlign="center" grow={false}>
                  <h3>
                    <EuiTextColor>One Platform to</EuiTextColor>
                    <EuiTextColor color={"#0b5ccf"}> connect</EuiTextColor>
                  </h3>
                </EuiText>
                <EuiSpacer size="l" />
                <EuiButton onClick={login} fill>
                  Login with Google
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiProvider>
  );
}
