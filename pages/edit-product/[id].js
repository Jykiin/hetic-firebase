import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.conf";
import Button from "@mui/material/Button";
import "tailwindcss/tailwind.css";
import { v4 as uuidv4 } from "uuid";
import { currentUser } from "@/controller/auth.controller";
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
      const user = await currentUser();
      if (user.user?.isSeller === 0) {
        router.replace("/");
      }
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

  /**
   * Function to change file
   * @param {*} e
   */
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

  /**
   * Function to handle change in form
   * @param {*} event
   */
  const handleChange = (event) => {
    setUpdatedProduct({
      ...updatedProduct,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Function to handle submit button
   * @param {*} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const productRef = doc(db, "products", id);

    let imageUrl = updatedProduct.image;
    if (updatedProduct.image instanceof File) {
      const storage = getStorage();
      const storageRef = ref(storage, `products/${uuidv4()}`);
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
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Edit a product
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <label className="text-white font-bold">
                  Title:
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
                    value={updatedProduct.title}
                    name="title"
                    onChange={handleChange}
                    required
                  />
                </label>
                <label className="text-white font-bold">
                  Description:
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
                    value={updatedProduct.description}
                    name="description"
                    onChange={handleChange}
                    required
                  />
                </label>
                <label className="text-white font-bold">
                  Price:
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
                    value={updatedProduct.price}
                    name="price"
                    onChange={handleChange}
                    required
                  />
                </label>
                <label className="text-white font-bold">
                  Image:
                  <input
                    className="text-white mb-5"
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                  />
                  {updatedProduct.image && (
                    <img src={updatedProduct.image} alt="Product" />
                  )}
                </label>
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Update
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  );
}
