import React from 'react'
import ProductCard from './Card'

export default function CardsList() {

    // const [data, setData] = useState([]); 

    // useEffect(() => {
    //   const fetchData = async () => {
    //     const q = query(collection(db, "product"));
    //     const collectionRef = collection(db, "product")
    //     const snapshot = await collectionRef.get();
    //     const dataArr = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //     console.log('Data from Firestore:', dataArr);
    //     setData(dataArr);
    //   };
  
    //   fetchData();
    // }, []);

   

    return (
        <div class="flex wrap gap-5 p-10">
            {data.map((card) => (
                <ProductCard 
                    key={card.id} 
                    title={card.title} 
                    image={card.image}
                    content={card.description} 
                    prix={card.price} 
                />
            ))}
        </div>
    )
}