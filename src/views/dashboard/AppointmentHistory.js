import React, { Component } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils'

export default class AppointmentHistory extends Component {
	createDateObject = () => {
		const { history } = this.props;
		let historyObject = history.map(e => ({year: e._id.year, month: e._id.month, count: e.count}));

		if (historyObject.length < 12) {
			const n = 12 - historyObject.length;
			const lastItem = historyObject.lastItem;
			let year = lastItem.year || new Date().getFullYear();
			let month = lastItem.month || new Date().getMonth() + 1;
			
			for (let i=0; i<n; i++) {
				month -= 1;

				if (month < 1) {
					month = 12;
					year -= 1;
				}

				historyObject = [...historyObject, {year, month, count: 0}]
			}
		}
		return historyObject.reverse();
	}

	getMonth = (n) => {
		// const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return monthNames[n-1];
	}

	getLabels = (data) => {
		let labels = [];
		for (let i=0; i<data.length; i++) {
			const label = this.getMonth(data[i].month) + " " + data[i].year;
			labels = [...labels, label];
		}
		return labels;
	}

	getValues = (data) => {
		let values = [];
		for (let i=0; i<data.length; i++) {
			const value = data[i].count;
			values = [...values, value];
		}
		return values;
	}

  render() {
    const data = this.createDateObject();
	
    return (
        <CCard className='mb-4'>
            <CCardHeader>
				Appointments Chart
            </CCardHeader>
            <CCardBody>
                <CChartLine
                    style={{ height: '300px', marginTop: '40px' }}
                    data={{
                        labels: this.getLabels(data),
                        datasets: [
                            {
                                label: 'Number of appointments',
                                backgroundColor: 'transparent',
                                borderColor: getStyle('--cui-success'),
                                pointHoverBackgroundColor: getStyle('--cui-success'),
                                borderWidth: 2,
                                data: this.getValues(data),
                                fill: true,
                            }
                        ]
                    }}
                    options={{
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        // scales: {
                        //   x: {
                        //     grid: {
                        //       drawOnChartArea: false,
                        //     },
                        //   },
                        //   y: {
                        //     ticks: {
                        //       beginAtZero: true,
                        //       maxTicksLimit: 5,
                        //       stepSize: Math.ceil(250 / 5),
                        //       max: 250,
                        //     },
                        //   },
                        // },
                        elements: {
                          line: {
                            tension: 0.4,
                          },
                          point: {
                            radius: 0,
                            hitRadius: 20,
                            hoverRadius: 4,
                            hoverBorderWidth: 3,
                          },
                        },
                      }}
                />
            </CCardBody>
        </CCard>
    )
  }
}
