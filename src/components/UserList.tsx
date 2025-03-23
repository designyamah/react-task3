import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";

import { fetchUsers } from "../store/userSlice";
import UserCard from "./UserCard";
import "./UserList.css";

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, status, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading users...</div>
      </div>
    );
  }

  if (status === "failed") {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="user-list-container">
      <h1 className="user-list-title">User Management System</h1>

      <div className="user-grid">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
