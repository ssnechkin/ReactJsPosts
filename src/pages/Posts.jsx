import React, {useState, useEffect, useRef}  from 'react';
import Counter from "../components/Counter";
import CassCounter from "../components/ClassCounter";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/ui/windows/MyModal";

import DraggableModal from "../components/ui/windows/DraggableModal";
import "bootstrap/dist/css/bootstrap.min.css";

import MyButton from "../components/ui/button/MyButton";
import MySelect from "../components/ui/select/MySelect";
import Loader from "../components/ui/loader/Loader";
import { CSpinner } from '@coreui/react'
import Pagination from "../components/ui/pagination/Pagination";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import {useObserver} from "../hooks/useObserver";
import PostService from "../api/PostService";
import {getPageCount} from "../utils/pages";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [modal, setModal] = useState(false);
    const [filter, setFilter] = useState({sortColumn: '', queryTitle: ''});
    const sortedAndSearchPosts = usePosts(posts, filter.sortColumn, filter.queryTitle);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef();
    //const observer = useRef();

    const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    });

    useObserver(lastElement, page < totalPages, isPostLoading, ()=>{setPage(page + 1);} )
    /*useEffect(() => { // Вызовется только один раз, т.к. в массиве нет элементов для отслеживания
        if (isPostLoading) return;
        if (observer.current) { // если observer уже создан и в нем что то находится
            observer.current.disconnect(); // отключить наблюдение за всеми наблюдениями, чтобы ниже создать новое наблюдение
        }
        var callback = function (entries, observer) {
            if (entries[0].isIntersecting && page < totalPages) { // не отрабатывает при выходе из зоны видимости
                //console.log("ДИВ В ЗОНЕ ВИДИМОСТИ");
                console.log(page);
                setPage(page + 1);
            }
        }
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(lastElement.current);
        //fetchPosts();
    }, [isPostLoading])*/

    useEffect(() => {
        fetchPosts()
    }, [page, limit])

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    /*
    async function fetchPosts() {
        setIsPostLoading(true)
        setTimeout(async () => {
            const posts = await PostService.getAll();
            setIsPostLoading(false)
            setPosts(posts);
            setIsPostLoading(false)
        }, 1000)
    }
    */
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);

    return (
        <div className="App">
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <DraggableModal
                show={showModal}
                onHide={handleHideModal}
                title="Draggable Modal"
              >
                <p>Modal content goes here.</p>
          </DraggableModal>
            <MyButton onClick={()=>setModal(true)}>Добавить пост</MyButton>
            <MyButton variant="success" onClick={handleShowModal}>
                      click here
            </MyButton>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Количество элементов на странице"
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Показать все'}
                ]}
            />
            {postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }
            <PostList remove={removePost}  posts={sortedAndSearchPosts}  title="Список постов"/>
            <div ref={lastElement} style={{height: 20, background: 'red'}}/>
            {isPostLoading &&
                 <center><Loader/><CSpinner color="primary" /></center>
            }
            <Pagination totalPages={totalPages} page={page} changePage={(number)=>setPage(number)}/>
            <Counter/>
            <Counter/>
            <CassCounter/>
            <CassCounter/>
        </div>
    );
}

export default Posts;

