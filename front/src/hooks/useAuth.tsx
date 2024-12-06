import { api } from '@/service/api';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'sonner';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UserTypes {
  id: string;
  name: string;
  email: string;
  status: string;
  photo: string;
}

type formData = {
  email: string;
  password: string;
}

interface AuthState {
  data: UserTypes | null;
  login: (data: formData, router: AppRouterInstance) => Promise<void>;
  logout: (router: AppRouterInstance) => Promise<void>;
}

const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      data: null,
      login: async (data, router) => {
        try {
          const res = await api.post('/auth/login', data)
          set({ data: res.data.user })
          router.push('/chat')
        } catch (error: any) {
          toast.error(error.response.data.message)
        }
      },
      logout: async (router) => {
        const email = get().data?.email

        try {
          await api.post('/auth/logout', { email });
          set({ data: null });
          router.push('/login');
        } catch (error: any) {
          console.log("🚀  error", error);
          toast.error(error.response?.data?.message || "Erro ao realizar logout");
        }
      }

    }),
    {
      name: '@teste-opa',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuth;