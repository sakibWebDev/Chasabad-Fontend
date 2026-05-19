// hooks/useAppDispatch.ts
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/lib/store/store';

// টাইপ করা dispatch হুক - এটা পুরো অ্যাপে ব্যবহার করবেন
export const useAppDispatch = () => useDispatch<AppDispatch>();