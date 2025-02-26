import ToggleButton from "../../ui/ToggleButton";

function SettingContainer() {
  return (
    <div className="mt-8">
      <div className="Profile mb-8">
        <h1 className="text-2xl font-medium mb-3 dark:text-accent-light">
          Privacy
        </h1>
        <div className="w-full bg-gray-100 py-2.5 rounded-lg px-4 dark:bg-bg-dark flex justify-between items-center">
          <p className="text-gray-600 text-sm dark:text-white">
            Eveyone see that your online status
          </p>
          <ToggleButton />
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
          <ToggleButton />
        </div>
      </div>
      <div className="Profile">
        <h1 className="text-2xl font-medium mb-3 dark:text-accent-light">
          Advanced
        </h1>
        <div className="w-full mb-4 bg-gray-100 py-2.5 rounded-lg px-4 dark:bg-bg-dark flex justify-between items-center">
          <p className="text-gray-600 text-sm dark:text-white">
            adel*****e@gmail.com
          </p>
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
