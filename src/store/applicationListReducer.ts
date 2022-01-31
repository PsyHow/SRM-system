const initialState = {
  appList: [
    { id: 1, name: 'Hello1', status: 'in progress', owner: 'Viktor' },
    { id: 2, name: 'Hello2', status: 'in progress2', owner: 'Viktor' },
    { id: 3, name: 'Hello3', status: 'in progress3', owner: 'Viktor' },
    { id: 4, name: 'Hello4', status: 'in progress4', owner: 'Viktor' },
  ] as AppList[],
};

export const applicationListReducer = (
  state = initialState,
  action: ActionReducer,
): InitialState => {
  switch (action.type) {
    case 'GET_APP_LIST': {
      return {
        ...state,
        appList: action.payload,
      };
    }
    default:
      return state;
  }
};

export const getAppList = (appLists: AppList[]) =>
  ({
    type: 'GET_APP_LIST',
    payload: appLists,
  } as const);

type InitialState = typeof initialState;

type ActionReducer = ReturnType<typeof getAppList>;

export type AppList = {
  id: number;
  name: string;
  status: string;
  owner: string;
};
