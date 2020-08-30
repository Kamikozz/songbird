import { spotifyApi } from './credentials';

const API_NAME = 'Spotify';

const {
  CLIENT_ID,
  CLIENT_SECRET,
  AUTH_URL,
  BASE_URL,
} = spotifyApi;

const TOKEN = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

const rawGetPlaylistItems = async (token, playlistId, limit) => {
  const endPoint = `playlists/${playlistId}/tracks`;
  const params = `?limit=${limit}`;
  const url = `${BASE_URL}${endPoint}${params}`;

  // console.log(token, playlistId, limit);
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, options);
  const songs = await response.json();

  return songs;
};

class SpotifyApi {
  static async getAuthorizationToken() {
    const data = 'grant_type=client_credentials';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${TOKEN}`,
      },
      body: data,
    };

    const response = await fetch(AUTH_URL, options);
    const result = await response.json();

    if (!result) {
      throw new Error(`Invalid ${API_NAME} response`);
    }

    return result.access_token;
  }

  static async getPlaylistItems(playlistId, limit = 100) {
    const token = await SpotifyApi.getAuthorizationToken();

    return rawGetPlaylistItems(token, playlistId, limit);
  }
}

export default SpotifyApi;
