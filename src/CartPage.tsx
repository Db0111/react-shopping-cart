import { useEffect, useState } from "react";

type CartItemType = {
  id: number;
  quantity: number;
  product: {
    id: number;
    price: number;
    name: string;
  };
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchCartItems() {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "/cart-items"
      );
      if (!response.ok) {
        if (response.status === 404) {
          setError("장바구니가 비어있습니다.");
        } else {
          setError(`에러가 발생했습니다: ${response.statusText}`);
        }
        return;
      }
      const data = await response.json();
      setCartItems(data.content);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <>
      <h1>react-shopping-cart</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {cartItems.map((item: CartItemType) => (
        <div key={item.id} className="cart-item">
          <h2>{item.product.name}</h2>
          <p>Price: {item.product.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </>
  );
};

export default CartPage;
