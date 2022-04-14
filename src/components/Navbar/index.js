import Button from "../../components/Button";
import { deleteFromLocalstorage } from "../../utils";

const NavigationBar = ({ shoppingList, selectedItem }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-brand">Shopping List</div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <button
              type="button"
              className="btn btn-primary m-2"
              data-toggle="modal"
              data-target=".bd-example-modal-sm"
            >
              Add Item
            </button>
          </li>
          <li className="nav-item">
            <Button
              name={"Remove Item"}
              onClick={() => {
                deleteFromLocalstorage(
                  shoppingList,
                  selectedItem,
                  "shoppingList"
                );
              }}
            />
          </li>
          <li class="nav-item">
            <div class="nav-link m-2">Your Account</div>
          </li>
          <li class="nav-item">
            <div class="nav-link m-2">About Us</div>
          </li>
          <li class="nav-item">
            <div class="nav-link m-2">Contact</div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
