import joblib
import numpy as np
import pandas as pd

# Load the trained model and label encoder
model = joblib.load("disease_prediction_model.pkl")
le = joblib.load("label_encoder.pkl")

# Load dataset to get the correct feature names
df = pd.read_csv("symbipredict_2022.csv")  # Replace with your actual dataset file
symptom_columns = df.columns[:-1]  # Get all symptom column names (excluding 'prognosis')

# Example: User reports itching, skin rash, and nodal skin eruptions
user_symptoms = {col: 0 for col in symptom_columns}  # Reset symptoms
user_symptoms["vomiting"] = 0
user_symptoms["loss_of_appetite"] = 0
user_symptoms["abdominal_pain"] = 0

# Convert dictionary to a DataFrame with correct column names
user_input_df = pd.DataFrame([user_symptoms])  # ✅ Keeps feature names

# Predict disease using the DataFrame
prediction = model.predict(user_input_df)

# Convert numeric prediction back to disease name
predicted_disease = le.inverse_transform(prediction)[0]
print("Predicted Disease:", predicted_disease)
