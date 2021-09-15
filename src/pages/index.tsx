import { useState } from 'react';
import { useQuery } from 'react-query';
import { GrCart } from 'react-icons/gr';
import LinearProgress from '@material-ui/core/linearProgress';
import Drawer from '@material-ui/core/Drawer';
import ItemsCard from '@components/ItemsCard';
import { ICartItemType } from 'src/type';
import { Badge } from '@material-ui/core';
import Cart from '@components/Cart';

//types

const getProducts = async (): Promise<ICartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();
export default function Home() {
  const { data, isLoading, error } = useQuery<ICartItemType[]>(
    'products',
    getProducts
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as ICartItemType[]);
  // function create
  const getTotalItems = (items: ICartItemType[]) => {
    items.reduce((prev: number, item) => prev + item.amount, 0);
  };

  const handleAddToCart = (clickItems: ICartItemType) => {
    setCartItems(prev => {
      //ist Is the item already added in the cart?
     const isItemInCart = prev.find(item => item.id ===clickItems.id)
     if (isItemInCart) {
        return prev.map(item => (
          item.id === clickItems.id
          ?{...item, amount:item.amount +1}
          :item
        ))
     }
     //First time item is added,
     return [...prev,{...clickItems,amount:1}]
    })
    
  }

  const handleRemoveFromCart = (id:number) =>{
    setCartItems(prev=>(
      prev.reduce((ack,item) => {
        if(item.id===id){
          if(item.amount===1) return ack;
          return [...ack,{...item, amount:item.amount -1}]
        }else {
         return [...ack,item]
        }
      },[] as ICartItemType[])
    ))
  }

  const handleCartOpen = () => {
    cartOpen ? setCartOpen(false) : setCartOpen(true);
  };
  // function create

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong...</div>;

  

  return (
    <>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <span
        className='fixed top-3 right-3 text-3xl'
        onClick={() => setCartOpen(true)}
      >
        <Badge badgeContent={() => getTotalItems(cartItems)} color='error'>
          <GrCart />
        </Badge>
      </span>
      <div className='container mx-auto relative'>
        <div className='grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-4 place-items-center'>
          {data?.map(item => (
            <div key={item.id} className='shadow-lg px-4 border rounded-lg'>
              <ItemsCard item={item} handleAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
