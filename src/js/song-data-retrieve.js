import SpotifyApi from './api/spotify-api';
import GeniusApi from './api/genius-api';

const PLAYLIST_ID = '36uYR7ML0EoytdM7o7IT5r';

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
      songName,
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
    data.sort((leftItem, rightItem) => {
      const leftItemPopularity = geniusPageViewsExtractor(leftItem);
      const rightItemPopularity = geniusPageViewsExtractor(rightItem);
      const descendingOrder = rightItemPopularity - leftItemPopularity; // 3 2 1

      return descendingOrder;
    });

    const [firstResult] = data;
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

  const { songId, artistId } = searchResult;
  const artistDescription = GeniusApi.getArtist(artistId, (artistData) => {
    const { description: descriptionDestructurizedObject } = artistData;

    return GeniusApi.getArtistDescription(descriptionDestructurizedObject);
  });
  const songGenres = GeniusApi.getGenresByScraping(songId);

  const results = Promise.all([artistDescription, songGenres]);

  return results;
};

// GeniusApi.getArtist(987404);
const getData = async () => {
  const songList = (await getSpotifyData()).slice(0, 50);

  // console.log(songList);
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
    const [description, category] = geniusDataItem;

    return {
      category,
      artist,
      song,
      description,
      coverUrl,
      audioUrl,
      header: 'WTF',
      spotifyId,
    };
  });

  // console.log(processedSongData);

  return processedSongData;
};

const getSongData = async () => {
  const dirtySongData = await getData();
  const songData = await makeSongDataStructure(dirtySongData);

  return songData;
};

export default getSongData;
