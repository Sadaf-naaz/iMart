import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { mobile } from "../Responsive"
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeProduct } from '../redux/cartRedux';
import { fetchCart, removeItemsFromCart } from '../redux/apiCalls';
import { publicRequest, userRequest } from '../requestMethods';

const Container = styled.div`
padding-top: 100px;
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  margin-bottom: 10px;
`;

const Info = styled.div`

  padding: 10px;
  width: 70vw;
  margin: auto;

`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
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


const ProductAmount = styled.span``;

const ProductPrice = styled.div`
margin-top: 10px;
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;
const StatusContainer = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: center;
`;

const StatusButton = styled.button`
padding: 5px 7px;
  border: none;
  border-radius: 10px;
 background-color: ${(props) =>
        props.type === "pending" ? "#ebf1fe" : "approved" ? "#e5faf2" : "#fff0f1"};
  color: ${(props) =>
        props.type === "pending" ? "#2a7ade" : "approved" ? "#3bb077" : "#d95087"};
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;


const Order = () => {
    const [orders, setOrders] = useState([]);
    const user = useSelector(state => state.user.currentUser);
    

        useEffect(() => {
          const fetchOrderData = async () => {
            try {
              const id=user._id;
              const res = await userRequest.get(`orders/find/${id}`);
              console.log(res.data)
              if(res.data===null){
                setOrders(null);
              }else{
                const newOrders=[];
                for (const eachorder of res.data) {
                  const products = eachorder.products;

                   for (const item of products) {
                    const response = await publicRequest.get(`/products/find/${item.productId}`);
                    const productInfo = response.data;
                    const quantity = item.quantity;
                    const size = item.size;
                    const color = item.color;
                    const status = eachorder.status;
                    newOrders.push({ ...productInfo, size, color, quantity, status });
                  };
                 
                }
                setOrders(newOrders);
                }
              } catch (error) {
                console.error('Error fetching orders:', error);
              }
            };
          fetchOrderData();
        }, []);
       


    return (
        <Container>
            <Announcement />
            <Navbar />
            <Wrapper>
                <Title>YOUR ORDERS</Title>
                
                    <Info>

                        {orders && orders.map((product) => (


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
                                    <ProductAmount><b>Quantity:</b> {product.quantity}</ProductAmount>
                                    <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                                </PriceDetail>
                                <StatusContainer>
                                    <StatusButton type={product.status} >{product.status}</StatusButton>
                                </StatusContainer>

                            </Product>
                        ))}
                        <Hr />

                    </Info>

                
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Order
