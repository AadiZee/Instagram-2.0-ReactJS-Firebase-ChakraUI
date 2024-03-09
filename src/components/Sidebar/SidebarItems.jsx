import CreatePost from "./CreatePost";
import Home from "./Home";
import Notifications from "./Notifications";
import Search from "./Search";
import Profile from "./Profile";

const SidebarItems = () => {
  return (
    <>
      <Home />
      <Search />
      <Notifications />
      <CreatePost />
      <Profile />
    </>
  );
};

export default SidebarItems;
