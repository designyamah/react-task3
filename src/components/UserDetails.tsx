import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { deleteUser } from "../store/userSlice";
import "./UserDetail.css";

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) =>
    state.users.users.find((user) => user.id === Number(id))
  );

  if (!user) {
    return (
      <div className="not-found">
        <h2>User not found</h2>
        <Link to="/users">Back to Users</Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(user.id));
      navigate("/users");
    }
  };

  return (
    <div className="user-detail-container">
      <div className="user-detail-header">
        <h1 className="user-detail-name">{user.name}</h1>
        <div className="user-detail-actions">
          <Link to={`/edit-user/${user.id}`} className="user-detail-edit">
            Edit
          </Link>
          <button onClick={handleDelete} className="user-detail-delete">
            Delete
          </button>
        </div>
      </div>

      <div className="user-info-grid">
        <div className="user-info-section">
          <h2>Contact Information</h2>
          <p className="user-info-item">
            <span className="user-info-label">Email:</span> {user.email}
          </p>
          <p className="user-info-item">
            <span className="user-info-label">Phone:</span> {user.phone}
          </p>
          {user.website && (
            <p className="user-info-item">
              <span className="user-info-label">Website:</span> {user.website}
            </p>
          )}
        </div>

        <div className="user-info-section">
          <h2>Address</h2>
          <p className="user-info-item">
            <span className="user-info-label">Street:</span>{" "}
            {user.address.street}
          </p>
          <p className="user-info-item">
            <span className="user-info-label">City:</span> {user.address.city}
          </p>
          <p className="user-info-item">
            <span className="user-info-label">Zip Code:</span>{" "}
            {user.address.zipcode}
          </p>
        </div>
      </div>

      {user.company && (
        <div className="user-info-section">
          <h2>Company</h2>
          <p className="user-info-item">
            <span className="user-info-label">Name:</span> {user.company.name}
          </p>
        </div>
      )}

      <div className="back-link">
        <Link to="/users">← Back to Users</Link>
      </div>
    </div>
  );
};

export default UserDetail;
