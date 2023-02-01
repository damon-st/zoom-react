import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { getDocs, query, where } from "firebase/firestore";
import { userRef } from "../utils/FirebaseCondig";
import { UserType } from "../utils/Types";

export default function useFetchUsers() {
  const [users, setUsers] = useState<Array<UserType>>([]);
  const uid = useAppSelector((zoom) => zoom.auth.userInfo?.uid);
  useEffect(() => {
    if (uid) {
      const getUsers = async () => {
        const firestoreQuery = query(userRef, where("uid", "!=", uid));
        const data = await getDocs(firestoreQuery);
        const firebaseUsers: Array<UserType> = [];
        data.forEach((users) => {
          const userData = users.data() as UserType;
          firebaseUsers.push({
            ...userData,
            label: userData.name,
          });
        });
        setUsers(firebaseUsers);
      };
      getUsers();
    }
  }, [uid]);

  return [users];
}
