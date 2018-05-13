/**
 * Gets the repositories of the user from Github
 */

 import { delay } from 'redux-saga'
import { call, take, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { LOAD_REPOS, GET_LISTS, GET_LISTS_SUCCESS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError, getListsSuccess } from 'containers/App/actions';
import faker from 'faker';
import axios from 'axios';
import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}
/**
 * Drag and Drop handler
 */
export function* loadComments(lists, action) {
  const postId = action.id
  let comments = []
  axios.get('https://jsonplaceholder.typicode.com/comments', {
      params: {
      }
    })
    .then((response) => {
      console.log(response)
      comments = response.data.length > 10 ? response.data.slice(0,10) : response.data
      // lists[0] = {id: 0, name: 'posts', cards: posts}
      // lists[1] = {id: 1, name: 'comments', cards: comments.filter(comment => comment.postId === post.id)}
      lists.push({
        id: 1,
        name: 'comments',
        cards: comments
      })
    })
    .catch(function (error) {
      console.log(error);
    });
}
export function* dragAndDropWorkerSaga(action) {
  let lists = [];
  axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
      }
    })
    .then((response) => {
      console.log(response)
      lists.push({
        id: 0,
        name: 'posts',
        cards: response.data.slice(0,10)
      })
      // lists[0] = {id: 0, name: 'posts', cards: posts}
      // lists[1] = {id: 1, name: 'comments', cards: comments.filter(comment => comment.postId === post.id)}
    })
    .catch(function (error) {
      console.log(error);
    });
  // let count = 0;
  // for (let i = 0; i < action.quantity; i++) {
  //   const cards = [];
  //   const randomQuantity = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
  //   for (let ic = 0; ic < randomQuantity; ic++) {
  //     cards.push({
  //       id: count,
  //       firstName: faker.name.firstName(),
  //       lastName: faker.name.lastName(),
  //       title: faker.name.jobTitle()
  //     });
  //     count = count + 1;
  //   }
  //   lists.push({
  //     id: i,
  //     name: faker.commerce.productName(),
  //     cards
  //   });
  // }
  yield call(delay, 500);
  console.log("lists",lists)
  yield put(getListsSuccess(lists));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watcherSaga() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_LISTS, dragAndDropWorkerSaga);
  yield takeLatest(LOAD_REPOS, getRepos);
}
