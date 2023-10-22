import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import axios from "axios"
import styled from "styled-components"
import Product from "../components/Product";
import { publicRequest } from "../requestMethods";

const Container=styled.div`
padding: 20px;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`

function SearchResult(){
    const [products,setProducts]=useState([]);
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const param = searchParams.get("searchQuery");

  useEffect(()=>{
    const getProducts=async ()=>{
      try{
        const res=await publicRequest.get(
          `/search?searchQuery=${param}`
          
          );
          
        setProducts(res.data);
      }catch(err){}
    };
    getProducts();
  },[]);

  
  console.log(products);
    return (
        <div>
        <h2 style={{"textAlign":"center","margin":"10px"}}>Showing search results for "{param}"</h2>
        <Container>
        {products.length>0
        ? products.map((item)=>(
          <Product item={item} key={item._id}/>
        ))
        : <div>Nothing to display</div>
        }
      </Container>
      </div>
   
    )
}

export default SearchResult;
