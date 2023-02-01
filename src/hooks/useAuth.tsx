import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/FirebaseCondig";
import { setUser } from "../app/slices/AuthSlice";
import { useAppDispatch } from "../app/hooks";
export default function useAuth() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentuser) => {
      console.log(currentuser);

      if (!currentuser) navigate("/login");
      else {
        dispatch(
          setUser({
            uid: currentuser.uid,
            name: currentuser.displayName,
            email: currentuser.email,
          })
        );
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);
}
