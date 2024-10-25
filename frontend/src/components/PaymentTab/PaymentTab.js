import React from 'react';
import Card from 'react-credit-cards';
import './PaymentTab.css';
import jwt_decode from 'jwt-decode';
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
} from './utils';
import 'react-credit-cards/es/styles-compiled.css';

export default class PaymentTab extends React.Component {
    state = {
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        issuer: '',
        focused: '',
        token: '',
        errorMessage: '',
        paymentSuccess: false,
    };

    componentDidMount() {
        const token = sessionStorage.getItem('authToken');
        if (token) {
            const decoded = jwt_decode(token);
            this.setState({ token: decoded.user });
        }
    }

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            this.setState({ issuer });
        }
    }

    handleInputFocus = ({ target }) => {
        this.setState({ focused: target.name });
    }

    handleInputChange = ({ target }) => {
        let value = target.value;
        switch (target.name) {
            case 'number':
                value = formatCreditCardNumber(value);
                break;
            case 'expiry':
                value = formatExpirationDate(value);
                break;
            case 'cvc':
                value = formatCVC(value);
                break;
            default:
                break;
        }
        this.setState({ [target.name]: value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { number, name, expiry, cvc, issuer } = this.state;

        // Basic validation
        if (!number || !name || !expiry || !cvc) {
            this.setState({ errorMessage: "All fields are required." });
            return;
        }

        // You would typically send this data to a payment processing service
        try {
            // Simulate payment processing
            await new Promise((resolve) => setTimeout(resolve, 1000));
            this.setState({ paymentSuccess: true });
            this.moveToTicketPage();
        } catch (error) {
            this.setState({ errorMessage: "Payment failed. Please try again." });
        }
    }

    moveToTicketPage = () => {
        const { token } = this.state;
        localStorage.setItem('paymentData', JSON.stringify(token));
        window.location.href = '/getTicket';
    }

    renderPassengerNames = () => {
        const passArray = localStorage.getItem('nameData');
        if (passArray) {
            const nameArray = JSON.parse(passArray);
            return nameArray.map((name, idx) => <p key={idx}>{name}</p>);
        }
    }

    renderSeatNumbers = () => {
        const seatArray = localStorage.getItem('reservedSeats');
        if (seatArray) {
            const seaArr = JSON.parse(seatArray);
            return seaArr.map((seat, idx) => <p key={idx}>{seat}</p>);
        }
    }

    getSumTotal = () => {
        const count = JSON.parse(localStorage.getItem('reservedSeats'))?.length || 0;
        const tax = 150;
        const total = 1000 * count + tax;

        return (
            <div>
                <hr className='hr3' />
                <p>{1000 * count}</p>
                <p>+ {tax}</p>
                <p>Total: {total}</p>
            </div>
        );
    }

    render() {
        const { name, number, expiry, cvc, focused, issuer, errorMessage, paymentSuccess } = this.state;

        return (
            <div className='paym'>
                <div className='row'>
                    <div key='Payment'>
                        <div className='App-payment cl-1'>
                            <p className='pPayment'>Enter Credit Card Details</p>
                            <Card
                                number={number}
                                name={name}
                                expiry={expiry}
                                cvc={cvc}
                                focused={focused}
                                callback={this.handleCallback}
                            />
                            <form className='credit-form' ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
                                <div className='form-group'>
                                    <input
                                        type='tel'
                                        name='number'
                                        className='frm-ctrl'
                                        placeholder='Card Number'
                                        pattern='[\d| ]{16,22}'
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        name='name'
                                        className='frm-ctrl'
                                        placeholder='Name'
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='tel'
                                        name='expiry'
                                        className='frm-ctrl'
                                        placeholder='Valid Thru'
                                        pattern='\d\d/\d\d'
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='tel'
                                        name='cvc'
                                        className='frm-ctrl cvc'
                                        placeholder='CVC'
                                        pattern='\d{3,4}'
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <input type='hidden' name='issuer' value={issuer} />
                                <div>
                                    <button type='submit' className='btn btn-light btCustom'>
                                        PAY
                                    </button>
                                </div>
                                {errorMessage && <p className='error'>{errorMessage}</p>}
                                {paymentSuccess && <p className='success'>Payment Successful!</p>}
                            </form>
                        </div>
                    </div>
                    <div className='columnTwo'>
                        <h3>Unique Travels</h3>
                        <div>
                            <p>BOOKING DETAILS</p>
                            <div className='row'>
                                <div className='col-6 pt'>
                                    <p className='hdng'>Username</p>
                                    <hr className='hr3' />
                                    <p className='hdng'>Date</p>
                                    <p className='hdng'>From</p>
                                    <p className='hdng'>To</p>
                                    <hr className='hr3' />
                                    <p className='hdng'>Passengers</p>
                                    {this.renderPassengerNames()}
                                    <hr className='hr3' />
                                    <p className='hdng'>Ticket Price</p>
                                    <p className='hdng'>Tax</p>
                                    <p className='hdng'>Total Sum</p>
                                </div>
                                <div className='col-6'>
                                    <hr className='hr3' />
                                    <p className='usrName'>{localStorage.getItem('date')}</p>
                                    <p className='usrName'>{localStorage.getItem('start')}</p>
                                    <p className='usrName'>{localStorage.getItem('destination')}</p>
                                    <hr className='hr3' />
                                    <p className='hdng'>Seat No</p>
                                    {this.renderSeatNumbers()}
                                    {this.getSumTotal()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
