// middleware/auth.global.ts

export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const role = localStorage.getItem('role') || sessionStorage.getItem('role');

        // Redirect to login if no token and user is trying to access a protected route
        if (!token && to.path !== '/login' && to.path !== '/register') {
            return navigateTo('/login');
        }

        // Redirect authenticated users away from login and register pages
        if (token && (to.path === '/login' || to.path === '/register')) {
            if (role === 'parent') {
                return navigateTo('/parent');
            } else if (role === 'admin') {
                return navigateTo('/admin');
            } else if (role === 'coach') {
                return navigateTo('/coach');
            }
        }
    }
});
