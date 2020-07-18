import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import Moment from 'moment';

import styles from './Chart.module.css';

const Chart = ({ data: {confirmed, recovered, deaths }, country }) => {
    const [ dailyData, setDailyData ] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    }, [dailyData]);

    const lineChart = (
        dailyData.length
        ? (
        <Line 
            data={{
                labels: dailyData.map(({ date }) => {
                    const newdate = Moment(date).format('DD-MM-YY');
                    return newdate;
                }),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#E89E35',
                    backgroundColor: 'hsla(35, 80%, 56%, 0.1)',
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: '#b8491a',
                    backgroundColor: 'hsla(18, 75%, 41%, 0.301)',
                    fill: true,
                }],
            }}
        />) : null
    );

    const barChart = (
        confirmed
        ? (
            <Bar 
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            '#E89E35',
                            '#E47B39',
                            '#b8491a',
                        ],
                        data: [confirmed.value, recovered.value, deaths.value],
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current State in ${country}` },
                }}
            />
        ) : null
    );

    return(
        <div className={styles.container}>
            {country ? barChart : lineChart }
        </div>
    )
}

export default Chart;