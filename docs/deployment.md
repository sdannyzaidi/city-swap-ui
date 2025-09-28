# Deployment Guide 🚀

This guide covers deploying the CitySwap UI application to various environments.

## Prerequisites

- Node.js 14+ and Yarn installed
- Firebase CLI installed and authenticated
- Access to Firebase project
- Environment variables configured

## Environment Setup

### 1. Environment Variables

Create environment-specific `.env` files:

**`.env.development`**
```env
REACT_APP_BACKEND_BASE_URL=http://localhost:8000/api
REACT_APP_FIREBASE_API_KEY=your_dev_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-dev-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-dev-project
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

**`.env.production`**
```env
REACT_APP_BACKEND_BASE_URL=https://api.cityswap.com
REACT_APP_FIREBASE_API_KEY=your_prod_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-prod-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-prod-project
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### 2. Firebase Configuration

Update `firebase.json` for your environments:

```json
{
  "hosting": [
    {
      "target": "staging",
      "public": "build",
      "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
      "rewrites": [
        {
          "source": "**",
          "destination": "/index.html"
        }
      ]
    },
    {
      "target": "production",
      "public": "build",
      "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
      "rewrites": [
        {
          "source": "**",
          "destination": "/index.html"
        }
      ]
    }
  ]
}
```

## Deployment Methods

### 🔧 Staging Deployment

For testing and preview deployments:

```bash
# Build the application
yarn build

# Deploy to staging
yarn deploystaging
```

Or manually:
```bash
yarn build
firebase deploy --only hosting:staging -P staging
```

### 🌟 Production Deployment

For live production deployment:

```bash
# Ensure you're on the main branch
git checkout main
git pull origin main

# Install dependencies
yarn install

# Build for production
yarn build

# Deploy to production
firebase deploy --only hosting:production -P production
```

### 🐳 Docker Deployment

**Dockerfile:**
```dockerfile
FROM node:16-alpine as build

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Build and run:**
```bash
docker build -t cityswap-ui .
docker run -p 3000:80 cityswap-ui
```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        cache: 'yarn'
    
    - name: Install dependencies
      run: yarn install --frozen-lockfile
    
    - name: Run tests
      run: yarn test --coverage --watchAll=false
    
    - name: Build application
      run: yarn build
      env:
        REACT_APP_BACKEND_BASE_URL: ${{ secrets.BACKEND_URL }}
        REACT_APP_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
        # Add other environment variables
    
    - name: Deploy to Firebase
      uses: FirebaseExtended/action-hosting-deploy@v0
      with:
        repoToken: '${{ secrets.GITHUB_TOKEN }}'
        firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
        projectId: your-firebase-project-id
```

## Performance Optimization

### Build Optimization

1. **Bundle Analysis:**
   ```bash
   yarn build
   npx serve -s build
   ```

2. **Code Splitting:**
   - Implement lazy loading for routes
   - Split vendor bundles
   - Optimize images and assets

3. **Caching Strategy:**
   - Configure Firebase Hosting cache headers
   - Implement service worker for offline support

### Firebase Hosting Configuration

Add to `firebase.json`:

```json
{
  "hosting": {
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control", 
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

## Monitoring & Analytics

### 1. Firebase Analytics
```javascript
// In your app
import { getAnalytics } from 'firebase/analytics';
const analytics = getAnalytics(app);
```

### 2. Error Tracking
Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for user behavior

### 3. Performance Monitoring
```javascript
// Firebase Performance
import { getPerformance } from 'firebase/performance';
const perf = getPerformance(app);
```

## Rollback Strategy

### Quick Rollback
```bash
# List recent deployments
firebase hosting:releases

# Rollback to previous version
firebase hosting:rollback
```

### Git-based Rollback
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Redeploy
yarn build && firebase deploy
```

## Security Checklist

- [ ] Environment variables are secure
- [ ] Firebase security rules are configured
- [ ] HTTPS is enforced
- [ ] API keys are restricted
- [ ] Content Security Policy is set
- [ ] Dependencies are up to date

## Troubleshooting

### Common Issues

1. **Build Failures:**
   - Check Node.js version compatibility
   - Clear node_modules and reinstall
   - Verify environment variables

2. **Deployment Failures:**
   - Verify Firebase CLI authentication
   - Check project permissions
   - Ensure build directory exists

3. **Runtime Errors:**
   - Check browser console for errors
   - Verify API endpoints are accessible
   - Check Firebase configuration

---

*For additional support, check the Firebase documentation or create an issue in the repository.*
