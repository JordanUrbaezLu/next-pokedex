
const LoginPage = () => {

    return (
  <div className="min-h-screen flex items-center justify-center bg-gray-300/40 backdrop-blur-sm mt-1">
        <form
   
    className="bg-blue-300/40 p-6 rounded-md shadow-md w-100 h-90 text-center"
  >
    <h1 className="text-xl font-bold mb-2 ">Next Pokedex</h1>
    <h2 className="text-lg font-bold mb-4">Login</h2>
    <input
      type="email"
      placeholder="Email/Username"
      className="w-full mb-3 px-3 py-2 border rounded-md "
    />
    <input
      type="password"
      placeholder="Password"
      className="w-full mb-4 px-3 py-2 border rounded-md"
    />
    <button
      type="submit"
      className="w-full bg-red-500 text-white py-2 rounded shadow-md transition-all duration-300 ease-in-out hover:bg-green-600 hover:-translate-y-1 hover:shadow-lg active:scale-95 cursor-pointer"
    >
      Login
    </button>
  </form>
      </div>
    );
  };
  
  export default LoginPage;