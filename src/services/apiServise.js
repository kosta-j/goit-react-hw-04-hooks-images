import axios from 'axios';

const API_KEY = '22389180-c3e3825fb04f5ed43216d445d';
const URL = 'https://pixabay.com/api/?q=';

function apiService(query, page) {
  return axios.get(
    `${URL}${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
}

export default apiService;
