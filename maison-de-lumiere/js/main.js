// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les composants
    initNavigation();
    initProgramSection();
    initDepartmentsSection();
    initEventsSection();
    initTestimonialsSection();
    initContactForm();
    initModals();
    initScrollEffects();
    initAnimations();
});

// Navigation
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });
    
    // Fermer le menu mobile en cliquant sur un lien
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            }
        });
    });
    
    // Changement de style de l'en-tête au défilement
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Section Programme
function initProgramSection() {
    // Les données du programme sont déjà intégrées dans le HTML
    // Cette fonction peut être utilisée pour ajouter des interactions supplémentaires
    const programCards = document.querySelectorAll('.program-card');
    
    programCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Section Départements
function initDepartmentsSection() {
    const departmentsData = [
        {
            id: 1,
            name: "Accueil et Hospitalité",
            description: "Notre équipe d'accueil veille à ce que chaque visiteur se sente le bienvenu et à l'aise dans notre église.",
            image: "../images/72+ Entry Comm Center Ideas to Tame Clutter & Chaos - Doowrt_com (1).jpg",
            leader: {
                name: "Frère Faddy",
                role: "Responsable de l'Accueil",
                image: "../images/télécharger (2).jpg"
            }
        },
        {
            id: 2,
            name: "Prière et Intercession",
            description: "Nous nous réunissons régulièrement pour prier pour les besoins de l'église et de notre communauté.",
            image: "../images/inter.jpg",
            leader: {
                name: "Soeur Prisca",
                role: "Responsable de la Prière",
                image: "../images/télécharger.jpg"
            }
        },
        {
            id: 3,
            name: "Chorale et Louange",
            description: "Nous organisons des actions caritatives et des services pour répondre aux besoins de notre communauté locale.",
            image: "../images/chor.jpg",
            leader: {
                name: "Frère Rolland",
                role: "Responsable du Service",
                image: "../images/Oops!.jpg"
            }
        },
        {
            id: 4,
            name: "Style Vestimentaire",
            description: "Conseil et orientation sur la tenue vestimentaire appropriée pour les activités de l'église.",
            image: "../images/style.jpg",
            leader: {
                name: "Soeur Jemima",
                role: "Responsable de la mode",
                image: "../images/Jey.jpg"
            }
        },
        {
            id: 5,
            name: "Protocole",
            description: "Service d'accueil et d'organisation des événements de l'église.",
            image: "../images/protocole.jpg",
            leader: {
                name: "Soeur Rachel",
                role: "Responsable du protocole",
                image: "../images/protocole.jpg"
            }
        },
    ];
    
    const departmentsGrid = document.querySelector('.departments-grid');
    
    departmentsData.forEach(department => {
        const departmentCard = document.createElement('div');
        departmentCard.className = 'department-card';
        departmentCard.innerHTML = `
            <div class="department-image">
                <img src="${department.image}" alt="${department.name}">
            </div>
            <div class="department-info">
                <h3>${department.name}</h3>
                <p>${department.description}</p>
                <div class="department-leader">
                    <div class="leader-image">
                        <img src="${department.leader.image}" alt="${department.leader.name}">
                    </div>
                    <div class="leader-info">
                        <h4>${department.leader.name}</h4>
                        <p>${department.leader.role}</p>
                    </div>
                </div>
            </div>
        `;
        
        departmentsGrid.appendChild(departmentCard);
    });
}

// Section Événements
function initEventsSection() {
    const eventsData = [
        {
            id: 1,
            title: "Retraite Spirituelle Annuelle",
            description: "Un weekend de ressourcement spirituel dans la nature pour approfondir votre relation avec Dieu.",
            date: {
                day: "15",
                month: "Sept"
            },
            location: "Centre de retraite La Forêt"
        },
        {
            id: 2,
            title: "Concert de Louange",
            description: "Une soirée spéciale de louange avec des artistes chrétiens invités et notre équipe de louange.",
            date: {
                day: "22",
                month: "Oct"
            },
            location: "Salle principale de l'église"
        },
        {
            id: 3,
            title: "Conférence sur le Mariage",
            description: "Une conférence pour les couples désireux de renforcer leur union selon les principes bibliques.",
            date: {
                day: "05",
                month: "Nov"
            },
            location: "Salle annexe de l'église"
        },
        {
            id: 4,
            title: "Camp des Jeunes",
            description: "Un camp d'une semaine pour les adolescents avec des activités, des enseignements et des moments de partage.",
            date: {
                day: "10",
                month: "Déc"
            },
            location: "Centre de vacances Les Cèdres"
        }
    ];
    
    const eventsList = document.querySelector('.events-list');
    
    eventsData.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <div class="event-date">
                <div class="day">${event.date.day}</div>
                <div class="month">${event.date.month}</div>
            </div>
            <div class="event-info">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
            </div>
        `;
        
        eventsList.appendChild(eventCard);
    });
}

// Section Témoignages
function initTestimonialsSection() {
    const testimonialsData = [
        {
            id: 1,
            content: "L'enseignement biblique solide et l'amour authentique que j'ai trouvé ici ont transformé ma relation avec Dieu. Je suis reconnaissant pour cette communauté qui vit vraiment l'Évangile.",
            author: {
                name: "Mughenya Phanuel",
                role: "Membre depuis 1 an",
                image: "../images/WhatsApp Image 2025-09-29 à 13.35.42_113afb30.jpg"
            }
        }
    ];
    
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialNav = document.querySelector('.testimonial-nav');
    
    // Créer les slides
    testimonialsData.forEach((testimonial, index) => {
        const slide = document.createElement('div');
        slide.className = `testimonial-slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <div class="testimonial-content">
                ${testimonial.content}
            </div>
            <div class="testimonial-author">
                <div class="author-image">
                    <img src="${testimonial.author.image}" alt="${testimonial.author.name}">
                </div>
                <div class="author-info">
                    <h4>${testimonial.author.name}</h4>
                    <p>${testimonial.author.role}</p>
                </div>
            </div>
        `;
        
        testimonialSlider.appendChild(slide);
        
        // Créer les points de navigation
        const dot = document.createElement('div');
        dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
        dot.dataset.index = index;
        testimonialNav.appendChild(dot);
    });
    
    // Navigation des témoignages
    const dots = document.querySelectorAll('.testimonial-dot');
    const slides = document.querySelectorAll('.testimonial-slide');
    
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            
            // Mettre à jour les slides
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
            
            // Mettre à jour les points
            dots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Rotation automatique des témoignages
    let currentTestimonial = 0;
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialsData.length;
        
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentTestimonial].classList.add('active');
        
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentTestimonial].classList.add('active');
    }, 8000);
}

// Formulaire de contact
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;
        
        // Validation basique
        if (!name || !email || !subject || !message) {
            showNotification('Veuillez remplir tous les champs du formulaire.', 'error');
            return;
        }
        
        // Préparer le message pour l'email
        const emailBody = `Nom: ${name}%0D%0AEmail: ${email}%0D%0ASujet: ${subject}%0D%0AMessage: ${message}`;
        
        // Rediriger vers l'email avec le message pré-rempli
        window.location.href = `mailto:Phankighnt03@gmail.com?subject=${encodeURIComponent(subject)}&body=${emailBody}`;
        
        showNotification('Redirection vers votre application email...', 'success');
        
        // Réinitialiser le formulaire après un court délai
        setTimeout(() => {
            this.reset();
        }, 2000);
    });
}

// Modals
function initModals() {
    // Modal de don
    const donateBtn = document.getElementById('donate-btn');
    const donationModal = document.getElementById('donation-modal');
    const confirmDonation = document.getElementById('confirm-donation');
    
    donateBtn.addEventListener('click', function() {
        donationModal.classList.add('active');
    });
    
    confirmDonation.addEventListener('click', function() {
        // Message pré-rempli pour le don via WhatsApp
        const donationMessage = "Bonjour, je souhaite faire un don pour soutenir l'œuvre de la Maison de Lumière. Pouvez-vous me guider sur la procédure à suivre ?";
        const whatsappURL = `https://wa.me/243907651154?text=${encodeURIComponent(donationMessage)}`;
        
        showNotification('Redirection vers WhatsApp pour votre don...', 'success');
        donationModal.classList.remove('active');
        
        // Redirection vers WhatsApp
        setTimeout(() => {
            window.open(whatsappURL, '_blank');
        }, 1500);
    });
    
    // Modal de département
    const joinDepartmentBtn = document.getElementById('join-department');
    const departmentModal = document.getElementById('department-modal');
    const confirmDepartment = document.getElementById('confirm-department');
    
    joinDepartmentBtn.addEventListener('click', function() {
        departmentModal.classList.add('active');
    });
    
    confirmDepartment.addEventListener('click', function() {
        // Message pré-rempli pour rejoindre un département via WhatsApp
        const departmentMessage = "Bonjour, je souhaite rejoindre un département de la Maison de Lumière. Pouvez-vous me renseigner sur les différentes opportunités de service ?";
        const whatsappURL = `https://wa.me/243907651154?text=${encodeURIComponent(departmentMessage)}`;
        
        showNotification('Redirection vers WhatsApp pour rejoindre un département...', 'success');
        departmentModal.classList.remove('active');
        
        // Redirection vers WhatsApp
        setTimeout(() => {
            window.open(whatsappURL, '_blank');
        }, 1500);
    });
    
    // Fermer les modals
    const closeModals = document.querySelectorAll('.close-modal');
    closeModals.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.classList.remove('active');
        });
    });
    
    // Fermer les modals en cliquant à l'extérieur
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
    
    // Gestion du clic sur l'icône WhatsApp dans la section contact
    initWhatsAppContact();
}

