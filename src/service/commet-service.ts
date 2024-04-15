import axios from 'axios';

class CommentService {

  API_URL = "http://127.0.0.1:3000/api/features/";

  async createComment(feature_id: number, data: Comment) {
    const response = await axios.post(this.API_URL + feature_id+'/comments', data);
    return response.data;
  }
}
const cs = new CommentService();
export default cs;