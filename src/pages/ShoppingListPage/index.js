import { useEffect, useState } from "react";

import Button from "../../components/Button";
import ShoppingList from "../../components/ShoppingList";
import { removeFromArray } from "../../utils";

const shoppingListFromLocalStorage = JSON.parse(
  localStorage.getItem("shoppingList")
);

if (!shoppingListFromLocalStorage) {
  localStorage.setItem(
    "shoppingList",
    JSON.stringify([
      {
        name: "Bread",
        belongsTo: "Current",
        highPriority: true,
      },
      {
        name: "Butter",
        belongsTo: "Previous",
        highPriority: false,
      },
      {
        name: "Soda",
        belongsTo: "Previous",
        highPriority: false,
      },
      {
        name: "Rice",
        belongsTo: "Current",
        highPriority: true,
      },
      {
        name: "Flour",
        belongsTo: "Previous",
        highPriority: true,
      },
      {
        name: "Sugar",
        belongsTo: "Previous",
        highPriority: true,
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

    setShoppingList(arr);

    localStorage.setItem("shoppingList", JSON.stringify(arr));
  };

  const moveToCurrentList = (item) => {
    let currentListArray = [...currentList];
    let previousListArray = [...previousList];
    if (item && item.belongsTo === "Previous") {
      currentListArray.push({
        name: item.name,
        belongsTo: "Current",
        highPriority: item.highPriority,
      });
      setCurrentList(currentListArray);
      setPreviousList(removeFromArray(previousListArray, item));
    }
  };

  const moveToPreviousList = (item) => {
    let previousListArray = [...previousList];
    let currentListArray = [...currentList];
    if (item && item.belongsTo === "Current") {
      previousListArray.push({
        name: item.name,
        belongsTo: "Previous",
        highPriority: item.highPriority,
      });
      setPreviousList(previousListArray);
      setCurrentList(removeFromArray(currentListArray, item));
    }
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
          <ShoppingList
            listType={"Previous"}
            listData={previousList}
            selection={selectedItem}
            setSelection={setSelectedItem}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingListPage;
