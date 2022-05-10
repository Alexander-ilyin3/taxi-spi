import axiosLib from "axios";
import {
  clearRequestsQueue,
  popRequestsQueue,
  pushRequestsQueue,
  setAxiosError,
} from "redux/actions";
import { apiHost } from "./apiHost";
const axios = axiosLib.default;

export const instance = axios.create({
  baseURL: apiHost,
});

let applied = false;

export const apiMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (applied) return next(action);
    applied = true;

    instance.interceptors.request.use((config) => {
      dispatch(pushRequestsQueue());
      return config;
    });

    instance.interceptors.response.use(
      (response) => {
        dispatch(popRequestsQueue());
        return response;
      },
      (error) => {
        dispatch(clearRequestsQueue());
        dispatch(setAxiosError(error.message));
        return;
      }
    );

    next(action);
  };
