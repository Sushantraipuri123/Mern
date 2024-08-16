import { useForm } from 'react-hook-form';
import { useAuth } from "../store/Auth";
function ProductForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            // Include user ID as a string in the request body
            const requestData = {
                ...data,
                createdBy: user ? user.userData._id.toString() : null, // Convert to string
            };
    
            const response = await fetch('http://localhost:5050/products/createProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
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

    const { user } = useAuth();

    return (
        
      <div className="container mt-5">
         This is home, {user ? ` ${user.userData.username}` : 'Guest'}
        <h1 className='text-center'>Add Products</h1>
        <div className="row mx-auto mt-5">
            <div className="col-lg-8 mx-auto ">
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
            
            <button type="submit" className="btn btn-primary">Create Product</button>
        </form>
            </div>
        </div>
      </div>
    );
}

export default ProductForm;
