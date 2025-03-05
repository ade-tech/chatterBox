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
    <ul className="scrollbar-custom flex-grow overflow-hidden overflow-y-scroll pr-2">
      {data.map((curUser) => (
        <UserItem user={curUser} key={curUser.id} />
      ))}
    </ul>
  );
}

export default UserList;
