import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { styles } from "../styles";
import { useLoginMutation } from "../redux/features/auth/authApi";
import toast from "react-hot-toast";
toast;

const schema = Yup.object().shape({
  index_no: Yup.string().required("Index Number is required."),
  password: Yup.string().required("Password is required.").min(6),
});

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const [login, { isSuccess, error, data }] = useLoginMutation();

  const visible = {
    display: passwordVisible ? "block" : "none",
  };

  const formik = useFormik({
    initialValues: { index_no: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ index_no, password }) => {
      await login({ index_no, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const message = `Welcome ${data?.user.surname}` || "Login Successful!";
      toast.success(message);
      const route = data?.user?.role == "PATRON" ? "all-books" : "";
      setTimeout(() => {
        navigate(`/dashboard`);
      }, 2000);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        console.log(errorData);
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="login-bg">
      <div className="w-full min-h-full flex flex-col justify-center bg-[#00000080] px-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="bg-[#f5f5f5] py-6 px-2 shadow sm:rounded-lg sm:px-10">
            <div className="flex flex-col items-center justify-center">
              <img
                src="/logo.png"
                alt="upsa-logo"
                className="w-[200px] h-[76px]"
              />
              <br />
              <h3 className="text-[24px] font-bold text-center">
                Welcome to UPSA
              </h3>
              <span className="text-[24px] font-bold text-center">
                Library Management System
              </span>
            </div>
            <br />
            <br />
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="index_no"
                  className="block text-sm font-medium text-gray-700"
                >
                  Index Number
                </label>
                <input
                  type="text"
                  name="index_no"
                  value={values.index_no}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="Enter Index number"
                  className={`${styles.input}`}
                />
                {errors.index_no && touched.index_no && (
                  <span className="text-red-500 pt-2 block">
                    {errors.index_no}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Date of Birth e.g 04-09-2001"
                    className={`${styles.input}`}
                  />

                  {passwordVisible ? (
                    <AiOutlineEye
                      style={visible}
                      size={25}
                      className="absolute right-2 top-2 cursor-pointer"
                      onClick={() => setPasswordVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      style={visible}
                      size={25}
                      className="absolute right-2 top-2 cursor-pointer"
                      onClick={() => setPasswordVisible(true)}
                    />
                  )}
                  {errors.password && touched.password && (
                    <span className="text-red-500 pt-2 block">
                      {errors.password}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-end">
                <div className="text-gray-600 hover:text-blue-800 text-sm">
                  <a href="forgot password">Forgot your password</a>
                </div>
              </div>
              <button className={`${styles.button}`} type="submit">
                Login
              </button>
              <br />
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
