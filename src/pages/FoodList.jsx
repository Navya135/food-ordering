import Head from 'next/head';
import { useEffect, useState} from "react";
import Image from 'next/image';
import { Breakfast,Lunch,Dinner,Dessert,Healthy,Veg,NonVeg,EggFree,Autumn,Spring,Summer,Winter } from '../components/constants.js';
import styles from "../styles/foodList.module.css";
import Link from 'next/link';
import Notification from './Notification.jsx';


export default function HomePage({updateData}) {
    const [Items, setItems] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [totalItems, setTotalItems] = useState([]);
    const [checkBoxes, setCheckBoxes] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [selectedMeals, setSelectedMeals] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    const rowStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '50px'
      };
    
      const colStyle = {
        marginLeft: '40px'
        
      };
      const colStyle2 = {
       
      };

      useEffect(() => {
        const combinedArray1 = [...Breakfast, ...Lunch, ...Dinner, ...Dessert, ...Healthy, ...Veg, ...NonVeg, ...EggFree, ...Autumn, ...Spring, ...Summer, ...Winter]
        setTotalItems(combinedArray1)
        const combinedArray = [...Breakfast, ...Lunch, ...Dinner, ...Dessert, ...Healthy, ...Veg, ...NonVeg, ...EggFree, ...Autumn, ...Spring, ...Summer, ...Winter]
        .flat()
        .reduce((result, obj) => {
          if (!result[obj.id]) {
            result[obj.id] = obj;
          }
          return result;
        }, {});
      
      const uniqueArray = Object.values(combinedArray);
      
      console.log(uniqueArray);
      setItems(uniqueArray)
      setSelectedMeals(uniqueArray)
      const menuItems = [...new Set(combinedArray1.map((Val) => Val.category))];
      setMenuItems(menuItems)
      }, []);



      const updateRankedUsers = (newItem) => {
        let filteredArr = Items.filter((o1) => {
            return newItem.some((o2) => o2.id === o1.id);
          });
          setItems(filteredArr)   
    };


    const updateMeals = (newItem) => {
        if(newItem.length){
          setItems(newItem)   
        }else{
          setItems(selectedMeals)
        }
    };


    const handleQuantity = (type,index) => {

        const newItems = [...Items];
        if(type=="increment"){
            newItems[index].quantity = Items[index].quantity + 1
            setQuantity(newItems )
        }else if(type=="decrement" && newItems[index].quantity !==0 ){
            newItems[index].quantity = Items[index].quantity - 1
            setQuantity(newItems )
        }
        const totalQuantity = newItems.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.quantity;
          }, 0);
          
        updateData(totalQuantity);
        setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
    };

    const handleClick = (index) => {
        const newItems = [...Items];
        newItems[index].favourite = !newItems[index].favourite
        setItems(newItems)
      };
    
      const removeItems = (newArr,curcat) => {
            
            const newItem = totalItems.filter((newVal) => {
                return newVal.category === newArr[0]; 
              });
              console.log(newItem)
              updateMeals(newItem);
      };

      const filterItem = (curcat) => {
        let checkbox = document.getElementById(curcat);
        if (checkbox.checked) {
            
            const newItem = totalItems.filter((newVal) => {
                return newVal.category === curcat; 
              });
              updateRankedUsers(newItem);

              let newArr = [...checkBoxes]
              newArr.push(curcat)
              setCheckBoxes(newArr)
              
         }else{
            let newArr = [...checkBoxes]
            newArr.pop(curcat)
            setCheckBoxes(newArr)
            removeItems(newArr,curcat);
         }
      };
    
      console.log(checkBoxes)
  return (
    <>
    <div style={rowStyle}>
     <div style={colStyle}>
        <h1 style={{marginTop:"35px",color:"#545454"}}>Filter Meals</h1>
        <div style={{width:"280px"}}>
        <h1 className={styles.head} style={{marginTop:"35px"}}>Dietary Preferences:</h1>
        {menuItems.slice(4, 8).map((Val, id) => {
          return (
            <>
            <div style={{marginBottom:"5px"}}>
   <input type = "checkbox" id = {Val} value = {Val} onChange={() => filterItem(Val)} />
   <label for = "check"> {Val} </label> 
   </div>
</>
          );
        })}
        </div>

        <div style={{width:"280px"}}>
        <h1 className={styles.head} style={{marginTop:"25px"}}>Meals:</h1>
        {menuItems.slice(0, 4).map((Val, id) => {
          return (
            <>
            <div style={{marginBottom:"5px"}}>
   <input type = "checkbox" id = {Val} value = {Val} onChange={() => filterItem(Val)} />
   <label for = "check"> {Val} </label> 
   </div>
</>
          );
        })}
        </div>
        <div style={{width:"280px"}}>
        <h1 className={styles.head} style={{marginTop:"25px"}}>Season:</h1>
        {menuItems.slice(8, 12).map((Val, id) => {
          return (
            <>
            <div style={{marginBottom:"5px"}}>
   <input type = "checkbox" id = {Val} value = {Val} onChange={() => filterItem(Val)} />
   <label for = "check"> {Val} </label> 
   </div>
</>
          );
        })}
        </div>

     </div>
     <div style={colStyle2}>
     {Items && Items.length ? 
     <>
     <div className='grid-container' style={{display: "grid",gridTemplateColumns:"repeat(3, 1fr)",gridGap:"30px"}}>
     {Items && Items.length && Items.map((meal,index) => (
             <div>

              
                <div style={{boxShadow: "0 3px 6px #00000029",padding:"15px",borderRadius:"20px",maxWidth: 305,maxHeight: 410}}>
             <Image src={meal.path} alt="" width="275" height="200" style={{borderRadius:"20px"}} />
             <h1 className={styles.title}>{meal.name}</h1>
             <div className={styles.title}>{meal.price}</div>
             <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",alignItems:"center",marginBottom:"20px",marginTop:"20px"}}>
             <Image src="/images/cart.svg" width="30" height="30" style={{marginTop:"5px"}}/>
             <div className={styles.price} style={{marginRight:"42px"}}>Add to cart</div>
            
             <div>
             <div style={{display:"flex",alignItems:"center"}}>
             <Image src="/images/arrowLeft.png" width="20" height="20" style={{marginRight:"15px",cursor:"pointer"}} onClick={()=>{handleQuantity("decrement",index)}}/>
             {showAlert && (
        <Notification message="Cart updated!" duration={2000} />
      )}

        <div>{meal.quantity}</div>
        <Image src="/images/arrowRight.png" width="20" height="20" style={{marginLeft:"15px",marginRight:"2px",cursor:"pointer"}} onClick={(e)=>{handleQuantity("increment",index)}}/>
             </div>
             </div>
             </div>

             <div style={{display:"flex",textAlign:"center",marginBottom:"20px"}}>
             <Image src={meal.favourite ? '/images/saveFav.svg' : '/images/favourite.png'} width="30" height="30" style={{marginRight:"2px",cursor:"pointer",padding:meal.favourite ? '0px' : "3px"}} onClick={()=>{handleClick(index)}}/>
             <div className={styles.price} style={{marginLeft:"8px"}}>Add to Favourites</div>
             <div>
             </div>
             </div>
                </div>
                
             </div>
            ))}
        </div>
        </> : 
        <div style={{padding:"50px",marginLeft:"150px",marginBottom:"20px"}}>
        <Image src='/images/emptyFood.jpg' width="500" height="400" style={{marginRight:"2px",cursor:"pointer",borderRadius:"20px"}}/>
        <div style={{textAlign:"center",paddingTop:"15px"}}>We could not find any matching results.Let's try something new!</div>
        </div>
        }
     </div>
     </div>
    </>
  );
}