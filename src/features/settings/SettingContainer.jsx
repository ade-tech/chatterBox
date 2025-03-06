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
        <p className="mx-auto text-center dark:text-white">
          {isLoading ? "Loading..." : "Updating..."}
        </p>
      )}
      <div className="Profile mb-8">
        <h1 className="dark:text-accent-light mb-3 text-2xl font-medium">
          Privacy
        </h1>
        <div className="dark:bg-bg-dark flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-2.5">
          <p className="text-sm text-gray-600 dark:text-white">
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
        <h1 className="dark:text-accent-light mb-3 text-2xl font-medium">
          Notifications
        </h1>
        <div className="dark:bg-bg-dark flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-2.5">
          <p className="text-sm text-gray-600 dark:text-white">
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
        <h1 className="dark:text-accent-light mb-3 text-2xl font-medium">
          Advanced
        </h1>

        <button className="mt-3 ml-1 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 focus:outline-0 dark:bg-red-900/30">
          Delete my Account
        </button>
      </div>
    </div>
  );
}

export default SettingContainer;
