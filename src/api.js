import axios from 'axios';

const api = axios.create({
  headers: {
    // 'Client-ID': process.env.CONFIG_CLIENT,
    'Client-ID': 'plfqmjmvoci2xb9gzv3fjdf7ns8jgs',
    // Authorization: process.env.CONFIG_AUTH,
    Authorization: 'Bearer leyg1kbzubdspq9uiqhcwxbw4j4gq9',
  },
});

// https://id.twitch.tv/oauth2/authorize?client_id=plfqmjmvoci2xb9gzv3fjdf7ns8jgs&redirect_uri=http://127.0.0.1/&response_type=token
export default api;
