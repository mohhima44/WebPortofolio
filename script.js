document.addEventListener("DOMContentLoaded", () => {
    // --- Implementasi Animasi Scroll (Intersection Observer) ---

    // Konfigurasi observer: Elemen akan aktif ketika 10% dari elemen terlihat
    const observerOptions = {
        root: null, // Mengamati viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% dari elemen harus terlihat
    };

    // Fungsi yang akan dijalankan ketika elemen masuk/keluar viewport
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Jika elemen masuk viewport, tambahkan class 'active'
                entry.target.classList.add('active');
                // Berhenti mengamati elemen setelah ditampilkan
                observer.unobserve(entry.target);
            }
        });
    };

    // Buat Intersection Observer baru
    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Dapatkan semua elemen yang perlu dianimasikan
    const elementsToAnimate = document.querySelectorAll('.reveal-element');

    // Mulai mengamati setiap elemen
    elementsToAnimate.forEach(element => {
        scrollObserver.observe(element);
    });
    
    // --- Implementasi Smooth Scrolling untuk Navigasi ---
    
    document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll ke elemen target dengan perilaku 'smooth'
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                    
                });
            }
        });
    });
    
    document.querySelectorAll('.skill-tab-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // 1. Hitung tinggi Header agar judul tidak tertutup (misal 80px)
                const headerOffset = 90; 
                
                // 2. Ambil posisi elemen relatif terhadap viewport (layar saat ini)
                const elementPosition = targetElement.getBoundingClientRect().top;
                
                // 3. Hitung posisi absolut: Posisi elemen + Posisi Scroll saat ini - Header
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
                // 4. Scroll ke posisi yang sudah dihitung dengan akurat
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

}); // Penutup DOMContentLoaded