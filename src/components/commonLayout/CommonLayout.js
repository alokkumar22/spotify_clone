import Player from "./player/Player";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";

const CommonLayout = () => {
  return (
    <>
      <Header/>
      <Sidebar />
      <Player />
    </>
  );
};

export default CommonLayout;
