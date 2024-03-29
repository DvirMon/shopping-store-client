
import { Action } from "../action";

import { ActionType } from "../action-type";

import { ReceiptAppState } from '../app-state/receipt-stata';

export const receiptReducer = (oldAppState = new ReceiptAppState(), action: Action): ReceiptAppState => {

  let newAppState = { ...oldAppState }

  switch (action.type) {

    case ActionType.AddReceiptItem:
      newAppState.receipt.push(action.payload)
      break
    case ActionType.GetOrderData:
      newAppState.orderDetails = action.payload
      break

    case ActionType.DeleteReceiptItem:
      const indexToDelete = newAppState.receipt.findIndex(doc => doc.id === action.payload)
      if (indexToDelete >= 0) {
        newAppState.receipt.splice(indexToDelete, 1)
      }
      break

    case ActionType.ResetReceiptState:
      newAppState = new ReceiptAppState()
      break
  }

  return newAppState
}

