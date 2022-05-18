import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData; //destructuring

  const onChange = (e) => {
   setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    //we use the spread operator to copy the previous state and add the new value to the formData object
  };

  const onSubmit = (e) =>{
    e.preventDefault();

    console.log(formData);
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Login and start setting goals</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit} >
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
        <button type="submit" className="btn btn-block" >Submit</button>
      </div>
        </form>
      </section>
    </>
  );
}

export default Login;
