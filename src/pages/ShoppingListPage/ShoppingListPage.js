import Button from "../../components/Button/Button";
import ShoppingList from "../../components/ShoppingList/ShoppingList";

import "./shopping-list-page.css";

const shoppingList = JSON.parse(localStorage.getItem("shoppingList"));

if (!shoppingList) {
  localStorage.setItem(
    "shoppingList",
    JSON.stringify([
      {
        name: "Bread",
        belongsTo: "Current",
      },
      {
        name: "Butter",
        belongsTo: "Previous",
      },
      {
        name: "Soda",
        belongsTo: "Previous",
      },
      {
        name: "Rice",
        belongsTo: "Current",
      },
    ])
  );
}

const ShoppingListPage = () => {
  return (
    <div className="container-fluid test-border">
      <div className="row">
        <div className="col test-border">
          <ShoppingList listType={"Current"} listData={shoppingList} />
        </div>
        <div className="col test-border">
          <div>
            <Button name={"<"} />
            <Button name={">"} />
          </div>
          <div>
            <Button name={"^"} />
            <Button name={"v"} />
          </div>
        </div>
        <div className="col test-border">
          <ShoppingList listType={"Previous"} listData={shoppingList} />
        </div>
      </div>
    </div>
  );
};

export default ShoppingListPage;
