import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase.conf";
import "tailwindcss/tailwind.css";
import Button from "@mui/material/Button";
import { currentUser } from "@/controller/auth.controller";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const curentUser = await currentUser();
const userID = curentUser.user?.uid;
export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileType = file.type;
    const validImageTypes = ["image/jpeg", "image/png"];
    const validVideoTypes = ["video/mp4"];

    if (
      validImageTypes.includes(fileType) ||
      validVideoTypes.includes(fileType)
    ) {
      setFile(file);
    } else {
      alert("Seuls les fichiers image et vidéo sont autorisés.");
      e.target.value = "";
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let fileUrl = "";
    const storage = getStorage();
    if (file) {
      const storageRef = ref(storage, `products/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await uploadTask.then((snapshot) => {
        return getDownloadURL(snapshot.ref).then((downloadURL) => {
          fileUrl = downloadURL;
        });
      });
    }

    const docRef = await addDoc(collection(db, "products"), {
      title: title,
      description: description,
      price: price,
      image: fileUrl,
      userId: userID,
    });

    setTitle("");
    setDescription("");
    setPrice("");
    setFile("");
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Add a product
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
              />
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
              />
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                required
              />
              <input
                className="text-white"
                type="file"
                onChange={handleFileChange}
                required
              />
              <div className="flex justify-center">
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Add Product
                </Button>
              </div>
              {/* <button type="submit">Add Product</button> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
