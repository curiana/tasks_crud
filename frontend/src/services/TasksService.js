import http from "../repository";

const all = () => {
    return http.get("/tasks")
};

const getById = id => {
    return http.get(`/tasks/${id}`);
};

const store = task => {
    return http.post("/tasks", task);
};

const update = (id, task) => {
    return http.put(`/tasks/${id}`, task);
};

const deleteById = id => {
    return http.delete(`/tasks/${id}`);
};


const TasksService = {
    all,
    getById,
    store,
    update,
    deleteById
}

export default TasksService;