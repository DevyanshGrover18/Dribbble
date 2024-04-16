import React from "react";
import "./Next.css";
import { useState , useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Next = () => {
  const [first, setfirst] = useState(false);
  const [Second, setSecond] = useState(false);
  const [Three, setThree] = useState(false);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const usernameParam = params.get('username');

    if (usernameParam) {
        setUsername(usernameParam);
        console.log("Username from Signup:", usernameParam);
    }
}, []);
  const handlePrev = () => {
    navigate("/createuser");
  };
  const handleClick = () => {
    navigate(`/verify?username=${username}`);
  };

  const handleThree = () => {
    setThree(!Three);
  };
  const handleFirst = () => {
    setfirst(!first);
  };
  const handleTwo = () => {
    setSecond(!Second);
  };

  const disableFunc = ()=>{
    if(!first && !Second && !Three){
      return true
    }
    else{
      return false
    }
  }
  return (
    <div>
      <div className="p-5 flex gap-5">
        <img src="dribblelogo.png" alt="" className="w-24" />
        <span
          class="material-symbols-outlined bg-zinc-200 rounded hover:cursor-pointer"
          onClick={handlePrev}
        >
          chevron_left
        </span>
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold my-5">
          What brings you to Dribbble?
        </h1>
        <p className="text-zinc-500 my-5">
          Select the options that best describes you. Don't worry, you can
          explore other options later.
        </p>
        <div className="flex justify-evenly gap-3 p-10 mx-28 ">
          <div className="">
            <div
              className={
                first
                  ? "w-[20vw] p-4 border-2 border-[#ea4b8b] h-[300px] rounded-xl relative "
                  : "w-[20vw] p-4 border-2 border-zinc-200 h-[300px] rounded-xl relative"
              }
            >
              <img
                src="1.jpeg"
                alt=""
                className={
                  first ? "h-40 mx-auto relative bottom-20" : "h-40 mx-auto"
                }
              />
              <h1
                className={
                  first
                    ? "text-xl font-bold relative bottom-20"
                    : "text-xl font-bold"
                }
              >
                I'm a designer looking to share my work
              </h1>
              <p className={first ? "relative bottom-20" : "hidden"}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis
                quasi voluptates nihil, inventore veniam impedit.
              </p>
              <div class="container flex justify-center my-2">
                <div class="round absolute bottom-3">
                  <input type="checkbox" id="checkbox1" onClick={handleFirst} />
                  <label for="checkbox1"></label>
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              Second
                ? "w-[20vw] p-4 border-2 border-[#ea4b8b] h-[300px] rounded-xl relative "
                : "w-[20vw] p-4 border-2 border-zinc-200 h-[300px] rounded-xl relative"
            }
          >
            <img
              src="2.jpeg"
              alt=""
              className={
                Second ? "h-40 mx-auto relative bottom-20" : "h-40 mx-auto"
              }
            />
            <h1
              className={
                Second
                  ? "text-xl font-bold relative bottom-20"
                  : "text-xl font-bold"
              }
            >
              I'm looking to hire a <br />
              designer
            </h1>
            <p className={Second ? "relative bottom-20" : "hidden"}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis
              quasi voluptates nihil, inventore veniam impedit.
            </p>
            <div class="container flex justify-center my-2">
              <div class="round absolute bottom-3">
                <input type="checkbox" id="checkbox2" onClick={handleTwo} />
                <label for="checkbox2"></label>
              </div>
            </div>
          </div>
          <div
            className={
              Three
                ? "w-[20vw] p-4 border-2 border-[#ea4b8b] h-[300px] rounded-xl relative "
                : "w-[20vw] p-4 border-2 border-zinc-200 h-[300px] rounded-xl relative"
            }
          >
            <img
              src="3.jpeg"
              alt=""
              className={
                Three ? "h-40 mx-auto relative bottom-20" : "h-40 mx-auto"
              }
            />
            <h1
              className={
                Three
                  ? "text-xl font-bold relative bottom-20"
                  : "text-xl font-bold"
              }
            >
              I'm looking for design inspiration
            </h1>
            <p className={Three ? "relative bottom-20" : "hidden"}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis
              quasi voluptates nihil, inventore veniam impedit.
            </p>
            <div class="container flex justify-center my-2">
              <div class="round absolute bottom-3">
                <input type="checkbox" id="checkbox3" onClick={handleThree} />
                <label for="checkbox3"></label>
              </div>
            </div>
          </div>
        </div>
        <div>
          {!disableFunc()?<h1 className="font-bold">Anything else? You ca select multiple.</h1>:""}
          <button
            disabled={disableFunc()}
            className="bg-[#ea4b8b] p-2 px-20 text-white my-2 rounded-lg disabled:bg-[#f59cbf]"
            onClick={handleClick}
          >
            Finish
          </button>
          <p className="text-zinc-400">or Press RETURN</p>
        </div>
      </div>
    </div>
  );
};

export default Next;
