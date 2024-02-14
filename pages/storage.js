import { useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../firebase.conf";
import "tailwindcss/tailwind.css";
export default function Upload() {
  const [file, setFile] = useState(null);
  const storage = getStorage(app, "gs://hetic-58f98.appspot.com");

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onUpload = async () => {
    const storageRef = ref(storage, file.name);
    await uploadBytes(storageRef, file);
    console.log("File uploaded successfully");
  };

  return (
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-10 dark:bg-gray-800 dark:border-gray-700">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-5">
          Upload files
        </h1>
        <input
          type="file"
          onChange={onFileChange}
          class="block  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-10"
        />
        <button
          onClick={onUpload}
          class="text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
