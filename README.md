# StudyAI ✨

**StudyAI** is a AI-powered learning platform designed to help students and professionals turn dense study materials into actionable knowledge. By leveraging **Spring Boot** and **React**, the platform provides a seamless experience for uploading notes and instantly generating summaries and practice quizzes.

---

## 🚀 Features

* **📄 Smart PDF Upload:** Seamlessly process lecture slides, textbooks, and handwritten notes.
* **✍️ AI Summarization:** Convert long-form content into concise, high-level summaries.
* **❓ MCQ Generation:** Automatically create practice quizzes based on your specific study material.
* **📊 Progress Tracking:** (In Progress) Visualize your mastery over different subjects.
* **🌓 Dark Mode:** Fully responsive UI with a smooth, modern aesthetic.

---

## 🛠 Tech Stack

### Frontend
* **Framework:** React 18
* **Styling:** Tailwind CSS
* **Icons:** Lucide-React & FontAwesome
* **Routing:** React Router DOM

### Backend
* **Framework:** Spring Boot 3
* **Language:** Java 17+
* **Security:** Spring Security (JWT)
* **API:** RESTful Architecture
* **Build Tool:** Maven

---

## 📥 Installation & Setup

### Prerequisites
* **Node.js** (v16+)
* **JDK 17** or higher
* **Maven**

### 1. Clone the Repository
```bash
git clone https://github.com/ruturajjadhav07/studyai.git
cd studyai
```

### 2. Backend Setup (Spring Boot)
```bash
cd quize
mvn clean install
mvn spring-boot:run
```
> The server will start on **http://localhost:8080**

### 3. Frontend Setup (React)
```bash
# Open a new terminal window or go back to root
cd frontend
npm install
npm run dev
```
> The app will be available at **http://localhost:3000**

---

## 📂 Project Structure

```plaintext
studyai/
├── frontend/                # React source code
│   ├── src/
│   │   ├── component/       # Reusable UI components
│   │   └── pages/           # Landing, Login, Register
├── quize/                   # Spring Boot backend (Core Logic)
│   ├── src/main/java/       # Controllers, Services, Entities
│   └── src/main/resources/  # Configuration & API Keys
└── README.md
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. 

1. **Fork** the Project.
2. **Create** your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. **Commit** your Changes (`git commit -m 'feat: Add some AmazingFeature'`).
4. **Push** to the Branch (`git push origin feature/AmazingFeature`).
5. **Open** a Pull Request.

---

## ✉️ Let's Connect!
Got a question, a suggestion, or just want to talk about AI and tech? Drop me a message!

[Linkedin](https://www.linkedin.com/in/ruturaj-jadhav-0a250821b/) | [Instagram](https://instagram.com/ruturajj_07)

**Project Link:** [https://github.com/ruturajjadhav07/studyai](https://github.com/ruturajjadhav07/studyai)

---

> [!TIP]
> **Quick Note:** Make sure your `.env` or `application.properties` files are set up correctly with your AI API keys before running the backend!

## Built with ❤️ by Ruturaj.
