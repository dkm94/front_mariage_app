import "./Budget.css";

import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { Form, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";

import Grow from "@mui/material/Grow";

import PieChart from "../../components/Expenses/Graph/PieChart";
import TextField from "../../components/Formik/TextField-Operations";
import Expenses from "./Dépenses/Dépenses";
import SearchBar from "../../components/Invités(affichage)/by_guests/Components/SearchBar/SearchBar";
import { GreyButton } from "../../components/Buttons";

import { OperationType } from "../../../types/index";
import { floatToEuro } from "../../helpers/formatCurrency";
import { useFetch } from "../../hooks";
import { getOperations } from "../../services";
import ContentLayout from "../../components/LayoutPage/ContentLayout/ContentLayout";


const Budget = () => {
  const newOperationValues: OperationType = {
    category: "",
    price: "",
    description: "",
  };

  const [searchValue, setSearchValue] = useState<string>("");
  const [total, setTotal] = useState<string>("");

  const [edit, setEdit] = useState<OperationType | null>(null);

  const { data: operations, setData: setOperations, loading } = useFetch<void, OperationType[]>(getOperations, []);

  useEffect(() => {
    if (operations.length > 0) {
      calculateTotal(operations);
    }
  }, [operations])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const editExpense = async ({ expense }: { expense: OperationType}): Promise<void> => {
    let { _id, category, description, price } = expense;

    const updatedExpenses: OperationType[] = [...operations].map((obj) => {
      if (obj._id === _id) {
        obj.description = description;
        obj.price = price;
        obj.category = category;
      }
      return obj;
    });

    await axios
      .post<OperationType>(`/api/admin/budget/operations/edit/${_id}`, expense)
      .then((res) => {
        //todo: handle success message from the backend **TOAST**
        if (res.data != null) {
          setTimeout(() => {
            setOperations(updatedExpenses);
            calculateTotal(updatedExpenses);
            setEdit(null);
          }, 1000);
        }
      })
      .catch((err) => {
        //todo: handle error message from the backend **TOAST**
        console.log(err);
      });
  };

  const deleteExpense = async (id: string): Promise<void> => {
    await axios
      .delete(`/api/admin/budget/operations/delete/${id}`)
      .then((res) => {
        if (res.data != null) {
          const updatedExpenses: OperationType[] | [] = operations.filter(
            (operation: OperationType) => operation._id !== id
          );
          setOperations(updatedExpenses);
          calculateTotal(updatedExpenses);
          setEdit(null);
          //todo: handle success message from the backend **TOAST**

        }
      })
      .catch((err) => {
        //todo: handle error message from the backend **TOAST**

        console.log(err);
      });
  };

  const operationValidationSchema = Yup.object().shape({
    category: Yup.string().required("Veuillez choisir une catégorie."),
    price: Yup.number()
      .test("maxDigitsAfterDecimal", "Format invalide.", (value) => {
        if (value !== undefined) {
          const regex = /^\d+(\.\d{1,2})?$/;
          return regex.test(value.toString());
        }
        return true;
      })
      .required("Veuillez compléter ce champ."),
    description: Yup.string()
      .max(300, "La description ne peut dépasser 300 caractères.")
      .required("Veuillez compléter ce champ."),
  });

  const formik = useFormik({
    initialValues: newOperationValues,
    onSubmit: async (values) => {
      await axios
        .post(`/api/admin/budget/operations/add`, {
          category: values.category,
          price: values.price,
          description: values.description,
        })
        .then((res) => {
          const newOperation = res.data;
          const expensesCopy = [...operations]
          setOperations([...expensesCopy, newOperation]);
          calculateTotal([...expensesCopy, newOperation]);
          formik.resetForm();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    validationSchema: operationValidationSchema,
    enableReinitialize: true,
  });

  function calculateTotal(operations: OperationType[]) {
    if (operations.length > 0) {
      const getSums = operations?.map((op) => Number(op.price));
      const add = getSums.reduce((a, b) => a + b);
      const p = add / 100;
      setTotal(floatToEuro(p));
    } else {
      setTotal("")
    }
  }

  return (
    <ContentLayout loading={loading} title={"Souhaitez-vous ajouter une nouvelle dépense ?"} src={"budget"} >
      <Grow in={!loading} timeout={2000}>
        <Container style={{ padding: "2rem 4rem" }} fluid>
          <Row>
            <Col xs={12} sm={10} md={6} />
            <Col
              xs={12}
              sm={10}
              md={6}
              style={{ display: "flex", justifyContent: "end" }}
            >
              <SearchBar
                className="search__input"
                type="text"
                placeholder="Rechercher une dépense"
                name="searchbar"
                value={searchValue}
                onChange={handleSearch}
              />
            </Col>
          </Row>
        </Container>
      </Grow>

      <Grow in={!loading} timeout={3000}>
        <div className="budget-cols">
          <div className="budget___col-1">
            <div className="col card-expense-component">
              <div className="card" style={{ backgroundColor: "#fff" }}>
                <div className="g-0">
                  <div className="card-pd">
                    <div className="card-body">
                      <h5
                        style={{
                          textTransform: "uppercase",
                        }}
                        className="card-title"
                      >
                        Dépenses
                      </h5>
                      <span>
                        {total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

                  <div className="col budget-form mb3">
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
                      <option
                        value=""
                        label="Sélectionnez une catégorie"
                      ></option>
                      <option
                        value="Locations"
                        label="Locations"
                      ></option>
                      <option
                        value="Habillement/Beauté"
                        label="Habillement/Beauté"
                      ></option>
                      <option
                        value="Décoration/Fleurs"
                        label="Décoration/Fleurs"
                      ></option>
                      <option
                        value="Alliances/Bijoux"
                        label="Alliances/Bijoux"
                      ></option>
                      <option
                        value="Animation"
                        label="Animation (DJ, Photographe...)"
                      ></option>
                      <option value="Traiteur" label="Traiteur"></option>
                      <option
                        value="Faire-part"
                        label="Faire-part"
                      ></option>
                      <option value="Autres" label="Autres"></option>
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
                    // label="Description"
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
              </div>
                
          </div>
          {operations.length > 0 && <div className="col chart-component">
            <PieChart operations={operations} />
          </div>}
          <div className="budget___col-2">
            <Expenses
              expenses={operations}
              deleteExpense={deleteExpense}
              searchValue={searchValue}
              edit={edit}
              setEdit={setEdit}
              updateExpense={editExpense}
              handleChange={formik?.handleChange}
            />
          </div>
        </div>
      </Grow>
    </ContentLayout>
  );
};

export default Budget;
