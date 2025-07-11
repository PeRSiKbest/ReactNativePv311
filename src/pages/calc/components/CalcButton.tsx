import { StyleSheet, Text, TouchableOpacity } from "react-native";

type CalcButtonData = {
    title: string,
    type?: string,
    data?: string,
    action: (title: string, data?: string) => any,
    memoryButton?: boolean,
    style?: object,
};

export default function CalcButton({ title, type, data, action, memoryButton, style }: CalcButtonData) {
    return <TouchableOpacity
        onPress={() => action(title, data)}
        style={[
            styles.calcButton,
            memoryButton ? styles.memoryButton : (
                type == "digit" ? styles.digitButton
                : type == "equal" ? styles.equalButton
                : styles.operationButton
            ),
            style
        ]}>
        <Text style={
            type == "equal" ? styles.callcEqualText
            : memoryButton ? styles.memoryText
            : styles.calcButtonText
        }>{title}</Text>
    </TouchableOpacity>;
}

const styles = StyleSheet.create({
    calcButton: {
        borderRadius: 7,
        flex: 1,
        margin: 1.5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    calcButtonText: {
        color: "#FFFFFF",
        fontSize: 20,
    },
    callcEqualText: {
        color: "#323232",
        fontSize: 22,
    },
    operationButton: {
        backgroundColor: "#323232",
    },
    digitButton: {
        backgroundColor: "#3B3B3B",
    },
    equalButton: {
        backgroundColor: "#4CC2FF",
    },
    memoryButton: {
        backgroundColor: "transparent",
    },
    memoryText: {
        color: "#ccc",
        fontSize: 18,
    }
});
