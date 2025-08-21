# 🌊 NeerMap (नीरमैप)  
**"Mapping Every Drop That Matters"**  

**NeerMap (नीरमैप)** is a MERN stack web application that helps people (both rural and urban) **locate and evaluate water resources** based on their suitability for different purposes like **drinking, irrigation, washing, etc.**.  

The platform is **community-driven** — users can contribute resources, review them, report issues, and flag incorrect information, making it more reliable over time. 
All application content (except user-entered resource details) is also available in **Hindi**, making it more accessible.  

🔗 **Live Demo:** [neer-map-project.vercel.app](https://neer-map-project.vercel.app)  

---

## ✨ Features  

### 🔍 Explore Page  
- View all water resources  
- Filter by **suitability** (drinking, irrigation, washing, etc.)  

### 🧭 Advanced Search  
Step-by-step search flow:  
1. **Choose location**  
   - Use **current location (GPS)** OR  
   - Select a **location manually** on the interactive map  
2. **Set search radius** around the chosen location  
3. **Apply filters**:  
   - Suitability  (drinking, washing, irrigation, etc.) 
   - Nature (natural, man-made, etc.)  
   - Type of resource (well, river, tubewell, etc.)  
   - Minimum rating  

### ➕ Contribute Page  
- Only **logged-in users** can add a new water resource
- Users can enter the resource details and select its location on the provided map

### 📍 Resource Details (Show Page)  
- Full details of a resource  
- If creator → can **edit or delete** resource  
- Reviews & Ratings (inside the page):  
  - Logged-in users can add/delete reviews  
  - Average rating updates in real time  
- **Flag Resource:**  
  - Can be done by **any user (logged in or not)**  

### 🚩 Report Page  
- Users can **report an issue** related to any resource  
- Helps in maintaining accuracy and moderating community submissions  

### 📄 Other Pages  
- About  
- Community  
- Privacy Policy  
- Terms of Service  
- Help  

---

## ⚙️ Tech Stack  

### Frontend  
- React (Vite)  
- Bootstrap (UI styling)  
- React Router (routing)  
- Leaflet.js + React-Leaflet (maps & markers)  
- Axios (API requests)  
- React-Toastify (notifications)  
- i18next (multilingual support – Hindi)  

### Backend  
- Node.js + Express.js  
- MongoDB (database)  
- Mongoose (ODM)  
- Joi (backend validation)  
- Passport.js (authentication)  
  - passport-local  
  - passport-local-mongoose  
- Express Sessions (session handling)  
- Connect-Mongo (session store)  
- CORS (cross-origin requests)  
- Dotenv (environment variables)  

### Deployment  
- **Frontend** → Vercel  
- **Backend** → Render  

---
