import SettingContainer from "../features/settings/SettingContainer";
import Heading from "../ui/Heading";

function Settings() {
  return (
    <div className="h-[100dvh] w-full px-4 pt-6">
      <Heading>App Settings</Heading>
      <SettingContainer />
    </div>
  );
}

export default Settings;
