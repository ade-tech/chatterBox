import ChatPreloader from "../../ui/ChatPreloader";
import { useAllUsers } from "./UseAllUsers";
import UserItem from "./UserItem";

/**
 * UserList component for displaying a list of users.
 * @returns {JSX.Element} The UserList component.
 */
function UserList() {
  const { data, error, isLoading: isFetchingUser } = useAllUsers();

  if (isFetchingUser) return <ChatPreloader />;

  if (error) return <h1> Could not get Users</h1>;
  return (
    <ul className="flex-grow pr-2 overflow-hidden overflow-y-scroll scrollbar-custom">
      {data.map((curUser) => (
        <UserItem user={curUser} key={curUser.id} />
      ))}
    </ul>
  );
}

export default UserList;
