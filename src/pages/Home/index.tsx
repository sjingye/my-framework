import React, { FC } from "react";
import mountainPic from "../../asset/img/mountain-pic.jpg";
import "./index.scss";

const Home: FC = () => {
  return (
    <div className="home">
      <p className="text">测试图片loader</p>
      <img className="img" src={mountainPic} />
    </div>
  );
};

export default Home;
