export const setCurrentMeaning = meaningString => ({
  type: 'SET_CURRENT_MEANING',
  payload: { meaningString },
});

export const setMaxResults = limit => ({
  type: 'SET_MAX_RESULTS',
  payload: { limit },
});
