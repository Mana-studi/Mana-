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
  if (!embedContainer) return;

  // Langsung tampilkan card fallback (lebih cepat & reliable)
  embedContainer.innerHTML = `
    <div class="tiktok-fallback-card">
      <div class="tt-icon"><i class="fab fa-tiktok"></i></div>
      <h3>@mana.fx</h3>
      <p>7K+ Followers • 250K+ Likes</p>
      <p class="tt-note">Konten TikTok ditampilkan langsung di aplikasi</p>
      <a href="https://tiktok.com/@mana.fx" target="_blank" class="tt-btn">
        <i class="fab fa-tiktok"></i> Buka di TikTok
      </a>
    </div>
  `;
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
// ===== SCROLL-AWARE CTA TOGGLE =====
const ctaBtn = document.querySelector('.mobile-cta');
if (ctaBtn) {
  let lastScrollY = window.scrollY;
  const scrollThreshold = 40; // px minimal buat trigger perubahan
  let isTicking = false;

  function handleScrollCTA() {
    const currentScrollY = window.scrollY;
    
    // Sembunyikan kalau di paling atas
    if (currentScrollY < 120) {
      ctaBtn.classList.remove('cta-visible');
    } 
    // Scroll ke bawah → muncul
    else if (currentScrollY > lastScrollY + scrollThreshold) {
      ctaBtn.classList.add('cta-visible');
    } 
    // Scroll ke atas → hilang
    else if (currentScrollY < lastScrollY - scrollThreshold) {
      ctaBtn.classList.remove('cta-visible');
    }
    
    lastScrollY = currentScrollY;
    isTicking = false;
  }

  window.addEventListener('scroll', function() {
    if (!isTicking) {
      window.requestAnimationFrame(handleScrollCTA);
      isTicking = true;
    }
  }, { passive: true });
}
// ===== UNIVERSAL LINK CONFIRMATION =====
const confirmedLinks = new Set();

document.querySelector('.link-grid')?.addEventListener('click', function(e) {
  const link = e.target.closest('.link-card');
  // Abaikan jika bukan link-card atau href-nya kosong/#
  if (!link || link.getAttribute('href') === '#' || !link.href) return;

  e.preventDefault(); // Tahan navigasi dulu

  if (confirmedLinks.has(link)) {
    // ✅ Klik kedua: Buka link & reset state
    window.open(link.href, link.target || '_blank');
    confirmedLinks.delete(link);
    link.classList.remove('confirm-pending');
  } else {
    // ⚠️ Klik pertama: Aktifkan warning state
    confirmedLinks.add(link);
    link.classList.add('confirm-pending');

    // Auto reset setelah 4 detik jika user nggak klik lagi
    setTimeout(() => {
      confirmedLinks.delete(link);
      link.classList.remove('confirm-pending');
    }, 4000);
  }
});

// 🔄 Reset state kalau user klik di area lain (bukan kartu link)
document.addEventListener('click', function(e) {
  if (!e.target.closest('.link-card')) {
    confirmedLinks.forEach(el => el.classList.remove('confirm-pending'));
    confirmedLinks.clear();
  }
});

// ===== TOAST NOTIFICATION FOR DISABLED LINKS =====
let toastTimeout;

function showToast(message, duration = 3000) {
  let toast = document.querySelector('.toast-notification');
  
  // Buat toast kalau belum ada
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <i class="fas fa-exclamation-circle"></i>
      <span class="toast-message">${message}</span>
    `;
    document.body.appendChild(toast);
  }
  
  // Update pesan
  const messageSpan = toast.querySelector('.toast-message');
  if (messageSpan) {
    messageSpan.textContent = message;
  }
  
  // Tampilkan
  clearTimeout(toastTimeout);
  toast.classList.add('toast-visible');
  
  // Auto-hide setelah duration
  toastTimeout = setTimeout(() => {
    toast.classList.remove('toast-visible');
  }, duration);
}

// Deteksi klik pada link dengan href="#"
document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    showToast('Link belum tersedia', 3500);
  });
});
