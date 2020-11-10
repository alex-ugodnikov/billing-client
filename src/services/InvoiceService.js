import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER_POINT;

const service = axios.create({
  baseURL,
  withCredentials: true
});

const INVOICE_SERVICE = {
  createInvoice(invoiceData) {
    return service.post('/api/invoices', invoiceData);
  },
  getInvoices() {
    return service.get('/api/invoices');
  },
  deleteInvoice(id) {
    return service.post(`/api/invoices/${id}/delete`, {});
  },
  updateInvoice(id, invoiceData) {
    return service.post(`/api/invoices/${id}/update`, invoiceData);
  },
  getInvoiceDetails(id) {
    return service.get(`/api/invoices/${id}`);
  }
};

export default INVOICE_SERVICE;
