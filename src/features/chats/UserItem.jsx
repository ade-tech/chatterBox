import ProfileImage from "../../ui/Profile";

function UserItem({ user }) {
  const user_id = user.user_id;
  return (
    <li className="px-2 py-1 flex gap-3 items-center  cursor-pointer hover:dark:bg-surface-dark hover:bg-gray-100 transition-all duration-500  rounded-md">
      <ProfileImage width="w-10" height="h-10" image={user.avatar_url} />
      <div className="flex-grow h-full flex flex-col justify-center border-b border-b-gray-100 py-2 dark:border-b-bg-dark">
        <h1 className="p-0 leading-4 font-bold dark:text-white">
          {user.fullName}
        </h1>
        <p className="p-0 m-0 text-xs text-gray-500">{user.bio}</p>
      </div>
    </li>
  );
}

export default UserItem;
