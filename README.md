# Image Cloaker Pro 🛡️
**Adversarial Image Defense for Personal Privacy**

### 🚀 Overview
Image Cloaker Pro is a serverless, client-side browser extension designed to reclaim data sovereignty. It prevents unauthorized AI models from training on personal images by injecting "stochastic noise" into file uploads before they leave the user's local machine.

### 🛠️ Key Features
* **Zero-Trust Architecture:** Intercepts files in the DOM via the DataTransfer API.
* **Local Processing:** Powered by the Vanilla JS Canvas API (No server-side risk).
* **AI Disruption:** Applies randomized pixel perturbations to break vision model gradients.
* **Manifest V3 Compliant:** Bypasses strict CSP and unsafe-eval restrictions.

### 📥 Installation (Developer Mode)
1. Download this repository as a ZIP and extract it.
2. Go to `chrome://extensions/` in your browser.
3. Enable **Developer Mode**.
4. Click **Load unpacked** and select the `extension` folder.

### 🧪 How to Test
1. Open the `/tests/test_upload.html` file in your browser.
2. Open the Developer Console (`F12`).
3. Select an image. You will see the cloaking engine intercept the file and perform the swap instantly.

### 📄 Documentation
*Detailed technical whitepaper included in the repository docs.*
