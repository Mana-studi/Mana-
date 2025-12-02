// Website Personal Mana - Script Utama
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website Mana loaded successfully!');
    
    // Inisialisasi
    initCurrentYear();
    initTikTokEmbed();
    initSiteLock();
    initAnimations();
    
    // Event Listeners
    setupEventListeners();
});

// ===== FUNGSI UTAMA =====

// Update tahun di footer
function initCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Embed TikTok Feed
function initTikTokEmbed() {
    const embedContainer = document.getElementById('tiktok-embed');
    const fallback = document.getElementById('tiktok-fallback');
    
    if (!embedContainer) return;
    
    // Coba embed TikTok (karena TikTok tidak mengizinkan embed langsung, kita gunakan iframe embed)
    // Ini adalah fallback karena TikTok embed memerlukan server-side processing
    setTimeout(() => {
        // Simulasi loading gagal setelah 3 detik
        // Dalam implementasi nyata, Anda perlu menggunakan TikTok API
        embedContainer.classList.add('hidden');
        fallback.style.display = 'block';
        
        // Alternatif: Tampilkan screenshot atau link langsung
        fallback.innerHTML = `
            <div class="fallback-content">
                <i class="fab fa-tiktok"></i>
                <h3>Kunjungi TikTok untuk Melihat Karya</h3>
                <p>Konten TikTok tidak dapat ditampilkan langsung di sini</p>
                <div style="margin-top: 1.5rem;">
                    <a href="https://tiktok.com/@mana.fx" target="_blank" class="btn-secondary" style="margin: 0.5rem;">
                        <i class="fab fa-tiktok"></i> Buka TikTok
                    </a>
                    <a href="https://wa.me/6282313145898" target="_blank" class="btn-secondary" style="margin: 0.5rem;">
                        <i class="fab fa-whatsapp"></i> Tanya via WA
                    </a>
                </div>
            </div>
        `;
    }, 3000);
}

// Site Lock System
function initSiteLock() {
    const siteLock = document.getElementById('site-lock');
    const unlockBtn = document.getElementById('unlock-btn');
    
    // Cek apakah website dalam keadaan terkunci
    const isLocked = localStorage.getItem('siteLocked') === 'true';
    
    if (isLocked && siteLock) {
        siteLock.style.display = 'flex';
    }
    
    // Tombol unlock
    if (unlockBtn) {
        unlockBtn.addEventListener('click', function() {
            const password = prompt('Masukkan kode unlock:');
            
            // Password sederhana (bisa diganti dengan yang lebih kompleks)
            if (password === 'mana123' || password === 'Mana2024') {
                localStorage.setItem('siteLocked', 'false');
                if (siteLock) {
                    siteLock.style.display = 'none';
                }
                alert('Website berhasil di-unlock!');
            } else {
                alert('Kode salah! Website tetap terkunci.');
            }
        });
    }
}

// Animasi elemen saat scroll
function initAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animasikan semua cards
    document.querySelectorAll('.link-card, .info-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Setup semua event listeners
function setupEventListeners() {
    // Hover effect untuk link cards
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Highlight effect untuk stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.stat-icon');
            if (icon) {
                icon.style.transform = 'rotate(15deg) scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.stat-icon');
            if (icon) {
                icon.style.transform = 'rotate(0) scale(1)';
            }
        });
    });
    
    // Service list hover effect
    const serviceItems = document.querySelectorAll('.services-list li');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(360deg)';
                icon.style.transition = 'transform 0.5s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(0)';
            }
        });
    });
    
    // Emergency button alert
    const emergencyBtn = document.querySelector('.footer-link.emergency');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function(e) {
            if (!confirm('Apakah Anda yakin ingin menghubungi Mana untuk emergency order?')) {
                e.preventDefault();
            }
        });
    }
}

// ===== FUNGSI UTILITY =====

// Copy ke clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard: ' + text);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Format harga
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

// Check device type
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Theme toggle (untuk future development)
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Load theme preference
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
}

// ===== FUNGSI UNTUK PEMILIK =====

// Fungsi untuk mengunci website dari console (emergency)
window.lockSite = function() {
    localStorage.setItem('siteLocked', 'true');
    alert('Website telah dikunci. Refresh halaman untuk melihat efeknya.');
    location.reload();
};

// Fungsi untuk unlock website dari console
window.unlockSite = function() {
    localStorage.setItem('siteLocked', 'false');
    alert('Website telah di-unlock.');
    location.reload();
};

// Debug mode
window.toggleDebug = function() {
    document.body.classList.toggle('debug-mode');
    console.log('Debug mode toggled');
};

// ===== INISIALISASI TAMBAHAN =====
// Load theme preference saat halaman dimuat
loadTheme();

// Cek jika ada pesan di URL
const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get('message');
if (message) {
    console.log('Message from URL:', decodeURIComponent(message));
}