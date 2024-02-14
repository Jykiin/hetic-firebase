import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.conf";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        alert("Done Login")
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="w-72 m-auto p-5 border border-gray-300">
      <form>
        <input
          className="w-full p-2 mb-3 border border-gray-300"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="w-full p-2 mb-3 border border-gray-300"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="w-full p-2 border border-gray-300"
          type="submit"
          onClick={signIn}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
