// Home.js
import React, { useEffect, useState } from 'react';
import '../home/Home.css';
import home from '../../images/home.jpg'
import cube from '../../images/cube.jpg'
import hand from '../../images/hand.jpg'

const Home = () => {

    const [currentImageIndex, setCurrentImageIndex]=useState(0);
    const images=[home,hand,cube]
  
    useEffect(()=>{
        const intervalId=setInterval(()=>{
            setCurrentImageIndex((preIndex)=>(preIndex+1)%images.length);
        },3000);
        return ()=>clearInterval(intervalId)
    },[])

    
  return (
    <div>
        <img src={images[currentImageIndex]} alt='img'/>

      <h1>Hello, world!</h1>

      <button className="button" >Click me!</button>
    </div>
  );
};

export default Home;
