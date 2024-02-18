import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.conf";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query || {};
  const [updatedProduct, setUpdatedProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setUpdatedProduct(productSnap.data());
        } else {
          console.log("No such product!");
        }
      }
    };

    fetchProduct();
  }, [id]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileType = file.type;
    const validImageTypes = ["image/jpeg", "image/png"];
    const validVideoTypes = ["video/mp4"];

    if (
      validImageTypes.includes(fileType) ||
      validVideoTypes.includes(fileType)
    ) {
      setUpdatedProduct({
        ...updatedProduct,
        image: file,
      });
    } else {
      alert("Seuls les fichiers image et vidéo sont autorisés.");
      e.target.value = "";
    }
  };
  const handleChange = (event) => {
    setUpdatedProduct({
      ...updatedProduct,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const productRef = doc(db, "products", id);

    let imageUrl = updatedProduct.image;
    if (updatedProduct.image instanceof File) {
      const storage = getStorage();
      const storageRef = ref(storage, `products/${updatedProduct.image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, updatedProduct.image);

      await uploadTask.then((snapshot) => {
        return getDownloadURL(snapshot.ref).then((downloadURL) => {
          imageUrl = downloadURL;
        });
      });
    }

    await updateDoc(productRef, {
      ...updatedProduct,
      image: imageUrl,
    });

    router.push("/my-products");
  };

  return (
    updatedProduct && (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          value={updatedProduct.title}
          name="title"
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Description:
        <input
          value={updatedProduct.description}
          name="description"
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Price:
        <input
          value={updatedProduct.price}
          name="price"
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Image:
        <input
          type="file"
          name="image"
          onChange={handleFileChange}

        />
        {updatedProduct.image && (
          <img src={updatedProduct.image} alt="Product" />
        )}
      </label>
      <button type="submit">Update</button>
    </form>
    )
  );

}