import { useDispatch, useSelector } from 'react-redux'
import { State } from 'reducers'

import { hidePopup } from './Popup.actions'
import { PopupView } from './Popup.view'

export const Popup = () => {
  const showing = useSelector((state: State) => state.popup?.showing)
  const dispatch = useDispatch()

  const hideCallback = () => {
    dispatch(hidePopup())
  }

  return <>{showing && <PopupView hideCallback={hideCallback} />}</>
}
