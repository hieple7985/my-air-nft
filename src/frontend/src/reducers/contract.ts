import { MINT_REQUEST, MINT_RESULT, MINT_ERROR } from 'pages/Mint/Mint.actions'

export interface ContractState {
  address?: string
  mintConfirmation?: number
  error?: any
}

const contractDefaultState: ContractState = {
  mintConfirmation: undefined,
  error: undefined,
}

export function contract(state = contractDefaultState, action: any): ContractState {
  switch (action.type) {
    case MINT_REQUEST:
      return {
        ...state,
        mintConfirmation: undefined,
        error: undefined,
      }
    case MINT_RESULT:
      return {
        ...state,
        mintConfirmation: action.mintConfirmation,
        error: undefined,
      }
    case MINT_ERROR:
      return {
        ...state,
        mintConfirmation: undefined,
        error: action.error,
      }
    default:
      return state
  }
}
