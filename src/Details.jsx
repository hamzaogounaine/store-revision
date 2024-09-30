import { Star, ShoppingCart, Heart, Share2, ArrowLeft } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link, useParams } from 'react-router-dom'
import { useContext } from 'react'
import ProductContext from './ProductsContext'


export default function ProductDetails() {
    const {id} = useParams()
    const { products } = useContext(ProductContext)
    console.log("🚀 ~ ProductDetails ~ products:", products)
    console.log("🚀 ~ ProductDetails ~ id:", id)
    const product = products.find(p => p.id === parseFloat(id))
    console.log("🚀 ~ ProductDetails ~ product:", product)
    
  const discountedPrice = product.price - (product.price * product.discountPercentage / 100)

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> <Link to={'/'}>Back to Products</Link>
      </Button>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.images[0]}
            alt={product.title}
            width={450}
            height={450}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({product.rating.toFixed(2)})
            </span>
          </div>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <span className="text-3xl font-bold mr-2">
              ${discountedPrice.toFixed(2)}
            </span>
            <span className="text-lg text-gray-500 line-through">
              ${product.price.toFixed(2)}
            </span>
            <Badge variant="destructive" className="ml-2">
              {product.discountPercentage.toFixed(0)}% OFF
            </Badge>
          </div>
          <div className="flex items-center space-x-4 mb-6">
            <Button>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
            <Button variant="outline">
              <Heart className="mr-2 h-4 w-4" /> Add to Wishlist
            </Button>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>
          <Separator className="my-6" />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold">Brand:</span> {product.brand}
            </div>
            <div>
              <span className="font-semibold">SKU:</span> {product.sku}
            </div>
            <div>
              <span className="font-semibold">Category:</span> {product.category}
            </div>
            <div>
              <span className="font-semibold">Availability:</span>{' '}
              <Badge
                variant={
                  product.availabilityStatus === 'Low Stock'
                    ? 'destructive'
                    : 'default'
                }
              >
                {product.availabilityStatus}
              </Badge>
            </div>
            <div>
              <span className="font-semibold">Weight:</span> {product.weight}g
            </div>
            <div>
              <span className="font-semibold">Minimum Order:</span>{' '}
              {product.minimumOrderQuantity}
            </div>
          </div>
        </div>
      </div>
      <Tabs defaultValue="details" className="mt-8">
        <TabsList>
          <TabsTrigger value="details">Product Details</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Specifications</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Dimensions: {product.dimensions.width}W x{' '}
              {product.dimensions.height}H x {product.dimensions.depth}D cm
            </li>
            <li>Weight: {product.weight}g</li>
            <li>Warranty: {product.warrantyInformation}</li>
          </ul>
          <h3 className="text-lg font-semibold mt-4 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="shipping" className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
          <p>{product.shippingInformation}</p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Return Policy</h3>
          <p>{product.returnPolicy}</p>
        </TabsContent>
        <TabsContent value="reviews" className="mt-4">
          <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {review.reviewerName}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}