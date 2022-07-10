import React, { Component, useState, useEffect } from 'react';
import Navbar from './Navbar';
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import { getFirestore } from 'firebase/firestore'
import { onSnapshot, collection, doc, CollectionReference, setDoc, getDocs } from 'firebase/firestore';
import { async } from '@firebase/util';




export default class cropPrice extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cropsList: []
		}

	}


	async componentDidMount() {


		new Promise(async function (res, rej) {
			const db = getFirestore();
			const cropsList = [];
			const querySnapshot = await getDocs(collection(db, "Crops")).then();
			querySnapshot.forEach((doc) => {
				console.log(doc.id, "=>", doc.data());
				cropsList.push({
					id: doc.id,
					data: doc.data()
				})
			})
			res(cropsList)
		}).then((crops) => {
			this.setState({
				cropsList: crops
			})
		})

		console.log(this.state.cropsList);
	}


	render() {
		
		return (
			<ThemeProvider theme={theme}>
				<div>
					<Navbar history={this.props.history} />
					<div className='croplist'/>
					<table>
						<thead>
							<tr>
								<th>Crop</th>
								<th>Maximum</th>
								<th>Minimum</th>
								<th>MSP</th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.cropsList.map((data, index) => {
									return (
										<tr key={index}>
											<td>{data.id}</td>
											<td>{data.data.Max}</td>
											<td>{data.data.Min}</td>
											<td>{data.data.MSP}</td>
										</tr>
									)
								})
							}
						</tbody>

					</table>
					
				</div>
			</ThemeProvider>
		)
	}
}

