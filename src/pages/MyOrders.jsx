import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiPackage, FiArrowLeft, FiClock, FiCheckCircle, FiTruck } from 'react-icons/fi';
import { formatPrice } from '../utils/formatPrice';

const MyOrders = () => {
  const user = useSelector((state) => state.auth.user);

  const orders = [
    {
      id: "ORD-001",
      date: "2024-04-15",
      status: "delivered",
      total: 89.99,
      items: [
        { name: "Essence Mascara Lash Princess", quantity: 2, price: 9.99 },
        { name: "Eyeshadow Palette", quantity: 1, price: 19.99 }
      ],
      tracking: "TRK123456789"
    },
    {
      id: "ORD-002",
      date: "2024-04-10",
      status: "shipped",
      total: 149.99,
      items: [
        { name: "Smartphone Case", quantity: 1, price: 24.99 },
        { name: "Wireless Headphones", quantity: 1, price: 125.00 }
      ],
      tracking: "TRK987654321"
    },
    {
      id: "ORD-003",
      date: "2024-04-01",
      status: "processing",
      total: 45.50,
      items: [
        { name: "Fragrance Perfume", quantity: 1, price: 45.50 }
      ],
      tracking: null
    }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered': return <FiCheckCircle className="text-green-500" />;
      case 'shipped': return <FiTruck className="text-blue-500" />;
      case 'processing': return <FiClock className="text-yellow-500" />;
      default: return <FiPackage className="text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'delivered': return 'Delivered';
      case 'shipped': return 'Shipped';
      case 'processing': return 'Processing';
      default: return status;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <FiPackage className="text-6xl text-[#AE2448] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#2D3A2B] dark:text-white mb-2">Please Login</h2>
          <p className="text-[#2D3A2B]/60 dark:text-gray-400 mb-6">You need to login to view your orders</p>
          <Link to="/login" className="bg-[#AE2448] text-white px-6 py-2 rounded-lg">Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e] py-8">
      <div className="container-custom max-w-4xl mx-auto px-4">
        
        <Link to="/" className="inline-flex items-center gap-2 text-[#2D3A2B] dark:text-gray-400 hover:text-[#AE2448] mb-6 transition-colors">
          <FiArrowLeft /> Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <FiPackage className="text-3xl text-[#AE2448]" />
          <h1 className="text-2xl md:text-3xl font-bold text-[#2D3A2B] dark:text-white">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-[#2a2a2a] rounded-2xl p-12 text-center">
            <FiPackage className="text-5xl text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No orders yet</p>
            <Link to="/shop" className="inline-block mt-4 text-[#AE2448] hover:underline">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-4 border-b border-[#72BAA9]/20 flex flex-wrap justify-between items-center gap-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Order #{order.id}</p>
                    <p className="text-xs text-gray-400">{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className={`text-sm font-medium ${
                      order.status === 'delivered' ? 'text-green-600' :
                      order.status === 'shipped' ? 'text-blue-600' : 'text-yellow-600'
                    }`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-[#2D3A2B] dark:text-white">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-[#AE2448]">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-[#D5E7B5]/30 dark:bg-gray-800/50 rounded-b-2xl flex flex-wrap justify-between items-center gap-3">
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-xl font-bold text-[#AE2448]">{formatPrice(order.total)}</p>
                  </div>
                  {order.tracking && (
                    <button className="flex items-center gap-2 text-sm text-[#AE2448] hover:underline">
                      <FiTruck /> Track Order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;