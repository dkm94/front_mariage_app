import React from 'react';
import { ErrorMessage, useField } from 'formik';
import "./style.css";

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={`textfield-style ${props.size}`}>
        {/* <label htmlFor={field.name}>{label}</label> */}
        <input
            className={`input-style shadow-none bd-radius ${meta.touched && meta.error}`}
            {...field} {...props}
            autoComplete="off"
            placeholder
            // borderRadius
        />
        <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  )
}

export default TextField;