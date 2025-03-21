import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder
import joblib

# Load the dataset
df = pd.read_csv("symbipredict_2022.csv")

# Display first few rows
print(df.head())

# Step 1: Preprocessing
# Extract features (X) and target (y)
X = df.iloc[:, :-1]  # All symptom columns
y = df.iloc[:, -1]   # Disease column

# Encode disease labels into numerical values
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Step 2: Split dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# Step 3: Train a Machine Learning Model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Step 4: Evaluate Model Performance
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")


# Step 5: Save the Model for Deployment
# joblib.dump(model, "symptom_disease_model.pkl")
# joblib.dump(label_encoder, "label_encoder.pkl")
# print("Model saved successfully!")
