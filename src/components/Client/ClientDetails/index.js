import React from 'react';
import { Link } from 'react-router-dom';
import INVOICE_SERVICE from '../../../services/InvoiceService';

export default class ClientDetails extends React.Component {

    constructor(props) {
        super(props);
        const { _id, firstName, lastName, email, company } = this.props.location.client;
        this.state = {
            _id,
            firstName,
            lastName,
            email,
            company
        };
    }

    componentDidMount = () => {
        this.displayInvoices()
    };

    displayInvoices = () => {
        INVOICE_SERVICE.getInvoices()
            .then(invoicesFromDb => {
                const filteredInvoices = invoicesFromDb.data.invoices
                    .filter(invoices => invoices.client === this.props.match.params.id)
                this.setState({
                    filteredInvoices
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        const { _id, firstName, lastName, email, company } = this.state;
        return (
            <section>
                <h2> <Link to='/'>Home</Link> / Client Details </h2>

                <div key={_id} className='flex-container'>
                    <p>{firstName} {lastName}</p>
                    <p>{company}</p>
                    <p>{email}</p>
                    <h4>Invoices</h4>
                    {this.state.filteredInvoices?.map((invoiceToDisplay, index) => {
                        return (
                            <div key={invoiceToDisplay._id} className='invoice-table' >
                                <p>{index+1}</p>                                
                                <p><b>{invoiceToDisplay.title}</b></p>
                                <p><i>{invoiceToDisplay.description}</i></p>
                                <p>${invoiceToDisplay.amount}</p>                                
                                <p>{invoiceToDisplay.status}</p>
                                <p>{invoiceToDisplay.createdAt.substring(0, 10)}</p>
                            </div>)
                    }
                    )}
                </div>

            </section>
        );
    }
}
