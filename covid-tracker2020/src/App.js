import React from 'react';
//import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Cards,Chart,CountryPicker} from './components';
import styles from './App.module.css';
import {fetchData, fetchIndo} from './api';

import coronaImage from './images/image.png';

class App extends React.Component {
    state = {
        data: {},
        dataIndo: {},
        country: '',
    }

    async componentDidMount(){
        const fetchedData = await fetchData();
        const fetchedIndonesia = await fetchIndo();
        this.setState({ data: fetchedData });
        this.setState({ dataIndo: fetchedIndonesia });
        //console.log(data);
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        // fetch the data
        //console.log(fetchedData);
        //console.log(country);
        // set the state
        this.setState({ data: fetchedData, country: country });        
    }

    render(){
        const { data, country, dataIndo } = this.state;
        return(
            <div className={styles.container}>
                <img classnames={styles.image} src={coronaImage} alt="COVID-19"/>
                <h2>Welcome to the COVID Tracker Web Application</h2>
                <h3>Pick a country</h3>
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Cards data={data}/>
                <Chart data={data} country={country}/>
          </div>
        )
    }
}
export default App;