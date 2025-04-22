const signupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300/40 backdrop-blur-sm mt-1">
      <form className="relative bg-blue-600/40 p-8 rounded-md shadow-md w-full max-w-md h-[470px] flex flex-col justify-center space-y-6">
        <img
          src="/masterball.png"
          alt="masterball"
          className="w-10 h-10 mx-auto mb-4 borer rounded-md ml-2 mt-1"
        />
        <img
          src="/pokemongca.png"
          alt="pokemongca"
          className="w-50 h-30 mx-auto mb-1 -mt-26"
        />
        <h1 className="text-xl font-bold mb-2 ">Next Pokedex</h1>
        <h2 className="text-lg font-bold mb-4">Sign up</h2>
        <button
          type="button"
          className="text-sm w-fit self-end px-3 py-1 text-white rounded transition-all duration-300 ease-in-out hover:-translate-y-1 active:scale-95 mb-1 cursor-pointer"
        >
          Forgot password?
        </button>
        <input
          type="email"
          placeholder="Email/Username"
          className="w-full mb-3 px-3 py-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-3 py-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Re-enter Password"
          className="w-full mb-4 px-3 py-2 border rounded-md"
        />
        <button
          type="button"
          className="w-full bg-blue-800 text-white py-2 rounded shadow-md transition-all duration-300 ease-in-out hover:bg-green-600 hover:-translate-y-1 hover:shadow-lg active:scale-95 cursor-pointer"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default signupPage;
