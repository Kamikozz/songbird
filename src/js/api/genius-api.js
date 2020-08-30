import { geniusApi } from './credentials';
import utils from '../utils/utils';

const API_NAME = 'Genius';
const { BASE_URL, ACCESS_TOKEN } = geniusApi;
const BASE_PARAMS = `?access_token=${ACCESS_TOKEN}`;

const requestHandler = (endpoint, params = '') => {
  const url = `${BASE_URL}${endpoint}${BASE_PARAMS}${params.length ? `&${params}` : ''}`;

  return utils.sendRequest(url, API_NAME);
};

const rawGetArtist = async (artistId) => {
  const ENDPOINT = `artists/${artistId}`;
  let response;

  try {
    response = await requestHandler(ENDPOINT);
  } catch (e) {
    console.log(e);
  }

  if (response) {
    const { meta: { status }, response: { artist } } = response;
    const isSuccess = utils.STATUSES.isOk(status);

    if (!isSuccess) {
      switch (status) {
        default: {
          console.log(`Unhandled error from ${API_NAME} with status ${status}`);
          break;
        }
      }
    } else {
      response = artist;
    }
  }

  return response;
};

const rawSearch = async (query) => {
  const ENDPOINT = 'search';
  const params = `q=${query}`;
  let response;

  try {
    response = await requestHandler(ENDPOINT, params);
  } catch (e) {
    console.log(e);
  }

  if (response) {
    const { meta: { status }, response: { hits } } = response;
    const isSuccess = utils.STATUSES.isOk(status);

    if (!isSuccess) {
      switch (status) {
        default: {
          console.log(`Unhandled error from ${API_NAME} with status ${status}`);
          break;
        }
      }
    } else {
      response = hits;
    }
  }

  return response;
};

const rawGetGenresByScraping = async (songId) => {
  const PROXY = 'https://cors-anywhere.herokuapp.com/';
  const PUBLIC_URL = 'https://genius.com/';
  const ENDPOINT = `songs/${songId}`;
  const url = `${PROXY}${PUBLIC_URL}${ENDPOINT}`; // /songs/3126688 // Blackpink-as-if-its-your-last-lyrics

  let response;

  try {
    response = await fetch(url);
    response = await response.text();
  } catch (e) {
    console.log(e);
  }

  return response;
};

const concatenateString = (children) => children
  .map((item) => {
    const isReactDepth = utils.isString(item);

    return isReactDepth ? item : concatenateString(item.children);
  })
  .join('');

class GeniusApi {
  static async search(query, mapper = null) {
    let searchData = await rawSearch(query);

    if (searchData && mapper) {
      searchData = mapper(searchData);
    }

    // console.log(searchData);

    return searchData;
  }

  static async getArtist(artistId, mapper = null) {
    let artistData = await rawGetArtist(artistId);

    if (artistData && mapper) {
      artistData = mapper(artistData);
    }

    // console.log(artistData);

    return artistData;
  }

  static async getGenresByScraping(songId) {
    const rawSongHtml = await rawGetGenresByScraping(songId);

    const genresRegExp = /primary_tag","values":\["(.*)"\]},{"name":"tag_id"/;
    const [, songGenre] = rawSongHtml.match(genresRegExp);

    // console.log(songGenre);

    return songGenre;
  }

  static getArtistDescription(descriptionStructureObject) {
    const { dom } = descriptionStructureObject;
    const { children } = dom;

    return concatenateString(children);
  }
}

export default GeniusApi;
