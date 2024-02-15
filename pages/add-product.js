import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase.conf";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
    });

    setTitle("");
    setDescription("");
    setPrice("");
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />
      <input type="file" onChange={handleFileChange} required />
      <button type="submit">Add Product</button>
    </form>
  );
}
