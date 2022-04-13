import React from "react";
import ShoppingListItem from "../ShoppingListItem/ShoppingListItem";
import "./shopping-list.css";

const ShoppingList = () => {
  return (
    <div>
      <h3>Current</h3>
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
