import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import CalcButton from "./components/CalcButton";
import { useState } from "react";

export default function Calc() {
  const [result, setResult] = useState("0");
  const [expression, setExpression] = useState("");
  const [memory, setMemory] = useState<number | null>(null);

  const onOperationPress = (title: string, data?: string) => {
    switch (data) {
      case "backspace":
        if (result.length > 1) {
          setResult(result.slice(0, -1));
        } else {
          setResult("0");
        }
        break;
      case "clear":
        setResult("0");
        setExpression("");
        break;
      case "clearEntry": {
        if (result === "Error") {
          setResult("0");
          break;
        }
        if (/[0-9.]+$/.test(result)) {
          setResult(result.replace(/[0-9.]+$/, ""));
        } else if (/[+\-*/]$/.test(result)) {
          setResult(result.slice(0, -1));
        } else if (/^[0-9.]+$/.test(result)) {
          setResult("0");
        }
        break;
      }
      case "add":
      case "sub":
      case "mul":
      case "div": {
        const operators = /[+\-*/]$/;
        if (operators.test(result)) {
          setResult(result.slice(0, -1) + operatorSymbol(data));
        } else {
          setResult(result + operatorSymbol(data));
        }
        break;
      }
      case "square": {
        const match = result.match(/(.+?)([+\-*/])([0-9.]+)$/);
        if (match) {
          const left = match[1];
          const operator = match[2];
          const right = parseFloat(match[3]);
          if (!isNaN(right)) {
            setResult(left + operator + (right ** 2));
          }
        } else {
          const val = parseFloat(result);
          if (!isNaN(val)) setResult((val ** 2).toString());
        }
        break;
      }
      case "sqrt": {
        const match = result.match(/(.+?)([+\-*/])([0-9.]+)$/);
        if (match) {
          const left = match[1];
          const operator = match[2];
          const right = parseFloat(match[3]);
          if (!isNaN(right)) {
            setResult(left + operator + Math.sqrt(right));
          }
        } else {
          const val = parseFloat(result);
          if (!isNaN(val)) setResult(Math.sqrt(val).toString());
        }
        break;
      }
      case "inverse": {
        const match = result.match(/(.+?)([+\-*/])([0-9.]+)$/);
        if (match) {
          const left = match[1];
          const operator = match[2];
          const right = parseFloat(match[3]);
          if (!isNaN(right) && right !== 0) {
            setResult(left + operator + (1 / right));
          }
        } else {
          const val = parseFloat(result);
          if (!isNaN(val) && val !== 0) setResult((1 / val).toString());
        }
        break;
      }
      case "percent": {
        const regex = /(.+?)([+\-*/])([0-9.]+)$/;
        const match = result.match(regex);
        if (match) {
          const leftExpr = match[1];
          const operator = match[2];
          const right = parseFloat(match[3]);
          const prevNumberMatch = leftExpr.match(/([0-9.]+)$/);
          if (prevNumberMatch) {
            const base = parseFloat(prevNumberMatch[1]);
            const percent = (base * right) / 100;
            setResult(leftExpr + operator + percent);
          }
        } else {
          const val = parseFloat(result);
          if (!isNaN(val)) setResult((val / 100).toString());
        }
        break;
      }
      case "equal": {
        try {
          let sanitized = result.replace(/,/g, ".").replace(/[^0-9+\-*/().]/g, "");
          if (/[+\-*/]$/.test(sanitized)) {
            sanitized = sanitized.slice(0, -1);
          }
          const evalResult = eval(sanitized);
          setExpression(result);
          setResult(evalResult.toString());
        } catch (e) {
          setExpression(result);
          setResult("Error");
        }
        break;
      }
    }
  };

  const onMemoryRecall = () => {
    if (memory === null) return;
    if (result === "0" || result === "Error") {
      setResult(memory.toString());
    } else {
      setResult(result + memory.toString());
    }
  };

  const operatorSymbol = (data: string) => {
    switch (data) {
      case "add": return "+";
      case "sub": return "-";
      case "mul": return "*";
      case "div": return "/";
      default: return "";
    }
  };

  const onDigitPress = (title: string) => {
    if (result === "0" || result === "Error") setResult(title);
    else setResult(result + title);
  };

  const onDotPress = () => {
    const parts = result.split(/[+\-*/]/);
    const last = parts[parts.length - 1];
    if (!last.includes(".")) setResult(result + ".");
  };

  const onPmPress = () => {
    const val = parseFloat(result);
    if (!isNaN(val)) setResult((-val).toString());
  };

  const renderButtons = () => (
    <>
      <View style={styles.memoryRow}>
        <CalcButton title="MC" action={() => setMemory(null)} memoryButton style={styles.memoryButton} />
        <CalcButton title="MR" action={onMemoryRecall} memoryButton style={styles.memoryButton} />
        <CalcButton title="MS" action={() => setMemory(parseFloat(result))} memoryButton style={styles.memoryButton} />
        <CalcButton title="M+" action={() => setMemory((m) => (m ?? 0) + parseFloat(result))} memoryButton style={styles.memoryButton} />
        <CalcButton title="M-" action={() => setMemory((m) => (m ?? 0) - parseFloat(result))} memoryButton style={styles.memoryButton} />
      </View>
      <View style={styles.calcButtonRow}>
        <CalcButton title="%" action={onOperationPress} data="percent" />
        <CalcButton title="CE" action={onOperationPress} data="clearEntry" />
        <CalcButton title="C" action={onOperationPress} data="clear" />
        <CalcButton title={"\u232B"} action={onOperationPress} data="backspace" />
      </View>
      <View style={styles.calcButtonRow}>
        <CalcButton title={'\u00B9/\u{1D465}'} action={onOperationPress} data="inverse" />
        <CalcButton title={'\u{1D465}\u00B2'} action={onOperationPress} data="square" />
        <CalcButton title={'\u221A\u{1D465}\u0305'} action={onOperationPress} data="sqrt" />
        <CalcButton title={'\u00F7'} action={onOperationPress} data="div" />
      </View>
      <View style={styles.calcButtonRow}>
        <CalcButton title="7" type="digit" action={onDigitPress} />
        <CalcButton title="8" type="digit" action={onDigitPress} />
        <CalcButton title="9" type="digit" action={onDigitPress} />
        <CalcButton title={'\u00D7'} action={onOperationPress} data="mul" />
      </View>
      <View style={styles.calcButtonRow}>
        <CalcButton title="4" type="digit" action={onDigitPress} />
        <CalcButton title="5" type="digit" action={onDigitPress} />
        <CalcButton title="6" type="digit" action={onDigitPress} />
        <CalcButton title={'\uFF0D'} action={onOperationPress} data="sub" />
      </View>
      <View style={styles.calcButtonRow}>
        <CalcButton title="1" type="digit" action={onDigitPress} />
        <CalcButton title="2" type="digit" action={onDigitPress} />
        <CalcButton title="3" type="digit" action={onDigitPress} />
        <CalcButton title={'\uFF0B'} action={onOperationPress} data="add" />
      </View>
      <View style={styles.calcButtonRow}>
        <CalcButton title={'\u00B1'} type="digit" action={onPmPress} />
        <CalcButton title="0" type="digit" action={onDigitPress} />
        <CalcButton title="," type="digit" action={onDotPress} />
        <CalcButton title={'\uFF1D'} type="equal" action={onOperationPress} data="equal" />
      </View>
    </>
  );

  return (
    <View style={styles.calcContainer}>
      <Text style={styles.title}>Калькулятор</Text>
      <Text style={styles.expression}>{expression}</Text>
      <Text style={styles.result}>{result}</Text>
      {renderButtons()}
    </View>
  );
}

const styles = StyleSheet.create({
  calcContainer: {
    backgroundColor: "#202020",
    flex: 1,
    flexDirection: "column",
    width: "100%"
  },
  title: {
    color: "#ffffff",
    margin: 10,
  },
  expression: {
    color: "#A6A6A6",
    marginHorizontal: 6,
    textAlign: "right",
    fontSize: 20,
  },
  result: {
    color: "#ffffff",
    marginHorizontal: 6,
    textAlign: "right",
    fontSize: 30,
    fontWeight: "700",
  },
  calcButtonRow: {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
  flex: 1,
  paddingHorizontal: 3,
  },
  memoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 3,
    paddingVertical: 5,
  },
  memoryButton: {
    backgroundColor: "transparent",
    color: "#ccc"
  }
});
