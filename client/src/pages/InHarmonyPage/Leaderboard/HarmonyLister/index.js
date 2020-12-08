import React from "react";
import ComparedUser from "../ComparedUser";

const HarmonyLister = ({ harmonyList }) =>
  Object.keys(harmonyList).map((item, i) => (
    <li key={i}>
      <ComparedUser
        compEmail={harmonyList[item].email}
        compOverall={(harmonyList[item].compatibility_score * 100).toFixed(2)}
      />
    </li>
  ));

export default HarmonyLister;
