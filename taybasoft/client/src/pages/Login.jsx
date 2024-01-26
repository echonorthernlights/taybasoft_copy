import React from "react"
import { Form, Navigate, useNavigate } from "react-router-dom"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { FormRow, Logo } from "../components"
import SubmitBtn from "../components/SubmitBtn"
import useForm from "../hooks/useForm"
import { useLoginMutation } from "../slices/auth/authApiSlice"
import { toastHandler } from "../utils/toastHandler"
const Login = () => {
  const navigate = useNavigate()
  const [login, { isLoading: loadingLogin }] = useLoginMutation()

  // if user already authenticated redirect to app page
  if (localStorage.getItem("userInfo")) return <Navigate to={"/app"} />

  const loginUser = async (userData) => {
    try {
      const result = await login(userData).unwrap()
      localStorage.setItem("userInfo", JSON.stringify(result.data))
      navigate("/app")
    } catch (err) {
      toastHandler(err, "error")
    }
  }

  const { values, handleChange, handleSubmit } = useForm(
    {
      email: "",
      password: "",
    },
    loginUser
  )

  return (
    <Wrapper>
      <Form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h4>Login</h4>
        <FormRow
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <SubmitBtn formBtn isLoading={loadingLogin} />
      </Form>
    </Wrapper>
  )
}

export default Login
