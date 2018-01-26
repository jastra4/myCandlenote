import axios from 'axios';

export const addVideo = videoInfo => ({
  type: 'ADD_VIDEO',
  payload: videoInfo,
});

export const setVideos = videos => ({
  type: 'SET_VIDEOS',
  payload: videos,
});

export const getVideos = userId => (
  dispatch => (
    axios.get(`/videos/${userId}`)
      .then((res) => {
        console.log('Getting video:', res.data);
        dispatch(setVideos(res.data));
      }, err => console.log(err))
  )
);

export const setCurrentVideo = videoId => ({
  type: 'SET_CURRENT_VIDEO',
  payload: { id: videoId },
});

export const deleteVideo = videoId => (
  dispatch => (
    axios.post('/deleteVideo/', videoId)
      .then((res) => {
        console.log('Delete video res:', res.body);
        dispatch({
          type: 'DELETE_VIDEO',
          payload: { id: videoId },
        });
      })
  )
);
