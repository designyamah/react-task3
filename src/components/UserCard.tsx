import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { deleteUser, User } from "../store/userSlice";
import "./UserCard.css";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(user.id));
    }
  };

  const handleEdit = () => {
    navigate(`/edit-user/${user.id}`);
  };

  return (
    <div className="user-card">
      <Link to={`/users/${user.id}`}>
        <h2 className="user-name">{user.name}</h2>
      </Link>
      <p className="user-email">{user.email}</p>
      <p className="user-phone">{user.phone}</p>
      <div className="user-address">
        <p>
          {user.address.street}, {user.address.city} {user.address.zipcode}
        </p>
      </div>

      <div className="user-actions">
        <button onClick={handleEdit} className="edit-button">
          Edit
        </button>
        <button onClick={handleDelete} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
