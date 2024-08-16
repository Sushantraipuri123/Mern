import { useForm } from "react-hook-form";
import axios from 'axios';
import { useAuth } from "../store/Auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Login() {


    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { storeTokenInLocalStorage } = useAuth();
    const navigate = useNavigate(); // Initialize useNavigate hook

    const onSubmit = (data) => {
        axios.post('/users/loginUser', data)
            .then((res) => {
                console.log('User Login successfully:', res.data);
                alert('Login successfully!');
                console.log("response from server", res.data.token);

                // Set token to localStorage
                storeTokenInLocalStorage(res.data.token);
                reset();

                // Navigate to the home page
                // navigate('/admin');
            })
            .catch((err) => {
                console.error(err);
                alert(err.response?.data?.message || 'An error occurred');
            });
    };

    return (
        <div style={{ maxWidth: '400px', margin: '90px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        {...register('email', { required: "Email is required" })}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        {...register('password', { required: "Password is required" })}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                </div>

                <button type="submit" style={{ padding: '10px 15px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
