document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'rotate(0) translate(0, 0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0, 0)';
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', function() {
            if (navList.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navList.classList.remove('active');
                
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'rotate(0) translate(0, 0)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0) translate(0, 0)';
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        animateOnScroll();
    });
    
    // Hero scroll indicator
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            window.scrollTo({
                top: document.querySelector('#services').offsetTop - 80,
                behavior: 'smooth'
            });
        });
    }
    
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = [
        {
            id: 1,
            category: 'print',
            title: 'Cartões de Visita',
            description: 'Cartões premium para empresa de advocacia',
            image: 'https://images.pexels.com/photos/7820321/pexels-photo-7820321.jpeg'
        },
        {
            id: 2,
            category: 'design',
            title: 'Identidade Visual',
            description: 'Logo e identidade para café artesanal',
            image: 'https://images.pexels.com/photos/3153204/pexels-photo-3153204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
            id: 3,
            category: 'promo',
            title: 'Banner Promocional',
            description: 'Banner para evento corporativo',
            image: 'https://d1br4h274rc9sc.cloudfront.net/content/Banner_01_cf0ec39f50.webp'
        },
        {
            id: 4,
            category: 'print',
            title: 'Flyers',
            description: 'Flyers para lançamento de produto',
            image: 'https://d1muf25xaso8hp.cloudfront.net/https://img.criativodahora.com.br/2024/07/criativo-668f1a6488d49img-2024-07-10668f1a6488d4b.jpg?w=1000&h=&auto=compress&dpr=1&fit=max'
        },
        {
            id: 5,
            category: 'design',
            title: 'Rótulos',
            description: 'Rótulos para produtos',
            image: 'https://img.freepik.com/free-vector/cider-label-design-template_23-2150241528.jpg?t=st=1745352627~exp=1745356227~hmac=b897350d3ffce774653bb63a7b1fa78d13e458b28a5bf97d698f0c430ab0d2a3&w=1380'
        },
        {
            id: 6,
            category: 'promo',
            title: 'Adesivos',
            description: 'Adesivos promocionais para loja',
            image: 'https://img.freepik.com/premium-psd/sticker-mockup-design_1249257-3390.jpg?uid=R34929093&ga=GA1.1.2058665126.1741810110&semt=ais_hybrid&w=740'
        }
    ];
    
    // Load portfolio items
    function loadPortfolioItems(items) {
        const portfolioGrid = document.querySelector('.portfolio-grid');
        portfolioGrid.innerHTML = '';
        
        items.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = `portfolio-item ${item.category}`;
            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="portfolio-img" loading="lazy">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            portfolioGrid.appendChild(portfolioItem);
        });
    }
    
    // Initial load
    loadPortfolioItems(portfolioItems);
    
    // Filter portfolio items
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            if (filter === 'all') {
                loadPortfolioItems(portfolioItems);
            } else {
                const filteredItems = portfolioItems.filter(item => item.category === filter);
                loadPortfolioItems(filteredItems);
            }
        });
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(email)) {
                alert(`Obrigado por assinar nossa newsletter! Um e-mail de confirmação foi enviado para ${email}.`);
                emailInput.value = '';
            } else {
                alert('Por favor, insira um endereço de email válido.');
            }
        });
    }
    
    // Service cards animation
    function animateServicesOnScroll() {
        const servicesSection = document.querySelector('#services');
        const serviceCards = document.querySelectorAll('.service-card');
        const sectionHeader = document.querySelector('#services .section-header');
        
        const sectionPosition = servicesSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            servicesSection.classList.add('animated');
            
            // Animate header
            gsap.to(sectionHeader, {
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
            });
            
            gsap.to(sectionHeader.querySelector('h2'), {
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            });
            
            gsap.to(sectionHeader.querySelector('p'), {
                y: 0,
                duration: 0.8,
                delay: 0.3,
                ease: "power2.out"
            });
            
            // Animate cards with staggered delay
            gsap.to(serviceCards, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
                stagger: 0.1,
                onComplete: () => {
                    // Wave effect
                    gsap.to(serviceCards, {
                        y: -10,
                        scale: 1.03,
                        duration: 0.3,
                        stagger: 0.1,
                        yoyo: true,
                        repeat: 1
                    });
                }
            });
        }
    }
    
    // Service cards hover effects
    function setupServiceHoverEffects() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;
                
                gsap.to(card, {
                    rotateX: angleX,
                    rotateY: angleY,
                    scale: 1.03,
                    y: -10,
                    duration: 0.3
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    y: 0,
                    duration: 0.5
                });
            });
        });
    }
    
    // General scroll animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.portfolio-item, .info-item, .about-image, .contact-form, .map-section, .whatsapp-qr-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                gsap.to(element, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out"
                });
            }
        });
        
        // Also check services section
        animateServicesOnScroll();
    }
    
    // WhatsApp QR code
    function generateWhatsAppQR() {
        const phoneNumber = '5573999037727';
        const contactName = 'Center Cópias TX';
        const qrSize = 150;
        
        const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${contactName}
TEL;type=CELL;type=VOICE;waid=${phoneNumber}:+${phoneNumber}
END:VCARD`;
        
        const encodedData = encodeURIComponent(vCardData);
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodedData}`;
        
        const qrImg = document.getElementById('whatsapp-qr');
        if (qrImg) {
            qrImg.src = qrUrl;
            qrImg.alt = `Adicionar ${contactName} aos contatos`;
            
            qrImg.style.cursor = 'pointer';
            qrImg.addEventListener('click', () => {
                window.open(`https://wa.me/${phoneNumber}`, '_blank');
            });
        }
    }
    
    // Copy email and phone
    function setupCopyButtons() {
        // Copy email
        const copyEmailBtn = document.getElementById('copy-email');
        const emailText = document.getElementById('email-text');
        
        if (copyEmailBtn && emailText) {
            copyEmailBtn.addEventListener('click', () => {
                copyToClipboard(emailText.textContent, copyEmailBtn);
            });
        }
        
        // Copy phone
        const copyPhoneBtn = document.querySelector('.phone-actions .btn-copy');
        const phoneText = document.querySelector('.phone-number');
        
        if (copyPhoneBtn && phoneText) {
            copyPhoneBtn.addEventListener('click', (e) => {
                e.preventDefault();
                copyToClipboard(phoneText.textContent, copyPhoneBtn);
            });
        }
    }
    
    // Helper function to copy text
    function copyToClipboard(text, button) {
        navigator.clipboard.writeText(text.trim())
            .then(() => {
                showCopyFeedback(button);
            })
            .catch(err => {
                console.error('Erro ao copiar:', err);
                const textArea = document.createElement('textarea');
                textArea.value = text.trim();
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    showCopyFeedback(button);
                } catch (err) {
                    alert('Não foi possível copiar. Por favor, copie manualmente.');
                }
                document.body.removeChild(textArea);
            });
    }
    
    // Show visual feedback
    function showCopyFeedback(button) {
        const originalText = button.innerHTML;
        const originalBg = button.style.backgroundColor;
        
        button.innerHTML = '<i class="fas fa-check"></i> Copiado!';
        button.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.backgroundColor = originalBg;
        }, 2000);
    }
    
    // Initialize
    function init() {
        // Set initial states
        document.querySelectorAll('.portfolio-item, .info-item, .about-image, .contact-form, .map-section, .whatsapp-qr-container').forEach(element => {
            gsap.set(element, {
                opacity: 0,
                y: 20
            });
        });
        
        // Set service cards initial state
        const serviceCards = document.querySelectorAll('.service-card');
        gsap.set(serviceCards, {
            opacity: 0,
            y: 30,
            scale: 0.95
        });
        
        // Set service header initial state
        const sectionHeader = document.querySelector('#services .section-header');
        gsap.set(sectionHeader, { opacity: 0 });
        gsap.set(sectionHeader.querySelector('h2'), { y: 20 });
        gsap.set(sectionHeader.querySelector('p'), { y: 20 });
        
        // Setup hover effects
        setupServiceHoverEffects();
        
        // Generate QR code
        generateWhatsAppQR();
        
        // Setup copy buttons
        setupCopyButtons();
        
        // Run animations if section is already visible
        if (window.location.hash === '#services') {
            animateServicesOnScroll();
        }
        
        // Run once on load
        animateOnScroll();
    }
    
    // Start everything
    init();
});