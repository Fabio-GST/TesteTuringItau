import axios from 'axios';

const API_URL = 'http://localhost:8091/usuario';

const validateLogin = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/autenticar`, { username, password });
    return response.data.token;
  } catch (error) {
    alert(error);
  }
}

function LoginForm() {
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const token = await validateLogin(username, password);

    } catch (error) {

    }
  };

  // ...
}