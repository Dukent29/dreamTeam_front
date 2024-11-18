// composables/useAuth.js
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const isAuthenticated = ref(false); // Tracks authentication status
const role = ref(''); // Tracks the user's role
const router = useRouter();

export function useAuth() {
    // Function to check authentication status
    const checkAuthStatus = () => {
        if (typeof window !== 'undefined') { // Ensures this runs only on the client
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const storedRole = localStorage.getItem('role') || sessionStorage.getItem('role');

            isAuthenticated.value = !!token; // True if a token exists
            role.value = storedRole || ''; // Update role if found, otherwise default to an empty string

            console.log('Auth Status Checked:', {
                isAuthenticated: isAuthenticated.value,
                role: role.value,
            });
        }
    };

    // Automatically check authentication status when the composable is used
    onMounted(() => {
        checkAuthStatus();
    });

    // Function to log in the user
    const login = (token, userRole, rememberMe) => {
        if (rememberMe) {
            localStorage.setItem('token', token);
            localStorage.setItem('role', userRole); // Store the role persistently
        } else {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('role', userRole); // Store the role for the session
        }

        isAuthenticated.value = true;
        role.value = userRole; // Update role after login

        console.log('Logged In:', { isAuthenticated: isAuthenticated.value, role: role.value });
    };

    // Function to log out the user
    const logout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');

        isAuthenticated.value = false;
        role.value = ''; // Reset role

        console.log('Logged Out:', { isAuthenticated: isAuthenticated.value, role: role.value });

        // Redirect to login page
        await router.push('/login');
    };

    // Return reactive states and functions
    return {
        isAuthenticated: computed(() => isAuthenticated.value), // Reactive getter for auth status
        role: computed(() => role.value), // Reactive getter for role
        login, // Login function
        logout, // Logout function
        checkAuthStatus, // Function to manually check auth status if needed
    };
}
