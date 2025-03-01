import { Link } from "react-router-dom";

function ProfileImage({
  width = "w-10 md:w-12",
  height = "h-10 md:h-12",
  image,
  styles,
  type = "link",
}) {
  if (type === "image")
    return (
      <div>
        <img
          className={`block rounded-[50%] object-cover object-center ${width} ${height} ${styles}`}
          src={`${image && image !== undefined ? image : "/default-user.jpg"}`}
        />
      </div>
    );
  if (type === "link")
    return (
      <Link to="profile">
        <img
          className={`block rounded-[50%] object-cover object-center ${width} ${height} ${styles}`}
          src={`${image ? image : "/default-user.jpg"}`}
        />
      </Link>
    );
}

export default ProfileImage;
