// ===================================
// THIỆP CƯỚI - MINH TRƯỜNG & PHƯƠNG QUYÊN
// ===================================

console.log('💍 Chào mừng đến với thiệp cưới của Minh Trường & Phương Quyên! 🎊');

// ===================================
// 0. LAZYLOAD FUNCTION (from HTML)
// ===================================
window.lazyload_run = function(dom, is_first, check_dom_rect) {
    if (check_dom_rect && (document.body.clientWidth <= 0 || document.body.clientHeight <= 0)) {
        return setTimeout(function() {
            window.lazyload_run(dom, is_first, check_dom_rect);
        }, 1);
    }
    var style_lazyload = document.getElementById('style_lazyload');
    var list_element_lazyload = dom.querySelectorAll('body.lazyload .ladi-overlay, body.lazyload .ladi-box, body.lazyload .ladi-button-background, body.lazyload .ladi-collection-item, body.lazyload .ladi-countdown-background, body.lazyload .ladi-form-item-background, body.lazyload .ladi-form-label-container .ladi-form-label-item.image, body.lazyload .ladi-frame-background, body.lazyload .ladi-gallery-view-item, body.lazyload .ladi-gallery-control-item, body.lazyload .ladi-headline, body.lazyload .ladi-image-background, body.lazyload .ladi-image-compare, body.lazyload .ladi-list-paragraph ul li, body.lazyload .ladi-section-background, body.lazyload .ladi-survey-option-background, body.lazyload .ladi-survey-option-image, body.lazyload .ladi-tabs-background, body.lazyload .ladi-video-background, body.lazyload .ladi-banner, body.lazyload .ladi-spin-lucky-screen, body.lazyload .ladi-spin-lucky-start');
    var docEventScroll = window;
    for (var i = 0; i < list_element_lazyload.length; i++) {
        var rect = list_element_lazyload[i].getBoundingClientRect();
        if (rect.x == "undefined" || rect.x == undefined || rect.y == "undefined" || rect.y == undefined) {
            rect.x = rect.left;
            rect.y = rect.top;
        }
        var offset_top = rect.y + window.scrollY;
        if (offset_top >= window.scrollY + window.innerHeight || window.scrollY >= offset_top + list_element_lazyload[i].offsetHeight) {
            list_element_lazyload[i].classList.add('ladi-lazyload');
        }
    }
    if (typeof style_lazyload != "undefined" && style_lazyload != undefined) {
        style_lazyload.parentElement.removeChild(style_lazyload);
    }
    document.body.classList.remove("lazyload");
    var currentScrollY = window.scrollY;
    var stopLazyload = function(event) {
        if (event.type == "scroll" && window.scrollY == currentScrollY) {
            currentScrollY = -1;
            return;
        }
        docEventScroll.removeEventListener('scroll', stopLazyload);
        list_element_lazyload = document.getElementsByClassName('ladi-lazyload');
        while (list_element_lazyload.length > 0) {
            list_element_lazyload[0].classList.remove('ladi-lazyload');
        }
    };
    if (is_first) {
        var scrollEventPassive = null;
        try {
            var opts = Object.defineProperty({}, 'passive', {
                get: function() {
                    scrollEventPassive = {
                        passive: true
                    };
                }
            });
            window.addEventListener('testPassive', null, opts);
            window.removeEventListener('testPassive', null, opts);
        } catch (e) {}
        docEventScroll.addEventListener('scroll', stopLazyload, scrollEventPassive);
    }
    return dom;
};

// Chạy lazyload khi DOM sẵn sàng
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        window.lazyload_run(document, true, true);
    });
} else {
    window.lazyload_run(document, true, true);
}

