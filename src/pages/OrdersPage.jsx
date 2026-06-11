import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../store/ordersSlice";

function OrdersPage() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.orders.items) || [];
  const loading = useSelector((state) => state.orders.loading);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const renderPrice = (value) => {
    return Number(value || 0).toFixed(2);
  };

  if (loading) return <p>Loading orders...</p>;
  if (!items.length) return <p>No orders yet.</p>;

  return (
    <section className="orders-page">
      <h2>Order History</h2>

      {items.map((order) => {
        const status = order.status || "pending";
        const orderItems = order.items || [];

        return (
          <div key={order.id} className="order-card">
            {/* HEADER */}
            <div className="order-header">
              <span className="order-id">Order #{order.id}</span>
              <span className={`status ${status}`}>{status}</span>
            </div>

            {/* BODY */}
            <div className="order-body">
              <p>
                <strong>Total:</strong> ${renderPrice(order.total_amount)}
              </p>

              {/* ITEMS */}
              <div className="order-items">
                <strong>Items:</strong>

                <ul className="order-items-list">
                  {orderItems.map((item) => (
                    <li key={item.product_id} className="order-item">
                      
                      {/* IMAGE */}
                      {item.product_image && (
                        <img
                          src={item.product_image}
                          alt={item.product_name || "Product"}
                          className="order-item-img"
                        />
                      )}

                      {/* DETAILS */}
                      <span className="order-item-text">
                        {item.product_name} × {item.quantity} — $
                        {renderPrice(item.unit_price)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default OrdersPage;