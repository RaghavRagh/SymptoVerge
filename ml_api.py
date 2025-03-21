from bleach import clean
from fastapi import FastAPI
import joblib
import pandas as pd
from pydantic import BaseModel
import spacy

# Load the trained model and label encoder
model = joblib.load("disease_prediction_model.pkl")
le = joblib.load("label_encoder.pkl")

# Load symptom names from dataset
df = pd.read_csv("symbipredict_2022.csv")  # Replace with actual dataset file
symptom_columns = df.columns[:-1]  # Get all symptom column names

# Load the NLP model
nlp = spacy.load("en_core_web_sm")

symptom_list = list(df.columns[:-1])  # Extract symptom names

# removing underscores from symptom names
symptom_mapping = {symptom.replace("_", " "): symptom for symptom in symptom_list}
normalized_symptom = list(symptom_mapping.keys())


def extract_symptoms(user_input):
    """Extract symptoms from user text using NLP"""
    user_input = user_input.lower()  # Convert text to lowercase
    doc = nlp(user_input)  # Process text with spaCy

    detected_symptoms = []

    # Check exact matches in cleaned symptom list
    for symptom in normalized_symptom:
        if symptom in user_input:
            detected_symptoms.append(symptom_mapping[symptom])

    # Try extracting symptoms from individual words (fallback)
    for token in doc:
        clean_token = token.lemma_
        if clean_token in normalized_symptom and symptom_mapping[clean_token] not in detected_symptoms:
            detected_symptoms.append(symptom_mapping[clean_token])

    print(detected_symptoms)
    return detected_symptoms


# Initialize FastAPI
app = FastAPI()


# Define request body model
class UserInput(BaseModel):
    text: str  # Accepts free-form text from the user


@app.post("/predict")
def predict_disease(user_input: UserInput):
    # Extract symptoms from user text
    symptoms = extract_symptoms(user_input.text)

    if not symptoms:
        return {
            "response": "I'm sorry, I couldn't detect any symptoms. Could you describe your condition in more detail?"
        }

    # Create symptom dictionary for model input
    user_symptoms = {col: 0 for col in symptom_columns}

    for symptom in symptoms:
        user_symptoms[symptom] = 1

    # Convert to DataFrame and make prediction
    user_input_df = pd.DataFrame([user_symptoms])
    prediction = model.predict(user_input_df)
    predicted_disease = le.inverse_transform(prediction)[0]

    response = {"predicted_disease": predicted_disease, "extracted_symptoms": symptoms}

    return {"response": response}
