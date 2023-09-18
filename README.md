[![Netlify Status](https://api.netlify.com/api/v1/badges/01c3a17d-ec0a-4095-b934-f17a9d112413/deploy-status)](https://app.netlify.com/sites/akkio-color-swatches/deploys)

### Akkio Technical Challenge - Color Swatches

This is a simple web application that displays a list of color swatches based on saturation and lightness selections by the user. You can view it online at [https://akkio-color-swatches.netlify.app/](https://akkio-color-swatches.netlify.app/).

### Technologies Used

- Vite
- Vue.js
- Tailwind CSS
- TypeScript
- Axios

### How to Run

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to run the application locally
4. Navigate to `http://localhost:8080/` in your browser

### How to Use

1. Select a saturation value between 0 and 100
2. Select a lightness value between 0 and 100
3. Click the "Generate Color Swatches" button to see the list of color swatches

### Future Enhancements and Technical Improvements

Ideas for future enhancements and technical improvements:

- the user should be able to click on a swatch to see more information about it
- the API call can be made made while the user is moving the slider, instead of only on button click
- the API call can be debounced to prevent unnecessary calls
- tests for the components
- better error handling for the API calls
