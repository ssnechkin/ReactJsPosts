import React from 'react';
import MyButton from "./ui/button/MyButton";
import { useNavigate } from "react-router";

const PostItem = (props) => {
    const navigate = useNavigate();

    return (
        <div className="post">
            <strong>{props.post.id}. {props.post.title}</strong>
            <div>
                {props.post.body}
            </div>
            <div className="post__btns">
                <MyButton onClick={() => navigate('/posts/' + props.post.id)}>Открыть</MyButton>
                <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
            </div>
        </div>
    );
};

export default PostItem;