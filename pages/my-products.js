import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { currentUser } from "@/controller/auth.controller";
import "tailwindcss/tailwind.css";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase.conf";
import Navbar from "@/components/Navbar";
import { Button } from "@mui/material";
export default function Products() {
  const router = useRouter(); // Initialize the router
  const [products, setProducts] = useState([]);
  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setProducts(products.filter((product) => product.id !== id));
  };
  const editProduct = (product) => {
    const id = product.id;
    router.push(`/edit-product/${id}`);
  };
  /**
   * Function to add products
   * @param {Any} e 
   */
  const handleAddProduct = (e) => {
    e.preventDefault();
    router.push("/add-product")
  };

  useEffect(() => {
    const fetchUserAndData = async () => {
      const user = await currentUser();
      if (user.user?.isSeller === 0) {
        router.push("/");
      }

      const q = query(
        collection(db, "products"),
        where("userId", "==", user.user?.uid),
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
    };

    fetchUserAndData();
  }, []);

  return (
    <>
      <Navbar/>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="flex justify-center items-center">
              <h1 className="mb-5 text-xl mr-5 text-center font-bold py-2 pt-7 leading-tight tracking-tight md:text-2xl">
                My Products
              </h1>
              <div>
                <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAddProduct}>
                  Add Product
                </Button>
              </div>
            </div>
            <div className="shadow overflow-hidden border-b sm:rounded-lg">
              <table className="min-w-full divide-y">
                <thead className="">
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-center">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.title}</td>
                      <td>{product.description}</td>
                      <td>{product.price}</td>
                      <td className="size-32">
                        <img
                          className="size-32"
                          src={product.image}
                          alt={product.title}
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => editProduct(product)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                        Edit
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                        Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
