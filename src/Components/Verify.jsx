import React, { useEffect, useState } from "react";
import Footer from "./Footer";



const Verify = () => {
  const [username, setUsername] = useState("");
  const [usersData, setUsersData] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const usernameParam = params.get("username");

    if (usernameParam) {
      setUsername(usernameParam);
    }
  }, []);

  const sendEmail = async (emailAddress) => {
    try {
        const emailData = {
            from: 'Acme <onboarding@resend.dev>',
            to: emailAddress,
            subject: 'Verify You Email',
            html: '<h1>Verify Your Email</h1><br><h2>Click on the link below to verify</h2><br><a href="#"><h3>Link</h3></a>',
        };
        
        console.log("Sending email with data:", emailData);
        
        const response = await fetch('http://localhost:5000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log("Email sent successfully:", data);
        } else {
            console.error("Error:", response.statusText);
        }
    } catch (error) {
        console.error("Error sending email:", error.message);
    }
};

useEffect(() => {
    if (usersData.email) {
        sendEmail(usersData.email);
        console.log(usersData.email)
    }
}, [usersData.email]);
  
  

  const fetchUserData = async (username) => {
    try {
      // Fetch user data using the username parameter
      const response = await fetch(`http://localhost:5000/api/verify/${username}`);
        
      if (response.ok) {
        const userData = await response.json();
        
        // Check if email exists before sending
        if (userData.email) {
          setUsersData(userData);
          sendEmail();
        }
        
        return userData;
      } else {
        console.error("Error:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };
  

  useEffect(() => {
    fetchUserData(username);
  }, [username]);
  return (
    <div>
      <div>
        <nav className="p-2 flex justify-between items-center">
          <ul className="flex gap-7 font-semibold text-zinc-500 text-sm">
            <li>
              <img src="dribblelogo.png" alt="" className="w-24" />
            </li>
            <li>Inspiration</li>
            <li>Find Work</li>
            <li>Learn Design</li>
            <li>Go Pro</li>
            <li>Hire Designers</li>
          </ul>
          <div className="flex items-center gap-4 ">
            <div className="flex bg-zinc-200 rounded p-1 px-2 gap-2">
              <span class="material-symbols-outlined text-zinc-500">
                search
              </span>
              <input
                type="search"
                name="search"
                id=""
                className="bg-zinc-200 rounded w-20"
                placeholder="Search"
              />
            </div>
            <span class="material-symbols-outlined">shopping_bag</span>
            <img src={`http://localhost:5000${usersData.img}`} alt="" className="w-10 h-10 rounded-full" />
            <button className="bg-[#ea4b8b] p-2 text-white my-2 rounded-lg">
              Upload
            </button>
          </div>
        </nav>
        <hr />
      </div>
      <div className="text-center mx-40 p-20 px-36">
        <h1 className="text-3xl font-bold my-3">Please verify your Email...</h1>
        <span class="material-symbols-outlined text-9xl text-zinc-400">
          mark_email_read
        </span>
        <h2 className="text-zinc-500 font-semibold my-3">
          Please verfy your email address. We've sent a confirmation email to:
        </h2>
        <h1 className="font-bold">{usersData.email}</h1>
        <h2 className="text-zinc-500 font-semibold my-3">
          Click the confiration link in that email to begin using Dribbble.
        </h2>
        <h2 className="text-zinc-500 font-semibold my-3">
          Didn't receive the email? Check the Spam folder, it may be caught by a
          filter. If you still don't see it, you can{" "}
          <span className="text-[#ea4b8b]">Resend the confirmation email.</span>
        </h2>
        <h2 className="text-zinc-500 font-semibold my-3">
          Wrong email address?{" "}
          <span className="text-[#ea4b8b]">Change it.</span>
        </h2>
      </div>
      <Footer />
    </div>
  );
};

export default Verify;
