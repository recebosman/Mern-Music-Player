import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/auth/register";
      const { data: res } = await axios.post(url, data);
      console.log(res);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-96 gap-2 bg-white p-12 rounded-lg shadow-lg">
          <h1 className="font-sans text-2xl font-thin">
            {" "}
            Welcome To Music Player{" "}
          </h1>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setData({ ...data, username: e.target.value })}
            value={data.username}
            className="border-2 px-4 py-2 border-gray-300 p-2 rounded-lg my-2"
          />
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            value={data.email}
            className="border-2 px-4 py-2 border-gray-300 p-2 rounded-lg my-2"
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            value={data.password}
            className="border-2 border-gray-300 p-2 rounded-lg my-2"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white p-2 rounded-lg my-2 hover:bg-orange-600"
          >
            Register
          </button>

          <p className="font-semibold text-gray-800">
            Are you new here?{" "}
            <Link to="/login">
              <span className="text-black">Login</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
