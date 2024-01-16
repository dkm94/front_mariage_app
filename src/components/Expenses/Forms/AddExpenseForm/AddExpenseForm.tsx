import "./AddExpenseForm.css";

import React from 'react';

import { FormikProvider, Form } from "formik";

import TextField from "../../../Formik/TextField-Operations";
import { GreyButton } from "../../../Buttons";

interface AddExpenseFormProps {
    formik: any;
    categories: any;
}

const AddExpenseForm = (props: AddExpenseFormProps) => {
    const { formik, categories } = props;

  return (
    <FormikProvider value={formik}>
        <Form
            className="input-group mb-3"
            style={{ display: "flex", flexDirection: "column" }}
        >
            <div className="budget___select">
            <select
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            >
                {categories.map((category, index) => (
                    <option key={index} value={category.value} label={category.label}>
                    {category.label}
                    </option>
                ))}
            </select>
            {formik.errors.category &&
                formik.touched.category && (
                <div className="input-feedback error">
                    {formik.errors.category}
                </div>
                )}
            </div>
            <TextField
            size="40%"
            name="description"
            type="text"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            class="form-control"
            errors={formik.errors}
            touched={formik.touched}
            placeholder="Description"
            />
            <TextField
            size="20%"
            width="100%"
            name="price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            class="form-control"
            errors={formik.errors}
            touched={formik.touched}
            placeholder="Montant"
            border-radius="10px"
            />
            <div className="col-12 budget-form___submit">
                <GreyButton
                type="submit"
                text={"Valider"}
                variant={"contained"}
                disabled={formik.isSubmitting}
                size="medium"
                />
            </div>
        </Form>
    </FormikProvider>
  )
}

export default AddExpenseForm