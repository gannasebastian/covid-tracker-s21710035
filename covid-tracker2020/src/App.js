import React from 'react';

import {Cards,Chart,CountryPicker} from './components';
import styles from './App.module.css';
import { fetchData } from './api';

import coronaImage from './images/image.png';

class App extends React.Component {
    state = {
        data: {},
        country: '',
    }

    async componentDidMount(){
        const fetchedData = await fetchData();
        
        this.setState({ data: fetchedData });
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
        const { data, country } = this.state;
        return(
            <div className={styles.container}>
                <img classnames={styles.image} src={coronaImage} alt="COVID-19"/>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country}/>
            </div>
        )
    }
}
export default App;