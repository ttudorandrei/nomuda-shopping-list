import React from "react";
import { markAsImportant } from "../../utils";

const ShoppingListItem = ({
  itemData,
  selection,
  setSelection,
  shoppingList,
}) => {
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
        onDoubleClick={() => {
          markAsImportant(shoppingList, itemData);
        }}
      >
        {itemData.name}
      </div>
    </div>
  );
};

export default ShoppingListItem;
