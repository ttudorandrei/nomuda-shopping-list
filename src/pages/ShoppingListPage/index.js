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
          <div>
            <Button
              name={"Save List"}
              onClick={() => {
                console.log("Save List");
              }}
            />
            <Button
              name={"Clear List"}
              onClick={() => {
                console.log("Clear List");
              }}
            />
            <Button
              name={"Load list"}
              onClick={() => {
                console.log("Load List");
              }}
            />
          </div>
        </div>
        <div className="col d-flex flex-column justify-content-around align-items-center">
          <div>
            <Button
              name={"<"}
              onClick={() => {
                console.log("<");
              }}
            />
            <Button
              name={">"}
              onClick={() => {
                console.log(">");
              }}
            />
          </div>
          <div>
            <Button
              name={"^"}
              onClick={() => {
                console.log("^");
              }}
            />
            <Button
              name={"v"}
              onClick={() => {
                console.log("v");
              }}
            />
          </div>
          <div>
            <Button
              name={"Add Item"}
              onClick={() => {
                console.log("Add Item");
              }}
            />
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
