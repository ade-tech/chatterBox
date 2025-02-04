import { HiOutlinePencil } from "react-icons/hi";
import ProfileImage from "../../ui/Profile";

function ProfileContainer() {
  return (
    <div className="w-full flex items-center flex-col">
      <ProfileImage width="w-24" height="h-24" styles="mt-8 mb-5" />
      <h1 className="text-xl font-semibold dark:text-accent-light">
        Adelopo Abdullah Adekunle
      </h1>
      <p className="text-gray-500 dark:text-accent-dark">@g63_abdone</p>
      <button className="cursor-pointer flex items-center mt-6 bg-primary-light text-white px-4 py-2 rounded-full">
        <HiOutlinePencil className="mr-1.5 " /> Edit Profile
      </button>
      <div className="w-full mt-8 flex flex-col justify items-center">
        <div className="mb-6 w-3/4">
          <p className="self-start my-2  text-gray-500 dark:text-accent-dark">
            Bio
          </p>
          <p className="self-start dark:text-accent-light">
            I am using ChatterBox by Abdone
          </p>
        </div>
        <div className="mb-6 w-3/4">
          <p className="self-start my-2 dark:text-accent-dark text-gray-500">
            Phone Number
          </p>
          <p className="self-start dark:text-accent-light">
            <span className="opacity-50">+234 </span>- 904 - 1976 - 6621
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileContainer;
