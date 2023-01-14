import React, { Component } from 'react';
import axios from 'axios';

class FibCalc extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current')
            .catch(err => console.error(">>>>> CLIENT:ERROR: error getting api current values"));
        if (!values) return
        this.setState({ values: values.data });
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all')
            .catch(err => console.error(">>>>> CLIENT:ERROR: error getting api all values"));;
        if (!seenIndexes) return
        this.setState({ seenIndexes: seenIndexes.data });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post('api/values', { index: this.state.index })
            .catch(err => console.error(">>>>> CLIENT:ERROR: error submitting value"));
        this.setState({ index: '' });
    }

    renderSeenIndexes() {
        return this.state.seenIndexes.map(({number}) => number).join(', ');
    }

    renderCalculatedThisSession() {
        const calculatedValues = [];

        for (let key in this.state.values) {
            calculatedValues.push(
                <div key={key}>
                    {key}::{this.state.values[key]}
                </div>
            )
        }

        return calculatedValues;
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label> Requested index: </label>
                    <input
                        value={this.state.index}
                        onChange={event => {
                            this.setState({ index: event.target.value })
                        }}
                    />
                    <button>Calculate</button>
                </form>

                <h3>Previously calculated indexes:</h3>
                { this.renderSeenIndexes() }
                <h3>Calculated this session:</h3>
                { this.renderCalculatedThisSession() }

            </div>
        )
    }
}
export default FibCalc;