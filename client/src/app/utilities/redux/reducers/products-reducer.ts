import { ProductsAppState } from '../app-state/products-state';
import { ActionType } from '../action-type';
import { Action } from '../action';
import { ProductModel } from '../../models/product-model';

export const productsReducer = (oldAppState = new ProductsAppState(), action: Action): ProductsAppState => {

  const newAppState = { ...oldAppState }

  switch (action.type) {
    case ActionType.GetAllProducts:
      newAppState.products = action.payload;
      break;
    case ActionType.GetCategories:
      newAppState.categories = action.payload;
      break;
    case ActionType.GetProducts:
      newAppState[action.payload.alias] = action.payload.products;
      break;
    case ActionType.AddProduct:
      newAppState[action.payload.alias].push(action.payload.product)
      break;
    case ActionType.UpdateProduct:
      updateLogic(newAppState, action.payload.product, action.payload.alias)
      break
  }
  return newAppState

}

const updateLogic = (newAppState: ProductsAppState, payload: ProductModel, alias: string) => {
  newAppState[alias].find(itemToUpdate => {
    if (itemToUpdate._id === payload._id) {
      for (const prop in payload) {
        if (prop in itemToUpdate) {
          itemToUpdate[prop] = payload[prop]
        }
      }
    }
  })
}
