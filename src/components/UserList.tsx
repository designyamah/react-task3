import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchUsers } from "../store/userSlice";
import UserCard from "./UserCard";
import "../styles/UserList.css";

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div className="loading">Loading users...</div>;
  }

  if (status === "failed") {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="user-list-container">
      <h1>Users</h1>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="user-list">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
