import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";

import "./loginpage.scss";
import logo from "../../assets/app-logo.png";

import google from "../../assets/icon/icon1.png";
// import microsoft from "../../assets/icon/icon2.png";
import x from "../../assets/icon/icon3.png";
import apple from "../../assets/icon/icon4.png";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsExclamationCircle } from "react-icons/bs";
import { AppDispatch, RootState } from "../../app/store";
import { loginUser } from "../../features/auth/authSlice";
import { Loading2 } from "../../components/layout/loading/Loading";

const LoginPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const { loginLoading, loginError } = useSelector(
    (state: RootState) => state.authorization
  );

  console.log(loginError);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [showError, setShowError] = useState<boolean>(!!loginError);
  useEffect(() => {
    if (loginError) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000); // Hide error after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [loginError]);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const responce = await dispatch(loginUser(userData));
    if (responce.type === 'users/login/fulfilled') {
      navigate('/')
    }
  };

  return (
    <div className="signup-container">
      <NavLink className="logo-secton" to="/">
        <img draggable="false" src={logo} alt="" />
        <h1>ispatch</h1>
      </NavLink>

      <div className="signup-section">
        <h2>let's login your account </h2>

        <div className="signup-with-other">
          <span>
            <img draggable="false" src={google} alt="" />
          </span>
          <span>
            <img draggable="false" src={x} alt="" />
          </span>
          <span>
            <img draggable="false" src={apple} alt="" />
          </span>
        </div>
        <div className="signup-other-message">
          <hr /> <span>or signup with Email</span>
        </div>

        {showError && (
          <div className="errorMessage">
            <BsExclamationCircle className="exclamationMark" />
            <p className="error-message">{loginError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="input-form">
          <div className="input-field">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              id=""
            />
          </div>

          <div className="input-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              id=""
            />
          </div>
          <button className="signup-button">
            {loginLoading ? <Loading2 size={6} bottom={-10} width={0} /> : "login"}
          </button>

          <div className="additional-necessary">
            <NavLink className="necessary-element" to={"/signup"}>
              Create Account
            </NavLink>
            <NavLink className="necessary-element" to={"/"}>
              Forgot password?
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
