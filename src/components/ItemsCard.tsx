import { FunctionComponent} from 'react'
import { ICartItemType } from 'src/type'
import Image from 'next/image'

type Props ={
  item:ICartItemType,
  handleAddToCart:(clickItems: ICartItemType) =>void
}


const ItemsCard: FunctionComponent<Props> = ({
  handleAddToCart,item
}) => {
  return (
    <div className="h-[650px] flex flex-col justify-between items-center py-3 ">
      <div className="w-[175px] h-[153px] ">
      <Image src={item.image} width={170} height={150}/>
      </div>
      <div>
        <h2 className="text-2xl text-gray-900 font-bold">{item.title}</h2>
        <p className="max-h-52 overflow-hidden my-2">{item.description}</p>
        <h3 className="text-2xl text-gray-900 font-bold">${item.price}</h3>
      </div>
      <button onClick={()=>handleAddToCart(item)}
      className="py-2 px-20 bg-purple-600 rounded-lg text-gray-50 block ">Add To Cart</button>
    </div>
  )
}

export default ItemsCard