// ===================================
// 1. COUNTDOWN TIMER
// ===================================
function updateCountdown() {
    const weddingDate = new Date('2025-08-16T11:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Cập nhật countdown trong HTML
        const countdownItems = document.querySelectorAll('.ladi-countdown-text span');
        if (countdownItems.length >= 4) {
            countdownItems[0].textContent = String(days).padStart(2, '0');
            countdownItems[1].textContent = String(hours).padStart(2, '0');
            countdownItems[2].textContent = String(minutes).padStart(2, '0');
            countdownItems[3].textContent = String(seconds).padStart(2, '0');
        }
    } else {
        // Đám cưới đã diễn ra
        const countdownItems = document.querySelectorAll('.ladi-countdown-text span');
        countdownItems.forEach(item => item.textContent = '00');
    }
}

// Cập nhật countdown mỗi giây
setInterval(updateCountdown, 1000);
updateCountdown();

// ===================================
// 2. GALLERY SLIDER
// ===================================
function initGallery() {
    const gallery = document.getElementById('GALLERY1');
    if (!gallery) {
        console.log('⚠️ Gallery không tìm thấy');
        return;
    }
    
    const viewItems = gallery.querySelectorAll('.ladi-gallery-view-item');
    const controlItems = gallery.querySelectorAll('.ladi-gallery-control-item');
    const leftArrow = gallery.querySelector('.ladi-gallery-view-arrow-left');
    const rightArrow = gallery.querySelector('.ladi-gallery-view-arrow-right');
    
    console.log(`🖼️ Tìm thấy ${viewItems.length} view items và ${controlItems.length} control items`);
    
    let currentIndex = 0;
    const totalImages = 10; // Số lượng ảnh trong gallery
    
    // Danh sách ảnh cho gallery
    const imageFiles = [
        'assets/5.jpg', 'assets/6.jpg', 'assets/7.jpg', 'assets/8.jpg', 'assets/9.jpg',
        'assets/10.jpg', 'assets/12.jpg', 'assets/13.jpg', 'assets/14.jpg', 'assets/15.jpg'
    ];
    
    // Set background images cho view items (slide chính)
    viewItems.forEach((item, index) => {
        if (imageFiles[index]) {
            // Set inline style với !important
            item.setAttribute('style', `
                background-image: url('${imageFiles[index]}') !important;
                background-size: contain !important;
                background-position: center !important;
                background-repeat: no-repeat !important;
                position: absolute !important;
                width: 100% !important;
                height: 100% !important;
                top: 0 !important;
                left: 0 !important;
                display: block !important;
            `);
            console.log(`✅ Đã load ảnh ${index + 1}: ${imageFiles[index]}`);
        }
    });
    
    // Set background images cho control items (thumbnails)
    controlItems.forEach((item, index) => {
        if (imageFiles[index]) {
            item.style.backgroundImage = `url('${imageFiles[index]}')`;
            item.style.backgroundSize = 'cover';
            item.style.backgroundPosition = 'center';
            item.style.backgroundRepeat = 'no-repeat';
        }
    });
    
    // Hiển thị ảnh đầu tiên ngay lập tức
    if (viewItems.length > 0) {
        viewItems[0].classList.add('selected');
        viewItems[0].style.opacity = '1';
        viewItems[0].style.visibility = 'visible';
        viewItems[0].style.zIndex = '10';
        console.log('🔥 Hiển thị ảnh đầu tiên:', imageFiles[0]);
    }
    if (controlItems.length > 0) {
        controlItems[0].classList.add('selected');
    }
    
    console.log('✨ Gallery khởi tạo thành công!');
    console.log('📌 Số lượng view items:', viewItems.length);
    console.log('📌 Số lượng control items:', controlItems.length);
    
    function showImage(index) {
        // Fade out tất cả ảnh
        viewItems.forEach(item => {
            item.classList.remove('selected');
            item.style.opacity = '0';
            item.style.visibility = 'hidden';
            item.style.zIndex = '1';
        });
        controlItems.forEach(item => item.classList.remove('selected'));
        
        // Fade in ảnh được chọn
        if (viewItems[index]) {
            viewItems[index].classList.add('selected');
            viewItems[index].style.visibility = 'visible';
            viewItems[index].style.zIndex = '10';
            // Đợi một chút để hiệu ứng fade hoạt động
            setTimeout(() => {
                viewItems[index].style.opacity = '1';
            }, 50);
        }
        
        if (controlItems[index]) {
            controlItems[index].classList.add('selected');
        }
        
        currentIndex = index;
        gallery.setAttribute('data-current', index);
        
        console.log(`🔄 Hiển thị ảnh ${index + 1}/${totalImages}: ${imageFiles[index]}`);
    }
    
    // Arrow navigation
    if (rightArrow) {
        rightArrow.addEventListener('click', () => {
            const nextIndex = (currentIndex + 1) % totalImages;
            showImage(nextIndex);
        });
    }
    
    if (leftArrow) {
        leftArrow.addEventListener('click', () => {
            const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
            showImage(prevIndex);
        });
    }
    
    // Control items click
    controlItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            showImage(index);
        });
    });
    
    // View items click
    viewItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const nextIndex = (currentIndex + 1) % totalImages;
            showImage(nextIndex);
        });
    });
    
    // Auto slide every 5 seconds
    setInterval(() => {
        const nextIndex = (currentIndex + 1) % totalImages;
        showImage(nextIndex);
    }, 5000);
}

