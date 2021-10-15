import React from 'react';
import "../Formik/style.css";

const Input = ({ label, register, required }) => (
    <>
      <label>{label}</label>
      <input {...register(label, { required })} />
    </>
  );

  export default Input;