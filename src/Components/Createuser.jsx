import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Createuser = () => {
  const [File, setFile] = useState("");
  const [imgTF, setimgTF] = useState(false);
  const [Location, setLocation] = useState("");
  const [Image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const usernameParam = params.get('username');

    if (usernameParam) {
        setUsername(usernameParam);
        console.log("Username from Signup:", usernameParam);
    }
}, [location]);

  const imgPreview = () => {
    const reader = new FileReader();

    if (File) {
      reader.readAsDataURL(File);
    }

    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  useEffect(() => {
    if (File && File instanceof Blob) {
      imgPreview();
    }
  }, [File]);

  // useEffect(() => {
  //   console.log(Image)
  // }, [Image])

  const handleClick = async (e) => {
      e.preventDefault();

      try {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("img", File); // image file
        formData.append("location", Location);

        const response = await fetch("http://localhost:5000/api/newuser/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const responseData = await response.json();
          if (responseData.success) {
            navigate(`/next?username=${username}`);
          } else {
            console.error("Error creating user");
          }
        } else {
          console.error("Server error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
  };

  const handleImgChange = (e) => {
    let img = e.target.files[0];
    if (img) {
      setFile(img);
      setimgTF(true);
      imgPreview();
    } else {
      console.log("No file selected");
    }
  };

  const handleLocChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div>
      <div className="w-full p-5">
        <img src="dribblelogo.png" alt="" className="w-24" />
      </div>
      <div className="mx-52 px-52">
        <h1 className="text-3xl font-bold my-5">
          Welcome! Let's create your profile
        </h1>
        <p className="text-zinc-500 my-5">
          Let others get to know you better! You can do this later
        </p>
        <h1 className="font-bold my-3">Add an Avatar</h1>
        <div className="flex gap-5">
          <div className="rounded-full w-48 h-48 flex items-center justify-center overflow-hidden border-2 border-dashed">
            {imgTF ? (
              <img src={Image} alt="" className="h-full w-full" />
            ) : (
              <span class="material-symbols-outlined text-zinc-400">
                add_a_photo
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="imageFile"
              className="border-2 p-1 px-2 text-center rounded-lg m-2 hover:cursor-pointer"
            >
              Choose Image
            </label>
            <input
              type="file"
              name="image"
              id="imageFile"
              required
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
              onChange={handleImgChange}
            />
            <p className="flex items-center text-zinc-400 my-3">
              <span class="material-symbols-outlined">chevron_right</span>Or
              choose one of our defaults
            </p>
          </div>
        </div>
        <div>
          <h1 className="font-bold my-5">Add your location</h1>
          <input
            value={Location}
            onChange={handleLocChange}
            type="text"
            placeholder="Enter a location"
            name="location"
            id=""
            className="w-full"
          />
          <hr />
        </div>
        <button
          type="submit"
          disabled={!imgTF || !Location}
          className="bg-[#ea4b8b] p-2 px-20 text-white rounded my-5 disabled:bg-[#f59cbf]"
          onClick={handleClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Createuser;
