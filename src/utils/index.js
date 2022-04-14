const removeFromArray = (array, item) => {
  return array.filter((filteredItem) => item !== filteredItem);
};

const deleteFromLocalstorage = (array, item, arrayName) => {
  // finds the index of targeted element
  const indexOfElementToBeRemoved = array.findIndex((element) => {
    return element.objectId === item.objectId;
  });

  // removes the targeted element by the index
  array.splice(indexOfElementToBeRemoved, 1);

  // saves the new array in localStorage
  localStorage.setItem(arrayName, JSON.stringify(array));
};

const markAsImportant = (array, item) => {
  // finds the index of the targeted item
  const targetItemIndex = array.findIndex((element) => {
    return element.objectId === item.objectId;
  });

  // logic to switch from high priority to not high priority based on the current value. updates the actual object in the array
  if (!array[targetItemIndex].highPriority) {
    array[targetItemIndex].highPriority = true;
  } else if (array[targetItemIndex].highPriority) {
    array[targetItemIndex].highPriority = false;
  }

  // saves the array with the new object in the localStorage
  localStorage.setItem("shoppingList", JSON.stringify(array));
};

export { removeFromArray, deleteFromLocalstorage, markAsImportant };
