Deployed Link https://rentify-app-lmli.onrender.com
# Rentify

Rentify is a user-friendly platform designed to simplify the rental process. By leveraging modern technologies and integrating AI capabilities, Rentify helps users efficiently search for rental properties, saving time and reducing the stress involved in finding a suitable place to live.

---

## Features

### 1. **Dynamic Search Options**
- **Search by Location**: Enter the preferred city or neighborhood to narrow your search.
- **Property Type Selection**: Users can choose from options such as "Rent," "Buy," "Short Let," or "Land" (with the current version supporting only rentals).
- **Bedroom Count**: Easily filter properties based on the number of bedrooms required.
- **Dynamic Price Range**: 
  - Minimum price ranges from **KSh 5,000 to KSh 100,000**.
  - Maximum price ranges from **KSh 10,000 to KSh 200,000**.

### 2. **AI Integration for Better Usability**
- **Personalized Recommendations**: AI-powered algorithms analyze user preferences and browsing history to suggest properties tailored to their needs.
- **Natural Language Search**: Users can input queries like "Show me 2-bedroom apartments in Nairobi under KSh 50,000," and the platform will interpret and execute the search.
- **Chatbot Assistance**: An AI chatbot guides users through the platform, answering common questions, and helping them refine their searches.
- **Predictive Insights**: AI predicts upcoming rental trends, such as neighborhoods with increasing availability or price shifts, helping users make informed decisions.

### 3. **Modern Design and Responsive UI**
- Intuitive, mobile-first design ensures seamless browsing on any device.
- Dropdown icons styled with bold, **[#6E3640]** color for better visibility.
- User-friendly form layout with smooth interactions and error handling.

### 4. **Smart Form Interactions**
- Only the "Rent" option is functional at the moment. Selecting "Buy," "Short Let," or "Land" defaults back to "Rent" with a notification to the user.
- Alerts notify users when unsupported options are selected, ensuring clarity and a smooth user experience.

---

## Technologies Used

### **Frontend**
- **React.js**: Handles dynamic UI rendering and responsive design.
- **Tailwind CSS**: Provides a clean and modern design framework.
- **JavaScript (ES6)**: For implementing interactivity and advanced features.

### **Backend**
- **Node.js & Express.js**: For creating RESTful APIs to manage data and handle search functionalities.
- **MongoDB**: Stores property listings and user information securely.

### **AI Integration**
- **OpenAI API**: Powers natural language search and predictive insights.
- **TensorFlow.js**: Used for training models that analyze trends and recommend properties.

---

## Installation and Setup

### **1. Clone the Repository**
```bash
git clone https://github.com/VincentAgunda/RENTIFy.git
cd rentify
2. Install Dependencies
bash
Copy code
npm install
3. Set Up Environment Variables
Create a .env file in the root directory and add the following:

env
Copy code
REACT_APP_API_KEY=your_ai_api_key_here
BACKEND_URL=http://localhost:5000
4. Start the Application
Start the backend server:
bash
Copy code
cd backend
npm start
Start the frontend:
bash
Copy code
cd frontend
npm start
5. Open Your Browser
Navigate to http://localhost:3000 to use Rentify.

How to Use
Search for a Property

Enter a location in the search bar (e.g., "Nairobi").
Use the dropdowns to select property type, number of bedrooms, and price range.
AI-Powered Assistance

Use the chatbot or type queries directly in the search bar for personalized recommendations.
Review property suggestions based on your preferences.
Stay Updated

AI insights provide updates on new listings, price drops, and trending locations.
Future Enhancements
Buy and Short Let Functionality: Expand beyond rentals to include property purchases and short-term leases.
Enhanced AI Capabilities:
Advanced image recognition to analyze uploaded property images.
Sentiment analysis for user reviews and feedback.
Payment Integration: Seamlessly integrate payment options like MPesa, PayPal, and Stripe.
Real-Time Notifications: Push notifications for new listings matching user preferences.
Contributing
We welcome contributions to Rentify! To contribute:

Fork the repository.
Create a new branch for your feature:
bash
Copy code
git checkout -b feature-name
Commit your changes:
bash
Copy code
git commit -m "Add feature name"
Push to your branch:
bash
Copy code
git push origin feature-name
Open a pull request.
