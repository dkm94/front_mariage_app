import React, { useState, useEffect, useContext } from "react";
import { Formik, Form, useFormik } from "formik";
import { Link } from "react-router-dom";
import PieChart from "../../components/Expenses/Graph/PieChart";
import TextField from "../../components/Formik/TextField-operations";
import { ScrollButtonContext } from "../../../src/App";
import Expenses from "./Dépenses/Dépenses";
import * as Yup from "yup";
import axios from "axios";

import "./Budget.css";
import SearchBar from "../../components/Invités(affichage)/by_guests/Components/SearchBar/SearchBar";
import BlackButton from "../../components/Buttons/Black/BlackButton";
import GreyButton from "../../components/Buttons/Grey/GreyButton";

const Budget = () => {
  const scrollBtn = useContext(ScrollButtonContext);

  const newOperationValues = {
    category: "",
    price: "",
    description: "",
  };

  const [operations, setOperations] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [operation, setOperation] = useState({});
  const [total, setTotal] = useState(null);

  const [edit, setEdit] = useState(null);
  console.log("🚀 ~ file: Budget.js:31 ~ Budget ~ edit:", edit);

  useEffect(() => {
    let operations = axios.get(`/api/admin/budget/operations/`);
    async function getDatas() {
      let res = await Promise.resolve(operations);
      setOperations(res.data);
      calculateTotal(res.data);
    }
    getDatas();
  }, []);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const editExpense = ({ expense }) => {
    let { _id, category, description, price } = expense;
    // console.log("🚀 ~ file: Budget.js:65 ~ editExpense ~ expense:", expense);
    // price = price * 100;
    // console.log("🚀 ~ file: Budget.js:65 ~ editExpense ~ expense:", expense);
    const updatedExpenses = [...operations].map((obj) => {
      if (obj._id === _id) {
        obj.description = description;
        obj.price = price;
        obj.category = category;
      }
      return obj;
    });
    axios
      .post(`/api/admin/budget/operations/edit/${_id}`, expense)
      .then((res) => {
        if (res.data != null) {
          setTimeout(() => {
            setOperations(updatedExpenses);
            calculateTotal(updatedExpenses);
            setEdit(null);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteExpense = async (id) => {
    await axios
      .delete(`/api/admin/budget/operations/delete/${id}`)
      .then((res) => {
        if (res.data != null) {
          const updatedExpenses = operations.filter(
            (operation) => operation._id !== id
          );
          setOperations(updatedExpenses);
          calculateTotal(updatedExpenses);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const operationValidationSchema = Yup.object().shape({
    category: Yup.string().required("Veuillez choisir une catégorie."),
    price: Yup.number()
      .test("maxDigitsAfterDecimal", "Format invalide.", (number) =>
        /^\d+(\.\d{1,2})?$/.test(number)
      )
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
          setOperation(res.data);
          const updatedExpenses = [...operations, res.data];
          setOperations([...operations, res.data]);
          calculateTotal(updatedExpenses);
          formik.resetForm({});
        })
        .catch((err) => {
          console.log(err);
        });
    },
    validationSchema: operationValidationSchema,
    enableReinitialize: true,
  });

  function calculateTotal(operations) {
    if (operations) {
      const getSums = operations?.map((op) => Number(op.price));
      const add = getSums.reduce((a, b) => a + b);
      const p = add / 100;
      const tot = p.toFixed(2);
      setTotal(tot);
    }
  }

  console.log(setEdit);

  return (
    <div className="budget-container page-component">
      {scrollBtn}
      <div className="page-location">
        <div>
          <Link to={"/"}>Dashboard</Link>
          {">"} Dépenses
        </div>
      </div>
      <div className="budget">
        <div className="titles mb-3">
          <h2>Souhaitez-vous ajouter une nouvelle dépense ?</h2>
        </div>
        <div className="budget___bgimage">
          <div className="component-title">
            <h1>Les dépenses</h1>
          </div>
        </div>
        <div className="budget-cols">
          <div className="budget___search">
            <div>
              <SearchBar
                className="search__input"
                type="text"
                placeholder="Rechercher une dépense"
                name="searchbar"
                value={searchValue}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="budget___col-1">
            <div className="col card-expense-component">
              <div className="card">
                <div className="g-0">
                  <div className="card-pd">
                    <div className="card-body">
                      <h5 className="card-title">
                        Dépenses <small>(en €)</small>
                      </h5>
                      <span>{total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Formik>
              <div className="col budget-form mb3">
                <Form
                  className="input-group mb-3"
                  style={{ display: "flex", flexDirection: "column" }}
                  onSubmit={formik.handleSubmit}
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
                      <option value="Locations" label="Locations"></option>
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
                      <option value="Faire-part" label="Faire-part"></option>
                      <option value="Autres" label="Autres"></option>
                    </select>
                    {formik.errors.category && formik.touched.category && (
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
                    className="form-control"
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
                    className="form-control"
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
                    />
                  </div>
                </Form>
              </div>
            </Formik>
          </div>
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
            <div
              className="col chart-component"
              style={{ width: "40%", height: 200 }}
            >
              <PieChart operations={operations} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
