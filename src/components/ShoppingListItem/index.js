import React from "react";

const ShoppingListItem = ({ itemData, selection, setSelection }) => {
  return (
    <div
      className={`d-flex flex-row ${
        selection && selection.name === itemData.name ? "text-danger" : ""
      }`}
    >
      {itemData.highPriority && <div>!</div>}
      <div
        onClick={(e) => {
          setSelection(itemData);
        }}
      >
        {itemData.name}
      </div>
    </div>
  );
};

export default ShoppingListItem;
