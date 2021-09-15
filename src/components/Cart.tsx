import { ICartItemType } from '../type';
import { FunctionComponent } from 'react';
import CartItems from './CartItems';

type Props = {
  cartItems: ICartItemType[];
  addToCart: (clickItem: ICartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: FunctionComponent<Props> = ({
  addToCart,
  cartItems,
  removeFromCart,
}) => {
  const calculatorTotal = (items: ICartItemType[]) => {
    items.reduce((prev: number, item) => prev + item.amount * item.price, 0);
  };
  return (
    <div className='w-[500px] p-5'>
      <h2>Your shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart</p> : null}
      {cartItems.map(item => (
        <CartItems
          item={item}
          key={item.id}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h1>Total: ${calculatorTotal(cartItems)}</h1>
    </div>
  );
};

export default Cart;
