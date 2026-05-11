// 1. THE VANILLA JS ENGINE (No external libraries required)
async function applyAdversarialNoiseClientSide(originalFile) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.src = e.target.result;
        };

        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imgData.data;

                // Core Math: Inject static into every pixel
                for (let i = 0; i < data.length; i += 4) {
                    const noiseR = Math.floor(Math.random() * 7) - 3;
                    const noiseG = Math.floor(Math.random() * 7) - 3;
                    const noiseB = Math.floor(Math.random() * 7) - 3;

                    data[i] = Math.min(255, Math.max(0, data[i] + noiseR));       // Red
                    data[i+1] = Math.min(255, Math.max(0, data[i+1] + noiseG));   // Green
                    data[i+2] = Math.min(255, Math.max(0, data[i+2] + noiseB));   // Blue
                }

                ctx.putImageData(imgData, 0, 0);

                canvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/png');

            } catch (err) {
                reject(err);
            }
        };

        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(originalFile);
    });
}

// 2. THE DOM INTERCEPTOR
document.addEventListener('change', async function(event) {
    if (event.target && event.target.type === 'file') {
        const fileInput = event.target;
        
        if (fileInput.files && fileInput.files.length > 0) {
            const originalFile = fileInput.files[0];
            
            console.log("🕵️ Intercepted locally:", originalFile.name);
            console.log("⚙️ Booting Vanilla JS Cloaking Engine...");

            try {
                // Pass to our custom engine
                const cloakedBlob = await applyAdversarialNoiseClientSide(originalFile);
                console.log("✅ Local Cloaking complete!");
                
                // Reconstruct the file
                const cloakedFile = new File([cloakedBlob], "cloaked_" + originalFile.name, {
                    type: "image/png"
                });

                // Safely inject it back into the webpage
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(cloakedFile);
                fileInput.files = dataTransfer.files;
                
                console.log("🎯 Swap complete! The site will now upload the safe image.");
                console.log("New file ready:", fileInput.files[0].name);

            } catch (error) {
                console.error("❌ Client-Side Engine Error:", error);
            }
        }
    }
});