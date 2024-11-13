import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import "./signuppage.scss";
import logo from "../../assets/app-logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { registerUser } from "../../features/auth/authSlice";
import { Loading2 } from "../../components/layout/loading/Loading";
import { BsExclamationCircle } from "react-icons/bs";

const SignupPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { signupLoading, signupError } = useSelector(
    (state: RootState) => state.authorization
  );

  console.log(signupLoading, signupError);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  console.log(userData);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //error
  const [showError, setShowError] = useState<boolean>(!!signupError);
  useEffect(() => {
    if (signupError) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [signupError]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const responce = await dispatch(registerUser(userData));
    console.log(responce);

    if (responce.type === "users/register/fulfilled") {
      navigate("/");
      console.log("success");
    }
  };

  return (
    <div className="signup-container">
      <NavLink className="logo-secton" to="/">
        <img draggable="false" src={logo} alt="" />
        <h1>ispatch</h1>
      </NavLink>

      <div className="signup-section">
        <h2>let's get your account set up</h2>

        {showError && (
          <div className="errorMessage">
            <BsExclamationCircle className="exclamationMark" />
            <p className="error-message">{signupError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="input-form">
          <div className="input-field">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={userData.name}
            />
          </div>

          <div className="input-field">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              id=""
              onChange={handleChange}
              value={userData.email}
            />
          </div>

          <div className="input-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              id=""
              onChange={handleChange}
              value={userData.password}
            />
          </div>

          <button className="signup-button">
            {signupLoading ? (
              <Loading2 size={6} bottom={-10} width={0} />
            ) : (
              "signup"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
