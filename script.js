// Referensi untuk target nilai
const targets = {
    "RSL NIX OSW-2 via Asia Ritel": 0.5,
    "RSL NIX OSW-2 via DCI": -5.3,
    "RSL Gedung Asia Ritel EDFA-10": -8.7,
    "RSL Gedung DCI EDFA-8": -7.9,
    "RSL Gedung Asia Ritel EDFA-9": -5.0,
    "RSL Gedung DCI EDFA-7": -7.3,
    "RSL STO Sukaresmi via Asia ritel EDFA-4A": -8.2,
    "RSL STO Sukaresmi via DCI EDFA-4B": -3.9
};

// Map untuk nama hari dan bulan
const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

// Update tanggal
function updateDate() {
    const now = new Date();
    const currentDate = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    document.getElementById("current-date").textContent = currentDate;
}
updateDate();

// Generate status
document.getElementById("generate-status").addEventListener("click", () => {
    const statusForm = document.getElementById("status-form");
    const statusDisplay = document.getElementById("status-display");
    let statusText = `Dear all,\n\nBerikut Status Dark Fiber ${document.getElementById("current-date").textContent}:\n\n`;

    let isValid = true;
    Array.from(statusForm.elements).forEach((input) => {
        if (input.type === "number") {
            const key = input.name;
            const value = parseFloat(input.value);
            if (isNaN(value)) {
                alert(`Input untuk ${key} harus berupa angka.`);
                isValid = false;
                return;
            }
            const target = targets[key];
            if (value >= target) {
                statusText += `- ${key} realtime ${value.toFixed(1)} dBm, target ${target.toFixed(1)} dBm. ✅\n`;
            } else {
                const diff = (value - target).toFixed(1);
                statusText += `- ${key} realtime ${value.toFixed(1)} dBm, target ${target.toFixed(1)} dBm. Dengan selisih ${diff} dBm\n`;
            }
        }
    });

    if (isValid) {
        statusDisplay.value = statusText + "\nTerima kasih.";
    }
});

// Clear chat
document.getElementById("clear-chat").addEventListener("click", () => {
    document.getElementById("status-display").value = "";
    document.getElementById("status-form").reset();
});

// Copy to clipboard
document.getElementById("copy-status").addEventListener("click", () => {
    const statusDisplay = document.getElementById("status-display");
    statusDisplay.select();
    navigator.clipboard.writeText(statusDisplay.value);
    alert("Status berhasil disalin!");
});

// Exit program
document.getElementById("exit-program").addEventListener("click", () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
        window.close();
    }
});
