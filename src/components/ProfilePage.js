import { selectUser } from "../store/user/userSlice";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector(selectUser);
  return (
    <>
      <h1>Welcome back! {user.email}</h1>
    </>
  );
};

export default ProfilePage;
