import React, { useState } from 'react';
import './form.css';
import FormSignin from './FormSignin';


const FormLogin = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className='form-container'>
        <div className='form-content-left'>
          <img className='form-logo' src='assets/img/logo/logo.png' alt='' />
          <img className='form-img' src='assets/img/icon/login.svg' alt='' />
        </div>
        <FormSignin/>
      </div>
    </>
  );
};

export default FormLogin;
