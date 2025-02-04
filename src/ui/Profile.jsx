import { Link } from "react-router-dom";

function ProfileImage({ width = "w-12", height = "h-12", image }) {
  return (
    <Link to="profile">
      <img
        className={`block rounded-[50%] object-cover object-center ${width} ${height}`}
        src={`${image ? `/${image}` : "/default-user.jpg"}`}
      />
    </Link>
  );
}

export default ProfileImage;
