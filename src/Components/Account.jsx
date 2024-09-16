import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaEdit } from 'react-icons/fa'; // Importing pencil icon from react-icons

const Account = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

  useEffect(() => {
    // Retrieve the logged-in user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setEmail(loggedInUser.email);
      setName(loggedInUser.name);
    }
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    
    // Update user details in localStorage
    const updatedUser = {
      name: name,
      email: email,
      password: JSON.parse(localStorage.getItem('loggedInUser')).password,  // Password remains the same
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

    toast.success('Account updated successfully');
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h3 className="mb-0">Account Information</h3>
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setIsEditing(!isEditing)}
              >
                <FaEdit /> {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>
            <div className="card-body">
              <form onSubmit={handleUpdate}>
                <div className="form-group mb-3">
                  <label className="form-label">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  ) : (
                    <p className="form-control-plaintext">{email}</p>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  ) : (
                    <p className="form-control-plaintext">{name}</p>
                  )}
                </div>
                {isEditing && (
                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary me-2">
                      Update Account
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