// ===================================
// 3. FORM SUBMISSION
// ===================================
function initForm() {
    const form = document.querySelector('#FORM2 form');
    const submitButton = document.getElementById('BUTTON2');
    const popup = document.getElementById('POPUP1');
    
    if (!form || !submitButton) return;
    
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Lấy dữ liệu form
        const nameInput = form.querySelector('input[name="name"]');
        const messageInput = form.querySelector('textarea[name="message"]');
        const attendSelect = form.querySelector('select[name="form_item7"]');
        const guestsSelect = form.querySelector('select[name="form_item8"]');
        const sideSelect = form.querySelector('select[name="form_item9"]');
        
        // Validate
        if (!nameInput || !nameInput.value) {
            alert('Vui lòng nhập tên của bạn!');
            return;
        }
        
        if (!messageInput || !messageInput.value) {
            alert('Vui lòng gửi lời nhắn đến cô dâu chú rể!');
            return;
        }
        
        if (!attendSelect || !attendSelect.value) {
            alert('Vui lòng xác nhận bạn có đến dự không!');
            return;
        }
        
        // Hiển thị popup cảm ơn
        if (popup) {
            popup.style.display = 'block';
            popup.style.opacity = '0';
            setTimeout(() => {
                popup.style.transition = 'opacity 0.3s';
                popup.style.opacity = '1';
            }, 10);
            
            // Tự động đóng popup sau 3 giây
            setTimeout(() => {
                closePopup('POPUP1');
            }, 3000);
        }
        
        // Reset form
        form.reset();
        
        // Log data (có thể gửi đến server)
        console.log('Form submitted:', {
            name: nameInput.value,
            message: messageInput.value,
            attending: attendSelect.value,
            guests: guestsSelect ? guestsSelect.value : '',
            side: sideSelect ? sideSelect.value : ''
        });
    });
}

// ===================================
// 4. POPUP QUẢN LÝ
// ===================================
function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.opacity = '0';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300);
    }
}

function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'block';
        setTimeout(() => {
            popup.style.transition = 'opacity 0.3s';
            popup.style.opacity = '1';
        }, 10);
    }
}

// Nút gửi quà mừng cưới
function initGiftButton() {
    const giftButton = document.getElementById('BUTTON3');
    const popup2 = document.getElementById('POPUP2');
    
    if (giftButton) {
        giftButton.addEventListener('click', () => {
            openPopup('POPUP2');
        });
    }
    
    // Đóng popup khi click ra ngoài
    document.querySelectorAll('.ladi-popup-background').forEach(bg => {
        bg.addEventListener('click', (e) => {
            const popup = e.target.closest('.ladi-element');
            if (popup) {
                closePopup(popup.id);
            }
        });
    });
}

