import ProfileContainer from "../features/profile/ProfileContainer";
import Logout from "../ui/Logout";
function Profile() {
  return (
    <div className="h-full w-full flex flex-col items-center pt-12">
      <ProfileContainer />
      <Logout type="long" />
    </div>
  );
}

export default Profile;
