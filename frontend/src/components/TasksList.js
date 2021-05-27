import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Button, Typography, Avatar, Alert } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined, StopOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { STATUS } from '../utils/enums';

import{
    retrieveTasks,
    updateTask,
} from "../actions/tasks";
import { Link } from "react-router-dom";

const { Text } = Typography;

const TaskList = (props) => {
    const dispatch = useDispatch();
    const tasksList = useSelector(state => state.tasks);
    const { loading, error, tasks } = tasksList;
    

    useEffect(() => {
        dispatch(retrieveTasks());
    }, [dispatch]);

    const updateTaskStatus = (item, newStatus) => {
        const data = {...item, statusId : newStatus};

        //console.log("item", item);

        dispatch(updateTask(item.id, data))
            .then(resp => {
                console.log(resp);

                
            }).catch(ex => console.log(ex));
    }

    return(
        <>
        {
            error ? <Alert style={{ width: "50%", margin: '50px auto' }} message={error.message} type="error" showIcon /> 
            : <div style={{ width: "50%", margin: '50px auto' }}>
            <h3>Lista de tareas</h3>
            <Button type="primary" shape="round" style={{ marginBottom: "5px"}}>
                <Link to="/create">
                    Agregar
                </Link>
            </Button>
            {
                tasks && <List
                itemLayout="horizontal"
                dataSource={tasks}
                bordered
                loading={loading}
                //header="Lista de tareas"
                renderItem={item => (
                     <List.Item key={item.id} actions={[
                        item.statusId === STATUS.Active && <Button danger type="primary" shape="round" icon={ <CloseCircleOutlined /> } size="middle" onClick={() => updateTaskStatus(item, STATUS.Inactive)}>
                            Eliminar
                        </Button>,
                        item.statusId === STATUS.Active && <Button type="primary" shape="round" icon={ <CheckCircleOutlined /> } size="middle" onClick={() => updateTaskStatus(item, STATUS.Completed)}>
                            Completa
                        </Button>,
                    ]}>
                       
                            <List.Item.Meta title={ item.statusId === STATUS.Inactive ? <Link to={`/task/${item.id}`}><Text delete>{item.title}</Text></Link> : <Link to={`/task/${item.id}`}>{item.title}</Link> } avatar={
                                <Avatar src={ item.statusId === STATUS.Completed ? <CheckCircleOutlined title="Tarea Completada" style={{ fontSize: "30px", color: "green" }} /> : item.statusId === STATUS.Inactive ? <StopOutlined title="Tarea Eliminada" style={{ fontSize: "30px", color: "red" }} /> : <ClockCircleOutlined title="Tarea en Cola" style={{ fontSize: "30px", color: "#1890ff" }} />}/>
                            }/>
    
                    </List.Item>
                )}
                />
            }
            </div>
        }
        
        </>
    )

}

export default TaskList;
