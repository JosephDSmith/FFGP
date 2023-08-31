import React, { useState, useContext } from 'react';
import './Authorization.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UserContext from '../../functionality/UserContext'
import { UserContextType, UserType } from '../../functionality/types';

interface AuthorizationProps {
  // Define any props being passed to Authorization component
}

const Authorization: React.FC<AuthorizationProps> = (props) => {
  const [isSignup, setIsSignup] = useState(false);
  const {setUser} = useContext(UserContext) as UserContextType

  const toggleSignup = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: isSignup
      ? Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('Confirm password is required')
      : Yup.string(),
  });

  const handleSubmit = (values: any) => {
    console.log('Form submitted:', values);
    // Handle authentication logic here
    const newUser: UserType = {
      id: '1', 
      email: values.email,
      is_admin: false, 
      snippets: [] 
    };
    setUser(newUser)
  };

  return (
    <div className="authorization">
      <div className="auth-card">
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <div>
              <label htmlFor="email">Email:</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            {isSignup && (
              <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <Field type="password" id="confirmPassword" name="confirmPassword" />
                <ErrorMessage name="confirmPassword" component="div" className="error" />
              </div>
            )}
            <div>
              <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
            </div>
          </Form>
        </Formik>
        <div>
          {isSignup ? (
            <p>
              Already have an account?{' '}
              <button type="button" onClick={toggleSignup}>
                Login
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button type="button" onClick={toggleSignup}>
                Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Authorization;