import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    darkMode: 'class',

    theme: {
        extend: {
            colors: {
                'primary': '#f2f20d',
                'background-light': '#f8f8f5',
                'background-dark': '#222210',
                'text-main': '#181811',
                'text-muted': '#8a8a60',
                'border-main': '#e6e6db',
            },
            fontFamily: {
                'display': ['Work Sans', ...defaultTheme.fontFamily.sans],
                'sans': ['Work Sans', ...defaultTheme.fontFamily.sans],
            },
            borderRadius: {
                'DEFAULT': '0.25rem',
                'lg': '0.5rem',
                'xl': '0.75rem',
            },
        },
    },

    plugins: [forms],
};
