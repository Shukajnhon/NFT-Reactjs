import React, {useState} from 'react';
import styled from 'styled-components';
import {Color} from 'components/Color';
import googleIcon from 'assets/images/Google.svg';
import facebookIcon from 'assets/images/facebook.svg';
import githubIcon from 'assets/images/github.svg';
import backgroundLogin from 'assets/images/LoginImg.svg';
import {Logo} from 'components/Logo';

import {Form, Field} from 'react-final-form';
import {FORM_ERROR} from 'final-form';
import {useNavigate} from 'react-router-dom';

const Login = ({srcImg}) => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // onSubmit
  const onSubmit = async (values) => {
    await sleep(3000);
    if (values.username !== 'hieu') {
      return {username: 'Unknown username'};
    }
    if (values.password !== '123') {
      return {[FORM_ERROR]: 'Login Failed !!! Check your password'};
    }
    console.log('LOGIN SUCCESS!');
    // window.alert('LOGIN SUCCESS!');
    navigate('/');
    console.log(values);
    const resetForm = () => {
      values.username = '';
      values.password = '';
    };
    resetForm();
  };

  // const handleResetForm = () => {

  // };

  return (
    <LoginWrapStyle>
      <Form
        onSubmit={onSubmit}
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
        }}
        render={({
          submitError,
          handleSubmit,
          form,
          submitting,
          pristine,
          values,
        }) => (
          <div className="login-container">
            <div className="login-form-wrap">
              {/* Login left */}
              <div className="login__left">
                <div className="login-content">
                  <Logo></Logo>
                  <h2 className="login-title">Log In</h2>
                  <form className="form-control" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <Field name="username">
                        {({input, meta}) => (
                          <div>
                            <label htmlFor="username">Username</label>
                            <input
                              {...input}
                              type="text"
                              id="username"
                              placeholder="Username"
                            />
                            {(meta.error || meta.submitError) &&
                              meta.touched && (
                                <span className="error-submit">
                                  {meta.error || meta.submitError}
                                </span>
                              )}
                          </div>
                        )}
                      </Field>
                      {/* <span className="form-message" /> */}
                    </div>
                    <div className="form-group form-password">
                      <Field name="password">
                        {({input, meta}) => (
                          <div>
                            <div className="form-label">
                              <label
                                className="form-label-password"
                                htmlFor="password"
                              >
                                Password
                              </label>
                              <label className="form-label-forgot-password">
                                Forgot Password?
                              </label>
                            </div>
                            <input
                              {...input}
                              type={showPassword ? 'text' : 'password'}
                              id="password"
                              placeholder="Enter password"
                            />
                            {showPassword ? (
                              <i
                                className="fa-solid fa-eye eyes-open"
                                onClick={togglePassword}
                              />
                            ) : (
                              <i
                                className="fa-solid fa-eye-slash eyes-close"
                                onClick={togglePassword}
                              />
                            )}
                            {meta.error && meta.touched && (
                              <span className="error-submit">{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                      <span className="form-password-message" />
                      {submitError && (
                        <div className="error">{submitError}</div>
                      )}
                    </div>

                    <div className="btn">
                      <button
                        className="btn-login"
                        type="submit"
                        disabled={submitting}
                      >
                        {!submitting ? 'Login' : ''}
                        {submitting ? (
                          <i class="fa fa-spinner fa-spin"></i>
                        ) : (
                          <i className="fas fa-arrow-right" />
                        )}
                      </button>

                      <p className="or">or continue with</p>
                      <div className="btn-social">
                        <div className="social-group btn-google">
                          <button>
                            <img src={googleIcon} alt="google" />
                          </button>
                        </div>
                        <div className="social-group  btn-github">
                          <button>
                            <img src={githubIcon} alt="github" />
                          </button>
                        </div>
                        <div className="social-group btn-facebook">
                          <button>
                            <img src={facebookIcon} alt="facebook" />
                          </button>
                        </div>
                      </div>
                      <div className="dont-have-account">
                        <p className="dont-have-account-text">
                          Don't have an account yet?
                          <a href="/login">Sign up for free</a>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* Login right */}
              <div className="login__right">
                <div className="login-right-wrap">
                  <div className="images">
                    <img src={backgroundLogin} alt="backgroundLogin" />
                  </div>
                  <div className="background" />
                </div>
              </div>
            </div>
          </div>
        )}
      ></Form>
    </LoginWrapStyle>
  );
};

export default Login;

const LoginWrapStyle = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  .login-container {
    margin: 40px auto;
  }

  .logo {
    margin: 20px 0;
  }
  .logo img {
    cursor: pointer;
  }
  .logo-detail {
    cursor: default;
  }
  .login-form-wrap {
    max-width: 1425px;
    display: flex;
    border-radius: 2rem;
    box-shadow: 0px 0px 24px 1px rgba(0, 0, 0, 0.1);
    /* position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */

    background: linear-gradient(90deg, #ffffff 0%, #bbaaff 66.67%);
  }

  .login__left,
  .login__right {
    width: 50%;
  }

  /* Login Left */
  .login__left {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 30px;
  }

  .login-content {
    margin: 0 auto;
  }

  .login-title {
    text-align: center;
    margin: 0;
    font-size: 56px;
    font-weight: 600;
  }

  .form-control {
    min-width: 478px;
  }

  .form-control .form-group {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
  }

  .form-group label {
    font-weight: 300;
  }

  .form-label {
    display: flex;
    justify-content: space-between;
  }

  .form-group .form-label-forgot-password {
    opacity: 0.6;
    cursor: pointer;
    color: ${Color.pinkColor};
  }

  .form-group input {
    width: 100%;
    height: 46px;
    border-radius: 6px;
    border: none;
    background-color: ${Color.inputColor};
    padding-left: 10px;
  }

  .form-password {
    position: relative;
  }

  .form-password-message {
    position: absolute;
    bottom: -20px;
    left: 0;
    color: red;
    font-size: 14px;
  }

  .error,
  .error-submit {
    color: red;
    font-size: 14px;
  }

  .eyes-open {
    display: block;
  }

  .eyes-close,
  .eyes-open {
    position: absolute;
    top: 68%;
    right: 20px;
    transform: translateY(-50%);
    cursor: pointer;
    color: ${Color.pinkColor};
  }

  .d-none {
    display: none;
  }

  .d-block {
    display: block;
  }

  .btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 40px;
  }

  .btn-login {
    width: 150px;
    height: 46px;
    border: none;
    font-size: 20px;
    border-radius: 20px;
    color: #fff;
    background-color: ${Color.primaryColor};
    cursor: pointer;
  }
  .btn-login .fa-arrow-right {
    margin-left: 10px;
  }

  button:disabled,
  button[disabled] {
    background-color: ${Color.primaryColor};
    opacity: 0.8;
    cursor: not-allowed;
  }

  .btn p.or {
    color: ${Color.primaryColor};
  }

  .btn-social {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .social-group {
    width: 125px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .social-group button {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: 1px solid ${Color.secondaryColor};
    border-radius: 20px;
    cursor: pointer;
  }

  .dont-have-account {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .dont-have-account-text {
    margin-bottom: 40px;
  }

  .dont-have-account-text a {
    margin-left: 20px;
    color: ${Color.primaryColor};
  }

  /*  Login right */
  .login__right {
    position: relative;
  }

  .background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 350px;
    /* background-color: ${Color.loginColor1}; */
    z-index: -1;
    border-radius: 2rem;
  }
  /* 
  .login-right-wrap {
    position: relative;
  } */

  .images {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0%, -47%);
    width: 540px;
    z-index: 20;
  }

  .images img {
    width: 100%;
  }

  @media (max-width: 1200px) {
    .login-form-wrap {
      width: 994px;
      margin: 0 auto;
    }

    .login-title {
      margin-top: 30px;
      font-size: 52px;
      text-align: center;
    }

    .form-control {
      min-width: 416px;
    }

    /* right */
    .login-right-wrap .images {
      width: 400px;
      height: 500px;
    }

    .login-right-wrap .images {
      top: 58%;
    }

    .girl-laptop img {
      width: 500px;
      height: 400px;
    }

    .cactus img {
      width: 200px;
      height: 400px;
    }
  }

  /* Large */
  @media (max-width: 992px) {
    .login-form-wrap {
      max-width: 800px;
      padding: 10px;
    }

    .form-control {
      min-width: 370px;
    }

    .btn {
      row-gap: 24px;
    }

    /* right */
    .login-right-wrap .images {
      width: 324px;
      height: 486px;
    }

    .girl-laptop img {
      width: 392px;
      height: 400px;
    }

    .cactus img {
      width: 166px;
      height: 400px;
    }
  }

  @media (max-width: 576px) {
    .login-form-wrap {
      width: 450px;
    }
    .form-group input {
      border: 1px solid ${Color.primaryColor};
    }

    .login__left {
      width: 100%;
    }

    .login__right {
      display: none;
    }
  }
`;
