// middleware/role-based-redirect.js

export default defineNuxtRouteMiddleware((to, from) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const role = localStorage.getItem('role') || sessionStorage.getItem('role');

        // Redirect to login if no token exists
        if (!token && to.path !== '/login' && to.path !== '/register') {
            return navigateTo('/login');
        }

        // Restrict access based on roles
        const roleToPageMap = {
            admin: ['/admin'],
            parent: ['/parent'],
            coach: ['/coach'],
        };

        if (token) {
            // Redirect authenticated users to their dashboard if accessing login/register
            if (to.path === '/login' || to.path === '/register') {
                return navigateTo(roleToPageMap[role][0]);
            }

            // Check if the current route is allowed for the role
            const allowedPaths = roleToPageMap[role] || [];
            if (!allowedPaths.includes(to.path)) {
                return navigateTo(roleToPageMap[role][0]); // Redirect to their dashboard
            }
        }
    }
});
