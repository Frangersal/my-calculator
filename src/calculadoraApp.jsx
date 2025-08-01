import { useState } from 'react'

// Componente Display de la calculadora
function MyDisplay({ numbers, result, switchResult }) {
    //Si el largo de numbers es 0 entonces mostrar 0 por defeto
    const showZero = 0
    if (numbers.length == 0) { numbers = showZero }
    //true igual a que hay resultado
    if (switchResult == true) {
        return (<h2>{result}</h2>);
    } else {
        return (<h2>{numbers}</h2>);
    }
}
// Componente botones de los numeros
function MyButtonNumber({ number, numbers, sendNumber }) {
    const clickNumero = () => {
        console.log("Dio click al numero: " + number)
        if (!(number == 0 && numbers.length == 0)) {
            sendNumber(prev => [...prev, number])
        }
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
        if (typeof numbers[numbers.length - 1] === "string" && numbers.length != 1) {
            console.log("Dio Click a operator " + operator + " reemplazara")
            sendNumber(prev => [...prev.slice(0, -1), operator])
        }
        // Si el el ultimo tipo de dato del estado es un numero entonces
        // hay que agregarlo al estado.
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
function MyButtonEquals({ numbers, setResult, operator, setSwitchResult }) {
    const clickEquals = () => {
        console.log("El Usuario dio click en =" + numbers.length)
        if (numbers.length === 0) {
            console.log("= No ma' Usuario, ¡Esta vacio!")
        }
        if (typeof numbers[numbers.length - 1] === "string") {
            console.log("= No ma' Usuario, ¡Termina la operación!")
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
            const result = eval(equation)
            console.log("Resultado exit: " + result)
            setSwitchResult(true)
            setResult(result)
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
//Componente Boton C Borrar todo
function MyButtonC({ sendNumber, setSwitchResult }) {
    const clickNumero = () => {
        console.log("Dio click a C")
        setSwitchResult(false)
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

// Componente Padre <<<=== 
export const CalculadoraApp = () => {
    // State Hooks
    const [numbers, setNumbers] = useState([]);
    const [result, setResult] = useState();
    const [switchResult, setSwitchResult] = useState(false);

    return <>
        <div className="calculator-container text-center">

            <h1>Calculadora</h1>
            <div className="calculator-display">
                <MyDisplay numbers={numbers} result={result} switchResult={switchResult} />
            </div>

            <div className="row calculator-row">
                <div className="col">
                    <MyButtonC sendNumber={setNumbers} setSwitchResult={setSwitchResult} />
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
                    <MyButtonNumber
                        sendNumber={setNumbers}
                        numbers={numbers}
                        number={0} />
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
                        operator={"="}
                        setResult={setResult}
                        setSwitchResult={setSwitchResult}
                    />
                </div>
            </div>
        </div>
    </>
}