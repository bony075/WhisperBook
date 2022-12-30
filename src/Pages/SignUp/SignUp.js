import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";
import { GoogleAuthProvider } from "firebase/auth";
// import useToken from '../../hook/useToken';
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser, providerLogin } = useContext(AuthContext);
  // const [createdUserEmail, setCreatedUserEmail] = useState("");
  // const [token] = useToken(createdUserEmail);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [signUpError, setSignUPError] = useState("");
  // if (token) {
  //   navigate("/");
  // }

  const handleSignUp = (data) => {
    console.log(data);
    setSignUPError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("signup successful");

        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then(() => { })
          .catch((e) => console.log(e));
        saveUser(data.name, data.email, data.usertype);
      })
      .catch((e) => {
        console.log(e);
        setSignUPError(e.message);
      });
  };

  const saveUser = (name, email, usertype) => {
    const user = { name, email, usertype };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("us: ",data);
        // setCreatedUserEmail(email);
        getUserTocken(email);
      });
  };

  const getUserTocken = (email) => {
    fetch(`http://localhost:5000/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          navigate("/");
        }
      });
  };

  const googleProvider = new GoogleAuthProvider();

  const handelGoogleSignIn = () => {
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        saveUser(user.name, user.email, "buyer");
        navigate(from, { replace: true });
      })
      .catch((e) => console.error(e));
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          {/* <h1 className="text-5xl font-bold">SIGN UP</h1> */}
          <img className="w-1/2 lg:w-full" src="https://cdn-icons-png.flaticon.com/512/5455/5455877.png" alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className=" flex justify-center items-center">
              <div className="w-96 p-7">
                <form onSubmit={handleSubmit(handleSignUp)}>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      {" "}
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      {...register("name", {
                        required: "Name is Required",
                      })}
                      className="input input-bordered w-full max-w-xs"
                    />
                    {errors.name && (
                      <p className="text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      {" "}
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is Required",
                      })}
                      className="input input-bordered w-full max-w-xs"
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      {" "}
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password more then 6 characters",
                        },
                      })}
                      className="input input-bordered w-full max-w-xs"
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      {" "}
                      <span className="label-text">User Type</span>
                    </label>

                    <select
                      {...register("usertype", {
                        required: "Please select a user type",
                      })}
                      className="border p-3  rounded-md w-full max-w-xs"
                    >
                      <option value="buyer">Buyer</option>
                      <option value="seller">Seller</option>
                    </select>
                    {errors.usertype && (
                      <p className="text-red-500">{errors.usertype.message}</p>
                    )}
                  </div>

                  <input
                    className="btn btn-primary text-white w-full mt-4"
                    value="Sign Up"
                    type="submit"
                  />
                  {signUpError && <p className="text-red-600">{signUpError}</p>}
                </form>
                <p>
                  Already have an account{" "}
                  <Link className="text-secondary" to="/login">
                    Please Login
                  </Link>
                </p>

                <button
                  onClick={handelGoogleSignIn}
                  className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white w-full"
                >
                  SIGN IN WITH GOOGLE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
