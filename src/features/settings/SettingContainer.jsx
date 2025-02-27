import { UseCurrentUserData } from "../../contexts/CurrentUserContext";
import ToggleButton from "../../ui/ToggleButton";
import { useUpdateUser, useUserSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";

function SettingContainer() {
  const { user_id, user_email } = UseCurrentUserData();
  const { data, isLoading } = useUserSettings(user_id);
  const { updateUser, isUpdatingSttings } = useUpdateUser();
  const [username, domain] =
    typeof user_email === "string"
      ? user_email.split("@")
      : ["Invalid", "email"];
  if (isLoading) return <Spinner />;

  console.log(data);
  return (
    <div className="mt-8">
      {isLoading && isUpdatingSttings && (
        <p className="text-center mx-auto dark:text-white">
          {isLoading ? "Loading..." : "Updating..."}
        </p>
      )}
      <div className="Profile mb-8">
        <h1 className="text-2xl font-medium mb-3 dark:text-accent-light">
          Privacy
        </h1>
        <div className="w-full bg-gray-100 py-2.5 rounded-lg px-4 dark:bg-bg-dark flex justify-between items-center">
          <p className="text-gray-600 text-sm dark:text-white">
            Nobody see that your online status
          </p>
          <ToggleButton
            id={user_id}
            field="isPrivate"
            updating={isUpdatingSttings}
            defaultState={data?.at(0)?.isPrivate}
            clickAction={updateUser}
          />
        </div>
      </div>
      <div className="Profile mb-24">
        <h1 className="text-2xl font-medium mb-3 dark:text-accent-light">
          Notifications
        </h1>
        <div className="w-full bg-gray-100 py-2.5 rounded-lg px-4 dark:bg-bg-dark flex justify-between items-center">
          <p className="text-gray-600 text-sm dark:text-white">
            Receive notifications
          </p>
          <ToggleButton
            id={user_id}
            updating={isUpdatingSttings}
            field="enable_Notification"
            defaultState={data?.at(0)?.enable_Notification}
            clickAction={updateUser}
          />
        </div>
      </div>
      <div className="Profile">
        <h1 className="text-2xl font-medium mb-3 dark:text-accent-light">
          Advanced
        </h1>
        <div className="w-full mb-4 bg-gray-100 py-2.5 rounded-lg px-4 dark:bg-bg-dark flex justify-between items-center">
          {isLoading && (
            <div className="w-52 h-6 animate-pulse bg-gray-200 duration-300 dark:bg-surface-dark"></div>
          )}
          {!isLoading && (
            <p className="text-gray-600 text-sm dark:text-white">{`${username.slice(
              0,
              3
            )}****${username.slice(-1)}@${domain}`}</p>
          )}
          <button className="text-sm text-red-600 cursor-pointer focus:outline-0">
            Change my Email
          </button>
        </div>
        <button className="ml-1 mt-3 text-sm font-semibold dark:bg-red-900/30  text-red-600 bg-red-100 py-2 px-4 rounded-full focus:outline-0">
          Delete my Account
        </button>
      </div>
    </div>
  );
}

export default SettingContainer;
