import { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";

function MyProducts() {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);  // State to store filtered products

    useEffect(() => {
        const fetchMyProducts = async () => {
            try {
                const response = await fetch(`http://localhost:5050/products/myProducts/${user._id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();
                // Filter products where createdBy matches user._id
                const filteredProducts = data.filter(product => product.createdBy === user._id);
                setProducts(filteredProducts);  // Store filtered products in state
                console.log('Filtered products:', filteredProducts);

            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        if (user && user._id) {
            fetchMyProducts();
        }
    }, [user]);

    return (
        <div>
            <h2>My Products</h2>
            <ul>
                {products.length > 0 ? (
                    products.map(product => (
                        <li key={product._id}>
                            <strong>{product.productName}</strong> - {product.productPrice} 
                        </li>
                    ))
                ) : (
                    <li>No products found.</li>
                )}
            </ul>
        </div>
    );
}

export default MyProducts;
