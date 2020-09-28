import React, { Component } from 'react';
import axios from 'axios';

let APIKit = axios.create({
    baseURL: "we-dont-know-yet.com",
    timeout: 10000,
});

class APIKit extends Component {
 constructor(props) {
 super(props);
 this.state = {
 };
}

super(props) {
    this.state = {
        description : '',
        error: ''
    };
}

componentDidMount() {
    axios.get('./description.txt')
        .then((response) => {
            this.setState({
                description : response.data.description
            })
        }) 
        .catch((error) => {
            this.setState({
                error : error.response.data.errorMessage
            })
        })
}

render() {
    const { error, description } = this.state;
    return (
        <div>
            <p>Welcome to my Site!</p>
            <p>{error ? 'There was an error retrieving the description!' : description }</p>
        </div>
    );
}

}

export default Home;