import React from 'react'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import Logo from '../components/Logo'
import FormRow from '../components/FormRow'
import { Link } from 'react-router-dom'
const Register = () => {
  return (
    <Wrapper>
        <form className='form'>
          <Logo/>
          <h4>Register</h4>
          <FormRow type="text" name="firstName" defaultValue="test fname" labelText="First Name" />
          <FormRow type="text" name="lastName" defaultValue="test lname" labelText="Last Name" />
          <FormRow type="text" name="location" defaultValue="test location" />
          <FormRow type="email" name="email" defaultValue="admin@admin.com" />
          <FormRow type="password" name="password" defaultValue="root1234" />
      
          <button type="submit" className="btn btn-block">submit</button>
          <button type="button" className="btn btn-block">explore the app</button>
          <p>
            Already a member yet ?
            <Link to="/login" className="member-btn"> Login </Link>
          </p>
        </form>
    </Wrapper>
  )
}

export default Register
