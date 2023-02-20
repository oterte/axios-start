import axios from "axios";


// axios를 구성하는 환경설정 관련 코드가 입력값으로 들어간다
// configuration
const instance = axios.create({
    baseURL:'http://localhost:4000',

    // timeout을 설정해 일정 시간이 걸리면 실패하게 함
    // timeout:1,
});


// interceptor -> axios의 모든 과정에서 요청과 수신의 모든 중간과정에 관여할 수 있다

instance.interceptors.request.use(
    // 요청을 보내기 전 수행
    function(config){
        // console.log('인터셉트 요청 성공')
        return config
    },

    // 오류 요청을 보내기 전 수행
    function(error){
        console.log('인터셉트 요청 오류')
        return Promise.reject(error)
    }
);
instance.interceptors.response.use(
    // 서버로부터 받은 응답이 정상 응답인 경우
    function(response){
        // console.log('정상 응답 수신')
        return response
    },
    // 서버로부터 오류 응답을 받은 경우
    function(error){
        console.log('오류 응답 수신')
        return Promise.reject(error)
    }
)

export default instance;