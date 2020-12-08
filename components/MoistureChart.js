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
            <View>
                {this.state.data.length > 1 ? 
               <LineChart data={{
                   labels: this.state.labels,
                   datasets: [
                       {
                           data: this.state.data,
                       }
                   ],
                }}
                width={Dimensions.get("window").width-10}
                height={400}
                yAxisInterval={1} // optional, defaults to 1
                yAxisSuffix={"%"}
                verticalLabelRotation={90}
                
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#ffa726",
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16
                  },
                  propsForDots: {
                    r: "3",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
             /> : <Text>No moisture data logged.</Text>}
            </View>
        )
    }
}