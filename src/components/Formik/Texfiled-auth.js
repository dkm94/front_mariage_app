import React from 'react';
import { ErrorMessage, useField } from 'formik';
import "./style.css";

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  console.log(props)
  return (
    <div className={`textfield-style ${props.size}`}>
        <label htmlFor={field.name}>{label}</label>
        <input
            className={`input-style shadow-none ${meta.touched && meta.error}`}
            {...field} {...props}
            autoComplete="off"
        />
        <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  )
}

export default TextField;