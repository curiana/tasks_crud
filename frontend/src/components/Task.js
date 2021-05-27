import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from "../actions/tasks";
import { Form, Input, Button, Spin, Checkbox, Space, Modal, Typography } from 'antd';
import TasksService from "../services/TasksService";
import { ExclamationCircleOutlined, DeleteOutlined, EditOutlined, SaveOutlined, UndoOutlined } from "@ant-design/icons";
import { STATUS } from '../utils/enums';


const formLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 16,
    },
};

const { Title } = Typography;

const Task = (props) => {
    const [actualTask, setActualTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const getTaskById = id => {
        TasksService.getById(id)
        .then(resp => {
            setActualTask(resp.data);
            //console.log("resp.data", resp.data);
        }).catch(e => {
            console.log(e);
        });
    };

    const confirmDeleteTask = () => {
        Modal.confirm({
            title: "Advertencia",
            icon: <ExclamationCircleOutlined />,
            content:"La tarea seleccionada está a punto de eliminarse permanentemente ¿Desea Continuar?",
            okText: "Ok",
            onOk: removeTask,
            cancelText: "Cancelar",
        });
    }

    const removeTask = () => {
        dispatch(deleteTask(actualTask.id))
        .then(() => {
            props.history.push("/");
        }).catch(e => console.log(e));
    }

    const changeTask = (values) => {
        //console.log("values", values);

        const toEdit = { ...actualTask, title: values.title, description: values.description, statusId: (values.active) ? STATUS.Active : STATUS.Inactive };
        //console.log("toEdit", toEdit);
        dispatch(updateTask(actualTask.id, toEdit))
        .then(resp => {
            //console.log(resp);
            props.history.push("/");

        }).catch(ex => console.log(ex));
    }

    useEffect(() => {
        getTaskById(props.match.params.id);
    }, [props.match.params.id]);

    return(
        <>
            <div style={{ width: "50%", margin: '50px auto' }}>
            { actualTask ? actualTask.statusId === STATUS.Inactive && <div style={{textAlign:"center", marginBottom: "20px"}}>
                                                            <Title type="danger" level={3}>Tarea Eliminada</Title>
                                                        </div> : 
                                                        <div></div> } 
                {
                    actualTask ? (
                    <Form initialValues={{ ...actualTask, active: (actualTask.statusId === STATUS.Active)  }} form={form} {...formLayout} name="basic" onFinish={changeTask} /*onValuesChange={onValueChange}*/ >
                        <Form.Item 
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: "Título requerido",
                            }
                        ]}> 
                            <Input disabled={!isEditing}/>
                        </Form.Item>
                        
                        <Form.Item 
                        label="Descripción"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "Descripción requerida",
                            }
                        ]}> 
                            <Input disabled={!isEditing}/>
                        </Form.Item>
                        <Form.Item {...tailLayout} name="active" valuePropName="checked">
                            <Checkbox disabled={!isEditing} >Activa</Checkbox>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            { isEditing ? 
                                        <Space>
                                            <Button icon={<SaveOutlined />} type="primary" htmlType="submit">
                                                Guardar
                                            </Button> 
                                            
                                            <Button icon={<UndoOutlined />} onClick={(e) => {
                                                setIsEditing(false);
                                                form.resetFields();
                                                e.preventDefault();
                                            }} type="primary">Cancelar</Button>
                                        </Space>
                                        :
                                        <Space>
                                           {
                                               actualTask.statusId === STATUS.Inactive ? 
                                                    <Button icon={<UndoOutlined />} onClick={(e) => {
                                                        var data = {...actualTask, statusId: STATUS.Active, active: true};
                                                        changeTask(data);
                                                        e.preventDefault();
                                                    }} type="primary">Reactivar</Button> 
                                                :
                                                    <Button icon={<EditOutlined />} onClick={(e) => {
                                                        setIsEditing(true);
                                                        e.preventDefault();
                                                    }} type="primary">Editar</Button> 
                                           }
                                            <Button icon={<DeleteOutlined />} danger onClick={(e) => {
                                                confirmDeleteTask();
                                                e.preventDefault();
                                            }} type="primary">Eliminar Permanentemente</Button> 
                                        </Space>
                                      
                            
                        }
                            

                        </Form.Item>
                    </Form>
                    ): <div style={{textAlign: "center"}}>
                        <Spin />
                    </div>
                }
            </div>
        </>
    );
}

export default Task;

