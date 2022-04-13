import React from "react";
import ShoppingListItem from "../ShoppingListItem";
import "./index.css";

const ShoppingList = ({ listType, listData, selection, setSelection }) => {
  return (
    <div>
      <h3>{listType}</h3>
      <div className="shopping-list">
        {listData.length > 0 ? (
          listData.map((item) => {
            return (
              <ShoppingListItem
                selection={selection}
                setSelection={setSelection}
                itemData={item}
              />
            );
          })
        ) : (
          <div>No items to display</div>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