// ===================================
// 5. MUSIC PLAYER
// ===================================
function initMusicPlayer() {
    const musicButton = document.getElementById('GROUP40');
    let isPlaying = false;
    let audio = null;
    
    if (musicButton) {
        musicButton.style.cursor = 'pointer';
        
        musicButton.addEventListener('click', () => {
            if (!audio) {
                // Tạo audio element (thêm file nhạc của bạn vào assets)
                audio = new Audio('assets/music.mp3'); // Bạn cần thêm file nhạc
                audio.loop = true;
            }
            
            if (isPlaying) {
                audio.pause();
                musicButton.style.opacity = '0.5';
            } else {
                audio.play().catch(e => {
                    console.log('Không thể phát nhạc tự động:', e);
                });
                musicButton.style.opacity = '1';
            }
            isPlaying = !isPlaying;
        });
    }
}

// ===================================
// 6. SCROLL ANIMATIONS
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('ladi-animation-hidden');
                entry.target.classList.add('ladi-animation-active');
            }
        });
    }, observerOptions);
    
    // Observe tất cả elements có class ladi-animation-hidden
    document.querySelectorAll('.ladi-animation-hidden').forEach(el => {
        observer.observe(el);
    });
}

// ===================================
// 7. SMOOTH SCROLL
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ===================================
// 8. DISABLE RIGHT CLICK ON IMAGES
// ===================================
function disableRightClick() {
    document.addEventListener('contextmenu', (e) => {
        if (e.target.closest('.ladi-image')) {
            e.preventDefault();
            return false;
        }
    });
}

// ===================================
// 9. LOADING ANIMATION
// ===================================
function initLoadingAnimation() {
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s';
            document.body.style.opacity = '1';
        }, 100);
    });
}

// ===================================
// 10. MOBILE RESPONSIVE ADJUSTMENTS
// ===================================
function initMobileAdjustments() {
    // Điều chỉnh kích thước cho mobile
    function adjustForMobile() {
        const isMobile = window.innerWidth <= 768;
        const containers = document.querySelectorAll('.ladi-container');
        
        containers.forEach(container => {
            if (isMobile) {
                container.style.maxWidth = '100%';
                container.style.padding = '0 10px';
            }
        });
    }
    
    adjustForMobile();
    window.addEventListener('resize', adjustForMobile);
}

// ===================================
// 11. CALENDAR HIGHLIGHT
// ===================================
function highlightWeddingDate() {
    // Highlight ngày 16 trong calendar
    const day16 = document.getElementById('HEADLINE46');
    if (day16) {
        day16.style.backgroundColor = 'rgb(134, 105, 55)';
        day16.style.borderRadius = '50%';
        day16.style.padding = '5px';
        const headline = day16.querySelector('.ladi-headline');
        if (headline) {
            headline.style.color = 'rgb(255, 255, 255)';
        }
    }
}

// ===================================
// KHỞI TẠO TẤT CẢ CHỨC NĂNG
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎊 Đang khởi tạo website...');
    
    // Khởi tạo các chức năng
    initGallery();
    initForm();
    initGiftButton();
    initMusicPlayer();
    initScrollAnimations();
    initSmoothScroll();
    disableRightClick();
    initLoadingAnimation();
    initMobileAdjustments();
    highlightWeddingDate();
    
    console.log('✅ Website đã sẵn sàng!');
    console.log('💝 Chúc mừng Minh Trường & Phương Quyên!');
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Copy text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Đã copy: ' + text);
        });
    } else {
        // Fallback cho trình duyệt cũ
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Đã copy: ' + text);
    }
}

// Thêm sự kiện copy cho số tài khoản
document.addEventListener('DOMContentLoaded', () => {
    const accountNumbers = document.querySelectorAll('#HEADLINE132, #HEADLINE135');
    accountNumbers.forEach(el => {
        el.style.cursor = 'pointer';
        el.title = 'Click để copy số tài khoản';
        el.addEventListener('click', () => {
            const accountNumber = el.textContent.trim();
            copyToClipboard(accountNumber);
        });
    });
});

