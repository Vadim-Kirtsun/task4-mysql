import React, {useContext} from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { DeleteOutlined, UnlockFilled } from '@ant-design/icons';
import Axios from "axios";
import {AuthContext} from "../context";


const Toolbar = ({selectedIds, setChangesCount, changesCount}) => {
    const {setIsAuth} = useContext(AuthContext);

    const blockUser = () => {
           Axios.put('https://task4-users-mysql.herokuapp.com/block', {
               selectedIds: selectedIds
           }).then((response) => {
               if (response.data.err) {
                   console.log(response.data.err);
               };
               if (response.data.message) {
                   setChangesCount(++changesCount);
                   let currentId = Number(localStorage.getItem('id'));
                   debugger;
                   if (selectedIds.filter(id => id === currentId).length === 1)  {
                       setIsAuth(false);
                   };
               };
           });
    };

    const unblockUser = () => {
        Axios.put('https://task4-users-mysql.herokuapp.com/unblock', {
            selectedIds: selectedIds
        }).then((response) => {
            if (response.data.err) {
                console.log(response.data.err);
            };
            if (response.data.message) {
                setChangesCount(++changesCount);
                alert(response.data.message);
            };
        });
    };

    const deleteUser = () => {
        Axios.put('https://task4-users-mysql.herokuapp.com/delete', {
            selectedIds: selectedIds
        }).then((response) => {
            if (response.data.err) {
                console.log(response.data.err);
            };
            if (response.data.message) {
                setChangesCount(++changesCount);
                alert(response.data.message);
                let currentId = Number(localStorage.getItem('id'));
                if (selectedIds.filter(id => id === currentId).length === 1)  {
                    setIsAuth(false);
                };
            };
        });
    };

    return (
        <div className='toolbar'>
            <Button onClick={blockUser}  type="primary" danger ghost>
                Block
            </Button>
            <span onClick={unblockUser} className='icon'>
                <UnlockFilled />
            </span>
            <span onClick={deleteUser}>
                <DeleteOutlined />
            </span>
        </div>
    );
};

export default Toolbar;