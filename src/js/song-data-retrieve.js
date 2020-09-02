import SpotifyApi from './api/spotify-api';
import GeniusApi from './api/genius-api';

const PLAYLIST_ID = '36uYR7ML0EoytdM7o7IT5r';

const removeFeaturingArtists = (sourceString) => {
  const BRACKET = '('; // symbol where featuring or with starts
  const openBracketIndex = sourceString.indexOf(BRACKET);
  const isFoundFeaturing = openBracketIndex !== -1;

  return isFoundFeaturing ? sourceString.slice(0, openBracketIndex - 1) : sourceString;
};

const getSpotifyData = async () => {
  const result = await SpotifyApi.getPlaylistItems(PLAYLIST_ID);
  let { items } = result;

  items = items.map((songData) => {
    const { track } = songData;
    const {
      album: {
        images: [
          previewImageObject,
        ],
      },
      artists: [artistData],
      name: songName, // 'Дорадура'
      id: spotifyId,
      preview_url: audioUrl,
    } = track;

    const { name: songArtistName } = artistData; // 'дора'
    const { url: imageUrl } = previewImageObject;

    return {
      songName: removeFeaturingArtists(songName),
      songArtistName,
      imageUrl,
      audioUrl,
      spotifyId,
    };
  });

  return items;
};

const geniusPageViewsExtractor = (item) => {
  const {
    result: {
      stats: {
        pageviews = 0,
      },
    },
  } = item;

  return pageviews;
};

const getGeniusData = async (query) => {
  const searchResult = await GeniusApi.search(query, (data) => {
    console.log(data);
    data.sort((leftItem, rightItem) => {
      const leftItemPopularity = geniusPageViewsExtractor(leftItem);
      const rightItemPopularity = geniusPageViewsExtractor(rightItem);
      const descendingOrder = rightItemPopularity - leftItemPopularity; // 3 2 1

      return descendingOrder;
    });

    const [firstResult] = data;

    if (!firstResult) {
      return null;
    }

    const { result } = firstResult;
    const {
      id: songId, // to scrape web data (genres)
      primary_artist: { id: artistId },
    } = result;

    return {
      songId,
      artistId,
    };
  });

  if (!searchResult) {
    return null;
  }

  const { songId, artistId } = searchResult;
  const artistDescription = GeniusApi.getArtist(artistId, (artistData) => {
    const { description } = artistData;

    return description;
  });
  const songGenres = GeniusApi.getGenresByScraping(songId);

  const results = Promise.all([artistDescription, songGenres]);

  return results;
};

// GeniusApi.getArtist(987404);
const getData = async () => {
  const songList = (await getSpotifyData());

  console.log(songList);
  const ELEMENTS_COUNT = songList.length;

  return {
    geniusDataPromise: new Promise((resolve) => {
      const songListArray = [];

      songList.forEach((item, index) => {
        const { songName, songArtistName } = item;
        const query = `${songArtistName} ${songName}`;

        setTimeout(() => {
          songListArray.push(getGeniusData(query));

          const isReachEnd = ELEMENTS_COUNT === index + 1;

          if (isReachEnd) {
            resolve(songListArray);
          }
        }, index * 200);
      });
    }),
    spotifyData: songList,
  };
};

const makeSongDataStructure = async (songData) => {
  const {
    geniusDataPromise,
    spotifyData,
  } = songData;

  const geniusDataListPromises = await geniusDataPromise;
  const geniusDataList = await Promise.all(geniusDataListPromises);

  console.log(geniusDataList, spotifyData);

  const processedSongData = geniusDataList.map((geniusDataItem, index) => {
    const {
      songArtistName: artist,
      songName: song,
      imageUrl: coverUrl,
      audioUrl,
      spotifyId,
    } = spotifyData[index];

    if (!geniusDataItem) {
      return null;
    }

    const [description, categories] = geniusDataItem;

    return {
      categories,
      artist,
      song,
      description,
      coverUrl,
      audioUrl,
      header: null,
      spotifyId,
    };
  });

  // console.log(processedSongData);

  return processedSongData;
};

const CACHED_SONG_DATA = 'songbirdSongData';
const getCachedSongData = () => JSON.parse(localStorage.getItem(CACHED_SONG_DATA));
const cacheSongData = (songData) => localStorage.setItem(
  CACHED_SONG_DATA, JSON.stringify(songData),
);

const getSongData = async () => {
  let songData = getCachedSongData(); // check if cached

  if (!songData) {
    const dirtySongData = await getData();

    console.log(dirtySongData);

    songData = await makeSongDataStructure(dirtySongData);

    cacheSongData(songData);
  }

  console.log(songData);

  let processedSongData = songData.filter((item) => {
    if (!item) {
      return false;
    }

    const { description } = item;
    const {
      dom: {
        children: [
          {
            children: [
              firstElementDescription, // there must be '?' if description is empty
            ],
          },
        ],
      },
    } = description;

    const isEmptyDescription = firstElementDescription === '?';
    const { audioUrl } = item;

    return !isEmptyDescription && audioUrl;
  });

  console.log(processedSongData);

  processedSongData = processedSongData.map((item) => {
    const localItem = item;
    const { description } = localItem;

    localItem.description = GeniusApi.getArtistDescription(description);

    return localItem;
  });

  console.log(processedSongData);

  const songGroups = {};

  processedSongData.forEach((item) => {
    const processedItem = item;

    processedItem.categories = processedItem.categories.map((name) => {
      const NOT_FOUND = -1;
      const searchForGeniusIdx = name.indexOf('Genius');
      const isGeniusCase = searchForGeniusIdx !== NOT_FOUND;

      if (isGeniusCase) {
        return name.slice(0, searchForGeniusIdx - 1);
      }

      const searchForBracketsIdx = name.indexOf('(');
      const isBracketsCase = searchForBracketsIdx !== NOT_FOUND;

      if (isBracketsCase) {
        return name.slice(searchForBracketsIdx + 1, name.length - 1);
      }

      return name;
    });
    processedItem.header = processedItem.categories.join(', ');

    const { categories } = processedItem; // Array[5]
    const songGenres = Object.keys(songGroups);

    categories.forEach((categoryItem) => {
      const isExist = songGenres.some((genre) => genre === categoryItem);

      if (!isExist) {
        songGroups[categoryItem] = [];
      }

      songGroups[categoryItem].push(item);
    });
  });

  return songGroups;
};

export default getSongData;
