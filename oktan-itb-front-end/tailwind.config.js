module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'spin-slow': 'spin 3s linear infinite',
            },
            backgroundColor: ['active']
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["light", "cupcake", "bumblebee", "emerald", "corporate", "garden", "winter"],
    },
}