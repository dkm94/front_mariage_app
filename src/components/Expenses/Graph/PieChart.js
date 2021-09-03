import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({operations}) => {

// Permet de supprimer les doublons 'keys' et additionner les 'values' en cas de doublons. Output: un tableau d'objets "result" avec les deux propriétés selectionnées -category et -price: un tableau d'objets avec une key "category" et une value 'price'.
var result = [];
Array.from(new Set(operations.map(x => x.category))).forEach(x => {
    result.push(operations.filter(y => y.category === x).reduce((output,item) => {
        let val = output[x] === undefined?0:output[x];
        output[x] =  (item.price/100 +  val); 
       return output;
    },{}));

 })

// Output: un tableau où chaque key est un tableau. ==> [[], [], []]
const keys = result.map(item => Object.keys(item));
// Permet de fusionner tous les tableaux pour n'en former qu'un seul.
const flatKeys = keys.flat();
// Output: un tableau où chaque value est un tableau. ==> [[], [], []]
const values = result.map(item => Object.values(item));
// Permet de fusionner tous les tableaux pour n'en former qu'un seul.
const flatValues = values.flat();

    const state = {
        labels: flatKeys,
        datasets: [
            {
                label: "Dépenses",
                backgroundColor: "pink",
                data: flatValues
            }
        ]
    }

    const options = {
        plugins: {
            legend: {
                display: true,
                position: "bottom"
            }
        }
    }

    return (
        <div className="pie">
            <Pie 
                data={state}
                options={options}
            />
        </div>
    )
}

export default PieChart;