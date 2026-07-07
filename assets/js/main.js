/*
   DST Group - Custom JS Logic
   Handles: Scrolled Navbar, Mobile Navigation, Interactive Services Tab Switcher,
            Portfolio Card Filtering, Mock Form Submission, Scroll Link Highlighting
*/

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // SCROLLED HEADER & MOBILE NAV
    // ==========================================================================
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Add scroll class to header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        highlightNavLink();
    });

    // Toggle Mobile Menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    function highlightNavLink() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // offset

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // ==========================================================================
    // INTERACTIVE SERVICES SWITCHER
    // ==========================================================================
    const serviceButtons = document.querySelectorAll('.service-tab-btn');
    const serviceViewer = document.getElementById('service-viewer');
    const serviceImg = document.getElementById('service-img');
    const serviceTitle = document.getElementById('service-title');
    const serviceDesc = document.getElementById('service-desc');
    const serviceBullets = document.getElementById('service-bullets');

    // Services content data extracted from the PDF profile
    const servicesData = {
        ads: {
            title: "Dịch Vụ Quảng Cáo Đa Kênh (ADS)",
            desc: "DST Group xây dựng và triển khai các chiến dịch quảng cáo đa kênh thực chiến (Facebook, Google, TikTok, Zalo). Chúng tôi tập trung tối đa vào chỉ số chuyển đổi, tối ưu chi phí CPA và nâng cao tỷ suất sinh lời ROI trên từng đồng ngân sách quảng cáo của bạn.",
            img: "assets/images/service_ads.jpg",
            bullets: [
                "Tối ưu ngân sách quảng cáo đa kênh, bám sát CPA",
                "Quảng cáo Facebook & Instagram nhắm đúng tệp",
                "Quảng cáo Google Search & GDN phủ rộng thị trường",
                "Quảng cáo Tiktok Ads chuyển đổi cao, bám đuổi tốt",
                "Quản lý ngân sách & Báo cáo số liệu minh bạch",
                "Gia tăng tỷ lệ chuyển đổi đơn hàng & Tối ưu ROI"
            ]
        },
        tiktok: {
            title: "TikTok Shop Partner & MCN TikTok",
            desc: "Là đối tác chính thức TSP & MCN của TikTok tại Quảng Ninh, chúng tôi giúp cá nhân (Creators) và doanh nghiệp (Sellers) bùng nổ đơn hàng, xây dựng kênh triệu view, tối ưu giỏ hàng chuẩn SEO và kết nối mạng lưới KOC/KOL livestream thực chiến.",
            img: "assets/images/service_tiktok.jpg",
            bullets: [
                "Xây dựng & Định hướng kênh TikTok cá nhân/doanh nghiệp",
                "Setup & Vận hành gian hàng TikTok Shop chuẩn SEO",
                "Cho thuê phòng Live & Hỗ trợ kỹ thuật Livestream thực tế",
                "Kết nối KOC/KOL đa dạng mạng lưới tăng trưởng doanh thu",
                "Hỗ trợ mở khóa sản phẩm bị giới hạn & Giải quyết lỗi",
                "Kháng nghị & Tối ưu chính sách vận hành TikTok Shop"
            ]
        },
        design: {
            title: "Thiết Kế Thương Hiệu & Web Độc Bản",
            desc: "Định hình vị thế thương hiệu bằng thiết kế Web/Landing Page, Logo và Hồ sơ năng lực độc bản, chuyên nghiệp. Một giao diện và ấn phẩm đẳng cấp sẽ giúp nâng cao uy tín sản phẩm, cho phép bạn bán với giá cao hơn đối thủ cạnh tranh.",
            img: "assets/images/service_design.jpg",
            bullets: [
                "Thiết kế Website & Landing page tối ưu CRO chuẩn SEO",
                "Thiết kế Logo & Bộ nhận diện thương hiệu chuyên nghiệp",
                "Thiết kế Hồ sơ năng lực (Profile công ty) thu hút đối tác",
                "Thiết kế ấn phẩm truyền thông: Voucher, Standee, Flyer",
                "Thiết kế banner & Hình ảnh quảng cáo đa kênh bắt mắt",
                "Chuẩn hóa hình ảnh thương hiệu tạo độ tin cậy tuyệt đối"
            ]
        },
        studio: {
            title: "Studio & Media Thực Chiến",
            desc: "Sản xuất hình ảnh chất lượng cao và video ngắn (TikTok, Reels, Shorts) có nội dung lôi cuốn, giữ chân người xem. DST Group mang đến các kịch bản TVC và video quảng cáo sáng tạo, kích thích khách hàng ra quyết định mua hàng ngay lập tức.",
            img: "assets/images/service_studio.jpg",
            bullets: [
                "Quay TVC giới thiệu sản phẩm & doanh nghiệp chuyên nghiệp",
                "Chụp ảnh sản phẩm, dịch vụ làm tư liệu chạy Ads đỉnh cao",
                "Sản xuất video ngắn (TikTok, Reels, Shorts) lên xu hướng",
                "Xây dựng kịch bản truyền thông sáng tạo, thu hút khách",
                "Quay dựng video quảng cáo thực chiến tăng chuyển đổi",
                "Chụp ảnh sự kiện, hội nghị truyền thông doanh nghiệp"
            ]
        },
        setup: {
            title: "Tư Vấn & Setup Vận Hành Trọn Gói",
            desc: "Chuyển giao giải pháp và setup quy trình vận hành tinh gọn, chuyên nghiệp cho chuỗi Nhà hàng - Khách sạn - Du thuyền. Chúng tôi giúp bạn tối ưu hóa chi phí đầu tư ban đầu, đào tạo nhân sự bài bản và lập kế hoạch khai trương bùng nổ doanh số.",
            img: "assets/images/service_setup.jpg",
            bullets: [
                "Xây dựng phương hướng chiến lược & Kế hoạch phát triển",
                "Thiết kế quy trình vận hành chuẩn hóa cho từng bộ phận",
                "Tuyển dụng & Đào tạo nghiệp vụ nhân sự khách sạn/nhà hàng",
                "Tư vấn xây dựng thực đơn (Menu) & Sơ đồ setup bếp",
                "Lập kế hoạch truyền thông khai trương bùng nổ khách",
                "Chuyển giao phần mềm & Công nghệ quản trị hiện đại"
            ]
        },
        booking: {
            title: "Dịch Vụ Booking KOLs & Content Creator",
            desc: "Kết nối doanh nghiệp với mạng lưới KOC/KOL đa dạng phân khúc, gia tăng uy tín và độ phủ thương hiệu lập tức. DST Group xây dựng chiến lược content sâu sắc chạm tới cảm xúc khách hàng, tăng trưởng đơn hàng bền vững.",
            img: "assets/images/service_booking.jpg",
            bullets: [
                "Booking KOC/KOL đa dạng phân khúc bám sát tệp khách",
                "Booking ca sĩ, người mẫu, người nổi tiếng cho sự kiện lớn",
                "Xây dựng chiến lược nội dung (Content) chạm cảm xúc khách",
                "Quản lý lịch trình, kịch bản & Đo lường hiệu quả booking",
                "Đào tạo kỹ năng Livestream bùng nổ cho Creators",
                "Tối ưu hóa độ phủ thương hiệu và niềm tin khách hàng"
            ]
        }
    };

    serviceButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceKey = btn.getAttribute('data-service');
            const data = servicesData[serviceKey];
            
            if (!data) return;

            // Remove active class from buttons
            serviceButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Fade transition effect
            serviceViewer.classList.add('transitioning');

            setTimeout(() => {
                // Update text and images
                serviceImg.src = data.img;
                serviceImg.alt = data.title;
                serviceTitle.textContent = data.title;
                serviceDesc.textContent = data.desc;

                // Update bullets
                serviceBullets.innerHTML = '';
                data.bullets.forEach(bulletText => {
                    const bulletDiv = document.createElement('div');
                    bulletDiv.className = 'service-bullet';
                    bulletDiv.innerHTML = `
                        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>${bulletText}</span>
                    `;
                    serviceBullets.appendChild(bulletDiv);
                });

                // Fade back in
                serviceViewer.classList.remove('transitioning');
            }, 300); // match transitions in CSS
        });
    });

    // ==========================================================================
    // PORTFOLIO FILTERING
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            // Update active state for buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter cards with scale animation
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hidden');
                    // Add slight delay for layout adjustments before animating scale
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 350); // duration of scale/fade transition
                }
            });
        });
    });

    // ==========================================================================
    // CONTACT FORM SIMULATION
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const successOverlay = document.getElementById('form-success-overlay');
    const resetBtn = document.getElementById('form-reset-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate simple entries (HTML5 already does most, but let's add visual feedback)
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const originalText = submitBtn.textContent;

            // Show loading state
            submitBtn.textContent = 'Đang xử lý yêu cầu...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Show success overlay
                successOverlay.classList.add('active');
                
                // Restore button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Clear fields
                contactForm.reset();
            }, 1200);
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            successOverlay.classList.remove('active');
        });
    }

    // ==========================================================================
    // 3D TILT & MOUSE SPOTLIGHT EFFECT (DESKTOP ONLY)
    // ==========================================================================
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
        const hoverCards = document.querySelectorAll('.bento-card, .glass-card');
        hoverCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
                card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((centerY - y) / centerY) * 2.5; // Max 2.5 degrees tilt
                const rotateY = ((x - centerX) / centerX) * 2.5;
                
                card.style.transform = `perspective(1000px) translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

});
