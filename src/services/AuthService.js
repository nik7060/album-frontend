import http from "../http-common";
class AuthService {
  login(authData) {
    return http.post(`/users/login`,authData);
  }
}
export default new AuthService();