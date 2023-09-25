import React from "react";

function UserProfile({ params }) {
    const { id } = params;
  return (
    <div>
      <h1>User Profile</h1>
      <h2>Welcome, {id}</h2>
    </div>
  );
}

export default UserProfile;
