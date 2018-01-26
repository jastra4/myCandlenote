import axios from 'axios';

export const addVideo = videoInfo => ({
  type: 'ADD_VIDEO',
  payload: videoInfo,
});

export const createVideo = videoInfo => (
  dispatch => (
    axios.post('/api/videos', videoInfo)
      .then(
        res => dispatch(addVideo(res.data)),
        err => console.log(err),
      )
  )
);

export const setVideos = videos => ({
  type: 'SET_VIDEOS',
  payload: videos,
});

export const getVideos = userId => (
  dispatch => (
    axios.get(`/api/videos/${userId}`)
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
    axios.post('/api/deleteVideo/', videoId)
      .then((res) => {
        console.log('Delete video res:', res.body);
        dispatch({
          type: 'DELETE_VIDEO',
          payload: { id: videoId },
        });
      })
  )
);
