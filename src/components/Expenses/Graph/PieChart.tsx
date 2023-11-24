import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./PieChart.css";
import { BlackButton } from "../../Buttons";
import Modal from "../../Modals/PieChart.jsx";

const PieChart = ({ operations }) => {
  const [visible, setVisible] = useState(false);
  // Permet de supprimer les doublons 'keys' et additionner les 'values' en cas de doublons. Output: un tableau d'objets "result" avec les deux propriétés selectionnées -category et -price: un tableau d'objets avec une key "category" et une value 'price'.
  var result = [];
  Array.from(new Set(operations.map((x) => x.category))).forEach((x) => {
    result.push(
      operations
        .filter((y) => y.category === x)
        .reduce((output, item) => {
          let val = output[x] === undefined ? 0 : output[x];
          output[x] = item.price / 100 + val;
          return output;
        }, {})
    );
  });

  // Output: un tableau où chaque key est un tableau. ==> [[], [], []]
  const keys = result.map((item) => Object.keys(item));
  // Permet de fusionner tous les tableaux pour n'en former qu'un seul.
  const flatKeys = keys.flat();
  // Output: un tableau où chaque value est un tableau. ==> [[], [], []]
  const values = result.map((item) => Object.values(item));
  // Permet de fusionner tous les tableaux pour n'en former qu'un seul.
  const flatValues = values.flat();

  const categoryColor = flatKeys.map((category) => {
    switch (category) {
      case "Locations":
        return "#D8C7EB";
      case "Habillement/Beauté":
        return "#A8D4DD";
      case "Décoration/Fleurs":
        return "#FFEC52";
      case "Alliances/Bijoux":
        return "#F8DDA8";
      case "Animation":
        return "#FEDEE2";
      case "Traiteur":
        return "#B6DCB5";
      case "Faire-part":
        return "#C4BEA1";
      default:
        return "#E1E1E1";
    }
  });

  const state = {
    labels: flatKeys,
    datasets: [
      {
        label: "Dépenses",
        backgroundColor: categoryColor,
        data: flatValues,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="pie">
      <div style={{ display: "flex", justifyContent: "end" }}>
        <BlackButton
          variant={"contained"}
          text={"Afficher le graphique"}
          style={{ backgroundColor: "#BCBCAD" }}
          onClick={() => setVisible(!visible)}
        />
      </div>
      <Modal
        open={visible}
        setOpen={setVisible}
        close={() => {
          setVisible(false);
        }}
      >
        <Pie data={state} options={options} />
      </Modal>
      {/* <Collapse in={visible}>
        <Pie data={state} options={options} />
      </Collapse> */}
    </div>
  );
};

export default PieChart;
