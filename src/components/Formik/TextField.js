import React from 'react';
import { ErrorMessage, useField } from 'formik';

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  // console.log(props.value)
  return (
    props.rows ? <div className={props.size}>
    <label htmlFor={field.name}>{label}</label>
    <textarea
      className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
      {...field} {...props}
      autoComplete="off"
    />
    <ErrorMessage component="div" name={field.name} className="error" />
  </div> :
  <div className={props.size}>
  <label htmlFor={field.name}>{label}</label>
  <input
    className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
    {...field} {...props}
    autoComplete="off"
  />
  <ErrorMessage component="div" name={field.name} className="error" />
</div>
  )
}

export default TextField;