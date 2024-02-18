module.exports = class Product {
    constructor(uid, image, title, price, quantity, size, description) {
        this.uid = uid; // User ID
        this.image = image; // Product image
        this.title = title; // Product title
        this.price = price; 
        this.quantity = quantity;
        this.size = size;
        this.description = description;
    }
};

const productConverter = {
    toFirestore: (product) => {
        return {
            uid: product.uid,
            image: product.image,
            title: product.title,
            price: product.price,
            quantity: product.quantity,
            size: product.size,
            description: product.description
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Product(data.uid, data.image, data.title, data.price, data.quantity, data.siz, data.description);
    }
}
