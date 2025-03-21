🚀 AI-Powered Disease Prediction Chatbot
This project is an AI-powered chatbot that predicts diseases based on user-reported symptoms. It integrates machine learning for disease prediction and NLP (Natural Language Processing) to understand symptom descriptions. The chatbot also suggests specialist doctors based on the predicted disease.

📌 Features
✅ User-friendly chatbot interface for symptom-based disease prediction
✅ Machine Learning (ML) model trained on medical data
✅ NLP-powered symptom extraction from user messages
✅ Automatic symptom matching (handles variations like "pain in stomach" → "stomach_pain")
✅ Doctor recommendations based on the predicted disease
✅ DeepSeek/Mistral AI integration for general health-related queries

📁 Project Structure
graphql
Copy
Edit
📂 disease_prediction_chatbot
│── 📂 backend
│   ├── ml_api.py                 # FastAPI backend for disease prediction
│   ├── predict.py                 # ML model loading & prediction logic
│   ├── server.js                  # Node.js API integrating Mistral AI
│   ├── disease_prediction_model.pkl  # Trained ML model
│   ├── label_encoder.pkl           # Label encoder for diseases
│   ├── symbipredict_2022.csv       # Dataset containing symptoms & diseases
│   ├── requirements.txt            # Backend dependencies
│
│── 📂 frontend
│   ├── src
│   │   ├── components
│   │   │   ├── ChatInterface.tsx  # Main chatbot UI
│   │   │   ├── ChatMessage.tsx    # Handles message display
│   │   │   ├── DoctorCard.tsx     # Displays doctor details
│   │   ├── App.tsx                 # Main React app component
│   ├── package.json                # Frontend dependencies
│   ├── README.md                    # Documentation (this file)
│
│── 📂 services
│   ├── chatService.ts               # Handles API requests for predictions
│
│── 📂 data
│   ├── doctors.ts                    # JSON data of doctors by specialization
│
│── README.md                        # Project documentation
💡 How It Works
1️⃣ User Inputs Symptoms
User types symptoms in natural language (e.g., "I have pain in stomach and vomiting").
2️⃣ NLP Processes Input
Uses spaCy to extract symptom keywords.
Applies TF-IDF vectorization and cosine similarity to map words to symptoms.
3️⃣ Machine Learning Predicts Disease
ML model (Random Forest) predicts disease based on extracted symptoms.
Converts binary symptom inputs into a diagnosis.
4️⃣ Doctor Recommendation System
If the disease is predicted, it recommends specialist doctors from doctors.ts.
5️⃣ AI Chat with Mistral API
If the user asks a non-health-related question, the chatbot responds appropriately.
⚙️ Setup & Installation
🔹 Prerequisites
Ensure you have the following installed:

Python 3.8+
Node.js & npm
FastAPI for ML API
React for frontend
🔹 Backend Setup (FastAPI + ML Model)
bash
Copy
Edit
cd backend
pip install -r requirements.txt
uvicorn ml_api:app --reload
🔹 Required Dependencies (📌 requirements.txt)

nginx
Copy
Edit
fastapi
uvicorn
joblib
pandas
scikit-learn
spacy
scipy
🔹 Frontend Setup (React + TypeScript)
bash
Copy
Edit
cd frontend
npm install
npm run dev
🔹 Mistral AI Setup (General Chatbot Queries)
To enable general chat responses:
1️⃣ Get an API key from Mistral AI
2️⃣ Add it to your .env file:

ini
Copy
Edit
MISTRAL_API_KEY=your_api_key_here
3️⃣ Run the Node.js server to handle AI requests:

bash
Copy
Edit
node server.js
🛠 API Endpoints
1️⃣ Disease Prediction API (FastAPI)
📌 Endpoint: POST /predict
📌 Request Body:

json
Copy
Edit
{
  "text": "I have pain in stomach and vomiting"
}
📌 Response:

json
Copy
Edit
{
  "response": {
    "predicted_disease": "Gastroenteritis",
    "extracted_symptoms": ["stomach_pain", "vomiting"]
  }
}
2️⃣ Chatbot API (Mistral AI Integration)
📌 Endpoint: POST /chat
📌 Request Body:

json
Copy
Edit
{
  "text": "Tell me about flu symptoms"
}
📌 Response:

json
Copy
Edit
{
  "response": "Flu symptoms include fever, cough, sore throat, and fatigue."
}
🔬 Machine Learning Model Details
✔ Dataset (symbipredict_2022.csv)
The dataset contains:
✅ 132 symptoms as binary (1/0) features
✅ 41 diseases as target labels

Symptom 1	Symptom 2	...	Disease
1	0	...	Typhoid
0	1	...	Malaria
✔ ML Model: Random Forest Classifier
📌 Training Process:
✅ Feature Encoding: Symptoms converted into a binary matrix
✅ Label Encoding: Diseases converted into numeric labels
✅ Train/Test Split: 80% training, 20% testing
✅ Model Used: RandomForestClassifier(n_estimators=100)
✅ Accuracy Achieved: 95%

💡 Key Improvements
✔ Handles synonyms & variations (e.g., "pain in stomach" → "stomach_pain")
✔ Predicts diseases accurately with real-world symptom descriptions
✔ Integrates AI chatbot to handle general health questions

🚀 Future Enhancements
🔹 Fine-tune NLP model for better symptom detection
🔹 Use deep learning (BERT, GPT) for better context understanding
🔹 Improve doctor recommendations based on patient history