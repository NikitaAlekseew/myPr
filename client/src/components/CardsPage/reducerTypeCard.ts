// @ts-ignore
const reducerTypeCard = (state, action) => {
    switch (action.type) {
      case 'SHOW_ALL':
        return 'ALL_TOURS';
      case 'SHOW_BUS_TOURS':
        return 'BUS_TOURS';
      case 'SHOW_INDIVIDUAL_TOURS':
        return 'INDIVIDUAL_TOURS';
      default:
        return state;
    }
  };

export default reducerTypeCard