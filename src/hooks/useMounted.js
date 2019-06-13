import { useEffect } from 'react';
export default function useMounted(func) {
  if (typeof func === 'function') {
    useEffect(func, []);
  }
}