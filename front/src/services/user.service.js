import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:9595/';

class UserService {
  getHotels(page, name, address, city, country) {
    return axios.get(API_URL + 'hoteis?page='+page+"&city="+city+"&country="+country+"&address="+address+"&name="+name,  { headers: authHeader() });
  }

  getHotelPages(name, address, city, country) {
    return axios.get(API_URL + "hoteisPage?city="+city+"&country="+country+"&address="+address+"&name="+name,  { headers: authHeader() });
  }

  getRooms(page, room_type) {
    return axios.get(API_URL + 'rooms?page='+page+"&room_type="+room_type,  { headers: authHeader() });
  }

  getRoomsPage(room_type) {
    return axios.get(API_URL + "roomsPage?room_type="+room_type,  { headers: authHeader() });
  }

  getHotel(idH) {
    return axios.get(API_URL + "hotel/" + idH, {headers: authHeader() });
  }

  getRoomsFromHotel(idH) {
    return axios.get(API_URL + "hotelRooms/" + idH, {headers: authHeader() });
  }

}

export default new UserService();