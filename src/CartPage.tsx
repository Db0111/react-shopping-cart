import { useEffect, useState } from "react";
import { ErrorUI } from "./components/ErrorUI";
import { fetchCartItems } from "./fetchCartItems";
import styled from "styled-components";

type CartItemType = {
  id: number;
  quantity: number;
  product: {
    id: number;
    price: number;
    name: string;
    imageUrl: string;
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
        const result = await fetchCartItems("http://localhost:5173");
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
      <Container>
        <Title>🛒 React Shopping Cart</Title>
        {cartItems.map((item) => (
          <CartItem key={item.id}>
            <ProductImage src={item.product.imageUrl} alt={item.product.name} />
            <ProductInfo>
              <ProductName>{item.product.name}</ProductName>
              <Price>Price: ₩{item.product.price.toLocaleString()}</Price>
              <Quantity>Quantity: {item.quantity}</Quantity>
            </ProductInfo>
          </CartItem>
        ))}
      </Container>
    </>
  );
};

export default CartPage;

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 700;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.h2`
  margin: 0;
  font-size: 1.25rem;
`;

const Price = styled.p`
  margin: 0.25rem 0;
  color: #888;
`;

const Quantity = styled.p`
  margin: 0.25rem 0;
`;
