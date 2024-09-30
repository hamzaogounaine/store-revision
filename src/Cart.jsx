
import { useContext } from "react"
import ProductContext from "./ProductsContext"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Minus, Plus, Star, Trash, TriangleAlertIcon } from 'lucide-react';



export default function CartList() {
    const { cart, total, decreaseProductQuantity, increaseProductQuantity, deleteFromCart } = useContext(ProductContext)
    return (
        <div className="grid gap-4 p-4">
            <Link to={'/'} className=""><ArrowLeft /> </Link>
            {cart.length ?

                (cart.map((product) => (
                    <div className="flex border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-1/3 relative">
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                width={160}
                                height={50}
                                className=" m-auto"
                            />
                        </div>
                        <div className="w-2/3 p-4 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                                {/* <p className="text-sm text-gray-600 mb-2">{product.description}</p> */}
                                <div className="flex items-center mb-2">
                                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
                                    <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
                                </div>
                            </div>
                            <div>
                                {/* <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-bold">${discountedPrice.toFixed(2)}</span>
              {product.discountPercentage > 0 && (
                <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
              )}
            </div> */}
                                <div className="flex justify-between items-center max-sm:block">
                                    <div className="flex justify-evenly w-full">

                                        <span className="text-md font-bold ">{product.price} $</span>
                                        <span className="text-sm text-gray-600">Quantity : {product.quantity}</span>
                                    </div>
                                    <div className='flex justify-evenly'>
                                        <Button className='bg-destructive' onClick={() => decreaseProductQuantity(product.id)} ><Minus /></Button>
                                        <Button> <Trash onClick={() => deleteFromCart(product.id)} /></Button>
                                        <Button className='bg-green-700 ' onClick={() => increaseProductQuantity(product.id)}> <Plus /></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )))
                : <h1><div className="mx-auto max-w-md text-center">
                    <TriangleAlertIcon className="mx-auto h-12 w-12 text-primary" />
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Oops, cart not found!</h1>
                    <p className="mt-4 text-muted-foreground">
                        No product were found , go back to products page
                    </p>
                    <div className="mt-6">
                        <Link
                            to={'/'}
                            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            prefetch={false}
                        >
                            Go to Homepage
                        </Link>
                    </div>
                </div></h1>}
            {total && <span className="text-lg font-bold">Total : {total } $</span>}
        </div>
    )
}