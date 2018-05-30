/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';

export const navigate = (path) => (dispatch) => {
  // Extract the page name from path.
  const page = path === '/' ? 'overview' : path.slice(1);

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page));

  // Close the drawer - in case the *path* change came from a link in the drawer.
  dispatch(updateDrawerState(false));
};

const loadPage = (page) => async (dispatch) => {

  switch(page) {
    case "overview":
        await import('../pages/overview-page.js');
        break;
    case "tablet-overview":
        await import('../pages/tablet-overview-page.js');
        break;
    case "tablet-library":
        await import('../pages/tablet-library-page.js');
        break;
    case "tablet-designer":
        await import('../pages/tablet-designer-page.js');
        break;
    case "pan-overview":
        await import('../pages/pan-overview-page.js');
        break;
    case "pan-library":
        await import('../pages/pan-library-page.js');
        break;
    case "pan-designer":
        await import('../pages/pan-designer-page.js');
        break;
    case "coating-overview":
        await import('../pages/coating-overview-page.js');
        break;
    case "coating-library":
        await import('../pages/coating-library-page.js');
        break;
    case "coating-designer":
        await import('../pages/coating-designer-page.js');
        break;
    default:
      page = 404;
      await import('../pages/page-404.js');
  }
  
  dispatch(updatePage(page));
}

const updatePage = (page) => {
  return {
    type: UPDATE_PAGE,
    page
  };
}

export const updateDrawerState = (opened) => (dispatch, getState) => {
  if (getState().app.drawerOpened !== opened) {
    dispatch({
      type: UPDATE_DRAWER_STATE,
      opened
    });
  }
}
