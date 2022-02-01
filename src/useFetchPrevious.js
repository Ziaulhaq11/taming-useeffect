import React, {useState,useEffect,useRef, useLayoutEffect} from 'react'

export const useFetchPrevious = (options) => {
  const [data, setData] = useState(null)
  const savedOnSuccess = useRef(options.onSuccess)
  console.log(savedOnSuccess)
  useLayoutEffect(() => {
    savedOnSuccess.current = options.onSuccess
  }, [options.onSuccess]) //This will make sure whenever onSuccess changes our Ref will also change
  useEffect(() => {
    console.log('usefetch effect')
    if (options.url) { //this prevents null values which cause err
      fetch(options.url)
        .then(response => response.json())
        .then(json => {
          savedOnSuccess.current?.(json)
          setData(json)
        })
    }
  }, [options.url])  

  return {
    data
  }
}

// const [data, setData] = useState(null);
// useEffect(() => {
//   console.log("usefetch effect");
//   if (options.url) {
//     //this prevents null values which cause err
//     fetch(options.url)
//       .then((response) => response.json())
//       .then((json) => {
//         options.onSuccess?.(json)
//         setData(json)
//       });
//   }
// }, [options.url,options.onSuccess]);
//Here it is causing rendering because its an object and everytime we are getting new object so even though values are same but the refs are different. So getting infinte looop. And now we pass dependency as options.url not just options because options is an object.
  
  // Same thing for the functions as well as we are passing function as prop which just console but every time new function is creating even though contents are same but reference is different. So looping starts again