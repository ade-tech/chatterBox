import { HiOutlinePencil } from "react-icons/hi";
import ProfileImage from "../../ui/Profile";
import FormInput from "../../ui/FormInput";
import Button from "../../ui/Button";
import { useState } from "react";

function ProfileContainer() {
  const [isEditting, setIsEditting] = useState(false);
  return (
    <div className="w-full flex items-center flex-col">
      <ProfileImage width="w-24" height="h-24" styles="mt-8 mb-5" />
      <h1 className="text-xl font-semibold dark:text-accent-light">
        Adelopo Abdullah Adekunle
      </h1>
      <p className="text-gray-500 dark:text-accent-dark">@g63_abdone</p>
      {!isEditting && (
        <button
          onClick={() => setIsEditting((editstate) => !editstate)}
          className="cursor-pointer flex items-center mt-6 bg-primary-light text-white px-4 py-2 rounded-full"
        >
          <HiOutlinePencil className="mr-1.5 " /> Edit Profile
        </button>
      )}

      <form className="w-full mt-8 flex flex-col justify items-center">
        <div className="w-3/4">
          <FormInput
            label="Bio"
            placeHolder="I am using ChatterBox by Abdone"
            disabled
          />
        </div>
        <div className=" w-3/4">
          <FormInput
            label="Phone Number"
            placeHolder="090 - 419 -7626 -21"
            disabled
          />
        </div>
        {isEditting && <Button name="Save Edits" styles="w-1/4 px-4 py-2" />}
      </form>
    </div>
  );
}

export default ProfileContainer;
