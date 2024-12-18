# Presidential Elections - Online Voting Platform  

A collaborative project to develop a **secure and dynamic online voting system** for presidential elections. Built with **Angular**, **Node.js**, and **MongoDB**, the system ensures transparency, security, and a smooth voting process.

---

## 🚀 **Installation and Setup**  

Follow these steps to set up the project on your local machine.  

### 1. **Clone the Repository**  

```bash  
git clone https://github.com/MeDjb10/Online-Election  
cd Online-Election 
```  

### 2. **Install Dependencies**  

#### Frontend (Angular)  
Go to the frontend folder and install the required dependencies:  

```bash  
cd OnlineElection-frontend  
npm install    
```  

#### Backend (Node.js)  
Navigate to the backend folder and install the backend dependencies:  

```bash  
cd ../OnlineElection-backend  
npm install   
```  

### 3. **Set up MongoDB**  

Ensure that MongoDB is installed and running on your machine, or use **MongoDB Atlas** for a cloud-based setup.  

1. Start MongoDB on port `27017` locally or configure your **MongoDB Atlas** connection string.  
2. Ensure your database has the appropriate collections.  

### 4. **Import Data**  

Import any required data (e.g., candidates or voter records) into the MongoDB database using tools like **MongoDB Compass** or the CLI.  

Example of importing data via the command line:  

```bash  
mongoimport --db ElectionDB --collection candidates --file candidates.json  
```  

---

## 🔧 **Running the Application**  

After setting up the database and installing dependencies, follow these steps to start the application:  

### 1. **Start the Backend Server**  

Navigate to the backend folder and start the server:  

```bash  
npm start  
```  

The server will run on [http://localhost:3000](http://localhost:3000).  

### 2. **Start the Frontend Application**  

Navigate to the frontend folder and run:  

```bash  
ng serve  
```  

Visit [http://localhost:4200](http://localhost:4200) in your browser to access the application.  

---

## ⚙️ **Features**  

- **Authentication System**: Login and secure access for both voters and administrators.  
- **Admin Dashboard**: Manage elections, candidates, and monitor progress.  
- **Voting System**: Secure and private voting for users.  
- **Live Results**: Real-time election results visible to authorized users.  

---

## 🛠 **Technologies Used**  

- **Angular**: Frontend framework for creating dynamic and responsive user interfaces.  
- **Node.js**: Backend runtime for scalable and fast server-side applications.  
- **MongoDB**: NoSQL database for storing election and user data.  
- **Compodoc**: For generating frontend documentation.  
- **Swagger**: For generating backend API documentation.

---

## 💬 **Contributing**  

Contributions are welcome! Fork the repository, submit a pull request, or open an issue for suggestions and bug reports.  

---

## 🧑‍💻 **Contact**  

For any questions or inquiries, feel free to contact us via email at 
[Med Amine Jabou](mailto:jabou.medamine@gmail.com).
[Med Taleb Mouelhi](mailto:mouelhi.medtaleb@gmail.com).
