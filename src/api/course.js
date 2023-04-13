import { ENV } from "../utils";

export class Course {
  baseApi = ENV.BASE_API;
  async getCourses(accesToken,params) {
    try {
      
      const pageFilter = `page=${params?.page || 1}`;
      const limitFilter = `limit=${params?.limit || 5}`;

      const url = `${this.baseApi}/${ENV.API_ROUTES.COURSE}?${pageFilter}&${limitFilter}`;
      const param = {
        headers: {
          Authorization: `Bearer ${accesToken}`,
        },
      };
      const response = await fetch(url, param);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
