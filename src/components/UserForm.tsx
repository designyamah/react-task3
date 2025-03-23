import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addUser, updateUser, User } from "../store/userSlice";
import "./UserForm.css";

const UserForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isEditMode = Boolean(id);

  const userToEdit = useAppSelector((state) =>
    state.users.users.find((user) => user.id === Number(id))
  );

  const [formData, setFormData] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    phone: "",
    website: "",
    address: {
      street: "",
      city: "",
      zipcode: "",
    },
    company: {
      name: "",
    },
  });

  useEffect(() => {
    if (isEditMode && userToEdit) {
      setFormData(userToEdit);
    }
  }, [isEditMode, userToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode && userToEdit) {
      dispatch(updateUser({ ...formData, id: userToEdit.id }));
    } else {
      // Generate a unique ID for new user (in a real app, this would come from the server)
      const newId =
        Math.max(
          0,
          ...useAppSelector((state) => state.users.users).map((u) => u.id)
        ) + 1;
      dispatch(addUser({ ...formData, id: newId }));
    }

    navigate("/users");
  };

  return (
    <div className="user-form-container">
      <h1 className="user-form-title">
        {isEditMode ? "Edit User" : "Add New User"}
      </h1>

      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-section">
          <h2 className="form-section-title">Basic Information</h2>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                value={formData.website || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="form-section-title">Address</h2>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="address.street">Street</label>
              <input
                id="address.street"
                name="address.street"
                type="text"
                value={formData.address.street}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="address.city">City</label>
              <input
                id="address.city"
                name="address.city"
                type="text"
                value={formData.address.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="address.zipcode">Zip Code</label>
              <input
                id="address.zipcode"
                name="address.zipcode"
                type="text"
                value={formData.address.zipcode}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="form-section-title">Company</h2>
          <div className="form-field">
            <label htmlFor="company.name">Company Name</label>
            <input
              id="company.name"
              name="company.name"
              type="text"
              value={formData.company?.name || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="cancel-button"
          >
            Cancel
          </button>
          <button type="submit" className="submit-button">
            {isEditMode ? "Update User" : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
