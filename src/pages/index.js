import Head from 'next/head';
import { useEffect, useState} from "react";
import Link from 'next/link';
import Image from 'next/image';
import FoodList from "./FoodList";

export default function Home() {
  const [count, setCount] = useState(0);
  const updateData = (newData) => {
    setCount(newData);
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
     <div style={{margin:"20px 50px 20px 50px",fontFamily:"Roboto"}}>
     <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div>
        <Link href='/' passHref style={{display:"flex",marginRight:"30px",marginLeft:"20px"}}>
        <Image src="/images/logo.png" width="60" height="60"/>
        <div>
        <h3 style={{marginLeft:"5px",color:"#545454"}}>On Time Delivery</h3>
        </div>
        </Link>
      </div>
      <div>
      <div style={{display:"flex",alignItems:"center"}}>
      <Image src="/images/saveFav.svg" width="30" height="30"/>
        <div style={{marginRight:"15px",color:"#545454"}}>Favorites</div>
        <hr style={{height:"25px",color:"#ECECEC"}}></hr>
        <Image src="/images/cart.svg" width="30" height="30" style={{marginLeft:"15px",marginRight:"2px"}}/>
        <div style={{color:"#545454",marginLeft:"3px"}}>Cart(<span style={{fontSize: "16px",fontWeight: "bold",color: "#d1411e"}}>{count}</span>)</div>
      </div>
      </div>
    </div>
    <FoodList
    updateData={updateData} 
    />
     </div>
    </>
  );
}