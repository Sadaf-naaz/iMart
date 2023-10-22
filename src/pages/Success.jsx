import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { userRequest } from "../requestMethods";
import { removeAllItemsFromCart } from "../redux/apiCalls";

const Container=styled.div`
    display: flex;
    flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
 
`;
const SuccessBox=styled.div`
    background-color: #4CAF50; 
  color: #fff; 
  font-size: 24px; 
  padding: 20px;
  border-radius: 5px;
`;
const Msg=styled.h3`
    
`;
const MsgPara=styled.h3`
margin-top: 20px;
/* font-size: 10px; */
`;



const Success= ()=>{
    const navigate=useNavigate();
    const cart=useSelector(state=>state.cart);
  const user=useSelector(state=>state.user.currentUser);
  const dispatch=useDispatch();

  useEffect(()=>{
    
    const saveOrder=async ()=>{

        const orderProducts=[];
        let amount=0;
        cart.products.map((item)=>{
            amount+=item.price*item.quantity;
            orderProducts.push({
               productId:item._id,
                size:item.size,
                color:item.color,
                quantity:item.quantity}
            )});
           
            try {
                const response= await userRequest.post("/orders",{userId:user._id,products:orderProducts,amount:amount,status:"approved"});
                    console.log(response)
                    if (response.status === 200) {
                        console.log("New Order created")
                    } else {
                        console.error('Error creating order');
                    }
                    removeAllItemsFromCart(dispatch,user);
                }
                catch(err){
                    console.error('Error creating order:', err);
                };
            }
                saveOrder();
                
                },[]);

     setTimeout(function() {
        navigate("/")
      }, 5000);

    return (
        <Container>
            <SuccessBox>
                <Msg>Successfull</Msg>
            </SuccessBox>
            <MsgPara>Your order is confirmed. Thank you for shopping with iMart.</MsgPara>
        </Container>
    )
}
export default Success;