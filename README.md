# Handloom Fashion - Global Artisan Platform 🌍👗

An immersive, award-winning Handloom Fashion web application designed to connect global buyers with authentic master weavers and artisans. 

Built as a Hackathon prototype, this platform showcases extremely premium UI/UX, combining modern design aesthetics with the wealthy heritage of handloom products.

## ✨ Key Features
- **4 Distinct User Portals**: Navigate seamlessly between Buyer, Artisan, Marketing Specialist, and Admin dashboards.
- **Mock Authentication**: A state-driven Auth context allows you to quickly switch roles and test the entire ecosystem without a backend.
- **Hackathon-Winning Landing Page**: Features a stunning glassmorphism split-screen hero, interactive payable cards ("Quick Add"), and high-resolution visuals.
- **Interactive Analytics**: Dashboards feature elegant, responsive layouts displaying metrics, orders, inventory, and campaign management.

## 🚀 Built With
- **Vite** - Lightning fast bundler
- **React.js** - Robust UI library
- **React Router** - Seamless single-page navigation
- **Lucide React** - Clean, modern iconography
- **Pure CSS** - Zero-dependency, bespoke design system prioritizing performance and aesthetics.

## 🛠️ Getting Started

To run this prototype locally:

```bash
# 1. Install Dependencies
npm install

# 2. Run the Development Server
npm run dev
```

Open your browser to the URL provided by Vite (typically `http://localhost:5173/` or `http://localhost:51653/`).

## Backend API

This repo now includes a small Express backend in [backend/server.js](C:/Users/pavan/OneDrive/Desktop/Full%20St/backend/server.js:1) for exposing Firestore data as REST endpoints.

### Setup

1. Install dependencies:
```bash
npm install
```
2. Create `backend/.env` from `backend/.env.example`
3. Add your Firebase service account values
4. Start the backend:
```bash
npm run server
```

### API Endpoints

- `GET /api/health`
- `GET /api/users`
- `GET /api/users/:id`
- `GET /api/orders`
- `POST /api/orders`

This backend is suitable for hosting separately from the frontend, but GitHub only stores the code. To run it online, deploy it to a service like Render, Railway, Firebase Functions, or Cloud Run.

## 👤 User Roles Demonstration

### Quick Demo Login
The application includes convenient demo login functionality accessible from multiple locations:

1. **From the Login Page**: Click any of the "Quick Login" role buttons (Buyer, Artisan, Marketing, Admin) at the bottom of the login form.

2. **From Any Dashboard**: Each dashboard now features a demo banner at the top with role-switching buttons, allowing you to instantly switch between different user perspectives without logging out.

### Exploring User Roles
1. **Visit the Homepage**: Marvel at the fluid animations and curated catalog. Note the "Quick Add" feature on the Trending cards.
2. **Login as Different Roles**:
   - **Buyer**: Add items to your cart, simulate checkout, and track historical orders.
   - **Artisan**: View your earnings, check stock levels, and list new products dynamically.
   - **Marketing**: Access a gorgeous analytics portal and monitor active campaigns.
   - **Admin**: Moderate newly added products and manage active user suspensions.

3. **Switch Roles Seamlessly**: Use the demo login banner on any dashboard to instantly switch between roles and test the full ecosystem.

## 🎨 Design Philosophy
We avoided generic CSS frameworks like Tailwind to establish a truly bespoke "Handloom" identity. The application utilizes a warm, earthy color palette (`#8b5a2b`), the elegant `Outfit` typeface, subtle box-shadow depth (`var(--shadow-xl)`), and fluid hover interactions to ensure the digital experience matches the premium feel of the physical garments
