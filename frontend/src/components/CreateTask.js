import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Alert } from 'antd';
import { createTask } from "../actions/tasks";

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

const CreateTask = (props) => {
    /*const taskState = {
        id: null,
        title: "",
        description: "",
        completed: false,
    };*/

    const [submit, setSubmit] = useState(false);
    const [form] = Form.useForm();

    /*useEffect(() => {
        let timer = setTimeout(() => setSubmit(false), 3000);
    
        return () => {
            clearTimeout(timer);
        }
    },[]);*/

    const dispatch = useDispatch();

    const storeTask = (values) => {
        const { title, description, completed } = values;

        dispatch(createTask(title, description, completed))
        .then(data => {

            setSubmit(true);
            //setSubmit(false);

            setTimeout(() => {
                setSubmit(false);
                props.history.push("/");
            }, 1000);

            form.resetFields();  
        }).catch(exception => console.log(exception));
    };

    /*const onValueChange = (_, e) => {
        //console.log(e);
        setTask(e);
        console.log(task);
    }*/

    return (
        <div style={{ width: "50%", margin: '50px auto' }}>
            { submit ? (
                <Alert message="Tarea Creada" type="success" showIcon banner closable />
            ) : <div></div> }
            <Form form={form} {...formLayout} name="basic" onFinish={storeTask} /*onValuesChange={onValueChange}*/ >
                <Form.Item 
                label="Title"
                name="title"
                rules={[
                    {
                        required: true,
                        message: "Título requerido",
                    }
                ]}> 
                    <Input/>
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
                    <Input/>
                </Form.Item>
                {/*<Form.Item {...tailLayout} name="completed" valuePropName="checked">
                    <Checkbox>Completada</Checkbox>
                </Form.Item>*/}
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default CreateTask;