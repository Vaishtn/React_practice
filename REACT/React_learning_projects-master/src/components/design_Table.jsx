import React from "react";
// import PropTypes from 'prop-types'
import Data from "../all_Data/design_TableData.json";

const DesignTable = () => {
  const tHeader = (tableHeading) => {
    let key = 1;
    return (
      <thead>
        <tr key="design_cell_key" className="design_head">
          {Object.keys(tableHeading).map(item => {
            key++;
            return <th key={`tableHeader_${key}`} className={tableHeading[item] ? "header_cell" : "header_cell empty_cell"}>{tableHeading[item]}</th>
          })}
        </tr>
      </thead>
    );
  };

  const checkData = (item, data) => {
    const icon = data[item] ? <i className="fa fa-check-circle" aria-hidden="true"></i> : "--";
    const content = typeof data[item] === "boolean" ? icon : data[item];
    return content;
  }

  const tabelCellData = (data, key) => {
    let k = 1;
    return Object.keys(data).map((itm) => {
      k++;
      return (<td key = {`tdKey_${key}${k}`} className="design_cell">{checkData(itm, data)}</td>
    )});
  }

  const tBody = (data) => {
    let k = 1;
    return (
      <tbody id="design_body">
        {data.map((item) => {
          k++;
          return (
            <tr key={`table_row${k}`} className="design_body_row">{tabelCellData(item, k)}</tr>
          );
        })}
      </tbody>
    );
  };

  const {
    tableHeading,
    tableData
  } = Data;

  return (
    <div>
      <table className="main_table_design">
        {tHeader(tableHeading)}
        {tBody(tableData)}
      </table>
    </div>
  );
};

export default DesignTable;
