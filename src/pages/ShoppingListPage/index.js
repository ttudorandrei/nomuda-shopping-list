import { useEffect, useState } from "react";
import uuid from "react-uuid";

import Button from "../../components/Button";
import AddItemModal from "../../components/Modal";
import ShoppingList from "../../components/ShoppingList";
import { deleteFromLocalstorage, removeFromArray } from "../../utils";

let shoppingListFromLocalStorage = JSON.parse(
  localStorage.getItem("shoppingList")
);

if (!shoppingListFromLocalStorage) {
  localStorage.setItem(
    "shoppingList",
    JSON.stringify([
      {
        objectId: uuid(),
        name: "Bread",
        belongsTo: "Current",
        highPriority: true,
        itemIndex: 5,
      },
      {
        objectId: uuid(),
        name: "Butter",
        belongsTo: "Previous",
        highPriority: false,
        itemIndex: 0,
      },
      {
        objectId: uuid(),
        name: "Soda",
        belongsTo: "Previous",
        highPriority: false,
        itemIndex: 3,
      },
      {
        objectId: uuid(),
        name: "Rice",
        belongsTo: "Current",
        highPriority: true,
        itemIndex: 4,
      },
      {
        objectId: uuid(),
        name: "Flour",
        belongsTo: "Previous",
        highPriority: true,
        itemIndex: 2,
      },
      {
        objectId: uuid(),
        name: "Sugar",
        belongsTo: "Previous",
        highPriority: true,
        itemIndex: 1,
      },
    ])
  );
}

const ShoppingListPage = () => {
  const [shoppingList, setShoppingList] = useState();
  const [currentList, setCurrentList] = useState([]);
  const [previousList, setPreviousList] = useState([]);
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    const updateCurrentList = () => {
      let arr = [];
      if (shoppingListFromLocalStorage) {
        shoppingListFromLocalStorage.map((item) => {
          if (item.belongsTo === "Current") {
            arr.push(item);
          }
        });
      }
      setCurrentList(arr);
    };

    const updatePreviousList = () => {
      let arr = [];
      if (shoppingListFromLocalStorage) {
        shoppingListFromLocalStorage.map((item) => {
          if (item.belongsTo === "Previous") {
            arr.push(item);
          }
        });
      }
      setPreviousList(arr);
    };

    updateCurrentList();
    updatePreviousList();
  }, []);

  const saveList = () => {
    let arr = [];

    arr.push(...currentList, ...previousList);

    localStorage.setItem("shoppingList", JSON.stringify(arr));
  };

  const moveToCurrentList = (item) => {
    let currentListArray = [...currentList];
    let previousListArray = [...previousList];
    if (item && item.belongsTo === "Previous") {
      currentListArray.push({ ...item, belongsTo: "Current" });
      setCurrentList(currentListArray);
      setPreviousList(removeFromArray(previousListArray, item));
    }
  };

  const moveToPreviousList = (item) => {
    let previousListArray = [...previousList];
    let currentListArray = [...currentList];
    if (item && item.belongsTo === "Current") {
      previousListArray.push({ ...item, belongsTo: "Previous" });
      setPreviousList(previousListArray);
      setCurrentList(removeFromArray(currentListArray, item));
    }
  };

  const moveUpByIndex = (item) => {
    console.log("moving up!");
  };

  const moveDownByIndex = (item) => {
    console.log("moving down!");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <ShoppingList
            listType={"Current"}
            listData={currentList}
            selection={selectedItem}
            setSelection={setSelectedItem}
          />
          <div>
            <Button name={"Save List"} onClick={saveList} />
            <Button
              name={"Clear List"}
              onClick={() => {
                console.log("Clear List");
              }}
            />
            <Button
              name={"Load list"}
              onClick={() => {
                shoppingListFromLocalStorage = JSON.parse(
                  localStorage.getItem("shoppingList")
                );
              }}
            />
          </div>
        </div>

        <div className="col d-flex flex-column justify-content-around align-items-center">
          <div>
            <Button
              name={"<"}
              onClick={() => {
                moveToCurrentList(selectedItem);
              }}
            />
            <Button
              name={">"}
              onClick={() => {
                moveToPreviousList(selectedItem);
              }}
            />
          </div>

          <div>
            <Button
              name={"^"}
              onClick={() => {
                moveUpByIndex(selectedItem);
              }}
            />
            <Button
              name={"v"}
              onClick={() => {
                moveDownByIndex(selectedItem);
              }}
            />
          </div>

          <div>
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target=".bd-example-modal-sm"
            >
              Add Item
            </button>

            <Button
              name={"Remove Item"}
              onClick={() => {
                deleteFromLocalstorage(
                  shoppingListFromLocalStorage,
                  selectedItem,
                  "shoppingList"
                );
              }}
            />
          </div>
        </div>

        <div className="col">
          <ShoppingList
            listType={"Previous"}
            listData={previousList}
            selection={selectedItem}
            setSelection={setSelectedItem}
          />
        </div>
      </div>

      <AddItemModal currentList={currentList} setCurrentList={setCurrentList} />
    </div>
  );
};

export default ShoppingListPage;
