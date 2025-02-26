import SettingContainer from "../features/settings/SettingContainer";
import Heading from "../ui/Heading";

function Settings() {
  return (
    <div className="h-full w-full pt-6 px-4">
      <Heading>App Settings</Heading>
      <SettingContainer />
    </div>
  );
}

export default Settings;
