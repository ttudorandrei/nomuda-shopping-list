import React from "react";
import ShoppingListItem from "../ShoppingListItem";
import "./index.css";

const ShoppingList = ({
  listType,
  listData,
  selection,
  setSelection,
  shoppingList,
}) => {
  // sorts the list by the itemIndex value
  const sortedList = listData.sort((a, b) => a.itemIndex - b.itemIndex);

  return (
    <div>
      <h3>{listType}</h3>
      <div className="shopping-list">
        {listData.length > 0 ? (
          sortedList.map((item) => {
            return (
              <ShoppingListItem
                selection={selection}
                setSelection={setSelection}
                itemData={item}
                shoppingList={shoppingList}
                key={item.objectId}
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
