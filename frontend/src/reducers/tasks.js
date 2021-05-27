import { CREATE_TASK, RETRIEVE_TASKS, UPDATE_TASK, DELETE_TASK, ERROR_TASK }  from "../actions/types";

const initState = {
    tasks: [],
    loading: true
};

function taskReducer(state = initState, action){
    const { type, payload } = action;

    switch(type){
        case CREATE_TASK:
            return [state.tasks, payload];
        case RETRIEVE_TASKS:
            return {
                ...state,
                tasks: action.payload,
                loading: false,

            };
        case UPDATE_TASK:
            return {
                ...state,
                tasks: action.payload,
                loading: false,

            }
        case ERROR_TASK:
            return {
                loading: false,
                error: action.payload,
            }
        case DELETE_TASK:
            return state;
        default:
            return state;
    }
};

export default taskReducer;