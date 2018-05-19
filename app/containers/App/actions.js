/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  SAVE_USER_ANSWERS,
  FINAL_SUBMIT_FORM,
  SET_COINS,
  GET_LISTS,
  GET_LISTS_SUCCESS,
  GET_LISTS_REQUEST,
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

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}
export function saveUserAnswers(answers) {
  return {
    type: SAVE_USER_ANSWERS,
    answers,
  };
}
export function setCoins(coinData) {
  return {
    type: SET_COINS,
    coinData,
  };
}
/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}
export function finalSubmitForm() {
  return {
    type: FINAL_SUBMIT_FORM,
  };
}


export function getLists(quantity) {
  return {
    type: GET_LISTS,
    quantity,
  };
}
export function getListsSuccess(lists) {
  return {
    type: GET_LISTS_SUCCESS,
    lists,
  };
}
export function moveList(lastX, nextX) {
  return {
    type: MOVE_LIST,
    lastX, nextX
  };
}

export function moveCard(lastX, lastY, nextX, nextY) {
  return {
    type: MOVE_CARD,
    lastX, lastY, nextX, nextY
  };
}

export function toggleDragging(isDragging) {
  return {
    type: TOGGLE_DRAGGING,
    isDragging,
  };
}
export function getComments(postId) {
  return {
    type: GET_COMMENTS,
    postId,
  };
}
export function getCommentsSuccess(lists) {
  return {
    type: GET_COMMENTS_SUCCESS,
    lists,
  };
}
export function deleteComments(postId) {
  return {
    type: DELETE_COMMENTS,
    postId,
  };
}
export function deleteCommentsSuccess(lists) {
  return {
    type: DELETE_COMMENTS_SUCCESS,
    lists,
  };
}
export function searchLists(value) {
  return {
    type: SEARCH_LISTS,
    value,
  };
}
export function searchListsSuccess(lists) {
  return {
    type: SEARCH_LISTS_SUCCESS,
    lists,
  };
}
