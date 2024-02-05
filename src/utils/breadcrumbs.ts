export const isContainRoute = (state:any, route:any) =>  state.some(({url}:any) => url === route);

export const removeRemainingCrumbs = (state:any, route:any) => {
    const index = state.findIndex(({url}:any) => route === url);
    return state.slice(0, index);
  };