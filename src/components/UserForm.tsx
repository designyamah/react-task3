import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { addUser, updateUser, User } from "../store/userSlice";
import "../styles/UserForm.css";

const UserForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.users);

  const isEditMode = !!id;
  const userToEdit = isEditMode
    ? users.find((user) => user.id === Number(id))
    : null;

  const [formData, setFormData] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  useEffect(() => {
    if (isEditMode && userToEdit) {
      setFormData({
        name: userToEdit.name,
        email: userToEdit.email,
        address: { ...userToEdit.address },
        phone: userToEdit.phone || "",
        website: userToEdit.website || "",
        company: userToEdit.company
          ? { ...userToEdit.company }
          : { name: "", catchPhrase: "", bs: "" },
      });
    }
  }, [isEditMode, userToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => {
        // Create a properly typed version of the nested object
        const parentObj = prev[parent as keyof typeof prev];

        // Make sure we're working with an object before spreading
        if (parentObj && typeof parentObj === "object") {
          return {
            ...prev,
            [parent]: {
              ...parentObj,
              [child]: value,
            },
          };
        }
        return prev; // Return unchanged if not an object
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode && userToEdit) {
      dispatch(
        updateUser({
          id: userToEdit.id,
          ...formData,
        })
      );
    } else {
      dispatch(addUser(formData));
    }

    navigate("/users");
  };

  return (
    <div className="user-form-container">
      <h1>{isEditMode ? "Edit User" : "Add New User"}</h1>
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        <h2>Address</h2>
        <div className="form-group">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="suite">Suite</label>
          <input
            type="text"
            id="suite"
            name="address.suite"
            value={formData.address.suite}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="zipcode">Zipcode</label>
          <input
            type="text"
            id="zipcode"
            name="address.zipcode"
            value={formData.address.zipcode}
            onChange={handleChange}
          />
        </div>

        <h2>Company</h2>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="company.name"
            value={formData.company?.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="catchPhrase">Catch Phrase</label>
          <input
            type="text"
            id="catchPhrase"
            name="company.catchPhrase"
            value={formData.company?.catchPhrase}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="bs">BS</label>
          <input
            type="text"
            id="bs"
            name="company.bs"
            value={formData.company?.bs}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            {isEditMode ? "Update User" : "Add User"}
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/users")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
