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

export { removeFromArray, deleteFromLocalstorage };
