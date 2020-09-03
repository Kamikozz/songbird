import React from 'react';

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
          console.info(`Unhandled error from ${API_NAME} with status ${status}`);
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
    console.info(e);
  }

  if (response) {
    const { meta: { status }, response: { hits } } = response;
    const isSuccess = utils.STATUSES.isOk(status);

    if (!isSuccess) {
      switch (status) {
        default: {
          console.info(`Unhandled error from ${API_NAME} with status ${status}`);
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
  const PROXY = 'https://kamikozz-songbird-proxy-server.herokuapp.com/';
  const PUBLIC_URL = 'https://genius.com/';
  const ENDPOINT = `songs/${songId}`;
  const url = `${PROXY}${PUBLIC_URL}${ENDPOINT}`; // /songs/3126688 // Blackpink-as-if-its-your-last-lyrics

  let response;

  try {
    response = await fetch(url);
    response = await response.text();
  } catch (e) {
    console.info(e);
  }

  return response;
};

const createJsxElements = (items) => items.map((item, index) => {
  const isReachDepth = typeof item === 'string';

  if (isReachDepth) {
    return item;
  }

  const {
    tag,
    attributes = null,
    children = [''],
  } = item;

  const key = `${tag}-${index}-${new Date().getTime()}`;

  const isSingleTag = tag === 'br' || tag === 'img' || tag === 'hr';

  return React.createElement(
    tag,
    {
      ...attributes,
      key,
    },
    isSingleTag ? null : createJsxElements(children),
  );
});

class GeniusApi {
  static async search(query, mapper = null) {
    let searchData = await rawSearch(query);

    if (searchData && mapper) {
      searchData = mapper(searchData);
    }

    return searchData;
  }

  static async getArtist(artistId, mapper = null) {
    let artistData = await rawGetArtist(artistId);

    if (artistData && mapper) {
      artistData = mapper(artistData);
    }

    return artistData;
  }

  static async getGenresByScraping(songId) {
    const rawSongHtml = await rawGetGenresByScraping(songId);

    const startSequence = rawSongHtml.indexOf('&quot;genres');
    const endSequence = rawSongHtml.indexOf(']', startSequence) + 1;
    const slicedUnparsedString = rawSongHtml.slice(startSequence, endSequence);
    const slicedUnescapedString = slicedUnparsedString
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&');
    const slicedJsonReadyString = `{${slicedUnescapedString}}`;
    const { genres: songGenres } = JSON.parse(slicedJsonReadyString);

    return songGenres;
  }

  static getArtistDescription(descriptionStructureObject) {
    const {
      dom: {
        children,
      },
    } = descriptionStructureObject;

    return createJsxElements(children);
  }
}

export default GeniusApi;
