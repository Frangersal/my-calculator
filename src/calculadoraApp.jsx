import { useState } from 'react'

// Componente Display de la calculadora
function MyDisplay({ value }) {
    const showZero = 0
    if (value.length == 0) { value = showZero }
    return (<h2>{value}</h2>);
}
// Componente botones de los numeros
function MyButtonNumber({ number, sendNumber }) {
    const clickNumero = () => {
        console.log("Dio click al numero: " + number)
        // sin prev=>[...prev, se ira remplazando valor tras valor
 
        sendNumber(prev => [...prev, number])
    }
    return (
        <button
            className="btn btn-secondary btn-lg calculator-button"
            onClick={clickNumero}
        >
            <h3>{number}</h3>
        </button>
    );
}
//Componente Boton C Borrar todo
function MyButtonC({ sendNumber }) {
    const clickNumero = () => {
        console.log("Dio click a C")
        sendNumber([])
    }
    return (
        <button
            className="btn btn-secondary btn-lg calculator-button"
            onClick={clickNumero}>
            <h3>C</h3>
        </button>
    );
}
//Componente Boton < (BackSpace) Borrar ultimo numero
function MyButtonBackSpace({ sendNumber }) {
    const clickNumero = () => {
        console.log("Dio click a <")
        sendNumber(prev => prev.slice(0, -1));
    }
    return (
        <button
            className="btn btn-secondary btn-lg calculator-button"
            onClick={clickNumero}>
            <h3>{"<"}</h3>
        </button>
    );
}
//Componente Boton Operador / x - +
function MyButtonOperator({ numbers, sendNumber, operator, }) {
    const clickOperator = () => {

        // Si el largo es 0 y el operador es - (resta) agrega al estado
        // >> De forma que pueda operar con numeros negativos como primer parametro
        if (numbers.length === 0 && operator === "-") {
            console.log("Dio Click a operator " + operator)
            sendNumber(prev => [...prev, operator])
        }
        // Si el ultimo elemento del arr del estado es string y no es el primer elemento 
        // entonces remplazar el ultimo elemento del estado
        // >> De forma que pueda reemplazar el ultimo operador excepto si este es el primer elemento 
        // (con la condicion anterior nos aseguramos que solo pueda ser una resta (-))
        if (typeof numbers[numbers.length - 1] === "string" && numbers.length!=1) {
                console.log("Dio Click a operator " + operator + " reemplazara")
                sendNumber(prev => [...prev.slice(0, -1), operator])
        }
        if (typeof numbers[numbers.length - 1] === "number") {
            console.log("Dio Click a operator " + operator)
            sendNumber(prev => [...prev, operator])
        }




    }
    return (
        <button
            className="btn btn-secondary btn-lg calculator-button"
            onClick={clickOperator}
        >
            {operator}
        </button>
    );
}
//Componente Boton = equals
function MyButtonEquals({ numbers, sendNumber, operator }) {
    const clickEquals = () => {
        console.log("El pendejo dio click en ="+numbers.length)
        if (numbers.length === 0) {
            console.log("= No ma' pendejo, ¡Esta vacio!")
        }
        if (typeof numbers[numbers.length-1] === "string") {
            console.log("= No ma' pendejo, ¡Termina la operación!")
        } else {
            const equationArr = []
            for (let index = 0; index < numbers.length; index++) {
                const element = numbers[index];
                if (element === "x") {
                    equationArr.push("*")
                } else {
                    equationArr.push(element)
                }
            }
            const equation = equationArr.join("")
            console.log("Equation exit: " + equation)
            console.log("Resultado exit: " + eval(equation))
        }
    }
    return (
        <button
            className="btn btn-secondary btn-lg calculator-button"
            onClick={clickEquals}
        >
            {operator}
        </button>)
}

// Componente Padre <<<=== 
export const CalculadoraApp = () => {

    // State Hooks
    const [numbers, setNumbers] = useState([]);
    console.log(numbers)

    return <>

        <div className="calculator-container text-center">

            <h1>Calculadora</h1>
            <div className="calculator-display">
                <MyDisplay value={numbers} />
            </div>

            <div className="row calculator-row">
                <div className="col">
                    <MyButtonC sendNumber={setNumbers} />
                </div>
                <div className="col">
                    <MyButtonBackSpace sendNumber={setNumbers} />
                </div>
                <div className="col">
                    <button className="btn btn-secondary btn-lg calculator-button">
                        %
                    </button>
                </div>
                <div className="col">
                    <MyButtonOperator
                        sendNumber={setNumbers}
                        numbers={numbers}
                        operator={"/"} />
                </div>
            </div>

            <div className="row calculator-row">
                <div className="col">
                    <MyButtonNumber sendNumber={setNumbers} number={7} />
                </div>
                <div className="col">
                    <MyButtonNumber sendNumber={setNumbers} number={8} />
                </div>
                <div className="col">
                    <MyButtonNumber sendNumber={setNumbers} number={9} />
                </div>
                <div className="col">
                    <MyButtonOperator
                        sendNumber={setNumbers}
                        numbers={numbers}
                        operator={"x"} />
                </div>
            </div>


            <div className="row calculator-row">
                <div className="col">
                    <MyButtonNumber sendNumber={setNumbers} number={4} />
                </div>
                <div className="col">
                    <MyButtonNumber sendNumber={setNumbers} number={5} />
                </div>
                <div className="col">
                    <MyButtonNumber sendNumber={setNumbers} number={6} />
                </div>
                <div className="col">
                    <MyButtonOperator
                        sendNumber={setNumbers}
                        numbers={numbers}
                        operator={"-"} />
                </div>
            </div>


            <div className="row calculator-row">
                <div className="col">
                    <MyButtonNumber sendNumber={setNumbers} number={1} />
                </div>
                <div className="col">
                    <MyButtonNumber sendNumber={setNumbers} number={2} />
                </div>
                <div className="col">
                    <MyButtonNumber sendNumber={setNumbers} number={3} />
                </div>
                <div className="col">
                    <MyButtonOperator
                        sendNumber={setNumbers}
                        numbers={numbers}
                        operator={"+"} />
                </div>
            </div>


            <div className="row calculator-row">
                <div className="col">
                    <button className="btn btn-secondary btn-lg calculator-button">
                        +/-
                    </button>
                </div>
                <div className="col">
                    <MyButtonNumber sendNumber={setNumbers} number={0} />
                </div>
                <div className="col">
                    <button className="btn btn-secondary btn-lg calculator-button">
                        .
                    </button>
                </div>
                <div className="col">
                    <MyButtonEquals
                        sendNumber={setNumbers}
                        numbers={numbers}
                        operator={"="} />
                </div>
            </div>


        </div>

    </>
}