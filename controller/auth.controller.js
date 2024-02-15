import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import User from "@/entities/User";
import { db, auth } from "@/firebase.conf";
import { getAuth } from "firebase/auth";
const createUser = (info) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        info.email,
        info.password,
      );
      const user = new User(
        userCredential.user.uid,
        userCredential.user.email,
        info.isSeller,
      );
      const body = { ...user };
      await addDoc(collection(db, "users"), body);
      resolve(userCredential.user);
    } catch (err) {
      reject(err);
    }
  });
};
const currentUser = () => {
  return new Promise(async (resolve, reject) => {
    const auth = getAuth();
    var isSignedIn = false;
    auth.onAuthStateChanged((user) => {
      if (user) {
        isSignedIn = true;
        resolve({ isSignedIn, user });
      } else {
        resolve({ isSignedIn, user });
      }
    });
  });
};
export { createUser, currentUser };
