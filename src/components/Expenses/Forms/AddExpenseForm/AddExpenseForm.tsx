import "./AddExpenseForm.css";

import React, { Dispatch, SetStateAction } from 'react';

import { FormikProvider, Form } from "formik";

import TextField from "../../../Formik/TextField-Operations";
import { ClearButton, CustomButton } from "../../../Buttons";

interface AddExpenseFormProps {
    formik: any;
    categories: any;
    mariageID: string;
    history: any;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const AddExpenseForm = (props: AddExpenseFormProps) => {
    const { formik, categories, mariageID, history, setOpenModal } = props;

    const handleCancel = () => {
    formik.resetForm();
    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/budget`, { currentPosition })
    setOpenModal(false);
    }

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
            size="medium"
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
            <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginTop: "5px"}}>
                <CustomButton
                variant="contained"
                type="submit"
                text={formik.isSubmitting ? "..." : "Valider"}
                borderRadius="5px"
                width="100%"
                disabled={formik.isSubmitting}
                />
                <ClearButton
                text={"Annuler"}     
                onClick={handleCancel}
                />
            </div>
        </Form>
    </FormikProvider>
  )
}

export default AddExpenseForm