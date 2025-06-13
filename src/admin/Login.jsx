import { useState } from 'react';
import bgFood from '../assets/bg-food.jpeg';
import useValidate from '../utils/useValidate';
import { useAuth } from '../utils/useAuth';
import { useNavigate } from 'react-router';
import swal from 'sweetalert';
import { ClipLoader } from 'react-spinners';

function Login() {
  const [isSignin, setIsSignin] = useState(true);
  const [value, setValue] = useState({
    name: '',
    email: '',
    password: '',
    remember: false,
  });
  const [submitClicked, setSubmitClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();

  const error = useValidate(value, isSignin, submitClicked);
  const handleSubmitFormvalue = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);
    setLoading(true);

    const hasErrors = Object.keys(error).length > 0;
    if (value.email === '' || hasErrors) {
      console.warn('Validation failed:', error);
      setLoading(false);
      return;
    }

    try {
      if (isSignin) {
        await signIn(value.email, value.password);
        swal({
          title: "Success!",
          text: "You have successfully logged in.",
          icon: "success",
          buttons: false,
          timer: 2000,
        });
        navigate('/dashboard');
      } else {
        await signUp(value.email, value.password, value.name);
        swal({
          title: "Account Created",
          text: "Your account has been created successfully.",
          icon: "success",
          button: "OK"
        });
        setIsSignin(true);
        setSubmitClicked(false);
      }
    } catch (err) {
      swal({
        title: "Oops!",
        text: err.message || "Authentication failed. Please try again.",
        icon: "error",
        button: "OK"
      });
    }
    setLoading(false);
  };


  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgFood}
          alt="background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-10">
        <form
          onSubmit={handleSubmitFormvalue}
          className="w-full max-w-sm md:max-w-md bg-white/5 text-white p-8 md:p-10 rounded-xl border border-white/10 shadow-xl backdrop-blur-md"
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-red-400">
            {isSignin ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignin && (
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-200">Full Name</label>
              <input
                type="text"
                value={value.name}
                onChange={(e) => setValue({ ...value, name: e.target.value })}
                placeholder="John Doe"
                className="w-full p-2.5 rounded-md text-black text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              {submitClicked && error.name && (
                <p className="text-red-400 mt-1 text-sm">{error.name}</p>
              )}
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-200">Email</label>
            <input
              type="email"
              value={value.email}
              onChange={(e) => setValue({ ...value, email: e.target.value })}
              placeholder="name@example.com"
              className="w-full p-2.5 rounded-md text-black text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            {submitClicked && error.email && (
              <p className="text-red-400 mt-1 text-sm">{error.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-200">Password</label>
            <input
              type="password"
              value={value.password}
              onChange={(e) => setValue({ ...value, password: e.target.value })}
              placeholder="••••••••"
              className="w-full p-2.5 rounded-md text-black text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            {submitClicked && error.password && (
              <p className="text-red-400 mt-1 text-sm">{error.password}</p>
            )}
          </div>

          <div className="flex items-center mb-5">
            <input
              id="remember"
              type="checkbox"
              checked={value.remember}
              onChange={(e) => setValue({ ...value, remember: e.target.checked })}
              className="w-4 h-4 text-red-500 bg-white border-gray-300 rounded focus:ring-red-400"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold transition-all hover:scale-105 shadow-md"
          >
            {loading ? <ClipLoader loading={loading} size={25} color="white" /> : isSignin ? "Sign In" : "Sign Up"}
          </button>

          {/* <p
            onClick={() => {
              setIsSignin(!isSignin);
              setSubmitClicked(false);
              setValue({ name: '', email: '', password: '', remember: false });
            }}
            className="mt-6 text-sm text-center cursor-pointer text-red-300 hover:text-red-400 hover:underline"
          >
            {isSignin
              ? "New to E-Menu? Create an account"
              : "Already have an account? Sign In"}
          </p> */}
        </form>
      </div>
    </div>
  );
}

export default Login;
