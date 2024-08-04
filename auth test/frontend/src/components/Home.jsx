import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

function Home() {
    // Initialize the useForm hook
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Function to handle form submission
    const onSubmit = async (data) => {
        try {
            // Log form data for debugging

            // Call the API with the email data
            const response = await axios.post('/users/findUser',data);
            console.log("User found", response.data);
        } catch (error) {
            console.error("Error fetching user", error);
        }
    };

    return (
        <>
            <div className="m-5">
                This is home
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input 
                                type="text" 
                                placeholder="Enter your email" 
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <p className="text-danger">{errors.email.message}</p>}
                            <div className="">
                                <button type="submit" className="btn btn-primary mt-4">
                                    Verify
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
