import React, {useState, useEffect} from 'react';
import { useParams } from "react-router";
import PostService from "../api/PostService";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/ui/loader/Loader";

function PostId() {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const [fetchPost, isLoading, error] = useFetching(async (id) => {
        console.log(error)
        const response = await PostService.getById(id);
        setPost(response.data)
    });

     const [fetchPostComments, isCommentsLoading, commentsError] = useFetching(async (id) => {
        const response = await PostService.getCommentsById(id);
        console.log(response)
        console.log(commentsError)
        setComments(response.data)
    });

    useEffect(() => { // Вызовется только один раз, т.к. в массиве нет элементов для отслеживания
        fetchPost(params.id)
        fetchPostComments(params.id)
    }, [])

    return (
        <div>
            <center>Page PostId {params.id}</center>
            {isLoading
                ? <Loader/>
                : <div>{post.id}. {post.title}</div>
            }
            {isCommentsLoading
                ? <Loader/>
                : <div>
                    <h1><center>Комментарии:</center></h1>
                    {comments.map(comment =>
                        <div key={comment.id}>
                            <h5>{comment.email}</h5>
                            <div>{comment.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
}

export default PostId;