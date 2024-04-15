import axios from 'axios';
import FeatureResponse from '../entity/feature-response';

class FeatureService {

  API_URL = "http://127.0.0.1:3000/api/features";

  async getFeatures(page: number, itemPerPage: number, params: Array<string>): Promise<FeatureResponse> {
    let param = 'mag_type=[';
    console.log('params : '+params);
    params.map(p => param = param.concat(p).concat(','));
    const response = await axios
      .get(this.API_URL + '?page=' + page + '&per_page=' + itemPerPage + '&' + param + ']');
    return response.data;
  }

  async createFeature(data) {
    const response = await axios.post(this.API_URL, data);
    return response.data;
  }
}
const fs = new FeatureService();
export default fs;