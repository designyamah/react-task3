import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { deleteUser } from "../store/userSlice";
import "../styles/UserDetail.css";

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { users } = useSelector((state: RootState) => state.users);
  const user = users.find((user) => user.id === Number(id));

  if (!user) {
    return <div className="not-found">User not found</div>;
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      dispatch(deleteUser(user.id));
      navigate("/users");
    }
  };

  return (
    <div className="user-detail">
      <h1>{user.name}</h1>
      <div className="user-info">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Website:</strong> {user.website}
        </p>

        <h2>Address</h2>
        <p>
          {user.address.street}, {user.address.suite}
        </p>
        <p>
          {user.address.city}, {user.address.zipcode}
        </p>

        {user.company && (
          <>
            <h2>Company</h2>
            <p>
              <strong>Name:</strong> {user.company.name}
            </p>
            <p>
              <strong>Catch Phrase:</strong> {user.company.catchPhrase}
            </p>
            <p>
              <strong>BS:</strong> {user.company.bs}
            </p>
          </>
        )}
      </div>

      <div className="user-actions">
        <Link to={`/edit-user/${user.id}`} className="edit-link">
          Edit User
        </Link>
        <button className="delete-button" onClick={handleDelete}>
          Delete User
        </button>
        <Link to="/users" className="back-link">
          Back to Users
        </Link>
      </div>
    </div>
  );
};

export default UserDetail;
