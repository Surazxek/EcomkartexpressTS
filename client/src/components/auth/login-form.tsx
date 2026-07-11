const LoginForm = () => {
  return (
    <div>
      <form className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          {/* email */}
          <div className="flex flex-col gap-1">
            <label
            className="text-lg font-bold text-gray-750 " 
            htmlFor="email">Email</label>
            <input
              className="border border-indigo-600 p-3 rounded-md placeholder:text-lg text-lg focus:outline-indigo-500"
              placeholder="Johndoe@gmail.com"
              type={"email"}
              name={"email"}
              id={"email"}
            />
          </div>

          {/* passowrd */}

          <div className="flex flex-col gap-1">
            <label
             className="text-lg font-bold text-gray-750 "  
             htmlFor="passowrd">Passowrd</label>
            <input
              className="border border-indigo-600 p-3 rounded-md placeholder:text-lg text-lg focus:outline-indigo-500"
              placeholder="*********"
              type={"password"}
              name={"password"}
              id={"password"}
            />
          </div>
        </div>

        <button
        className="bg-indigo-500 w-full p-3 rounded-md font-bold text-white text-lg cursor-pointer hover:bg-indigo-600 transition-all duration-300" 
        type="submit"
        >Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
