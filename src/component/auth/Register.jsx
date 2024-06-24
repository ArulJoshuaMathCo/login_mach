import React, { useState, useEffect } from 'react';
import { useRegisterMutation } from '../../redux/authapi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './register.css';  // Make sure the path is correct

const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading, data, error }] = useRegisterMutation();
  
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuperuser, setIsSuperuser] = useState(false); // Default to false

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "Registration failed!");
    }
    if (data) {
      toast.success("Registration successful!");
      navigate('/');
    }
  }, [error, data, navigate]);

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const registerData = {
      first_name: firstName,
      surname,
      email,
      is_superuser: isSuperuser,
      password,
    };
    register(registerData);
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5 form-container">
        <form className="shadow rounded bg-body" onSubmit={handleSubmitClick}>
          <h2 className="mb-4">Register</h2>

          <div className="mb-3">
            <label htmlFor="first_name_field" className="form-label">First Name</label>
            <input
              type="text"
              id="first_name_field"
              className="form-control"
              name="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="surname_field" className="form-label">Surname</label>
            <input
              type="text"
              id="surname_field"
              className="form-control"
              name="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>

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

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="is_superuser_field"
              checked={isSuperuser}
              onChange={(e) => setIsSuperuser(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="is_superuser_field">Is Superuser</label>
          </div>

          <button id="register_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
            {isLoading ? "REGISTERING..." : "REGISTER"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
