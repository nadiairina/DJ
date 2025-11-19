// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu
function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Handle all navigation links for smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
        closeMobileMenu();
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Show success toast
    showToast('Mensagem enviada! Entrarei em contato em breve.');
    
    // Reset form
    contactForm.reset();
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', { name, email, message });
});

// Toast notification function
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <strong>Sucesso!</strong>
        <p>${message}</p>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Intersection Observer for animations (optional enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Make hero visible immediately
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }
});

// Lazy loading for images (optional enhancement)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Shopping cart functionality
let cart = [];

function addToCart(productId) {
    // Product data
    const products = {
        'preset-vintage': { name: 'Vintage Film Presets', price: 29.99, category: 'Preset' },
        'preset-moody': { name: 'Moody Tones Presets', price: 34.99, category: 'Preset' },
        'pack-wedding': { name: 'Wedding Photography Pack', price: 79.99, category: 'Pack Completo' },
        'wallpaper-nature': { name: 'Nature Collection', price: 19.99, category: 'Wallpapers' },
        'wallpaper-urban': { name: 'Urban Landscapes', price: 14.99, category: 'Wallpapers' },
        'pack-complete': { name: 'Complete Collection', price: 149.99, category: 'Pack Completo' }
    };

    const product = products[productId];
    
    if (product) {
        cart.push(product);
        showToast(`${product.name} adicionado ao carrinho!`);
        console.log('Cart:', cart);
        
        // In a real application, you would:
        // 1. Update cart UI/counter
        // 2. Store cart in localStorage
        // 3. Send to backend
    }
}

function viewProduct(productId) {
    // Product descriptions
    const productDetails = {
        'preset-vintage': {
            name: 'Vintage Film Presets',
            price: '€29,99',
            description: 'Pack com 15 presets profissionais que recriam a estética clássica do filme analógico. Tons quentes, grão autêntico e cores nostálgicas.',
            features: ['15 presets Lightroom/Camera Raw', 'Compatível com JPG e RAW', 'Instruções de instalação', 'Antes/Depois de exemplo']
        },
        'preset-moody': {
            name: 'Moody Tones Presets',
            price: '€34,99',
            description: 'Pack com 20 presets para criar atmosferas dramáticas e cinematográficas. Perfeito para retratos e fotografia editorial.',
            features: ['20 presets Lightroom/Camera Raw', 'Tons escuros e dramáticos', 'Otimizado para retratos', 'Guia de uso incluído']
        },
        'pack-wedding': {
            name: 'Wedding Photography Pack',
            price: '€79,99',
            description: 'Pacote completo para fotografia de casamento. Inclui 30 presets + guia profissional de 50 páginas com dicas e técnicas.',
            features: ['30 presets especializados', 'Guia PDF de 50 páginas', 'Templates para poses', 'Checklist de equipamento']
        },
        'wallpaper-nature': {
            name: 'Nature Collection',
            price: '€19,99',
            description: 'Coleção de 50 wallpapers de natureza em resolução 4K. Paisagens deslumbrantes para seu desktop e mobile.',
            features: ['50 imagens em 4K (3840x2160)', 'Versões mobile (1080x1920)', 'Download imediato', 'Uso pessoal e comercial']
        },
        'wallpaper-urban': {
            name: 'Urban Landscapes',
            price: '€14,99',
            description: 'Coleção de 30 wallpapers de paisagens urbanas em 4K. Arquitetura moderna e visuais urbanos impressionantes.',
            features: ['30 imagens em 4K', 'Versões mobile incluídas', 'Download instantâneo', 'Licença comercial']
        },
        'pack-complete': {
            name: 'Complete Collection',
            price: '€149,99',
            description: 'O pacote definitivo! Todos os presets + 100 wallpapers + Guias completos de fotografia. Economize 40%!',
            features: ['Todos os 65 presets', '100 wallpapers 4K', '3 guias profissionais em PDF', 'Atualizações gratuitas por 1 ano', 'Suporte prioritário']
        }
    };

    const details = productDetails[productId];
    
    if (details) {
        let featuresHTML = details.features.map(f => `<li style="margin-bottom: 0.5rem;">✓ ${f}</li>`).join('');
        
        showToast(`
            <div style="text-align: left; max-width: 400px;">
                <h3 style="margin-bottom: 0.5rem; color: var(--foreground); font-size: 1.25rem;">${details.name}</h3>
                <p style="font-size: 1.5rem; font-weight: bold; color: var(--accent); margin-bottom: 1rem;">${details.price}</p>
                <p style="margin-bottom: 1rem; color: var(--muted-foreground); line-height: 1.6;">${details.description}</p>
                <ul style="list-style: none; padding: 0; margin-bottom: 1.5rem; color: var(--foreground);">
                    ${featuresHTML}
                </ul>
                <button onclick="addToCart('${productId}')" style="background: var(--primary); color: var(--primary-foreground); border: none; padding: 0.75rem 1.5rem; border-radius: 0.5rem; cursor: pointer; width: 100%; font-weight: 600; transition: opacity 0.3s ease;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
                    Adicionar ao Carrinho
                </button>
            </div>
        `);
        
        // Keep toast longer for product details
        const toast = document.querySelector('.toast');
        if (toast) {
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 10000); // 10 seconds instead of 3
        }
    }
}
