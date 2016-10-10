import React from 'react';

const MacroTable = (props) => {

  const macroAverage = {
    fat: 0,
    carb: 0,
    prot: 0,
    fib: 0,
    n6: 0
  };
  for(var total of props.actualMacros) {
    macroAverage.fat = macroAverage.fat+total.fat;
    macroAverage.carb = macroAverage.carb+total.carb;
    macroAverage.prot = macroAverage.prot+total.prot;
    macroAverage.fib = macroAverage.fib+total.fib;
    macroAverage.n6 = macroAverage.n6+total.n6;
  }
  for(var macro in macroAverage) {
    macroAverage[macro] = +(macroAverage[macro]/(props.actualMacros.length||1)).toFixed(4);
  }

  return (
    <table className="table">
      <tbody>
        <tr>
          <th>Macronutrient</th>
          <th>Ideal</th>
          <th>Average</th>
        </tr>
        <tr>
          <td>Fats</td>
          <td>{props.idealMacros.fat}g</td>
          <td>{macroAverage.fat}g</td>
        </tr>
        <tr>
          <td>Carbohydrates</td>
          <td>{props.idealMacros.carb}g</td>
          <td>{macroAverage.carb}g</td>
        </tr>
        <tr>
          <td>Protein</td>
          <td>{props.idealMacros.prot}g</td>
          <td>{macroAverage.prot}g</td>
        </tr>
        <tr>
          <td>Fiber</td>
          <td>{props.idealMacros.fib}g</td>
          <td>{macroAverage.fib}g</td>
        </tr>
        <tr>
          <td>n-6</td>
          <td>{props.idealMacros.n6}g</td>
          <td>{macroAverage.n6}g</td>
        </tr>
      </tbody>
    </table>
  );

}

export default MacroTable;
