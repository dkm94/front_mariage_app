import "./style.css";

import React from 'react';
import { useField } from 'formik';

import { ITextfieldOperations } from '../../../types';

const TextField = ({ label, size, ...props}: ITextfieldOperations) => {
  const [field, meta] = useField(props);
  
  const { width, touched, errors, class: style } = props;

  return (
    <div className={`textfield-style ${size}`} style={{ width }}>
        <label htmlFor={field.name}>{label}</label>
        <input
            className={`input-style shadow-none ${style} ${meta.touched && meta.error}`}
            {...field} 
            {...props}
            autoComplete="off"
        />
        {/* <ErrorMessage component="div" name={field.name} className="error" /> */}
        {field.name === "description" ? (touched?.description &&
        errors?.description &&
        <div className="input-feedback error">{errors?.description}</div>) : 
        (touched?.price && errors?.price && <div className="input-feedback error">{errors?.price}</div>)
        }
    </div>
  )
}

export default TextField;