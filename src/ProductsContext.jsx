import { useEffect, useState, createContext } from "react";

// Create the Product Context
const ProductContext = createContext({
    products: [],
    cart: [],
    addProduct: (product) => { },
    removeProduct: (productId) => { },
    increaseProductQuantity: (productId) => { },
    decreaseProductQuantity: (productId) => { },
    filterProducts: (tag) => { },
    clearCart: () => { },
    deleteFromCart: (id) => { },
});

// Create a provider component
export const ProductProvider = ({ children }) => {
    const [allProducts, setAllProducts] = useState([]); // Original products
    const [products, setProducts] = useState([]); // Filtered products
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [tags, setTags] = useState([]);
    const [filterTag, setFilterTag] = useState();
    const [search, setSearch] = useState();
    const [sortPrice, setSortPrice] = useState();

    useEffect(() => {
        // Fetch the products and tags
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                setAllProducts(data.products); // Store original products
                setProducts(data.products); // Set filtered products to full list initially
                const allTags = data.products.map(product => product.tags).flat();
                setTags(allTags);
            });
    }, []);

    useEffect(() => {
        // Filter products based on the selected tag
        if (filterTag) {
            setProducts(allProducts.filter(product => product.tags.includes(filterTag)));
        } else {
            setProducts(allProducts); // Reset to original products if no tag is selected
        }
    }, [filterTag, allProducts]);


    useEffect(() =>{
        if(sortPrice === '-'){

            setProducts([...allProducts].sort((a, b ) => b.price - a.price))
        }else if(sortPrice === '+'){

            setProducts([...allProducts].sort((a, b ) => a.price - b.price))
        }
        else if (sortPrice === 'def'){
            setProducts(allProducts)
        }
    }, [sortPrice])


    useEffect(() =>{
        if(search){
            console.log('search')
            setProducts(allProducts.filter(product => product.title.toLowerCase().includes(search.toLowerCase())))
        }else{
            setProducts(allProducts)
        }
    } , [search])

    // Cart functionalities
    const addProduct = (product) => {
        product.quantity = 1;
        setCart(prevCart => [...prevCart, product]);
    };

    const removeProduct = (productId) => {
        setCart(prevCart => prevCart.filter(p => p.id !== productId));
    };

    const increaseProductQuantity = (productId) => {
        setCart(prevCart => (
            prevCart.map(product => 
                product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
            )
        ));
    };

    const decreaseProductQuantity = (productId) => {
        setCart(prevCart => (
            prevCart.map(product => 
                product.id === productId ? { ...product, quantity: Math.max(product.quantity - 1, 1) } : product
            )
        ));
    };

    const deleteFromCart = (id) => {
        setCart(cart.filter(product => product.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    useEffect(() => {
        setTotal(cart.reduce((total, product) => total + product.price * product.quantity, 0));
    }, [cart]);

    return (
        <ProductContext.Provider value={{
            products,
            cart,
            addProduct,
            removeProduct,
            increaseProductQuantity,
            decreaseProductQuantity,
            clearCart,
            deleteFromCart,
            total,
            tags,
            setFilterTag,
            setSearch,
            setSortPrice
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContext;
