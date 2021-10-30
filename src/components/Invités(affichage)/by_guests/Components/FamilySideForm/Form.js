import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Form.css";

const Form = ({ onSubmit }) => {
    // const [family, setFamily] = useState({
    //     firstPerson: "",
    //     secondPerson: ""
    // })
    // useEffect(() => {
    //     const fetchData = async () => {
    //         await axios.get(`/api/admin/wedding/${mariageId}`, {withCredentials: true})
    //             .then(res => {
    //                 setFamily({
    //                     firstPerson: res.data.firstPerson,
    //                     secondPerson: res.data.secondPerson
    //                 })
    //             })
    //             .catch(err => console.log(err))
    //     }
    //     fetchData()}, [mariageId])

    return(
        <form className="chose-family">
            <p>
                <input type="radio" id="test1" name="radio-group" />
                <label htmlFor="test1">Famille de </label>
            </p>
            <p>
                <input type="radio" id="test2" name="radio-group" />
                <label htmlFor="test2">Famille de</label>
            </p>
        </form>
    )
}

export default Form;