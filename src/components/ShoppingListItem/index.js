import React from "react";

const ShoppingListItem = ({
  itemData,
  selection,
  setSelection,
  shoppingList,
}) => {
  const markAsImportant = () => {
    const targetItemIndex = shoppingList.findIndex((item) => {
      return item.objectId === itemData.objectId;
    });

    if (!shoppingList[targetItemIndex].highPriority) {
      shoppingList[targetItemIndex].highPriority = true;
    } else if (shoppingList[targetItemIndex].highPriority) {
      shoppingList[targetItemIndex].highPriority = false;
    }

    console.log(shoppingList[targetItemIndex].highPriority);

    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  };

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
          markAsImportant();
        }}
      >
        {itemData.name}
      </div>
    </div>
  );
};

export default ShoppingListItem;
