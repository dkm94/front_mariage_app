import React from "react";
import Button from "../../../../components/LargeButton/LargeButton";
import "./Invitation-form.css";

const Form = () => {
    return(
        <div className="container">
            <div className="title title-style">
                <span>Créez votre faire-part de mariage</span>
            </div>
            <div className="row invitation-form">
                <div className="col-lg-8 col-lg-offset-2 ">
                    <form className="row g-3">
                        <div className="col-12">
                            <label htmlFor="inputAddress" className="form-label">Thème du mariage</label>
                            <input 
                            type="text" 
                            className="form-control"
                            placeholder="Exemple: La vie en rose"/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputEmail4" className="form-label">Epoux.se 1</label>
                            <input 
                            type="text" 
                            className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPassword4" className="form-label">Epoux.se 2</label>
                            <input 
                            type="text" 
                            className="form-control" />
                        </div>
                        <div class="mb-3">
                            <label htmlFor="formFile" className="form-label">Photo de mariage</label>
                            <input 
                            className="form-control form-control" 
                            id="formFile" 
                            type="file" />
                        </div>
                        <div className="col-4">
                            <label htmlFor="inputAddress2" className="form-label">Date de l'évènement</label>
                            <input 
                            type="date" 
                            className="form-control"/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Informations complémentaires</label>
                            <textarea 
                                className="form-control" 
                                id="exampleFormControlTextarea1" 
                                rows="3"></textarea>
                        </div>
                        <div className="col-12">
                            <Button title="Valider"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form;