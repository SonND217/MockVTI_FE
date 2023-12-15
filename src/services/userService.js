import axios from "axios";

const apiEndpoint = "https://dummyjson.com/users";

const userService = {
  getUserByAdmin() {
    return axios.get(apiEndpoint);
  },
  getUserByID(id) {
    return axios.get(`${apiEndpoint}/${id}`);
  },
  addUser(user) {
    return axios.post(`${apiEndpoint}/add`, user);
  },
  updateUser(id, user) {
    return axios.put(`${apiEndpoint}/${id}`, user);
  },
  deleteUser(id) {
    return axios.delete(`${apiEndpoint}/${id}`);
  },
};

export default userService;
