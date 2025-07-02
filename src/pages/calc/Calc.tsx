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
          <CalcButton title="MC"         action={onButtonPress} />
          <CalcButton title="MR"         action={onButtonPress} />
          <CalcButton title="M+"         action={onButtonPress} />
          <CalcButton title="M-"         action={onButtonPress} />
          <CalcButton title="MS"         action={onButtonPress} />
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
          <CalcButton title="7"         action={onButtonPress}/>
          <CalcButton title="8"         action={onButtonPress}/>
          <CalcButton title="9"         action={onButtonPress}/>
          <CalcButton title={"\u00D7"}  action={onButtonPress}/>
        </View>
        <View style={styles.calcButtonRow}>
          <CalcButton title="4"         action={onButtonPress}/>
          <CalcButton title="5"         action={onButtonPress}/>
          <CalcButton title="6"         action={onButtonPress}/>
          <CalcButton title="-"         action={onButtonPress}/>
        </View>
        <View style={styles.calcButtonRow}>
          <CalcButton title="1"         action={onButtonPress}/>
          <CalcButton title="2"         action={onButtonPress}/>
          <CalcButton title="3"         action={onButtonPress}/>
          <CalcButton title="+"         action={onButtonPress}/>
        </View>
        <View style={styles.calcButtonRow}>
          <CalcButton title="+/-"         action={onButtonPress}/>
          <CalcButton title="0"        action={onButtonPress}/>
          <CalcButton title=","         action={onButtonPress}/>
          <CalcButton title={"="} action={onButtonPress}/>
        </View>
    </View>;
}



type CalcButtonData = {
  title: string;
  type?: string;
  action: (title:string, type?:string)  => any;
};

function CalcButton({title, type, action}: CalcButtonData) {
    return <TouchableOpacity onPress={() => action(title, type)} style={styles.calcButton}>
        <Text style={styles.calcButtonText}>{title}</Text>
    </TouchableOpacity>;
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
  }
});