import React, {useState, useRef} from 'react';
import PostList from "./PostList";
import MyButton from "./ui/button/MyButton";
import MyInput from "./ui/input/MyInput";

const PostForm = function ({create}) {
    const [post, setPost] = useState({title: '', body: ''})
    const bodyInputRef = useRef(); // получить значение из DOM элемента

    const addNewPost = (e) => {
        e.preventDefault() // предотвратить обновление страницы при нажатии submit
        //console.log(bodyInputRef.current.value);
        const newPost = {
            ...post, id: Date.now()
        };
        create(newPost);
        setPost({title: '', body: ''});
    }

    return (
        <form>
            <MyInput type="text" placeholder="Название поста" value={post.title} onChange={e => setPost({...post, title: e.target.value})}/>
            <MyInput type="text" placeholder="Описание" value={post.body} onChange={e => setPost({...post, body: e.target.value})}/>
            <MyInput type="text" placeholder="Описание" ref={bodyInputRef}/> {/*Не управляемый или не контролируемый компонент*/}
            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
    );
}

export default PostForm;