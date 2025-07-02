import {StyleSheet,Text, Touchable, TouchableOpacity, View} from "react-native";

export default function Calc() {
  
  const onButtonPress = (title: string) => {
    console.log(title);
  };

  return  <View style={styles.calcContainer}>
            <Text style={styles.title}>Калькулятор</Text>
            <Text style={styles.expression}>22 + 33 =</Text>
            <Text style={styles.result}>55</Text>
          <View style={styles.calcButtonRow}>
          <CalcButton title="MC" type="memory"  action={onButtonPress} />
          <CalcButton title="MR" type="memory"  action={onButtonPress} />
          <CalcButton title="M+" type="memory"  action={onButtonPress} />
          <CalcButton title="M-" type="memory"  action={onButtonPress} />
          <CalcButton title="MS" type="memory"  action={onButtonPress} />
        </View>
        <View style={styles.calcButtonRow}>
          <CalcButton title={"\u0025"}   action={onButtonPress}/>
          <CalcButton title="CE"         action={onButtonPress}/>
          <CalcButton title="C"          action={onButtonPress}/>
          <CalcButton title={"\u232B"}   action={onButtonPress}/>
        </View>
        <View style={styles.calcButtonRow}>
          <CalcButton title={"x\u207B1"} action={onButtonPress}/>
          <CalcButton title={"x\u00B2"}  action={onButtonPress}/>
          <CalcButton title={"\u221A"}   action={onButtonPress}/>
          <CalcButton title={"\u00F7"}   action={onButtonPress}/>
        </View>
        <View style={styles.calcButtonRow}>
          <CalcButton title="7"        type="digit"  action={onButtonPress}/>
          <CalcButton title="8"        type="digit"  action={onButtonPress}/>
          <CalcButton title="9"        type="digit"  action={onButtonPress}/>
          <CalcButton title={"\u00D7"}               action={onButtonPress}/>
        </View>
        <View style={styles.calcButtonRow}>
          <CalcButton title="4"  type="digit"    action={onButtonPress}/>
          <CalcButton title="5"  type="digit"    action={onButtonPress}/>
          <CalcButton title="6"  type="digit"    action={onButtonPress}/>
          <CalcButton title="-"                  action={onButtonPress}/>
        </View>
        <View style={styles.calcButtonRow}>
          <CalcButton title="1"  type="digit"    action={onButtonPress}/>
          <CalcButton title="2"  type="digit"    action={onButtonPress}/>
          <CalcButton title="3"  type="digit"    action={onButtonPress}/>
          <CalcButton title="+"                  action={onButtonPress}/>
        </View>
        <View style={styles.calcButtonRow}>
          <CalcButton title="+/-"  type="digit"  action={onButtonPress}/>
          <CalcButton title="0"    type="digit"  action={onButtonPress}/>
          <CalcButton title=","    type="digit"  action={onButtonPress}/>
          <CalcButton title={"="}  type="equal"  action={onButtonPress}/>
        </View>
    </View>;
}



type CalcButtonData = {
  title: string;
  type?: string;
  action: (title:string, type?:string)  => any;
};

function CalcButton({ title, type, action }: CalcButtonData) {
  const buttonStyle = [
    styles.calcButton,
    type === 'equal' && styles.equalButton,
    type === 'memory' && styles.memoryButton,
    type === 'digit' && styles.digitButton,
  ];

  return (
    <TouchableOpacity onPress={() => action(title, type)} style={buttonStyle}>
      <Text style={styles.calcButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  calcButton: {
    backgroundColor: '#323232',
    borderRadius: 7,
    flex: 1,
    margin: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  calcButtonText: {
    color: '#ffffff',
    fontSize: 20,
   fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },

  calcContainer: {
    backgroundColor: '#202020',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    //justifyContent: 'center',
    //alignItems: 'stretch',
    width: '100%',
  },
  title: {
    color: '#ffffff',
    margin: 10,
  },
  expression: {
    color: '#A6A6A6',
    textAlign: 'right',
    margin: 10,
  },
  result: {
    color: '#ffffff',
    margin: 10,
    fontSize: 30,
    fontWeight: 700,
    textAlign: 'right',
  },
  calcButtonRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 3,
  },
  equalButton: {
  backgroundColor: '#2296f3',
  },
  memoryButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: '#ccc',
  },
  digitButton: {
  backgroundColor: '#3b3b3b',
},
});