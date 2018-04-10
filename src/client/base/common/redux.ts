import { createAction } from 'redux-actions';

export const REQUEST_STATUS_READY = 'REQUEST_STATUS_READY';
export const REQUEST_STATUS_REQUESTING = 'REQUEST_STATUS_REQUESTING';
export const REQUEST_STATUS_FAILED = 'REQUEST_STATUS_FAILED';
export const REQUEST_STATUS_SUCCESS = 'REQUEST_STATUS_SUCCESS';

export function createAsyncAction<T>(type: string, promise: (params?: T) => Promise<{}>) {
  return (args?: T) => {
    return (dispatch): Promise<{}> => {
      return new Promise( (resolve, reject) => {
        const notifyRequestingAction = createAction(type, () => { return {}; }, () => { return { pending: true }; });
        dispatch(notifyRequestingAction());
        return promise(args).then( (result) => {
          const actionSuccess = createAction(type);
          dispatch(actionSuccess(result));
          resolve(result);
        }).catch( (error) => {
          const actionError = createAction(type, () => { return error; });
          dispatch(actionError(error));
          reject(error.message);
        });
      });
    };
  };
}
