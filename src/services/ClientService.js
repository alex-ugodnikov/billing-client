import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER_POINT;

const service = axios.create({
  baseURL,
  withCredentials: true
});

const CLIENT_SERVICE = {
  createClient(clientData) {
    return service.post('/api/clients', clientData);
  },
  getClients() {
    return service.get('/api/clients');
  }
};

export default CLIENT_SERVICE;
