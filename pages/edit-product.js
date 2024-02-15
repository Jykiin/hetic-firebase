import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.conf";

export default function EditProduct() {
  const router = useRouter();
  const product = JSON.parse(router.query.product); // Retrieve the product data from the query parameter
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleChange = (event) => {
    setUpdatedProduct({
      ...updatedProduct,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const productRef = doc(db, "products", product.id);

    await updateDoc(productRef, updatedProduct);

    router.push("/my-products");
  };

  return (
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
          value={updatedProduct.image}
          name="image"
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Update</button>
    </form>
  );
}
