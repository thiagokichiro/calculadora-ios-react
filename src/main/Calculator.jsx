import React, { Component } from "react";
import "./Calculator.css";
import Button from "../components/Button";
import Display from "../components/Display";
import "../components/Button.css";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  state = { ...initialState };

  constructor(props) {
    super(props);
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory(parametro) {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    /*
    Se estiver na primeira posição do array de valores da operação
      - seta o estado, enviando a operação selecionada
      - altera a posição current do array
      - altera clearDisplay para true, quando clicar em outro número limpará o display 
    */
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      //Se estivar na segunda posição do array de valores da operação
      // guarda se operação for =
      const equals = operation === "=";
      // guarda última operação clicada
      const currentOperation = this.state.operation;

      const values = [...this.state.values];
      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }

      // zera a segunda posição do array de números da operação
      values[1] = 0;

      // atualiza o estado
      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });

      console.log("última operação --> " + currentOperation);
    }
  }

  addDigit(n) {
    //valida para não ter dois pontos na calculadora
    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }

    //Evita zero a esquerda
    const clearDisplay =
      (this.state.displayValue === "0") | this.state.clearDisplay;
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    //concatena valores digitados no display
    const displayValue = currentValue + n;
    //atualiza o estado com valor digitado
    this.setState({ displayValue, clearDisplay: false });

    //valida se é número
    if (n !== ".") {
      // pega indice atual do array de values
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
      console.log("indice atual --> " + i);
      console.log("número digitado --> " + n);
      console.log("novo número (concatenado) --> " + newValue);
      console.log("números da operação --> " + values);
    }
  }

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.setOperation} operation />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}
