// @ts-ignore
const reducerShowTour = (state, action) => {
    switch (action.type) {
      case 'SHOW_ACTIVE_ORDERS':
        return 'ACTIVE_ORDERS';
      case 'SHOW_PAST_ORDERS':
        return 'PAST_ORDERS';
      case 'SHOW_FAVORITES':
        return 'FAVORITES';
      default:
        return state;
    }
  };

export default reducerShowTour