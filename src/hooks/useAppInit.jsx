import {useEffect} from "react";
import firebase from "firebase/app";

import { useRecoilState, useSetRecoilState } from "recoil";
import userState from "../atoms/userState";
import entryArray from "../atoms/entryArray";
import personalCounter from "../atoms/personalCounter";

function useAppInit() {
  const [user, setUser] = useRecoilState(userState);
  const setEntryArray = useSetRecoilState(entryArray);
  const setPersonalCounter = useSetRecoilState(personalCounter);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(
      (answer) => {
        if (answer) {
          setUser(answer);
        }
      },
      (error) => {
        console.log(error.message);
      }
    );
  }, [setUser]);

  useEffect(() => {
    firebase
      .database()
      .ref("/users")
      .on("value", (allUserIds) => {
        let output = [];
        for (let userId in allUserIds.val()) {
          let name = allUserIds.val()[userId].name;
          let value = allUserIds.val()[userId].count;
          let key = userId;
          output.push({ id: key, name: name, value: value });
          if (userId === user.uid) {
            setPersonalCounter(value);
          }
        }
        setEntryArray(output);
      });
  }, [setPersonalCounter, setEntryArray, user]);
}

export default useAppInit;
