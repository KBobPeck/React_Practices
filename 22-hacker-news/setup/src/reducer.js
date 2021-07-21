import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true }

    case SET_STORIES:
      return {
        ...state,
        loading: false,
        nbPages: action.payload.nbPages,
        hits: action.payload.hits,
      }

    case REMOVE_STORY:
      //remember this is coming from the state, the variable is the same as the 
      //API so you need to say hit.objectID
      return {
        ...state, hits: state.hits.filter((hit) => hit.objectID !== action.payload)
      }

    case HANDLE_SEARCH:
      return { ...state, query: action.payload, page: 0 }

    case HANDLE_PAGE:
      let tempPage = state.page;
      if(action.payload === 'inc') {
        tempPage < state.nbPages - 1 ? tempPage ++ : tempPage = 0
      }
      else {
        tempPage > 0 ? tempPage -- : tempPage = state.nbPages - 1
      }
      return { ...state, page: tempPage}

    default:
      throw new Error(`no matching '${action.type}' action type`)
  }
}
export default reducer
