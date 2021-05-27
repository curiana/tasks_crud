import { CREATE_TASK, RETRIEVE_TASKS, UPDATE_TASK, DELETE_TASK, ERROR_TASK }  from "./types";
import TasksService from "../services/TasksService";


export const createTask = (title, description, completed) => async (dispatch) => {
    try{
        const response = await TasksService.store({
            title, description, completed
        });

        dispatch({
            type: CREATE_TASK,
            payload: response.data,
        });

        return Promise.resolve(response.data);
    }catch(exception){
        return Promise.reject(exception);
    }
};


export const retrieveTasks = () => async (dispatch) => {
    try{
        const response = await TasksService.all();

        dispatch({
            type: RETRIEVE_TASKS,
            payload: response.data,
        });
    }catch(exception){
        dispatch({
            type: ERROR_TASK,
            payload: exception,
        })
    }
};


export const updateTask = (id, task) => async (dispatch) => {
    try{
        const response = await TasksService.update(id, task);

        dispatch({
            type: UPDATE_TASK,
            payload: response.data,
        });

        return Promise.resolve(response.data);
    }catch(exception){
        return Promise.reject(exception);
    }
};


export const deleteTask = id => async (dispatch) => {
    try{
        await TasksService.deleteById(id);


        dispatch({
            type: DELETE_TASK,
            payload: { id },
        });
    }catch(exception){
        console.log(exception);
    }
}