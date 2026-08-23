//PIPELINE MODEL

const pipelineBoxes = document.querySelectorAll(".pipeline-box");

const modal = document.getElementById("pipelineModal");
const closeModal = document.getElementById("closeModal");
const gotIt = document.getElementById("gotIt");

const modalStage = document.getElementById("modalStage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalIcon = document.getElementById("modalIcon");


pipelineBoxes.forEach(box => {

    box.addEventListener("click", () => {

        const stage = box.dataset.stage;
        const title = box.dataset.title;
        const description = box.dataset.description;
        const icon = box.dataset.icon;

        modalStage.textContent = `PIPELINE STAGE ${stage}`;
        modalTitle.textContent = title;
        modalDescription.textContent = description;

        modalIcon.innerHTML = `
            <i class="fa-solid ${icon}"></i>
        `;

        modal.classList.remove("hidden");
    });

});


if (closeModal) {
    closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
    });
}


if (gotIt) {
    gotIt.addEventListener("click", () => {
        modal.classList.add("hidden");
    });
}

// REFRESH BUTTON

const refreshBtn = document.getElementById("refreshBtn");
const refreshIcon = document.getElementById("refreshIcon");

if (refreshBtn && refreshIcon) {

    refreshBtn.addEventListener("click", () => {

        refreshIcon.classList.add("refresh-spin");

        refreshBtn.disabled = true;

        setTimeout(() => {
            location.reload();
        }, 1000);

    });

}

//slider
const criticalslider = document.getElementById("criticalSlider")
const criticalsvalue = document.getElementById("criticalValue")
const manualslider = document.getElementById("manualSlider")
const manualvalue = document.getElementById("manualValue")
if (criticalslider && criticalsvalue && manualslider && manualvalue) {
    criticalslider.addEventListener("input", () => {
        criticalsvalue.textContent = criticalslider.value + "% Risk Score";
    })
    manualslider.addEventListener("input", () => {
        manualvalue.textContent = manualslider.value + "% Risk Score";
    });
}

//Analysis

const form = document.getElementById("transactionForm");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const formData = new FormData(form);

    const data = {
    Time: Number(formData.get("Time")),
    Amount: Number(formData.get("Amount")),

    V1: Number(formData.get("V1")),
    V2: Number(formData.get("V2")),
    V3: Number(formData.get("V3")),
    V4: Number(formData.get("V4")),
    V5: Number(formData.get("V5")),
    V6: Number(formData.get("V6")),
    V7: Number(formData.get("V7")),
    V8: Number(formData.get("V8")),
    V9: Number(formData.get("V9")),
    V10: Number(formData.get("V10")),
    V11: Number(formData.get("V11")),
    V12: Number(formData.get("V12")),
    V13: Number(formData.get("V13")),
    V14: Number(formData.get("V14")),
    V15: Number(formData.get("V15")),
    V16: Number(formData.get("V16")),
    V17: Number(formData.get("V17")),
    V18: Number(formData.get("V18")),
    V19: Number(formData.get("V19")),
    V20: Number(formData.get("V20")),
    V21: Number(formData.get("V21")),
    V22: Number(formData.get("V22")),
    V23: Number(formData.get("V23")),
    V24: Number(formData.get("V24")),
    V25: Number(formData.get("V25")),
    V26: Number(formData.get("V26")),
    V27: Number(formData.get("V27")),
    V28: Number(formData.get("V28"))
};

console.log("Sending to backend:", data);

    try {

        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.text();

            console.error("Backend Error:", errorData);

            throw new Error(
                `HTTP ${response.status}: ${errorData}`
            );
        }

        const result = await response.json();

        console.log("Backend response:", result);

        const resultPanel = document.getElementById("resultPanel");
        const resultTitle = document.getElementById("resultTitle");
        const resultText = document.getElementById("resultText");
        const resultIcon = document.getElementById("resultIcon");

        if (result.predicted_fraud_detected === "Fraud") {

            resultTitle.textContent = "FRAUD DETECTED";

            resultText.textContent =
                `Fraud Probability: ${result.fraud_probability}%`;

            resultIcon.className =
                "fa-solid fa-triangle-exclamation text-4xl text-red-400 mb-3";

        } else {

            resultTitle.textContent = "TRANSACTION NORMAL";

            resultText.textContent =
                `Fraud Probability: ${result.fraud_probability}%`;

            resultIcon.className =
                "fa-solid fa-circle-check text-4xl text-green-400 mb-3";
        }

    }
    catch (error) {
        console.error("FULL ERROR:", error);
        alert(error.message);
    }

});

