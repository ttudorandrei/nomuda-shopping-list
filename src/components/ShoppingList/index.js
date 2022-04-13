import React from "react";
import ShoppingListItem from "../ShoppingListItem";
import "./index.css";

const ShoppingList = ({ listType, listData }) => {
  return (
    <div>
      <h3>{listType}</h3>
      <div className="shopping-list">
        <ShoppingListItem />
        <ShoppingListItem />
        <ShoppingListItem />
        <ShoppingListItem />
        <ShoppingListItem />
      </div>
    </div>
  );
};

export default ShoppingList;
