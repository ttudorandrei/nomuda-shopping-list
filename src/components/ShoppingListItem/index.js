import React from "react";

const ShoppingListItem = ({
  itemData,
  selection,
  setSelection,
  shoppingList,
}) => {
  const markAsImportant = () => {
    // finds the index of the targeted item
    const targetItemIndex = shoppingList.findIndex((item) => {
      return item.objectId === itemData.objectId;
    });

    // logic to switch from high priority to not high priority based on the current value. updates the actual object in the array
    if (!shoppingList[targetItemIndex].highPriority) {
      shoppingList[targetItemIndex].highPriority = true;
    } else if (shoppingList[targetItemIndex].highPriority) {
      shoppingList[targetItemIndex].highPriority = false;
    }

    // saves the array with the new object in the localStorage
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
