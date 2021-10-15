import React from 'react';
import { useField } from 'formik';
import "./style.css";

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={`textfield-style ${props.size}`} style={{width: props.width}}>
        <label htmlFor={field.name}>{label}</label>
        <input
            className={`input-style shadow-none ${meta.touched && meta.error}`}
            style={{width: props.inputwidth}}
            {...field} {...props}
            autoComplete="off"
        />
        {/* <ErrorMessage component="div" name={field.name} className="error" /> */}
        {field.name === "description" ? (props.touched.description &&
        props.errors.description &&
        <div className="input-feedback error">
        {props.errors.description}
        </div>) : (props.touched.price &&
          props.errors.price &&
          <div className="input-feedback error">
          {props.errors.price}
          </div>)}
    </div>
  )
}

export default TextField;