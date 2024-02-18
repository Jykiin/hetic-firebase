
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDocs, query, where} from "firebase/firestore";
import User from "@/entities/User";
import { db, auth } from "../firebase.conf";
import { getAuth } from "firebase/auth";

/**
 * Create New user
 * @param {Object} info 
 * @returns 
 */
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
/**
 * Logout current user
 */
const signOutUser = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw new Error(error);
  }
};
/**
 * Get current user Description
 * @returns Object
 */
const getUserDesc = (uid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = query(
        collection(db, "users"),
        where("uid", "==", uid),
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      resolve(data[0]);
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * Get current user
 * @returns Object
 */
const currentUser = () => {
  return new Promise(async (resolve, reject) => {
    const auth = getAuth();
    var isSignedIn = false;
    auth.onAuthStateChanged(async(user) => {
      if (user) {
        isSignedIn = true;
        const userDesc = await getUserDesc(user.uid);
        user["isSeller"] = userDesc.isSeller || 0;
        resolve({ isSignedIn, user });
      } else {
        resolve({ isSignedIn, user });
      }
    });
  });
};

export { createUser, currentUser, signOutUser };
