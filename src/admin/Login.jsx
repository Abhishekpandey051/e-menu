import { useState } from 'react';
import bgFood from '../assets/bg-food.jpeg';
import useValidate from '../utils/useValidate';
import { useAuth } from '../utils/AuthProvider';

function Login() {
    const [isSignin, setIsSignin] = useState(true);
    const [value, setValue] = useState({
        name: '',
        email: '',
        password: '',
        remember: false,
    });
    const [submitClicked, setSubmitClicked] = useState(false);
    const { signUp, signIn,logout, userData, currentUser } = useAuth();
console.log(userData,currentUser);

    const error = useValidate(value, isSignin, submitClicked);

    const handleSubmitFormvalue = async (e) => {
        e.preventDefault();
        setSubmitClicked(true);

        const hasErrors = Object.keys(error).length > 0;

        if (hasErrors) {
            console.warn('Validation failed:', error);
            return;
        }

        try {
            if (isSignin) {
                await signIn(value.email, value.password);
                alert("Logged in");
            } else {
                await signUp(value.email, value.password, value.name);
                alert("Account created");
            }
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="relative min-h-screen">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    className="w-full h-full object-cover"
                    src={bgFood}
                    alt="sign-up"
                />
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmitFormvalue}
                className="absolute z-10 w-11/12 max-w-sm md:w-1/2 lg:w-1/3 xl:w-1/4 text-white p-8 md:p-12 bg-black bg-opacity-80 rounded-lg shadow-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
                <h1 className="font-bold text-3xl pb-5 text-center">
                    {isSignin ? "Sign In" : "Sign Up"}
                </h1>

                {!isSignin && (
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-white">Your name</label>
                        <input
                            type="text"
                            className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                            placeholder="Full Name"
                            value={value.name}
                            onChange={(e) => setValue({ ...value, name: e.target.value })}
                        />
                        {submitClicked && error.name && (
                            <span className='text-red-500 font-medium'>{error.name}</span>
                        )}
                    </div>
                )}

                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-white">Your email</label>
                    <input
                        type="email"
                        className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                        placeholder="name@example.com"
                        value={value.email}
                        onChange={(e) => setValue({ ...value, email: e.target.value })}
                    />
                    {submitClicked && error.email && (
                        <span className='text-red-500 font-medium'>{error.email}</span>
                    )}
                </div>

                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-white">Your password</label>
                    <input
                        type="password"
                        className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                        placeholder="••••••••"
                        value={value.password}
                        onChange={(e) => setValue({ ...value, password: e.target.value })}
                    />
                    {submitClicked && error.password && (
                        <span className='text-red-500 font-medium'>{error.password}</span>
                    )}
                </div>

                <div className="flex items-center mb-5">
                    <input
                        id="remember"
                        type="checkbox"
                        checked={value.remember}
                        onChange={(e) => setValue({ ...value, remember: e.target.checked })}
                        className="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-red-500"
                    />
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-white">
                        Remember me
                    </label>
                </div>

                <button
                    type="submit"
                    className="p-3 my-4 bg-red-700 hover:bg-red-800 w-full rounded-lg font-semibold transition"
                >
                    {isSignin ? "Sign In" : "Sign Up"}
                </button>

                <p
                    className="text-sm text-center cursor-pointer underline"
                    onClick={() => {
                        setIsSignin(!isSignin);
                        setSubmitClicked(false); // reset validation state
                        setValue({
                            name: '',
                            email: '',
                            password: '',
                            remember: false,
                        });
                    }}
                >
                    {isSignin
                        ? "New to E-Menu? Sign Up Now"
                        : "Already Registered? Sign In Now"}
                </p>
            </form>
            <div className='bg-red-500' style={{ height: '50px', width: '100%', position: 'absolute', bottom: 0 }}>
            <button onClick={logout}>Logout</button>
            </div>
        </div>
    );
}

export default Login;
