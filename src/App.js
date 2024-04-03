import React, {useRef, useState} from "react";
import Counter from "./components/Counter";
import "./styles/App.css";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'JavaScript', body: 'аааааааа'},
        {id: 2, title: 'PHP', body: 'вввввввввв'},
        {id: 3, title: 'Java', body: 'ккккккккк'}
    ])

    const [searchQuery,setSearchQuery] = useState('')

    const [selectorSort, setSelectorSort] = useState('')
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const sortPost = (sort) => {
        setSelectorSort(sort)
        setPosts([...posts].sort((a, b)=> a[sort].localeCompare(b[sort])))
        console.log(sort)
    }

  return (
    <div className="App">
        <PostForm create={createPost}></PostForm>
        <hr style={{margin: '15px 0'}}></hr>
        <div>
            <MyInput
                placeholder="Поиск"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />
            <MySelect
                value={selectorSort}
                onChange={sortPost}
                defaultValue='Сортировка'
                options={[
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'}
                ]}
            />
        </div>
        {posts.length
            ? <PostList remove={removePost} posts={posts} title={'Список постов'}></PostList>
            : <h1 style={{textAlign: 'center'}}>Посты закончились</h1>
        }
        {/*<Counter></Counter>*/}
    </div>
  );
}

export default App;
