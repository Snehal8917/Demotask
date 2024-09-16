import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  useEffect(() => {
    // Check if the user is already logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      navigate('/account'); // Redirect to the account page if already logged in
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = credentials;
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!email || !password) {
      return toast.success("Both fields are required!");
    }

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
      toast.success("Logged in Successfully");
      
      return navigate("/account");
    }

    alert("Invalid credentials, please try again.");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={credentials.email}
                required
                onChange={({ target }) =>
                  setCredentials((prev) => ({ ...prev, email: target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={credentials.password}
                required
                onChange={({ target }) =>
                  setCredentials((prev) => ({
                    ...prev,
                    password: target.value,
                  }))
                }
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-4">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
