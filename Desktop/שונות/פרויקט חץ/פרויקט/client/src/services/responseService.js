import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const responseService = {
  submitResponse: (responseData) => 
    axios.post(`${API_URL}/responses`, responseData),
  
  getResponses: (questionId) => 
    axios.get(`${API_URL}/responses/question/${questionId}`)
};

export default responseService;
