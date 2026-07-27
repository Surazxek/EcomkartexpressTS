import { Link } from "react-router";
import RegisterForm from "../components/forms/auth/register-form";


const Register = () => {
  return (
    <main className=" h-full flex flex-col items-center justify-center p-3 tracking-wider ">
      <div className="border  border-green-600 w-[min(100%,500px)] lg:w-[main(100%,500px)] px-4 py-6 rounded-md ">
        {/* Login Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-850 mb-6">
          Register
        </h1>

        <div>
          <RegisterForm />
        </div>

        <div className="mt-3 text-center">
          <p>
            Already have an account?
          <Link to={'/login'}>
            <span className="text-green-800 font-bold"> Sign In</span>
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
