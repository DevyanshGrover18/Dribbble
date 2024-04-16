import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
require('dotenv').config();

const Signup = () => {
  const BASE_URL = process.env.BASE_URL
  const [Check, setCheck] = useState(false);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/newuser`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseJson = await response.json();
        console.log(responseJson);

        navigate(`/createuser?username=${credentials.username}`);
      } else {
        console.error("Error:", response.statusText);
        alert("Error creating user");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setCredentials({
      name: "",
      username: "",
      email: "",
      password: "",
    });
  };


  return (
    <div>
        <div className="main h-[100vh] flex">
          <div className="left w-1/3 h-full overflow-hidden bg-[#f2d083]">
            <div className="h-1/3  p-10">
              <img src="dribblelogo.png" alt="" className="w-28" />
              <h1 className="text-3xl my-4 font-bold text-[#8b671c]">
                Discover the world's top Designers & Creatives.
              </h1>
            </div>
            <div className="h-1/2">
              <img
                src="https://cdn.dribbble.com/users/76454/screenshots/6592185/001_4x.png?resize=768x576&vertical=center"
                alt=""
                className="h-[65vh] min-w-[45vw] relative right-24 bottom-5"
              />
            </div>
          </div>
          <div className="right w-2/3">
            <div className="text-end p-4">
              Already a member?{" "}
              <Link to="/login" className="text-blue-600 font-semibold">
                Sign In
              </Link>
            </div>
            <div className="mx-28 px-28">
              <h1 className="text-3xl font-bold my-4">Sign Up To Dribbble</h1>
              <div className="flex gap-3 w-full my-6">
                <div className="w-1/2">
                  <h1 className="font-bold">Name</h1>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    className="bg-zinc-100 rounded w-full h-8"
                  />
                </div>
                <div className="w-1/2">
                  <h1 className="font-bold">Username</h1>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="username"
                    className="bg-zinc-100 rounded w-full h-8"
                  />
                </div>
              </div>
              <div className="my-5">
                <h1 className="font-bold">Email</h1>
                <input
                  onChange={handleChange}
                  type="email"
                  placeholder="example@example.com"
                  name="email"
                  className="bg-zinc-100 rounded w-full h-8 px-2"
                />
              </div>
              <div className="my-5">
                <h1 className="font-bold">Password</h1>
                <input
                  onChange={handleChange}
                  type="password"
                  placeholder="6+ characters"
                  name="password"
                  className="bg-zinc-100 rounded w-full h-8 px-2"
                />
              </div>
              <div className="flex items-start gap-3 my-5 p-2">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onClick={() => setCheck(!Check)}
                />
                <h1 className="text-sm">
                  Creating an account means you're okay with our{" "}
                  <Link className="text-blue-600">
                    Terms of Services, Privacy policy
                  </Link>{" "}
                  and our default{" "}
                  <Link className="text-blue-600">Notification Settings.</Link>
                </h1>
              </div>
              <button
                disabled={!Check}
                className="bg-[#ea4b8b] p-2 px-6 text-white rounded disabled:bg-[#f59cbf]"
                onClick={handleClick}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Signup;
