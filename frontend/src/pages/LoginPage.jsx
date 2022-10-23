import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/auth/login";
      const { data: res } = await axios.post(url, data);
      if (res) {
        navigation("/home");
        localStorage.setItem("token", res.token);
      } else {
        console.log("error");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col w-96 gap-2 bg-gray-100 p-12 rounded-lg shadow-lg">
        <h1 className="font-sans text-2xl  font-thin">
          {" "}
          Welcome To Music Player{" "}
        </h1>
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
          className="border-2 px-4 py-2 border-gray-300 p-2 rounded-lg my-2"
        />
        <button
          onClick={handleSubmit}
          className="bg-orange-500 text-white p-2 rounded-lg my-2 hover:bg-orange-600"
        >
          Login
        </button>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" placeholder="remember me" />
            <span className="text-md">Remember me!</span>
          </div>
          <div>
            <span className="text-gray-800 hover:text-gray-900 ml-2">
              Forgot Password?
            </span>
          </div>
        </div>

        <p className="font-semibold text-gray-800 ">
          Are you new here?{" "}
          <Link to="/register">
            <span className="text-black">Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
