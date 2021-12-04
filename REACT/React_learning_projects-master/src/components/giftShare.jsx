import React from "react";
import Data from "../all_Data/giftShareData.json";

const GiftShare = () => {
  const tableHeader = ({ header }) => {
    let k = 1;
    return (
      <thead><tr>
        {header.map((item) => {
          k += 1;
          return <th key={`thCell_${k}`}>{item}</th>;
        })}
      </tr></thead>
    );
  };

  const tableBody = ({ giftInfo }) => {
    let k = 1;
    return (
      <tbody>
        {giftInfo.map((item) => {
          k += 1;
          let l = 1;
          return (
            <tr key={`trData_${k}`}>
              {Object.keys(item).map((itm) => {
                l += 1;
                return <td key={`tdCell_${k}${l}`}>{item[itm]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <table>
      {tableHeader(Data)}
      {tableBody(Data)}
    </table>
  );
};
export default GiftShare;
