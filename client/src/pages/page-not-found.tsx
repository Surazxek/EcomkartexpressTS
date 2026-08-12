import { Link } from "react-router"

const NotFound = () => {
  return (
    <main className="flex justify-center items-center h-screen bg-gray-50">
      <div className="h-[400px] w-[400px] border-red-600 rounded-lg shadow-lg flex flex-col items-center justify-center p-6">
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">OOOPS!</h1>
        <h2 className="text-2xl text-teal-700 mb-6">Page Not Found</h2>

        <p className="text-gray-600 mt-5 text-center">The Page which you are looking for is not found </p>

        <Link to="/" className="w-[200px]">
          <button className=" mt-7 w-full rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-700">
            Go To Home
          </button>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
