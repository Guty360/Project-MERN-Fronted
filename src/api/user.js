import { ENV } from "../utils";

export class Users {
  baseApi = ENV.BASE_API;

  async getMe(accessToken) {
    try {
        //url de conexion con el backend
      const url = `${this.baseApi}/${ENV.API_ROUTES.USER_ME}`;
      const params = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
