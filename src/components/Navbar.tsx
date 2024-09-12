import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { FaSearch } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2 mr-8">
          <img
            onClick={() => navigate(-1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_left}
            alt=""
          />
          <img
            onClick={() => navigate(1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_right}
            alt=""
          />
        </div>
        <div className="relative flex flex-row items-center gap-4">
          <form role="search" className="relative" action="">
            <div className="h-[36px] absolute top-[10px] left-4 flex">
              <FaSearch className="text-lg" />
            </div>
            <div className="">
              <input
                className="w-[24vw] h-[36px] bg-[#1f1f1f] rounded-full px-10"
                type="text"
              />
            </div>
            <div className="h-[36px] absolute top-[10px] right-4  flex flex-end">
              <FaBoxArchive className="text-lg" />
            </div>
          </form>
        </div>
        <div className="flex items-center gap-4">
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Explore Premium
          </p>
          <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer">
            Install App
          </p>
          <p className="bg-purple-500 text-black p-4 w-10 h-10 rounded-full flex items-center justify-center border-4 border-opacity-50">
            D
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">
          All
        </p>
        <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer">Music</p>
        <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer">Podcast</p>
      </div>
    </>
  );
};

export default Navbar;
