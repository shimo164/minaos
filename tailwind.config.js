module.exports = {
  content: [
    './hosting/app/**/*.{js,ts,jsx,tsx}', // Ensure this path matches your file structure
    './hosting/app/sample/**/*.{js,ts,jsx,tsx}', // Add specific paths if needed
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'], // Add your desired fonts
      },
    },
  },
  important: true, // Add this line to prioritize Tailwind CSS styles
};
