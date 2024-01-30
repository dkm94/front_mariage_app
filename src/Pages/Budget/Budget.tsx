import "./Budget.css";

import React, { useState, useEffect, ChangeEvent } from "react";
import { useFormik } from "formik";
import { Container, Row, Col } from "react-bootstrap";
import * as Yup from "yup";

import Grow from "@mui/material/Grow";

import PieChart from "../../components/Expenses/Graph/PieChart";
import Expenses from "./Dépenses/Dépenses";
import SearchBar from "../../components/Invités(affichage)/by_guests/Components/SearchBar/SearchBar";
import ContentLayout from "../../components/LayoutPage/ContentLayout/ContentLayout";
import PriceCard from "../../components/Expenses/PriceCard/PriceCard";
import AddExpenseForm from "../../components/Expenses/Forms/AddExpenseForm/AddExpenseForm";
import Toast from "../../components/Toast/Toast";

import { OperationType } from "../../../types/index";
import { floatToEuro } from "../../helpers/formatCurrency";
import { useFetch } from "../../hooks";
import { addOperation, deleteOperation, getOperations } from "../../services";
import { categories } from "../../data";

const operationValues: OperationType = {
  category: "",
  price: "",
  description: "",
};

const Budget = () => {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [messageType, setMessageType] = useState<"error" | "success" | undefined>(undefined);

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

  const deleteExpense = async (id: string): Promise<void> => {
    const response = await deleteOperation({ id })
    const { success, message } =  response;

    if(!success) {
      setMessageType("error");
      setMessage(message);
      return;
    }

    const updatedExpenses: OperationType[] | [] = operations.filter(
      (operation: OperationType) => operation._id !== id
    );
    setOperations(updatedExpenses);
    calculateTotal(updatedExpenses);
    setEdit(null);
  };

  const operationSchema = Yup.object().shape({
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
    initialValues: operationValues,
    onSubmit: async (values) => {
      const response = await addOperation({ category: values.category, price: values.price, description: values.description })
      const { success, message, data: newOperation } = response;

      if(!success) {
        setMessageType("error");
        setMessage(message);
        return;
      };

      const expensesCopy = [...operations]
      setOperations([...expensesCopy, newOperation]);
      calculateTotal([...expensesCopy, newOperation]);
      formik.resetForm();
    },
    validationSchema: operationSchema,
    enableReinitialize: true,
  });

  function calculateTotal(operations: OperationType[]): void {
    if (operations.length > 0) {
      const getSums: number[] = operations?.map((op) => Number(op.price));
      const add: number = getSums.reduce((a, b) => a + b);
      const p: number = add / 100;
      setTotal(floatToEuro(p));
    } else {
      setTotal("")
    }
  }

  return (
    <ContentLayout loading={loading} title={"Souhaitez-vous ajouter une nouvelle dépense ?"} src={"budget"} >
      <Toast message={message} messageType={messageType} />
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
              <PriceCard total={total} />
            </div>

            <div className="col budget-form mb3">
              <AddExpenseForm formik={formik} categories={categories} />
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
              setMessageType={setMessageType}
              setMessage={setMessage}
              setOperations={setOperations}
              calculateTotal={calculateTotal}
            />
          </div>
        </div>
      </Grow>
    </ContentLayout>
  );
};

export default Budget;
