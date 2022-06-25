import { State } from 'reducers'

export const HIDE_POPUP = 'HIDE_POPUP'

export const hidePopup = () => (dispatch: any, getState: any) => {
  dispatch({
    type: HIDE_POPUP,
  })
}
