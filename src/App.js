import React from 'react';

import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import { Typography } from '@material-ui/core';

// import {Cards, Chart, CountryPicker} from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import coronaImage from './images/logo.png';
import Footer from './components/Footer/Footer';

class App extends React.Component {

    state = {
        data: {},
        country: '',
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({data:fetchedData});
    }

    handleCountryChange = async (country) => {
        // fetch the data
        const fetchedData = await fetchData(country);

        // set the state
        this.setState({ data: fetchedData, country: country });
    }

    render() {
        const { data, country } = this.state;

        return(
            <div className={styles.container}>
                <Typography variant='h1' className={styles.heading}>
                    <div className={styles.head}>C<img className={styles.image} src={coronaImage} alt="COVID-19"/>VID</div>
                </Typography>
                <br />
                <Cards data={data} />
                <br />
                <br />
                <br />
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <br />
                <br />
                <Chart data={data} country={country}/>
                <br />
                <br />
                <br />
                <Footer/>
            </div>
        );
    }
}

export default App;