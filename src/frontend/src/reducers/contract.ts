import { CREATE_REQUEST, CREATE_RESULT, CREATE_ERROR } from 'pages/Create/Create.actions'
import {
  MINT_REQUEST,
  MINT_RESULT,
  MINT_ERROR,
  FETCH_METADATA_RESULT,
  FETCH_METADATA_REQUEST,
  FETCH_METADATA_ERROR,
} from 'pages/Mint/Mint.actions'
import { ORIGINATE_REQUEST, ORIGINATE_RESULT, ORIGINATE_ERROR } from 'pages/Originate/Originate.actions'

export interface ContractState {
  address?: string
  createConfirmation?: number
  mintConfirmation?: number
  metadata?: any
  error?: any
}

const contractDefaultState: ContractState = {
  address: undefined,
  createConfirmation: undefined,
  mintConfirmation: undefined,
  metadata: undefined,
  error: undefined,
}

export function contract(state = contractDefaultState, action: any): ContractState {
  switch (action.type) {
    case ORIGINATE_REQUEST:
      return {
        ...state,
        address: undefined,
        error: undefined,
      }
    case ORIGINATE_RESULT:
      return {
        ...state,
        address: action.address,
        error: undefined,
      }
    case ORIGINATE_ERROR:
      return {
        ...state,
        address: undefined,
        error: action.error,
      }
    case CREATE_REQUEST:
      return {
        ...state,
        createConfirmation: undefined,
        error: undefined,
      }
    case CREATE_RESULT:
      return {
        ...state,
        createConfirmation: action.createConfirmation,
        error: undefined,
      }
    case CREATE_ERROR:
      return {
        ...state,
        createConfirmation: undefined,
        error: action.error,
      }
    case FETCH_METADATA_REQUEST:
      return {
        ...state,
        metadata: undefined,
        error: undefined,
      }
    case FETCH_METADATA_RESULT:
      return {
        ...state,
        metadata: action.metadata,
        error: undefined,
      }
    case FETCH_METADATA_ERROR:
      return {
        ...state,
        metadata: undefined,
        error: action.error,
      }
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
