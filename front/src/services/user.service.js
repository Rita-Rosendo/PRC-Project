

import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:9595/';

class UserService {
  addPatient(patient) {
    return axios.post(API_URL + 'patients', {...patient}, { headers: authHeader() });
  }
  getHotels(page, name, address, city, country) {
    return axios.get(API_URL + 'hoteis?page='+page+"&city="+city+"&country="+country+"&address="+address+"&name="+name,  { headers: authHeader() });
  }

  getHotelPages(name, address, city, country) {
    return axios.get(API_URL + "hoteisPage?city="+city+"&country="+country+"&address="+address+"&name="+name,  { headers: authHeader() });
  }
}

export default new UserService();
