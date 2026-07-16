import { Link } from "react-router";
import LoginForm from "../components/forms/auth/login-form";

const Login = () => {
  return (
    <main className=" h-full flex flex-col items-center justify-center p-3 tracking-wider ">
      <div className="border  border-blue-500 w-[min(100%,500px)] lg:w-[main(100%,500px)] px-4 py-6 rounded-md">
        {/* Login Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-850 mb-6">
          Login
        </h1>

        <div>
          <LoginForm />
        </div>

        <div className="mt-3 text-center">
          <p>
            Doesn't have an account ?
            <Link to={"/register"}>
              <span className="text-indigo-700 font-bold"> Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
