import React, { useContext } from 'react';
import ProductContext from './ProductsContext';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"; // Assuming you have these components
import { Button } from "@/components/ui/button"
import { Box, LucideMessageSquareWarning, Minus, Package, Plus, ShoppingCart, Star, Trash, TriangleAlertIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { SkeletonCard } from './Skeleton';


const Home = () => {
    const { products, addProduct, cart, increaseProductQuantity, decreaseProductQuantity, deleteFromCart, setSortPrice, tags, setFilterTag } = useContext(ProductContext);

    if (!products || products.length === 0) {
        return <div className='flex items-center justify-center h-[80vh] text-center gap-3'><TriangleAlertIcon color='red' /> No products were found</div>;
    }

    return (
        <div className='flex max-sm:block '>
            <div className='lg:w-1/5 p-10 border border-e-2'>

                <RadioGroup className="max-sm:flex mb-10" defaultValue='default' >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default" id="r1" onClick={() => setSortPrice('def')}/>
                        <Label htmlFor="r1">Default</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comfortable" id="r2"  onClick={() => setSortPrice('-')}/>
                        <Label htmlFor="r2">Price Desc</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="compact" id="r3"  onClick={() => setSortPrice('+')}/>
                        <Label htmlFor="r3">Price Asc</Label>
                    </div>
                </RadioGroup>
                <hr />
                <Select
                    name="filter"
                    id="filter"
                    className=''
                    onValueChange={(value) => setFilterTag(value)} // Handle selection change here
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a tag" />
                    </SelectTrigger>
                    <SelectContent>
                        {console.log(tags)}
                        {[...new Set(tags)].map(el => (
                            <SelectItem key={el} value={el}>
                                {el}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>



            </div>

            <div className='lg:w-4/5 grid grid-cols-3 gap-3 p-5 max-sm:grid-cols-1 max-md:grid-cols-3'>
                {products.map(item => (
                    <Card key={item.id} className="w-full max-w-sm mx-auto mb-8">
                        <CardHeader className="relative">
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                width={300}
                                height={300}
                                className="w-full h-auto object-cover rounded-t-lg"
                            />
                            {/* {item.discountPercentage && (
                            <Badge className="absolute top-2 right-2 bg-yellow-400 text-yellow-900">
                                {item.discountPercentage}% OFF
                            </Badge>
                        )} */}
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold">{item.title}</h2>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-1">
                                    <div className='flex'>
                                        {Array(5).fill(null).map((_, pos) => (

                                            <Star className={`w-5 ${pos > item.rating ? 'fill-gray-300 text-gray-300 ' : 'fill-yellow-500 text-yellow-500'} h-5  `} />
                                        ))}
                                    </div>
                                    <span className="font-bold">{item.rating}</span>
                                    <span className="text-muted-foreground">({item.reviews.length} reviews)</span>
                                </div>
                                {/* {item.stock <= 5 && (
                                <Badge variant="outline" className="text-orange-500 border-orange-500">
                                    Low Stock
                                </Badge>
                            )} */}
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-2xl font-bold">${item.price.toFixed(2)}</div>
                                <div className="text-sm text-muted-foreground">SKU: {item.sku}</div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">{cart.find(el => el.id === item.id)
                            ? <div className='flex w-full justify-evenly'>
                                <Button className='bg-destructive' onClick={() => decreaseProductQuantity(item.id)} ><Minus /></Button>
                                <Button> <Trash onClick={() => deleteFromCart(item.id)} /></Button>
                                <Button className='bg-green-700 ' onClick={() => increaseProductQuantity(item.id)}> <Plus /></Button>
                            </div>
                            : <Button className="w-full" onClick={() => addProduct(item)}>
                                <><ShoppingCart className="mr-2 h-4 w-4" />Add to Cart</>
                            </Button>}
                        </CardFooter>
                        {cart.find(el => el.id === item.id) && 
                        <div className='w-full border items-center gap-3 font-bold text-lg flex justify-center'>


                            Items :
                            {cart.find(el => el.id === item.id).quantity}

                        </div>}
                        <Button ><Link to={`/details/${item.id}`}>View Dtails</Link></Button>
                        {
                            cart.find(el => el.id === item.id) && <Button className='m-auto w-full bg-green-500 mt-3'><Link to={'/cart'}>View in Cart</Link></Button>
                        }
                        <div className="px-6 py-4 bg-muted rounded-b-lg text-sm text-muted-foreground flex items-center justify-center">
                            <Package className="mr-2 h-4 w-4" /> {item.shippingInformation}
                        </div>
                    </Card>
                ))}
            </div>
        </div >
    );
};

export default Home;
