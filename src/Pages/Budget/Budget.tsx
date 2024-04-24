import "./Budget.css";

import React, { useState, useEffect, ChangeEvent } from "react";
import { useHistory } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";

import Grow from "@mui/material/Grow";

import PieChart from "../../components/Expenses/Graph/PieChart";
import SearchBar from "../Guests/SearchBar/SearchBar";
import ContentLayout from "../../components/LayoutPage/ContentLayout/ContentLayout";
import PriceCard from "../../components/Expenses/PriceCard/PriceCard";
import AddExpenseForm from "../../components/Expenses/Forms/AddExpenseForm/AddExpenseForm";
import ExpenseElement from "../../components/Expenses/Table/ExpenseElement/ExpenseElement";
import DefaultModal from "../../components/Modals/Default/DefaultModal";
import { AddButton } from "../../components/Buttons";
import { SwitchEditMode } from "../../components/Buttons";

import { OperationType } from "../../../types/index";
import { floatToEuro } from "../../helpers/formatCurrency";
import { useFetch } from "../../hooks";
import { addOperation, getOperations } from "../../services";
import { categories, headerItems } from "../../data";
import { useCurrentUser } from "../../ctx/userCtx";
import Budgetlist from "./Budgetlist/Budgetlist";

const operationValues: OperationType = {
  category: "",
  price: "",
  description: "",
};

const Budget = () => {
  const history = useHistory<any>();
  const{ mariageID } = useCurrentUser();

  const [searchValue, setSearchValue] = useState<string>("");
  const [total, setTotal] = useState<string>("");
  const [operationId, setOperationId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [edit, setEdit] = useState<OperationType | null>(null);

  const { 
    data: operations, 
    setData: setOperations, 
    loading,
    message, 
    messageType,
    setMessage,
    setMessageType
  } = useFetch<void, OperationType[]>(getOperations, []);

  useEffect(() => {
    if (operations.length > 0) {
      calculateTotal(operations);
    }
  }, [operations]);

  const switchHandler = (event) => {
    setChecked(event.target.checked);
    setEdit(null);
    handleCloseModal();
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const operationSchema = Yup.object().shape({
    category: Yup.string().required("Veuillez choisir une catégorie."),
    price: Yup.number()
      .test("maxDigitsAfterDecimal", "Format invalide.", (value) => {
        if (value !== undefined) {
          const regex: RegExp = /^\d+(\.\d{1,2})?$/;
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

      const expensesCopy: OperationType[] = [...operations]
      setOperations([...expensesCopy, newOperation]);
      calculateTotal([...expensesCopy, newOperation]);
      formik.resetForm();
      setOpenModal(false);
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

  function handleModal(){
    setOpenModal(!openModal);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/budget`, { currentPosition } )
  }

  return (
    <ContentLayout 
    loading={loading} 
    title={"Souhaitez-vous ajouter une nouvelle dépense ?"} 
    src={"budget"} 
    message={message} 
    messageType={messageType}
    id={operationId || ""}
    >
      <Grow in={!loading} timeout={2000}>
        <div className="section-action-box">
          <SearchBar
            className="search__input"
            type="text"
            placeholder="Rechercher une dépense"
            name="searchbar"
            value={searchValue}
            onChange={handleSearch}
          />
          {openModal && <DefaultModal
            close={handleCloseModal}
            setOpen={handleModal}
            title={"Nouvelle dépense"}
            >
              <div id="add-expense-form">
              <AddExpenseForm 
              formik={formik} 
              categories={categories}
              mariageID={mariageID}
              history={history}
              setOpenModal={setOpenModal}
              />
            </div>
            </DefaultModal>}
          <AddButton onClick={handleModal} />
          <SwitchEditMode checked={checked} onChange={switchHandler} />

        </div>
      </Grow>

      <Grow in={!loading} timeout={3000}>
        <div className="">
          <div className="budget___col-1">
            <div className="col card-expense-component">
              <PriceCard total={total} />
            </div>
          </div>

          {operations.length > 0 && <div className="col chart-component">
            <PieChart operations={operations} />
          </div>}

          {operations && operations?.length > 0 && (
            <Budgetlist
            headerItems={headerItems}
            operations={operations}
            searchValue={searchValue}
            edit={edit}
            setEdit={setEdit}
            setMessage={setMessage}
            setMessageType={setMessageType}
            setOperations={setOperations}
            calculateTotal={calculateTotal}
            setOperationId={setOperationId}
            checked={checked} 
            setChecked={setChecked}           
      
            />
          )}
        </div>
      </Grow>
    </ContentLayout>
  );
};

export default Budget;
