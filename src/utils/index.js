const removeFromArray = (array, item) => {
  return array.filter((filteredItem) => item !== filteredItem);
};

const deleteFromLocalstorage = (array, item, arrayName) => {
  const indexOfElementToBeRemoved = array.findIndex((element) => {
    return element.objectId === item.objectId;
  });

  array.splice(indexOfElementToBeRemoved, 1);

  localStorage.setItem(arrayName, JSON.stringify(array));
};

export { removeFromArray, deleteFromLocalstorage };
