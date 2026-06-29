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
            title: "Dịch Vụ Quảng Cáo (ADS)",
            desc: "DST Group triển khai chiến dịch quảng cáo đa kênh tối ưu chi phí, tiếp cận tệp khách hàng tiềm năng chính xác và nâng cao tỷ lệ chuyển đổi doanh số.",
            img: "assets/images/service_ads.png",
            bullets: [
                "Quảng cáo Facebook & Instagram tối ưu",
                "Quảng cáo Google Search & GDN phủ rộng",
                "Quảng cáo Tiktok Ads chuyển đổi cao",
                "Quảng cáo Zalo tiếp cận khách hàng",
                "Quản lý ngân sách & Báo cáo minh bạch",
                "Tối ưu chi phí CPA, nâng cao ROI"
            ]
        },
        tiktok: {
            title: "TikTok Shop Partner & MCN",
            desc: "Là đối tác chính thức MCN & TSP của TikTok tại Quảng Ninh, chúng tôi đồng hành cùng các cá nhân (Creator) và doanh nghiệp (Seller) tăng trưởng doanh thu nổi bật trên nền tảng.",
            img: "assets/images/service_tiktok.png",
            bullets: [
                "Tư vấn định hướng xây kênh cá nhân/doanh nghiệp",
                "Setup gian hàng Tiktok Shop chuẩn SEO",
                "Hỗ trợ Livestream (Cho thuê phòng Live miễn phí)",
                "Kết nối KOC/KOL đa dạng mạng lưới",
                "Đăng tải & Tối ưu sản phẩm bị giới hạn",
                "Giải quyết khiếu nại, giảm lỗi chính sách"
            ]
        },
        design: {
            title: "Thiết Kế & Branding chuyên nghiệp",
            desc: "Thiết lập nền tảng nhận diện thương hiệu chuyên nghiệp, mang tính thẩm mỹ cao giúp khẳng định uy tín doanh nghiệp trên thị trường.",
            img: "assets/images/service_design.png",
            bullets: [
                "Thiết kế Website & Landing page chuẩn SEO",
                "Thiết kế Logo & Bộ nhận diện thương hiệu",
                "Thiết kế Hồ sơ năng lực (Profile công ty)",
                "Thiết kế ấn phẩm in ấn: Voucher, Standee, Flyer",
                "Thiết kế banner hình ảnh truyền thông đa kênh",
                "Định vị và chuẩn hóa hình ảnh thương hiệu"
            ]
        },
        studio: {
            title: "Studio & Media",
            desc: "Sản xuất hình ảnh, video chất lượng cao giúp truyền tải thông điệp thương hiệu một cách sinh động, ấn tượng và tăng độ tin cậy đối với khách hàng.",
            img: "assets/images/service_studio.png",
            bullets: [
                "Quay TVC giới thiệu sản phẩm & doanh nghiệp",
                "Chụp ảnh sản phẩm, dịch vụ chuyên nghiệp",
                "Chụp ảnh sự kiện doanh nghiệp thường niên",
                "Edit video bài chạy quảng cáo thu hút",
                "Quay dựng video ngắn (Tiktok, Reels, Shorts)",
                "Xây dựng kịch bản truyền thông sáng tạo"
            ]
        },
        setup: {
            title: "Setup Nhà Hàng - Khách Sạn - Du Thuyền",
            desc: "Tư vấn chiến lược và setup vận hành trọn gói chuỗi Nhà hàng - Khách sạn - Du thuyền từ khâu hoạch định phương hướng đến triển khai chi tiết.",
            img: "assets/images/service_setup.png",
            bullets: [
                "Xây dựng phương hướng & kế hoạch phát triển",
                "Thiết kế sơ đồ quy trình vận hành chi tiết",
                "Tuyển dụng & Đào tạo chuyên môn nhân sự",
                "Tư vấn xây dựng thực đơn & setup bếp",
                "Xây dựng kịch bản truyền thông khai trương",
                "Chuyển giao công nghệ quản lý hiện đại"
            ]
        },
        booking: {
            title: "Dịch Vụ Booking & Content",
            desc: "Kết nối thương hiệu với mạng lưới KOLs/KOCs tầm ảnh hưởng và phát triển kho nội dung giá trị định hình phong cách thương hiệu.",
            img: "assets/images/service_booking.png",
            bullets: [
                "Booking KOLs/KOCs đa dạng phân khúc tệp khách",
                "Booking ca sĩ, diễn viên, người mẫu sự kiện",
                "Xây dựng nội dung (Content) sáng tạo đa kênh",
                "Quản lý lịch trình và đo lường hiệu quả booking",
                "Đào tạo PR cá nhân trở thành Idol Livestream",
                "Quản trị truyền thông phủ sóng thương hiệu"
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
    // RIVE PLAYER INITIALIZATION
    // ==========================================================================
    const riveCanvas = document.getElementById('rive-canvas');
    const riveLoader = document.getElementById('rive-loader');

    if (riveCanvas && typeof rive !== 'undefined') {
        const r = new rive.Rive({
            src: 'https://cdn.rive.app/animations/off_road_car_v7.riv',
            canvas: riveCanvas,
            autoplay: true,
            stateMachines: 'motion',
            onLoad: () => {
                r.resizeDrawingSurfaceToCanvas();
                if (riveLoader) {
                    riveLoader.style.opacity = '0';
                    setTimeout(() => {
                        riveLoader.style.display = 'none';
                    }, 400);
                }
                console.log("Rive animation loaded successfully!");
            },
            onError: (err) => {
                console.error("Error loading Rive animation:", err);
                if (riveLoader) {
                    const span = riveLoader.querySelector('span');
                    if (span) span.textContent = 'Không thể tải hoạt ảnh Rive.';
                    const spinner = riveLoader.querySelector('div');
                    if (spinner) spinner.style.display = 'none';
                }
            }
        });

        // Resize drawing surface on window resize
        window.addEventListener('resize', () => {
            if (r) {
                r.resizeDrawingSurfaceToCanvas();
            }
        });
    }
});
