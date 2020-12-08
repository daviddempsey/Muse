import React from "react";

import DefaultLayout from "../DefaultLayout";
import FriendsContent from "./FriendsContent";
import { withRouter } from "react-router-dom";

const FriendsPage = () => {
  return (
    <DefaultLayout>
      <FriendsContent />
    </DefaultLayout>
  );
};

export default withRouter(FriendsPage);
