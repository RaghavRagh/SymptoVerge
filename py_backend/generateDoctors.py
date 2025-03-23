import pandas as pd
import random

# Specializations mapping (Disease -> Specialist)
specializations = {
    "Fungal Infection": "Dermatologist",
    "Allergy": "General Physician",
    "GERD": "Gastroenterologist",
    "Chronic Cholestasis": "Hepatologist",
    "Drug Reaction": "General Physician",
    "Peptic Ulcer Disease": "Gastroenterologist",
    "AIDS": "Infectious Disease Specialist",
    "Diabetes": "Endocrinologist",
    "Gastroenteritis": "Gastroenterologist",
    "Bronchial Asthma": "Pulmonologist",
    "Hypertension": "Cardiologist",
    "Migraine": "Neurologist",
    "Cervical Spondylosis": "Orthopedic Specialist",
    "Paralysis (brain hemorrhage)": "Neurologist",
    "Jaundice": "Hepatologist",
    "Malaria": "Infectious Disease Specialist",
    "Chickenpox": "Pediatrician",
    "Dengue": "Infectious Disease Specialist",
    "Typhoid": "General Physician",
    "Hepatitis A": "Hepatologist",
    "Hepatitis B": "Hepatologist",
    "Hepatitis C": "Hepatologist",
    "Hepatitis D": "Hepatologist",
    "Hepatitis E": "Hepatologist",
    "Alcoholic Hepatitis": "Gastroenterologist",
    "Tuberculosis": "Pulmonologist",
    "Common Cold": "General Physician",
    "Pneumonia": "Pulmonologist",
    "Dimorphic Hemorrhoids (piles)": "Proctologist",
    "Heart Attack": "Cardiologist",
    "Varicose Veins": "Vascular Surgeon",
    "Hypothyroidism": "Endocrinologist",
    "Hyperthyroidism": "Endocrinologist",
    "Hypoglycemia": "Endocrinologist",
    "Osteoarthritis": "Rheumatologist",
    "Arthritis": "Rheumatologist",
    "Vertigo": "Neurologist",
    "Acne": "Dermatologist",
    "Urinary Tract Infection": "Urologist",
    "Psoriasis": "Dermatologist",
    "Impetigo": "Dermatologist"
}

# Generate multiple doctors per specialization
doctor_data = []
locations = ["New York", "Los Angeles", "Chicago", "Houston", "Miami", "Seattle", "San Francisco", "Boston", "Denver", "Austin"]
first_names = ["John", "Jane", "Michael", "Emily", "David", "Sophia", "Robert", "Olivia", "Daniel", "Emma"]
last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"]

i = 0
for disease, specialization in specializations.items():
    num_doctors = random.randint(1, 4)  # Generate 3 to 5 doctors per specialization
    for _ in range(num_doctors):
        doctor_name = f"Dr. {random.choice(first_names)} {random.choice(last_names)}"
        location = random.choice(locations)
        contact = f"{random.randint(100, 999)}-{random.randint(100, 999)}-{random.randint(1000, 9999)}"
        i += 1
        doctor_data.append({
            "id": i,
            "name": doctor_name,
            "specialization": specialization,
            "location": location,
            "contact": contact,
            "disease": disease,
        })

# Convert to JSON
df = pd.DataFrame(doctor_data)
df.to_json("doctor_data.json", orient="records", indent=4)

print("✅ Doctor dataset saved as 'doctor_data.json'!")
