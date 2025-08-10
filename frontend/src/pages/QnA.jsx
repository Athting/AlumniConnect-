import React from "react";
import { QnAForum } from "../components/sections";

const QnA = ({ darkMode }) => {
  return (
    <div className="pt-20">
      <QnAForum darkMode={darkMode} />
    </div>
  );
};

export default QnA;
