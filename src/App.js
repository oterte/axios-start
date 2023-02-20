import { useEffect, useState } from 'react';
import './App.css';
import api from './axios/api'

function App() {
  const [todos, setTodos] = useState(null);
  // 객체 형식으로 해야 json 파일에 들어갈 것이다?
  const [inputValue, setInputValue] = useState({
    title:''
  })
  const [targetId, setTargetId] = useState('')
  const [contents, setContents] = useState('')

  // 비동기 함수를 만들어야함
  // 서버와 통신을 한다는것 자체가 비동기로 통신하는것

  // 조회
  const fetchTodos = async () => {
    // GET방식
    // 서버의 데이터를 가져오는 방식
    // const { data } = await axios.get('http://localhost:4000/todos')
    const {data} = await api.get('/todos')
    console.log("들어오는지 테스트", data)
    setTodos(data)
  }

  // 추가
  const onSubmitHandler = async () => {
    // POST 방식
    // 서버에 데이터를 보낼것
    // axios.post('http://localhost:4000/todos', inputValue)
    

    // post에도 await 추가
    await api.post('/todos', inputValue)
    // setTodos([...todos, inputValue])
    
    fetchTodos()
  }

  useEffect(() => {
    fetchTodos();
  }, [])

  // 삭제
  const onDeleteButtonClickHandler = async (id) => {
    // 삭제를 위한 DELETE 방식
    // 서버에 특정 id값을 가지고 있는 객체 제거 요청
    api.delete(`/todos/${id}`)
    setTodos(todos.filter(item => {
      return item.id !== id;
    }))
  }


  // PATCH - 수정
  // state로 이미 갖고 있으니까 인자가 필요없음
  const onUpdateButtonClickHandler = async () => {
   api.patch(`todos/${targetId}`,{
    title:contents
   })
    // 실시간으로 변경하기
    setTodos(todos.map(item => {
      if(item.id == targetId){
        return{...item, title:contents}
      }else{
        return item
      }
    }))
  }





  useEffect(() => {
    // db로부터 값을 가져올 것이다
    fetchTodos();
  }, [])

  // 최초에 렌더링되면 이 부분이 비동시함수가 실행되기전에 호출이 됨
  return (
    <>
      <div>
        {/* 수정 영역 */}
        <input type='text' placeholder='수정할 id' 
                value={targetId}
                onChange={((e) => setTargetId(e.target.value))}/>
        <input type='text' placeholder='수정할 내용'
                  value={contents}
                  onChange={((e) => setContents(e.target.value))}/>
        <button onClick={onUpdateButtonClickHandler}>수정</button>
      </div>
      <div>
        {/* 인풋 */}
        
        <form onSubmit={(e) => {
          e.preventDefault()
          // 버튼 클릭 시 input에 들어있는 값을 이용하여 DB에 저장(POST 요청)
          onSubmitHandler()
        }}>
          <input type="text"
                  value={inputValue.title}
                  onChange={((e) => 
                  {
                    // inputValue는 객체 형태니 객체 형태로 맞춰줘야함
                    setInputValue({
                      title:e.target.value})
                  })}/>
          <button type='submit'>추가</button>
        </form>
      </div>
      
      <div>
        {/* 데이터 영역 */}
        {
          todos?.map((item) => {
            return (
              <div key={item.id}>
                {item.id} : {item.title}
                <button onClick={(() => onDeleteButtonClickHandler(item.id))}>삭제</button>
              </div>
            )
          })
        }
      </div>


    </>

  );
}

export default App;
