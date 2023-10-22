import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux"
import {publicRequest, userRequest} from "../requestMethods"
import {addProduct, removeAll, removeProduct} from "./cartRedux"


export const login=async (dispatch,user)=>{
    dispatch(loginStart());
    try{
        const res=await publicRequest.post("/auth/login",user)
        dispatch(loginSuccess(res.data));
        
            const userId=res.data._id;
            const initialProducts=[];
            try{
            const response=await userRequest.get(`/carts/find/${userId}`)
            if(response.data===null){
                    // dispatch(setCartItems({}));
                    return ;
                }
                const products=response.data.products;
                await Promise.all(products.map(async (item)=>{
                    const response=await publicRequest.get(`/products/find/${item.productId}`)
                    const productInfo=response.data;
                    const quantity=item.quantity;
                    const size=item.size;  
                    const color=item.color;
                    //    console.log({...productInfo,quantity,color, size})
                    initialProducts.push({...productInfo,quantity,color, size})
                }));
                
                initialProducts.map((item)=>{
                    
                    dispatch(addProduct(item));
                })
                
            }catch(err){
                console.log(err)
            }
        
    }catch(err){
        dispatch(loginFailure())
    }
};

export const Logout=async (dispatch)=>{
    dispatch(logout());
    dispatch(removeAll());
    
};



    

export const removeItemsFromCart=async (dispatch,product,user)=>{
    try{
        const id=user._id;
        const res=await userRequest.put(`/carts/delete/${id}`,{index:product.index});
        if (res.status === 200) {

        dispatch(removeProduct(product));
        }else {
            // Handle other response statuses
            console.error(`Failed to remove item from cart. Status: ${res.status}`);
          }
    }catch(err){
        console.error('Error while removing item from cart:', err);
    }

}

export const removeAllItemsFromCart=async (dispatch,user)=>{
    try{
        const id=user._id;
        const res=await userRequest.delete(`/carts/${id}`);
        if (res.status === 200) {

        dispatch(removeAll());
        }else {
            // Handle other response statuses
            console.error(`Failed delete cart. Status: ${res.status}`);
          }
    }catch(err){
        console.error('Error while removing the cart:', err);
    }

}
