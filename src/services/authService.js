import instance from "./axiosClient";

const authService = {
  login(body) {
    return instance.post("/users/login", body);
  },
  register() {},
  forgetPassword() {},
};

export default authService;
