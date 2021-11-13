import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// const contactPHP=()=>{                          //$(document).ready(function(){ });
//   $.ajax({
//     url: 'phant.php',    //relative or absolute paths based on http
//     //type: 'POST',                              //method
//     //data:{id:123}, 
//     dataType: 'json',
//   });
//   console.log("Hello!!");  
// }
// contactPHP();

// useEffect(() => {
//   fetch("https://api.example.com/items")
//     .then(res => res.json())
//     .then(
//       (result) => {
//         setIsLoaded(true);
//         setItems(result);
//       },
//       // Note: it's important to handle errors here
//       // instead of a catch() block so that we don't swallow
//       // exceptions from actual bugs in components.
//       (error) => {
//         setIsLoaded(true);
//         setError(error);
//       }
//     )
// }, [])
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
