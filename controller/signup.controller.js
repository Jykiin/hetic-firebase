import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import User from "@/entities/User";
import { db, auth } from "@/firebase.conf";

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
export { createUser };
