import { FunctionComponent } from 'react';
import Image from 'next/image';
// types
import { ICartItemType } from '../type';

type Props = {
  item: ICartItemType;
  addToCart: (clickItem: ICartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItems: FunctionComponent<Props> = ({
  item,
  addToCart,
  removeFromCart,
}) => {
  return (
    <div className="flex justify-between items-center py-3 space-x-1">
      <div>
        <h2 className="text-lg font-bold text-gray-800">{item.title}</h2>
        <div className="flex justify-between items-center text-lg font-semibold my-2 px-1">
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center py-3">
          <button
            className='text-md focus:outline-none py-2 px-6 rounded-md bg-gray-200'
            onClick={() => removeFromCart(item.id)}
          
          >
            -
          </button>
          <p>{item.amount}</p>
          <button
            className='text-md focus:outline-none py-2 px-6 rounded-md bg-gray-200'
            onClick={() => addToCart(item)}
          >
            +
          </button>
        </div>
      </div>
      <div className="mx-1">
      <Image
        src={item.image}
        alt={item.title}
        width={100}
        height={130}
      />
      </div>
     
    </div>
  );
};

export default CartItems;
