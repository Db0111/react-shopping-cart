import { useEffect, useState } from "react";
import { ErrorUI } from "./components/ErrorUI";
import { fetchCartItems } from "./fetchCartItems";

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
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{
    status?: number;
    message?: string;
  } | null>(null);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const result = await fetchCartItems(
          "http://localhost:5173",
          "/not-found"
        );
        setCartItems(result.content);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          // HTTP Error: 404와 같은 형식의 메시지에서 status 추출
          const statusMatch = err.message.match(/HTTP Error: (\d+)/);
          const status = statusMatch ? parseInt(statusMatch[1]) : undefined;

          setError({
            status,
            message:
              err.message.replace(/HTTP Error: \d+/, "").trim() ||
              "알 수 없는 오류가 발생했습니다.",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <ErrorUI status={error.status} message={error.message} />;
  }

  return (
    <>
      <h1>react-shopping-cart</h1>
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
