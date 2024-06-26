import React, {useEffect, useMemo, useRef, useState} from "react";
import "./styles/App.css";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import axios from "axios";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import {useFetching} from "./hooks/useFetching";

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort:'', query:''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const posts = await PostService.getAll()
        setPosts(posts)
    })

    useEffect(() => {
        fetchPosts()
    }, []);

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

  return (
      <div className="App">
          <MyButton onClick={fetchPosts}>GET POSTS</MyButton>
          <MyButton onClick={() => setModal(true)}>
              Создать пост
          </MyButton>
          <hr style={{margin: '15px 0'}}></hr>
          <PostFilter
              filter={filter}
              setFilter={setFilter}
          />
          {postError &&
              <h1>Произошла ошибка: ${postError}</h1>
          }
          {isPostsLoading
              ? <div style={{marginTop: '50px'}} className="flex center"><Loader/></div>
              : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов'}></PostList>
          }

          <MyModal visible={modal} setVisible={setModal}>
              <PostForm create={createPost}></PostForm>
          </MyModal>
      </div>
  );
}

export default App;
