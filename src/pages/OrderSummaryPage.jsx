import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../store/ordersSlice";
import { fetchCart } from "../store/cartSlice";

function OrderSummaryPage() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items) || [];
  const lastOrder = useSelector((state) => state.orders.lastOrder);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      return sum + price * (item.quantity || 0);
    }, 0);
  }, [items]);

  const handleCreateOrder = () => {
    dispatch(createOrder());
  };

  return (
    <section className="order-summary">
      <h2>Order Summary</h2>

      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <div className="summary-grid">
            {items.map((item) => (
              <div key={item.product_id} className="summary-card">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.name || "Product image"}
                    className="summary-img"
                  />
                )}

                <div className="summary-details">
                  <h3>{item.name}</h3>

                  <p>
                    <strong>Price:</strong> ${Number(item.price || 0).toFixed(2)}
                  </p>

                  <p>
                    <strong>Quantity:</strong> {item.quantity || 0}
                  </p>

                  <p>
                    <strong>Subtotal:</strong>{" "}
                    ${(Number(item.price || 0) * (item.quantity || 0)).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="total">Total: ${total.toFixed(2)}</h3>

          <button className="btn" onClick={handleCreateOrder}>
            Finalize Purchase
          </button>
        </>
      )}

      {lastOrder && (
        <p className="success">
          Order #{lastOrder.id} created successfully for $
          {Number(lastOrder.total_amount || 0).toFixed(2)}
        </p>
      )}
    </section>
  );
}

export default OrderSummaryPage;