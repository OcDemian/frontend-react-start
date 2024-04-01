import React, {useState} from "react";
import Counter from "./components/Counter";
import "./styles/App.css";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'JavaScript', body: 'JavaScript - язык программирования'},
        {id: 2, title: 'JavaScript 2', body: 'JavaScript - язык программирования'},
        {id: 3, title: 'JavaScript 3', body: 'JavaScript - язык программирования'}
    ])

  return (
    <div className="App">
        <form >
            <input type="text" placeholder="Название поста"/>
            <input type="text" placeholder="Описание"/>
            <button>Создать</button>
        </form>
        <PostList posts={posts} title={'Список постов'}></PostList>
        {/*<Counter></Counter>*/}
    </div>
  );
}

export default App;
