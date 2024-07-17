import { FaTwitter } from "react-icons/fa";
import { useRouter } from "next/router";
import { FaPhoenixFramework } from "react-icons/fa";

const SidebarLogo = () => {
  const router = useRouter();
  const handleOnClick = () => {
    router.push("/");
  };
  return (
    <div
      className="text-gray-300 hover:text-white cursor-pointer mx-1 hover:bg-neutral-800 hover:bg-opacity-70 rounded-full transition duration-200 w-fit p-3"
      onClick={handleOnClick}
    >
      <FaPhoenixFramework size={50} color="#00ffff" />
    </div>
  );
};

export default SidebarLogo;