// Initialiser le contact WhatsApp
function initWhatsAppContact() {
    const whatsappContact = document.querySelector('.contact-item .fab.fa-whatsapp');
    if (whatsappContact) {
        const whatsappItem = whatsappContact.closest('.contact-item');
        whatsappItem.style.cursor = 'pointer';
        whatsappItem.addEventListener('click', function() {
            const whatsappMessage = "Bonjour, je souhaite obtenir des informations sur la Maison de Lumière.";
            const whatsappURL = `https://wa.me/243907651154?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappURL, '_blank');
        });
    }
}

// Effets de défilement
function initScrollEffects() {
    // Animation des éléments au défilement
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observer les sections et les cartes
    const sections = document.querySelectorAll('.section');
    const programCards = document.querySelectorAll('.program-card');
    const departmentCards = document.querySelectorAll('.department-card');
    const eventCards = document.querySelectorAll('.event-card');
    
    sections.forEach(section => observer.observe(section));
    programCards.forEach(card => observer.observe(card));
    departmentCards.forEach(card => observer.observe(card));
    eventCards.forEach(card => observer.observe(card));
}

// Animations CSS supplémentaires
function initAnimations() {
    // Ajouter la classe d'animation aux éléments observés
    const style = document.createElement('style');
    style.textContent = `
        .program-card, .department-card, .event-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .program-card.animate-in, .department-card.animate-in, .event-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Délais d'animation pour les cartes de programme */
        .program-card:nth-child(1) { transition-delay: 0.1s; }
        .program-card:nth-child(2) { transition-delay: 0.2s; }
        .program-card:nth-child(3) { transition-delay: 0.3s; }
        .program-card:nth-child(4) { transition-delay: 0.4s; }
        
        /* Délais d'animation pour les cartes de département */
        .department-card:nth-child(1) { transition-delay: 0.1s; }
        .department-card:nth-child(2) { transition-delay: 0.2s; }
        .department-card:nth-child(3) { transition-delay: 0.3s; }
        .department-card:nth-child(4) { transition-delay: 0.4s; }
        .department-card:nth-child(5) { transition-delay: 0.5s; }
        
        /* Style pour les éléments cliquables WhatsApp */
        .contact-item[style*="cursor: pointer"]:hover {
            background-color: rgba(74, 144, 226, 0.05);
            border-radius: 8px;
            transition: background-color 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Fonction de notification
function showNotification(message, type) {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <p>${message}</p>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Ajouter des styles pour la notification
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: white;
            padding: 20px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 400px;
            z-index: 3000;
            transform: translateX(150%);
            transition: transform 0.4s ease;
            border-left: 4px solid #4CAF50;
        }
        
        .notification.error {
            border-left-color: #f44336;
        }
        
        .notification.success {
            border-left-color: #4CAF50;
        }
        
        .notification.active {
            transform: translateX(0);
        }
        
        .notification p {
            margin: 0;
            margin-right: 15px;
            font-weight: 500;
        }
        
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            color: #777;
            font-size: 1rem;
            transition: color 0.3s ease;
        }
        
        .notification-close:hover {
            color: #333;
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        notificationStyles.id = 'notification-styles';
        document.head.appendChild(notificationStyles);
    }
    
    document.body.appendChild(notification);
    
    // Afficher la notification
    setTimeout(() => {
        notification.classList.add('active');
    }, 100);
    
    // Fermer la notification
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.classList.remove('active');
        setTimeout(() => {
            notification.remove();
        }, 400);
    });
    
    // Fermer automatiquement après 5 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('active');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 400);
        }
    }, 5000);

}
