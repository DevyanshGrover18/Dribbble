import React from "react";

const Navbar = () => {
  return (
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
            <span class="material-symbols-outlined text-zinc-500">search</span>
            <input type="search" name="search" id="" className="bg-zinc-200 rounded w-20" placeholder="Search"/>
          </div>
          <span class="material-symbols-outlined">shopping_bag</span>
          <span class="material-symbols-outlined">face</span>
          <button className="bg-[#ea4b8b] p-2 text-white my-2 rounded-lg">
            Upload
          </button>
        </div>
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
