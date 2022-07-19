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

		const report = [];
		let date = new Date();

		for (let i=0; i<12; i++) {
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			const indexHistory = historyObject.findIndex(h => h.year === year && h.month === month);
			if (indexHistory >= 0) {
				report.push(historyObject[indexHistory])
			} else {
				report.push({year, month, count: 0})
			}
			date.setMonth(date.getMonth() - 1)
		}
		return report.reverse();
	}

	getMonth = (n) => {
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
									label: 'Appointments',
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
								legend: { display: false },
							},
							elements: {
								line: { tension: 0.4 },
								point: {
									radius: 0,
									hitRadius: 20,
									hoverRadius: 4,
									hoverBorderWidth: 3,
								}
							},
						}}
					/>
				</CCardBody>
			</CCard>
		)
	}
}
