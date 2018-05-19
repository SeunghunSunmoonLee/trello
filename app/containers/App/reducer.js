/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

// import update from 'immutability-helper';

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  SAVE_USER_ANSWERS,
  FINAL_SUBMIT_FORM,
  SET_COINS,
  GET_LISTS,
  GET_LISTS_SUCCESS,
  MOVE_CARD,
  MOVE_LIST,
  TOGGLE_DRAGGING,
  GET_COMMENTS,
  GET_COMMENTS_SUCCESS,
  SEARCH_LISTS,
  SEARCH_LISTS_SUCCESS,
  DELETE_COMMENTS,
  DELETE_COMMENTS_SUCCESS,
} from './constants';

// The initial state of the App
const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  user: {answers: []},
  questions: [],
  submitted: false,
  coinData: [],
  isFetching: false,
  lists: [],
  originalLists: [],
  isDragging: false
};
function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return { ...state,
        loading: true,
        error: false,
        userData: {
          repositories: false,
        }
      };
    case LOAD_REPOS_SUCCESS:
      return { ...state,
        loading: false,
        currentUser: action.username,
        userData: {
          repositories: action.repos,
        }
      };
    case LOAD_REPOS_ERROR:
      return { ...state, loading: false, error: action.error };
    case SAVE_USER_ANSWERS:
      return { ...state,
        user: {answers: action.answers},
      };
    case SET_COINS:
      return { ...state,
        coinData: action.coinData,
      };
    case FINAL_SUBMIT_FORM:
      return { ...state,
        submitted: true,
      };
    case GET_LISTS:
      return { ...state,
        isFetching: true,
      };
    case GET_LISTS_SUCCESS:
      return { ...state,
        isFetching: false,
        lists: action.lists,
        originalLists: action.lists,
      };
    case MOVE_CARD: {
      const newLists = [...state.lists];
      const { lastX, lastY, nextX, nextY } = action;
      if (lastX === nextX) {
        // lastY 2 4
        // nextY 4 2
        // newLists[lastX].cards =
        //   lastY < nextY ?
        //   newLists[lastX].cards.slice(0, lastY)
        //   .concat(newLists[lastX].cards.slice(lastY, )) ...newLists[lastX].cards.slice(nextY)
        newLists[lastX].cards.splice(nextY, 0, newLists[lastX].cards.splice(lastY, 1)[0]);
      } else {
        // move element to new place
        newLists[nextX].cards.splice(nextY, 0, newLists[lastX].cards[lastY]);
        // delete element from old place
        newLists[lastX].cards.splice(lastY, 1);
      }
      return { ...state,
        lists: newLists,
      };
    }
    case MOVE_LIST: {
      const newLists = [...state.lists];
      const { lastX, nextX } = action;
      const t = newLists.splice(lastX, 1)[0];

      newLists.splice(nextX, 0, t);
      return { ...state,
        lists: newLists,
      };
    }
    case TOGGLE_DRAGGING: {
      return { ...state,
        isDragging: action.isDragging,
      };
    }
    case GET_COMMENTS:
      return { ...state,
        isFetching: true,
      };
    case GET_COMMENTS_SUCCESS:
      return { ...state,
        isFetching: false,
        lists: action.lists,
      };
    case DELETE_COMMENTS:
      return { ...state,
        isFetching: true,
      };
    case DELETE_COMMENTS_SUCCESS:
      return { ...state,
        isFetching: false,
        lists: action.lists,
      };
    case SEARCH_LISTS:
      return { ...state,
        isFetching: true,
      };
    case SEARCH_LISTS_SUCCESS:
      return { ...state,
        isFetching: false,
        lists: action.lists,
      };
    default:
      return state;
  }
}

export default appReducer;
