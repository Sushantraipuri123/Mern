import { useForm } from 'react-hook-form';
import { useAuth } from "../store/Auth";
import { useState } from 'react';

function ProductForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useAuth();
    const [selectedFile, setSelectedFile] = useState(null);

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const onSubmit = async (data) => {
        try {
            // Create a FormData object
            const formData = new FormData();
            formData.append('productName', data.productName);
            formData.append('productPrice', data.productPrice);
            formData.append('createdBy', user ? user.userData._id.toString() : null); // Convert to string
            if (selectedFile) {
                formData.append('productImage', selectedFile);
            }

            const response = await fetch('http://localhost:5050/products/createProduct', {
                method: 'POST',
                body: formData, // Send FormData
            });

            if (response.ok) {
                alert('Product created successfully!');
            } else {
                const errorData = await response.json();
                alert(`Failed to create product: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            alert('An error occurred while creating the product.');
        } 
    };

    return (
        <div className="container mt-5">
            This is home, {user ? ` ${user.userData.username}` : 'Guest'}
            <h1 className='text-center'>Add Products</h1>
            <div className="row mx-auto mt-5">
                <div className="col-lg-8 mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)} className="product-form">
                        <div className="mb-3">
                            <label htmlFor="productName" className="form-label">Product Name</label>
                            <input
                                id="productName"
                                type="text"
                                {...register('productName', { required: 'Product name is required' })}
                                className={`form-control ${errors.productName ? 'is-invalid' : ''}`}
                            />
                            {errors.productName && (
                                <div className="invalid-feedback">{errors.productName.message}</div>
                            )}
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="productPrice" className="form-label">Product Price</label>
                            <input
                                id="productPrice"
                                type="number"
                                {...register('productPrice', { required: 'Product price is required', min: { value: 0, message: 'Price must be positive' } })}
                                className={`form-control ${errors.productPrice ? 'is-invalid' : ''}`}
                            />
                            {errors.productPrice && (
                                <div className="invalid-feedback">{errors.productPrice.message}</div>
                            )}
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="productImage" className="form-label">Product Image</label>
                            <input
                                id="productImage"
                                type="file"
                                accept="image/*"
                                onChange={onFileChange}
                                className={`form-control ${errors.productImage ? 'is-invalid' : ''}`}
                            />
                            {errors.productImage && (
                                <div className="invalid-feedback">{errors.productImage.message}</div>
                            )}
                        </div>
                        
                        <button type="submit" className="btn btn-primary">Create Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProductForm;
