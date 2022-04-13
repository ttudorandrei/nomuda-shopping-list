import Button from "../../components/Button";
import ShoppingList from "../../components/ShoppingList";

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
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <ShoppingList listType={"Current"} listData={shoppingList} />
        </div>
        <div className="col d-flex flex-column justify-content-around align-items-center test-border">
          <div>
            <Button name={"<"} />
            <Button name={">"} />
          </div>
          <div>
            <Button name={"^"} />
            <Button name={"v"} />
          </div>
        </div>
        <div className="col">
          <ShoppingList listType={"Previous"} listData={shoppingList} />
        </div>
      </div>
    </div>
  );
};

export default ShoppingListPage;
