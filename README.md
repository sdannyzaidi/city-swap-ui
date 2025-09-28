# CitySwap UI 🏠🔄

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)](https://firebase.google.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-0170FE?style=for-the-badge&logo=ant-design&logoColor=white)](https://ant.design/)

A modern, responsive web application for home and accommodation swapping. CitySwap connects travelers and locals who want to exchange their homes, providing an authentic and cost-effective way to explore new cities around the world.

## 🌟 Features

### 🏡 Home Swapping Platform
- **Property Listings** - Create detailed listings with photos, amenities, and availability
- **Advanced Search** - Filter by location, dates, property type, and amenities
- **Interactive Maps** - Explore properties with integrated location services
- **Detailed Property Views** - Comprehensive property information and photo galleries

### 👥 User Management
- **Secure Authentication** - Firebase-powered login and registration
- **User Profiles** - Detailed profiles with verification and reviews
- **Host & Guest Modes** - Seamless switching between hosting and traveling
- **Profile Verification** - Trust and safety through user verification

### 💬 Communication & Booking
- **Real-time Chat** - Direct messaging between hosts and guests
- **Booking Requests** - Streamlined request and approval process
- **Calendar Integration** - Availability management and booking calendar
- **Notifications** - Real-time updates on bookings and messages

### 💳 Payment Integration
- **Stripe Integration** - Secure payment processing
- **Flexible Pricing** - Custom pricing models and special offers
- **Transaction History** - Complete booking and payment records

### 📱 Responsive Design
- **Mobile-First** - Optimized for all device sizes
- **Progressive Web App** - App-like experience on mobile devices
- **Cross-Platform** - Works seamlessly across all browsers

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **React Router v6** - Client-side routing and navigation
- **Recoil** - State management for complex application state
- **Ant Design** - Professional UI component library
- **Ant Design Mobile** - Mobile-optimized components
- **Tailwind CSS** - Utility-first CSS framework

### Backend & Services
- **Firebase** - Authentication, database, and hosting
- **Stripe** - Payment processing and subscription management
- **Firebase Hosting** - Fast and secure web hosting

### Development Tools
- **Create React App** - Build toolchain and development server
- **React App Rewired** - Custom webpack configuration
- **ESLint** - Code linting and formatting
- **Jest** - Testing framework

## 📋 Prerequisites

Before running this project, ensure you have:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Yarn](https://yarnpkg.com/) package manager
- [Firebase CLI](https://firebase.google.com/docs/cli) (for deployment)
- Firebase project with Authentication, Firestore, and Hosting enabled
- Stripe account for payment processing

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/city-swap-ui.git
cd city-swap-ui
```

### 2. Install Dependencies
```bash
yarn install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
REACT_APP_BACKEND_BASE_URL=your_backend_url
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 4. Firebase Configuration
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password, Google, etc.)
3. Set up Firestore database
4. Configure Firebase Hosting
5. Update Firebase configuration in your project

### 5. Start Development Server
```bash
yarn start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### 6. Build CSS (Optional)
For Tailwind CSS development:
```bash
yarn watch-css
```

## 📁 Project Structure

```
src/
├── assets/                 # Images, logos, and static assets
│   ├── drive-assets/      # Hero background images
│   ├── images/            # General images
│   ├── logos/             # Brand logos
│   └── svgs/              # SVG icons
├── auth/                  # Authentication logic
│   ├── components/        # Auth-related components
│   ├── firebase/          # Firebase auth configuration
│   ├── helpers/           # Auth utility functions
│   └── hooks/             # Authentication hooks
├── components/            # Reusable UI components
│   ├── footer/            # Footer components
│   ├── form/              # Form components
│   ├── headers/           # Header components
│   └── utility/           # Utility components
├── helpers/               # Utility functions and constants
│   ├── countries.js       # Country data and enums
│   ├── enums.js           # Application constants
│   └── utilFunctions.js   # Helper functions
├── hooks/                 # Custom React hooks
├── pages/                 # Page components
│   ├── home/              # Homepage and search
│   ├── listing/           # Property listing pages
│   ├── profile/           # User profile pages
│   ├── chat/              # Messaging interface
│   ├── authPage/          # Authentication pages
│   └── ...                # Other page components
├── recoil/                # State management
│   ├── atoms.js           # Recoil atoms
│   └── selectors.js       # Recoil selectors
└── App.js                 # Main application component
```

## 🎨 Available Scripts

### Development
```bash
yarn start              # Start development server
yarn watch-css          # Watch and compile Tailwind CSS
yarn test               # Run test suite
```

### Production
```bash
yarn build              # Build for production
yarn deploystaging      # Deploy to Firebase staging
```

### Code Quality
```bash
yarn test               # Run tests
yarn eject              # Eject from Create React App (irreversible)
```

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS for styling. Configuration is in `tailwind.config.js`:
- Custom color schemes
- Responsive breakpoints
- Component utilities

### Firebase Hosting
Deployment configuration in `firebase.json`:
- Staging environment setup
- Single Page Application routing
- Build optimization

### React App Rewired
Custom webpack configuration in `config-overrides.js` for:
- Path aliases (@components, @auth, etc.)
- Build optimizations
- Custom loaders

## 🧪 Testing

Run the test suite:
```bash
yarn test
```

Tests are located in:
- `src/App.test.js` - Main application tests
- `src/setupTests.js` - Test configuration
- Component-specific test files

## 🚀 Deployment

### Staging Deployment
```bash
yarn deploystaging
```

### Production Deployment
1. Build the application:
   ```bash
   yarn build
   ```

2. Deploy to Firebase:
   ```bash
   firebase deploy --only hosting
   ```

### Environment Variables
Ensure all environment variables are set in your deployment environment:
- Backend API URLs
- Firebase configuration
- Stripe keys
- Third-party service keys

## 🔒 Security

- **Authentication** - Firebase Authentication with multiple providers
- **Data Validation** - Input validation and sanitization
- **Secure Payments** - PCI-compliant Stripe integration
- **Environment Variables** - Sensitive data stored securely
- **HTTPS** - All communications encrypted

## 📱 Mobile Support

- **Responsive Design** - Works on all screen sizes
- **Touch Optimized** - Mobile-friendly interactions
- **Ant Design Mobile** - Mobile-specific components
- **Progressive Web App** - App-like mobile experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow React best practices
- Use functional components and hooks
- Maintain consistent naming conventions
- Write meaningful commit messages
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in this repository
- Check the [documentation](docs/)
- Review existing issues and discussions

## 🙏 Acknowledgments

- [Create React App](https://create-react-app.dev/) for the initial setup
- [Ant Design](https://ant.design/) for the beautiful UI components
- [Firebase](https://firebase.google.com/) for backend services
- [Stripe](https://stripe.com/) for payment processing
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

---

**Made with ❤️ for travelers and hosts worldwide** 🌍✈️
