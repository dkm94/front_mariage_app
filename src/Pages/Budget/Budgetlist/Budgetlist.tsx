import React, { Dispatch, SetStateAction } from 'react';

import ExpenseElement from '../../../components/Expenses/Table/ExpenseElement/ExpenseElement';

import { OperationType } from '../../../../types';

interface ExpenselistProps {
    headerItems: string[];
    operations: OperationType[];
    searchValue: string;
    edit: any;
    setEdit: any;
    setMessage: Dispatch<SetStateAction<string>>;
    setMessageType: Dispatch<SetStateAction<"error" | "success" | undefined>>;
    setOperations: Dispatch<SetStateAction<OperationType[]>>;
    calculateTotal: any;
    setOperationId: Dispatch<SetStateAction<string | null>>;
    checked: boolean;
    setChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

const Budgetlist = (props: ExpenselistProps) => {
    const { 
        headerItems, 
        operations, 
        searchValue, 
        edit, 
        setEdit,
        setMessage,
        setMessageType,
        setOperations,
        calculateTotal,
        setOperationId,
        checked,
        setChecked
    } = props;
    return (
        <section id="budgetlist-container">
            <div id="budgetlist-content">
            <div className="budget___col-2">
                <ul className="budget-list">
                <li className="table-header">
                    {headerItems.map((item: string, index: number) => {
                    return (
                        <div key={index} className={`cols cols-${index + 1}`}>
                        {item}
                        </div>
                    );
                    })}
                </li>
                {operations?.length === 0 && <div id="empty"><span>Vos dépenses ici</span></div>}
                {operations
                    ?.filter((expense) => {
                    return (
                        expense.description
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) >= 0
                    );
                    })
                    ?.reverse()
                    ?.map((obj) => {
                    return (
                        <ExpenseElement
                        key={obj._id}
                        obj={obj} 
                        edit={edit} 
                        setEdit={setEdit} 
                        setMessage={setMessage}
                        setMessageType={setMessageType}
                        operations={operations}
                        setOperations={setOperations}
                        calculateTotal={calculateTotal}
                        setOperationId={setOperationId}
                        checked={checked}
                        setChecked={setChecked}
                        />
                    );
                    })}
                </ul>
            </div>
            </div>
        </section>
    )
}

export default Budgetlist