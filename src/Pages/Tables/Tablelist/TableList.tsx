import "./style.css";

import React from 'react';

import { TableProps, TableType } from "../../../../types";

import Table from "../Table";

interface TableListProps extends TableProps {
    searchValue: string;
    setMessageTable: React.Dispatch<React.SetStateAction<string | undefined>>;
    setMessageTypeTable: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const TableList = (props: TableListProps) => {
    const {
        tables,
        searchValue,
        edit,
        handleUpdatedTable,
        input,
        setTables,
        guests,
        setGuests,
        setEdit,
        getUpdatedId,
        isOpen,
        setisOpen,
        setMessageTable,
        setMessageTypeTable,
        setTable,
        checked,
        setChecked
    } = props;
  return (
    <section id="tablelist-container">        
        <div id="tablelist-content">
            {tables
            .sort((a:TableType, b:TableType) => {
                return a.name > b.name ? 1 : -1;
            })
            .filter((table) => {
                return (
                table.name
                    .toLowerCase()
                    .indexOf(searchValue.toLowerCase()) >= 0
                );
            })
            .map((table) => (
                <Table
                tables={tables}
                table={table}
                id={table._id}
                key={table._id}
                edit={edit}
                handleUpdatedTable={handleUpdatedTable}
                input={input}
                setTables={setTables}
                guests={guests}
                setGuests={setGuests}
                setEdit={setEdit}
                getUpdatedId={getUpdatedId}
                isOpen={isOpen}
                setisOpen={setisOpen}
                setMessage={setMessageTable}
                setMessageType={setMessageTypeTable}
                setTable={setTable}
                checked={checked}
                setChecked={setChecked}
                />
            ))}
        </div>
    </section>
  )
}

export default TableList