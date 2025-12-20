// URL Webb App Gogle Sheets
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyJ17jXQbI1MQwnvwJczbygfZJprWxGGiHu2QIljt8VZlrpjbEzVzmM_-V2vCE1-HwT/exec';

document.addEventListener("DOMContentLoaded", function () {
    // Smooth scroll untuk semua link yang mengarah ke id (#)
    const scrollLinks = document.querySelectorAll(
        'a.nav-link[href^="#"], a.dropdown-item[href^="#"], a.btn[href^="#"]'
    );

    scrollLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (!targetId || !targetId.startsWith("#")) return;

            e.preventDefault();
            const element = document.querySelector(targetId);
            if (element) {
                const yOffset = -70; // tinggi navbar
                const y =
                    element.getBoundingClientRect().top +
                    window.pageYOffset +
                    yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
            }
        });
    });

    // Handle submit form pendaftaran
    const form = document.getElementById("pendaftaranForm");
    const formStatus = document.getElementById("formStatus");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            formStatus.textContent = "Mengirim data...";
            formStatus.classList.remove("text-success", "text-danger");

            const formData = new FormData(form);

            // Kirim ke Google Apps Script (yang terhubung ke Google Sheets)
            fetch(SCRIPT_URL, {
                method: "POST",
                body: formData,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.text();
                })
                .then((text) => {
                    console.log("Server response:", text);
                    formStatus.textContent = "Pendaftaran berhasil dikirim.";
                    formStatus.classList.add("text-success");
                    form.reset();
                })
                .catch((error) => {
                    console.error("Error!", error);
                    formStatus.textContent =
                        "Terjadi kesalahan saat mengirim data. Silakan coba lagi.";
                    formStatus.classList.add("text-danger");
                });
        });
    }
});
