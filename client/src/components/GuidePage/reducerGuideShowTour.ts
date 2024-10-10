// @ts-ignore
const reducerGuideShowTour = (state, action) => {
    switch (action.type) {
      case 'SHOW_ALL_TOURS':
        return 'ALL_TOURS';
      case 'SHOW_ACTIVE_TOURS':
        return 'ACTIVE_TOURS';
      case 'SHOW_PAST_TOURS':
        return 'PAST_TOURS';
      default:
        return state;
    }
  };

export default reducerGuideShowTour