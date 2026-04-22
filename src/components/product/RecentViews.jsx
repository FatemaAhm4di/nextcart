// // src/components/product/RecentViews.jsx
// import { Link } from 'react-router-dom';
// import { useRecentViews } from '../../hooks/useRecentViews';
// import { formatPrice } from '../../utils/formatPrice';
// import { FiEye } from 'react-icons/fi';

// const RecentViews = () => {
//   const { recent, clearRecent } = useRecentViews();

//   if (recent.length === 0) return null;

//   return (
//     <div className="container-custom py-8 border-t border-[#72BAA9]/30 mt-8">
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-2">
//           <FiEye className="text-[#AE2448] text-xl" />
//           <h2 className="text-xl md:text-2xl font-bold text-[#2D3A2B] dark:text-white">
//             Recently Viewed
//           </h2>
//         </div>
//         <button
//           onClick={clearRecent}
//           className="text-xs text-gray-500 hover:text-[#AE2448] transition-colors"
//         >
//           Clear
//         </button>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//         {recent.map((product) => (
//           <Link
//             key={product.id}
//             to={`/product/${product.id}`}
//             className="group bg-white dark:bg-[#2a2a2a] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
//           >
//             <div className="h-28 p-2 bg-[#72BAA9]/10 flex items-center justify-center">
//               <img
//                 src={product.image}
//                 alt={product.title}
//                 className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
//               />
//             </div>
//             <div className="p-2">
//               <h3 className="text-xs font-medium text-[#2D3A2B] dark:text-white line-clamp-1">
//                 {product.title}
//               </h3>
//               <p className="text-xs text-[#AE2448] font-semibold mt-1">
//                 {formatPrice(product.price)}
//               </p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecentViews;