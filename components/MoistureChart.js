import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import * as api from "../services/Auth"
import { getMultipleMoisture } from '../services/Auth';

export default class MoistureChart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            labels: [],
        }
    }

    updatePlantData(){
        getMultipleMoisture(this.props.plant, 24).then(res =>{
            let data  = [];
            let labels = [];
            if(res.length){
                data = res.map(v => (v.moisture/4095)*100).reverse();
                labels = res.map(v => {
                    let d = new Date(v.datetime);
                    let hour = d.getHours();
                    let minute = d.getMinutes();
                    minute = (minute < 10 ? "0"+minute : minute);
                    return (hour > 12 ? (hour-12)+":"+minute+"PM" : hour+":"+minute+"AM");
                }).reverse()
            }

            this.setState({
                data,
                labels
            })
            
        });
    }

    componentDidMount(){
        this.updatePlantData();
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.plant !== prevProps.plant) {
            this.updatePlantData();
        }
    }

    render(){
        console.log(this.state)
        return(
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={{marginLeft: 10, color: "#375177", fontSize:24, alignSelf: "flex-start"}}> Moisture over the past 24 hours </Text>
                    </View>
                    {this.state.data.length > 1 ? 
                <LineChart 
                    data={{
                        labels: this.state.labels,
                        datasets: [
                            {
                                data: this.state.data,
                            }
                        ],
                    }}
                    width={Dimensions.get("window").width-40}
                    height={300}
                    yAxisInterval={1} // optional, defaults to 1
                    yAxisSuffix={"%"}
                    verticalLabelRotation={90}
                    
                    chartConfig={{
                        backgroundColor: "green",
                        backgroundGradientFrom: "white",
                        backgroundGradientTo: "white",
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(115, 227, 103, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(25, 76, 20, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "2",
                            strokeWidth: "2",
                            stroke: "#194C14"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                /> : <Text style={{ paddingLeft: 15 }}>No moisture data logged.</Text>}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    card:{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 2,  
      elevation: 2,
      backgroundColor:"white",
      borderRadius:15,
      paddingTop:10,
      paddingRight:10,
      paddingBottom: 10,
      marginVertical: 10,
    },
    profileImg:{
      width:30,
      height:30,
      borderRadius:50,
      marginRight:5,
    },
    header: {
      flexDirection:"row",
    }
});