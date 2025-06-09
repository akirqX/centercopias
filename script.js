document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#F0640C"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#F0640C",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        
        // Animate hamburger icon
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
    
    // Close mobile menu when clicking on a link
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
    });
    
    // Portfolio filtering with pre-loading
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
            description: 'Design e impressão de rótulos para produtos gourmet',
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
    
    // Preload images for better performance
    function preloadImages() {
        portfolioItems.forEach(item => {
            const img = new Image();
            img.src = item.image;
        });
    }
    
    // Load portfolio items with loading state
    function loadPortfolioItems(items) {
        const portfolioGrid = document.querySelector('.portfolio-grid');
        portfolioGrid.innerHTML = '<div class="loading-spinner"></div>';
        
        // Small delay to show loading (optional)
        setTimeout(() => {
            portfolioGrid.innerHTML = '';
            
            items.forEach(item => {
                const portfolioItem = document.createElement('div');
                portfolioItem.className = `portfolio-item ${item.category}`;
                portfolioItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" class="portfolio-img">
                    <div class="portfolio-overlay">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                `;
                portfolioGrid.appendChild(portfolioItem);
            });
            
            // Trigger animations after load
            animatePortfolioItems();
        }, 300);
    }
    
    // Animate portfolio items after loading
    function animatePortfolioItems() {
        const items = document.querySelectorAll('.portfolio-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, index * 100);
        });
    }
    
    // Initial load with preloading
    preloadImages();
    loadPortfolioItems(portfolioItems);
    
    // Filter portfolio items
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
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
    
    // Smooth scrolling for anchor links
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
    
    // Copy button functionality
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-text');
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    });
    
    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .info-item, .about-image, .contact-form, .info-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    document.querySelectorAll('.service-card, .portfolio-item, .info-item, .about-image, .contact-form, .info-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});