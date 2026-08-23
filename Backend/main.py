import joblib
from fastapi import FastAPI
from pydantic import BaseModel, Field
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

random_forest_model = joblib.load('random_forest_model1.pkl')
robust_scaler = joblib.load('robust_scaler1.pkl')

print("\n========== SCALER INFO ==========")
print("Scaler type:", type(robust_scaler))
print("Number of features:", robust_scaler.n_features_in_)

if hasattr(robust_scaler, "feature_names_in_"):
    print("Feature names:")
    print(robust_scaler.feature_names_in_)

print("Center:")
print(robust_scaler.center_)

print("Scale:")
print(robust_scaler.scale_)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class TransactionData(BaseModel):

    Time: float = Field(..., ge=0)

    V1: float
    V2: float
    V3: float
    V4: float
    V5: float
    V6: float
    V7: float
    V8: float
    V9: float
    V10: float
    V11: float
    V12: float
    V13: float
    V14: float
    V15: float
    V16: float
    V17: float
    V18: float
    V19: float
    V20: float
    V21: float
    V22: float
    V23: float
    V24: float
    V25: float
    V26: float
    V27: float
    V28: float

    Amount: float = Field(..., ge=0) 
    
class predictionResponse(BaseModel):
    predicted_fraud_detected: str
    fraud_probability: float



@app.get("/")
def home():
    return {"message": "Fraud Detection API is running"}

@app.post('/predict', response_model=predictionResponse)
def predict(data: TransactionData):
    input_row = pd.DataFrame([{
    "Time": data.Time,

    "V1": data.V1,
    "V2": data.V2,
    "V3": data.V3,
    "V4": data.V4,
    "V5": data.V5,
    "V6": data.V6,
    "V7": data.V7,
    "V8": data.V8,
    "V9": data.V9,
    "V10": data.V10,
    "V11": data.V11,
    "V12": data.V12,
    "V13": data.V13,
    "V14": data.V14,
    "V15": data.V15,
    "V16": data.V16,
    "V17": data.V17,
    "V18": data.V18,
    "V19": data.V19,
    "V20": data.V20,
    "V21": data.V21,
    "V22": data.V22,
    "V23": data.V23,
    "V24": data.V24,
    "V25": data.V25,
    "V26": data.V26,
    "V27": data.V27,
    "V28": data.V28,

    "Amount": data.Amount
}])
    print("\n========== INPUT FROM WEBSITE ==========")
    print(input_row) 

    scaled_input = robust_scaler.transform(input_row)

    print("\n========== SCALED INPUT ==========")
    print(scaled_input)

    prediction = random_forest_model.predict(scaled_input)[0]

    probabilities = random_forest_model.predict_proba(scaled_input)[0]

    print("\n========== MODEL OUTPUT ==========")
    print("Prediction:", prediction)
    print("Probabilities:", probabilities)

    probability = probabilities[1]

    print("Fraud Probability:", probability)

    result = 'Fraud' if prediction == 1 else 'Normal'

    return predictionResponse(
    predicted_fraud_detected=result,
    fraud_probability=round(float(probability), 4) * 100
)


     