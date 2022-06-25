import { HIDE_POPUP } from 'app/App.components/Popup/Popup.actions'

export interface PopupState {
  showing: boolean
}

const popupDefaultState: PopupState = {
  showing: true,
}

export function popup(state = popupDefaultState, action: any): PopupState {
  switch (action.type) {
    case HIDE_POPUP:
      return {
        showing: false,
      }
    default:
      return state
  }
}
