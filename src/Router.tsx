import { Navigate, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const Layout = await import('@/components/Layout')
      return { Component: Layout.default }
    },
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('@/pages/Home')).default,
        }),
      },
      // Você pode adicionar mais rotas aqui seguindo o mesmo padrão
      // You can add more routes 
    ],
  },
  {
    path: '*',
    element: (
      <Navigate
        to="/"
        replace
      />
    ),
  },
])

export default router
