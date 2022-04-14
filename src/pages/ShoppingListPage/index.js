import { useEffect, useState } from "react";
import uuid from "react-uuid";

import Button from "../../components/Button";
import AddItemModal from "../../components/AddItemModal";
import ShoppingList from "../../components/ShoppingList";
import { removeFromArray } from "../../utils";
import NavigationBar from "../../components/Navbar";

let shoppingListFromLocalStorage = JSON.parse(
  localStorage.getItem("shoppingList")
);

// dummy data to test the app
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

  // using useEffect hook to sort the contents of the array baset on them belonging to either "Current" or "Previous" lists.
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
    setShoppingList(shoppingListFromLocalStorage);
  }, []);

  // will save the list after it being updated
  const saveList = () => {
    let arr = [];

    arr.push(...currentList, ...previousList);

    localStorage.setItem("shoppingList", JSON.stringify(arr));
  };

  // logic to move from "Previous" to "Current" lists. First finds the item, updates the key: value pair updating the list it belongs to and assembles the updated lists.
  const moveToCurrentList = (item) => {
    let currentListArray = [...currentList];
    let previousListArray = [...previousList];
    if (item && item.belongsTo === "Previous") {
      currentListArray.push({ ...item, belongsTo: "Current" });
      setCurrentList(currentListArray);
      setPreviousList(removeFromArray(previousListArray, item));
    }
  };

  // logic to move from "Current" to "Previous". Logic similar to moveToCurrentList
  const moveToPreviousList = (item) => {
    let previousListArray = [...previousList];
    let currentListArray = [...currentList];
    if (item && item.belongsTo === "Current") {
      previousListArray.push({ ...item, belongsTo: "Previous" });
      setPreviousList(previousListArray);
      setCurrentList(removeFromArray(currentListArray, item));
    }
  };

  // WIP
  const moveUpByIndex = (item) => {
    console.log("moving up!");
  };

  // WIP
  const moveDownByIndex = (item) => {
    console.log("moving down!");
  };

  return (
    <div className="container-fluid">
      <NavigationBar shoppingList={shoppingList} selectedItem={selectedItem} />
      <div className="row">
        <div className="col col-lg-4 col-sm-5">
          <ShoppingList
            listType={"Current"}
            listData={currentList}
            selection={selectedItem}
            setSelection={setSelectedItem}
            shoppingList={shoppingList}
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
                setShoppingList(shoppingListFromLocalStorage);
              }}
            />
          </div>
        </div>

        <div className="col col-lg-4 col-sm-2 d-flex flex-column justify-content-around align-items-center">
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
        </div>

        <div className="col col-lg-4 col-sm-5">
          <ShoppingList
            listType={"Previous"}
            listData={previousList}
            selection={selectedItem}
            setSelection={setSelectedItem}
            shoppingList={shoppingList}
          />
        </div>
      </div>

      <AddItemModal currentList={currentList} setCurrentList={setCurrentList} />
    </div>
  );
};

export default ShoppingListPage;
