import React from "react";
import { useForm } from "react-hook-form";

const AddItemModal = ({ currentList, setCurrentList }) => {
  // useForm hook helping with registering and submitting form data
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // on submission, the new element is being pushed into the currentList array and the the currentList is being updated with the new array containing the recently added item
  const submitNewItem = (formData) => {
    let currentListArray = [...currentList];

    const sortedList = currentListArray.sort(
      (a, b) => b.itemIndex - a.itemIndex
    );

    currentListArray.push({
      ...formData,
      belongsTo: "Current",
      highPriority: JSON.parse(formData.highPriority),
      itemIndex: sortedList[0].itemIndex + 1,
    });

    setCurrentList(currentListArray);
  };

  return (
    <div
      className="modal fade bd-example-modal-sm"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="mySmallModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm">
        <div className="modal-content text-center">
          <h3>Add new item</h3>
          <form
            className=" d-flex flex-column justify-content-around align-items-center"
            onSubmit={handleSubmit(submitNewItem)}
          >
            <input
              className="m-2"
              placeholder="Item Name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <div className="text-danger">This field is required</div>
            )}

            <select
              {...register("highPriority", { required: true })}
              className="m-2"
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
            {errors.highPriority && (
              <div className="text-danger">This field is required</div>
            )}
            <button className="btn btn-primary m-2" type="submit">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
