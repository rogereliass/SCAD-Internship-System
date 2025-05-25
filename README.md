# GUC SCAD Internship Management System

_A professional, internal front-end prototype for the German University in Cairo’s (GUC) SCAD Office to streamline student internship workflows._

---

## 🎯 Purpose
This repository contains a **React**-based front-end prototype developed as an **internal tool** for the **GUC SCAD Office**. It simulates the complete internship management process, supporting **five main user routes**:

- **Student Route**: Students apply for positions, track enrollment, and submit reports.
- **ProStudent Route**: Pro Students get extra features like career meetings & more.
- **Company Route**: Registration, posting internship offers, and reviewing applications.  
- **SCAD Route**: Coordinators manage applications, assign evaluators, and review outcomes.  
- **Faculty Route**: Faculty members review reports, comment on evaluations & Accept/ Reject Internship submissions.  


> **Note:** All data in this prototype is mocked and intended solely for demonstration within the project's environment.

---

## 🔗 Simulations Videos

### 🏢 SCAD Route Demo

[![ProStudent Simulation](https://img.youtube.com/vi/IiCnMf6hhCs/0.jpg)](https://www.youtube.com/embed/IiCnMf6hhCs)

### 🎓 ProStudent Route Demo

[![ProStudent Simulation](https://img.youtube.com/vi/w39ejf-nUus/0.jpg)](https://www.youtube.com/embed/w39ejf-nUus)

### 📁 Company Route Demo

[![Company Simulation](https://img.youtube.com/vi/H3d6b-X_460/0.jpg)](https://www.youtube.com/embed/H3d6b-X_460)




---

## 📝 Features
- **Role-Based Navigation**: Switch seamlessly between Company, ProStudent (student), and SCAD Coordinator views.
- **Internship Application Workflow**: Submit, review, and track applications using a clean, responsive UI.
- **Report Submission & Evaluation**: Upload final internship reports and access evaluator feedback.
- **Mock Data Simulation**: Dynamic UI updates using hard-coded datasets to emulate real interactions.
- **Responsive Design**: Mobile-first layout with TailwindCSS and ShadCN components for consistent styling.

---

## 🛠️ Tech Stack
- **Framework**: React  
- **Language**: TypeScript 
- **Styling**: TailwindCSS, ShadCN UI components  
- **Version Control**: Git & GitHub  

---

## 🚀 Getting Started
1. **Clone the repository**  
   ```bash
   git clone https://github.com/CSEN603-2025/Softies.git
   cd scad-internship-system
   ```
2. **Install dependencies**  
   ```bash
   npm install
   ```
3. **Run the development server**  
   ```bash
   npm run dev
   ```
4. **Open in browser**  
   Navigate to `http://localhost:3000` to explore all user routes.

---

## 📋 Project Structure
```text
├── public/                 # Static assets and index.html
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Route pages (Company, ProStudent, SCAD)
│   ├── data/               # Mock JSON datasets
│   ├── styles/             # Tailwind configuration and globals
│   └── App.jsx             # Root component with router setup
├── .gitignore
├── package.json
└── README.md
```

---

## 📚 Further Development
This prototype sets the foundation for full-stack integration. Future enhancements may include:
- Real backend integration with a database (e.g., Node.js + MongoDB)
- Authentication & authorization
- Notification system for status updates
- Automated report generation

---

## 📄 License
This repository is for **internal academic use only** and is **not** released under a public license. All rights reserved by the Creating team.

---

## 📬 Contact
For questions or feedback, please contact [roger.elias669@gmail.com](mailto:roger.elias669@gmail.com).
