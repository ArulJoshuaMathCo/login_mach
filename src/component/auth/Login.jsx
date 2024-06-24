import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../redux/authapi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/authSlice";
// import './login.css'; // Make sure the path is correct

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, data, error }] = useLoginMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [isAuthenticated, error, navigate]);

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };
    login(loginData).unwrap().then((result) => {
      dispatch(loginSuccess({ token: result.access_token, user: email }));
      navigate("/");
    }).catch((err) => {
      console.error(err);
      toast.error("Login failed");
    });
  };

  return (
    <div className="row wrapper">
      <div className="form-container">
        <form className="shadow rounded bg-body" onSubmit={handleSubmitClick}>
          <h2 className="mb-4">Login</h2>
          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <a href="/password/forgot" className="float-end mb-4">Forgot Password?</a>

          <button
            id="login_button"
            type="submit"
            className="btn w-100 py-2"
            disabled={isLoading}
          >
            LOGIN
          </button>

          <div className="my-3">
            <a href="/register" className="float-end">New User?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
