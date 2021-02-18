import React from "react";
import "./Faire-part.css";

const Card = () => {
    return(
        <>
        <div className="wedding-img"></div>
        <div className="wedding-infos">
            <div className="wedding-intro info">
                <h3>Invitation</h3>
                <div className="intro">
                    <span>Vous êtes cordialement invité.e.s au mariage de</span><br />
                    <span className="name">Julie</span>
                    <span className="and">&</span>
                    <span className="name">Martin</span><br />
                    <span>qui aura lieu le</span><br />
                    <span className="manuscrit">Lundi 12 Novembre</span>
                </div>
            </div>
            <div className="where-when info">
                <h3>Lieu et horaires</h3>
                <div className="where-when-cols">
                    <div className="where-when-col">
                        <h4>Eglise</h4>
                        <p>Eglise de Chateau-Thierry</p>
                        <p>Lundi 12 Novembre</p>
                        <p>11h00</p>
                        <p>60 Rond-Point de la Madeleine, 68900</p>
                    </div>
                    <div className="where-when-col">
                        <h4>Réception</h4>
                        <p>Salle des Fêtes Louise Michel</p>
                        <p>Lundi 12 Novembre</p>
                        <p>13h00</p>
                        <p>60 Rond-Point de la Madeleine, 68900</p>
                    </div>
                    <div className="where-when-col">
                    <h4>Soirée</h4>
                        <p>Salle des Fêtes Louise Michel</p>
                        <p>Lundi 12 Novembre</p>
                        <p>20h00</p>
                        <p>60 Rond-Point de la Madeleine, 68900</p>
                    </div>
                </div>
            </div>
            <div className="additionnal-info info">
                <h3>Informations complémentaires</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, 
                pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. 
                Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, 
                in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent
                per conubia nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut 
                vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut, pulvinar vitae dolor.
                Integer eu nibh at nisi ullamcorper sagittis id vel leo. Integer feugiat 
                faucibus libero, at maximus nisl suscipit posuere. </p>
            </div>
        </div>
        </>
    )
}

export default Card;