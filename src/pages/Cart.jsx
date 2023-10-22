import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {mobile} from "../Responsive"
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeProduct } from '../redux/cartRedux';
import { fetchCart, removeItemsFromCart } from '../redux/apiCalls';
import {loadStripe} from '@stripe/stripe-js';
import { userRequest } from '../requestMethods';
import { store } from '../redux/store';

const Container = styled.div`
padding-top: 100px;
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({padding:"10px"})}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
 ${mobile({display:"none"})}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection:"column"})}

`;
const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection:"column"})}
`;

const ProductDetail = styled.div`
  flex: 3;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({margin:"5px 15px"})}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({marginBottom:"20px"})}
`;
const RemoveContainer=styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: center;
`;

const RemoveButton= styled.button`

  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: teal;
  color: white;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;



const Cart = () => {
  const cart=useSelector(state=>state.cart);
  const user=useSelector(state=>state.user.currentUser);
 const dispatch=useDispatch();

  const handleClick=(index, product)=>{
   
   removeItemsFromCart(dispatch,{index,...product},user);
  };

  const makePayment=async ()=>{
    if(cart.total===0){
      window.alert("Please add items to cart");return ;
    }
    const stripe = await loadStripe('pk_test_51NeeiCSJD5OQhXy0p3WMHJLipli1EEcUAy3aM8xXx7RfW1sLUPjMBjT0nKQiTXVWG3k3ylBRUL0WewB4WXxKakvC003vVnpkx2');
    const body={
      products:cart.products
    }
    const headers={
      "Content-Type":"application/json"
    }
    const response= await fetch("http://localhost:5000/api/checkout/payment",{
      method:"POST",
      headers:headers,
      body:JSON.stringify(body)
    });
    const session=await response.json();

    const result= stripe.redirectToCheckout({
      sessionId:session.id,
      
    });

    if(result.error){
      console.log(result.error);
    }
   
    
  };

 
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to='/'><TopButton>CONTINUE SHOPPING</TopButton></Link>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
        <Info>
        
        {cart.products&&cart.products.map((product,index)=>(

            <Product>
              <ProductDetail>
                <Image src={product.img} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {product.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {product._id}
                  </ProductId>
                  <ProductColor color={product.color} />
                  <ProductSize>
                    <b>Size:</b> {product.size}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <AddIcon />
                  <ProductAmount>{product.quantity}</ProductAmount>
                  <RemoveIcon />
                </ProductAmountContainer>
                <ProductPrice>$ {product.price*product.quantity}</ProductPrice>
              </PriceDetail>
              <RemoveContainer>
              <RemoveButton onClick={()=>handleClick(index,product)} >Remove</RemoveButton>
              </RemoveContainer>
            </Product>
        ))}
            <Hr />
            
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={makePayment}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
        </Wrapper>
        <Footer />
    </Container>
  )
}

export default Cart
