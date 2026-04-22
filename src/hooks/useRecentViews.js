// import { useState, useEffect, useCallback } from 'react';

// const RECENT_KEY = 'nexcart_recent';

// export const useRecentViews = () => {
//   const [recent, setRecent] = useState([]);

//   useEffect(() => {
//     const saved = localStorage.getItem(RECENT_KEY);
//     if (saved) {
//       try {
//         const parsed = JSON.parse(saved);
//         if (Array.isArray(parsed)) {
//           setRecent(parsed);
//         }
//       } catch (error) {
//         console.error('Failed to load recent views:', error);
//       }
//     }
//   }, []);

//   const addRecent = useCallback((product) => {
//     if (!product || !product.id) return;

//     setRecent((prev) => {
//       const filtered = prev.filter((item) => item.id !== product.id);
//       const updated = [product, ...filtered].slice(0, 6);
      
//       try {
//         localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
//       } catch (error) {
//         console.error('Failed to save recent views:', error);
//       }
      
//       return updated;
//     });
//   }, []);

//   const clearRecent = useCallback(() => {
//     setRecent([]);
//     try {
//       localStorage.removeItem(RECENT_KEY);
//     } catch (error) {
//       console.error('Failed to clear recent views:', error);
//     }
//   }, []);

//   return { recent, addRecent, clearRecent };
// };