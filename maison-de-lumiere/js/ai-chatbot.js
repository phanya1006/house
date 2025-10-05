// Chatbot IA amélioré pour église chrétienne
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const sendBtn = document.querySelector('.send-btn');
    const chatInput = document.querySelector('.chatbot-input input');
    const chatMessages = document.querySelector('.chatbot-messages');
    
    // État du chatbot
    const chatbotState = {
        currentContext: 'general',
        userName: null,
        conversationHistory: [],
        spiritualNeeds: {
            prayer: false,
            guidance: false,
            counseling: false,
            bibleStudy: false
        }
    };

    // Base de connaissances étendue
    const knowledgeBase = {
        // Informations générales sur l'église
        church: {
            name: "Maison de Lumière",
            address: "Enceinte ISTGA, rue maman Mulezi primaire, après la pacerelle, Ville de Goma",
            phone: "+243 907 651 154",
            email: "contact@maisondelumiere.fr",
            foundingYear: "2021",
            mission: "Être une lumière dans notre communauté en aimant Dieu, en aimant notre prochain et en faisant des disciples de Jésus-Christ."
        },

        // Horaires détaillés
        schedule: {
            mardi: {
                activity: "Prières communautaires",
                time: "15h - 17h",
                description: "Temps de prière collective pour les besoins de l'église et de la communauté."
            },
            jeudi: {
                activity: "Culte d'enseignement",
                time: "15h - 17h",
                description: "Étude approfondie de la Bible et enseignement spirituel."
            },
            samedi: {
                activity: "Culte jeunes & ados",
                time: "14h - 16h",
                description: "Culte spécialement adapté pour la jeunesse avec des enseignements pertinents."
            },
            dimanche: {
                activity: "Culte principal",
                time: "10h - 13h",
                description: "Notre culte hebdomadaire principal avec louange, enseignement et communion fraternelle."
            }
        },

        // Départements et services
        departments: {
            accueil: {
                name: "Accueil et Hospitalité",
                description: "Assure l'accueil chaleureux de tous les visiteurs et membres.",
                contact: "Sophie Leroy",
                meeting: "Tous les dimanches avant le culte"
            },
            priere: {
                name: "Prière et Intercession",
                description: "Groupe de prière pour les besoins de l'église et des membres.",
                contact: "Soeur Prisca",
                meeting: "Mardis 15h-17h et jeudis matin"
            },
            chorale: {
                name: "Chorale et Louange",
                description: "Mène la louange pendant les cultes et événements spéciaux.",
                contact: "Frère Rolland",
                meeting: "Samedis 10h-12h"
            },
            service: {
                name: "Service Communautaire",
                description: "Organise des actions caritatives et services sociaux.",
                contact: "Frère Rolland",
                meeting: "Premier samedi du mois"
            },
            jeunes: {
                name: "Jeunesse",
                description: "Ministère dédié aux adolescents et jeunes adultes.",
                contact: "Responsable Jeunesse",
                meeting: "Samedis 14h-16h"
            }
        },

        // Événements réguliers
        events: {
            retraite: {
                title: "Retraite Spirituelle Annuelle",
                date: "15 Septembre",
                description: "Weekend de ressourcement spirituel"
            },
            concert: {
                title: "Concert de Louange",
                date: "22 Octobre",
                description: "Soirée spéciale de louange"
            },
            conference: {
                title: "Conférence sur le Mariage",
                date: "5 Novembre",
                description: "Pour couples désireux de renforcer leur union"
            },
            camp: {
                title: "Camp des Jeunes",
                date: "10 Décembre",
                description: "Camp d'une semaine pour adolescents"
            }
        },

        // Réponses spirituelles
        spiritual: {
            salut: "Le salut s'obtient en croyant que Jésus-Christ est mort pour vos péchés et est ressuscité. Confessez-le comme Seigneur et Sauveur (Romains 10:9-10).",
            priere: "La prière, c'est parler à Dieu. Vous pouvez prier à tout moment, en tout lieu. Parlez-lui avec sincérité de vos joies, peines et besoins.",
            bible: "La Bible est la Parole de Dieu. Elle nous guide, nous corrige et nous enseigne (2 Timothée 3:16-17).",
            foi: "La foi, c'est la ferme assurance des choses qu'on espère, la démonstration de celles qu'on ne voit pas (Hébreux 11:1).",
            difficulte: "Dans les difficultés, rappelez-vous que Dieu est avec vous. Il promet de ne jamais vous abandonner (Deutéronome 31:6)."
        },

        // Versets bibliques par thème
        verses: {
            encouragement: [
                "Philippiens 4:13 - Je puis tout par celui qui me fortifie.",
                "Ésaïe 41:10 - Ne crains rien, car je suis avec toi.",
                "Psaume 23:1 - L'Éternel est mon berger: je ne manquerai de rien."
            ],
            paix: [
                "Jean 14:27 - Je vous laisse la paix, je vous donne ma paix.",
                "Philippiens 4:6-7 - Ne vous inquiétez de rien... et la paix de Dieu gardera vos cœurs.",
                "Colossiens 3:15 - Que la paix de Christ règne dans vos cœurs."
            ],
            esperance: [
                "Jérémie 29:11 - Je connais les projets que j'ai formés sur vous, projets de paix et non de malheur.",
                "Romains 15:13 - Que le Dieu de l'espérance vous remplisse de toute joie et de toute paix.",
                "Psaume 62:6 - Lui seul est mon rocher et mon salut."
            ]
        }
    };

    // Ouvrir/fermer le chatbot
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.toggle('active');
        if (chatbotContainer.classList.contains('active')) {
            chatInput.focus();
        }
    });
    
    chatbotClose.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
    });
    
    // Envoyer un message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;
        
        // Ajouter le message de l'utilisateur
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Traiter le message et générer une réponse
        processUserMessage(message);
    }
    
    // Gérer l'envoi avec le bouton
    sendBtn.addEventListener('click', sendMessage);
    
    // Gérer l'envoi avec la touche Entrée
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Ajouter un message au chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageText = document.createElement('p');
        messageText.textContent = text;
        
        messageDiv.appendChild(messageText);
        chatMessages.appendChild(messageDiv);
        
        // Ajouter à l'historique
        if (sender === 'user') {
            chatbotState.conversationHistory.push({ type: 'user', content: text });
        }
        
        // Faire défiler vers le bas
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Traiter le message de l'utilisateur
    function processUserMessage(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Simuler un délai de réflexion
        setTimeout(() => {
            const response = generateComprehensiveResponse(lowerMessage, userMessage);
            addMessage(response, 'bot');
            chatbotState.conversationHistory.push({ type: 'bot', content: response });
        }, 1000);
    }

    // Générer une réponse complète
    function generateComprehensiveResponse(lowerMessage, originalMessage) {
        // Détection du contexte et des intentions
        const context = detectContext(lowerMessage);
        
        switch(context) {
            case 'greeting':
                return handleGreeting(lowerMessage);
            
            case 'schedule':
                return handleScheduleQuery(lowerMessage);
            
            case 'location':
                return handleLocationQuery();
            
            case 'department':
                return handleDepartmentQuery(lowerMessage);
            
            case 'event':
                return handleEventQuery();
            
            case 'donation':
                return handleDonationQuery();
            
            case 'spiritual':
                return handleSpiritualQuery(lowerMessage);
            
            case 'bible':
                return handleBibleQuery(lowerMessage);
            
            case 'prayer':
                return handlePrayerRequest(originalMessage);
            
            case 'leadership':
                return handleLeadershipQuery();
            
            case 'membership':
                return handleMembershipQuery();
            
            case 'children':
                return handleChildrenMinistry();
            
            case 'thanks':
                return handleThanks();
            
            case 'farewell':
                return handleFarewell();
            
            default:
                return handleUnknownQuery(originalMessage);
        }
    }

    // Détection du contexte
    function detectContext(message) {
        if (message.match(/(bonjour|salut|hello|coucou|hey|yo)/)) return 'greeting';
        if (message.match(/(horaire|heure|culte|programme|quand|réunion)/)) return 'schedule';
        if (message.match(/(adresse|localisation|où|situé|lieu|venir)/)) return 'location';
        if (message.match(/(département|service|ministère|groupe|bénévole|servir)/)) return 'department';
        if (message.match(/(événement|activité|spécial|conférence|retraite|camp|concert)/)) return 'event';
        if (message.match(/(don|soutien|offrande|contribution|financier)/)) return 'donation';
        if (message.match(/(jésus|dieu|christ|salut|foi|chrétien|sauveur)/)) return 'spiritual';
        if (message.match(/(bible|écriture|verset|livre|proverbes|psaume|évangile)/)) return 'bible';
        if (message.match(/(prière|priez|intercéder|demande prière)/)) return 'prayer';
        if (message.match(/(pasteur|responsable|leader|dirigeant|ancien)/)) return 'leadership';
        if (message.match(/(membre|adhérer|rejoindre|inscrire|appartenir)/)) return 'membership';
        if (message.match(/(enfant|jeune|ado|adolescent|école du dimanche)/)) return 'children';
        if (message.match(/(merci|remercier|gratitude)/)) return 'thanks';
        if (message.match(/(au revoir|bye|à bientôt|salut)/)) return 'farewell';
        
        return 'unknown';
    }

    // Gestionnaires spécifiques
    function handleGreeting(message) {
        const greetings = [
            "Que la paix du Seigneur soit avec vous ! Comment puis-je vous aider aujourd'hui ?",
            "Bonjour et soyez le bienvenu ! Je suis là pour vous aider.",
            "Que la grâce de notre Seigneur Jésus-Christ soit avec vous ! Comment allez-vous ?"
        ];
        
        // Détection du nom
        if (message.includes("je m'appelle") || message.includes("mon nom est")) {
            const nameMatch = message.match(/(je m'appelle|mon nom est) ([a-zA-ZÀ-ÿ]+)/);
            if (nameMatch && nameMatch[2]) {
                chatbotState.userName = nameMatch[2];
                return `Enchanté ${chatbotState.userName} ! ${greetings[Math.floor(Math.random() * greetings.length)]}`;
            }
        }
        
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    function handleScheduleQuery(message) {
        let response = "📅 **Nos horaires de culte :**\n\n";
        
        Object.keys(knowledgeBase.schedule).forEach(day => {
            const schedule = knowledgeBase.schedule[day];
            response += `**${day.charAt(0).toUpperCase() + day.slice(1)}** : ${schedule.activity} (${schedule.time})\n`;
            response += `${schedule.description}\n\n`;
        });
        
        response += "Voulez-vous des informations spécifiques sur l'un de ces cultes ?";
        return response;
    }

    function handleLocationQuery() {
        return `📍 **Notre adresse :**\n${knowledgeBase.church.address}\n\nNous nous réjouissons de vous accueillir ! Vous pouvez aussi nous contacter au ${knowledgeBase.church.phone} ou par email à ${knowledgeBase.church.email}.`;
    }

    function handleDepartmentQuery(message) {
        let response = "👥 **Nos départements :**\n\n";
        
        Object.keys(knowledgeBase.departments).forEach(dept => {
            const department = knowledgeBase.departments[dept];
            response += `**${department.name}**\n`;
            response += `${department.description}\n`;
            response += `Contact: ${department.contact}\n`;
            response += `Réunions: ${department.meeting}\n\n`;
        });
        
        response += "Souhaitez-vous rejoindre l'un de ces départements ?";
        return response;
    }

    function handleEventQuery() {
        let response = "🎉 **Événements à venir :**\n\n";
        
        Object.keys(knowledgeBase.events).forEach(event => {
            const eventInfo = knowledgeBase.events[event];
            response += `**${eventInfo.title}**\n`;
            response += `Date: ${eventInfo.date}\n`;
            response += `${eventInfo.description}\n\n`;
        });
        
        return response;
    }

    function handleDonationQuery() {
        return `💝 **Soutenir l'œuvre de Dieu :**\n\nVos dons nous aident à poursuivre notre mission et à toucher plus de vies. Vous pouvez faire un don via notre site en cliquant sur le bouton "Faire un don".\n\n*"Donnez, et il vous sera donné..."* - Luc 6:38`;
    }

    function handleSpiritualQuery(message) {
        if (message.includes('salut') || message.includes('sauvé')) {
            return `✝️ **Le Salut :**\n\n${knowledgeBase.spiritual.salut}\n\nSi vous voulez donner votre vie à Jésus, je vous encourage à parler avec l'un de nos responsables après le culte.`;
        }
        
        if (message.includes('prière') || message.includes('prier')) {
            return `🙏 **La Prière :**\n\n${knowledgeBase.spiritual.priere}\n\nNous avons aussi un groupe de prière qui se réunit le mardi de 15h à 17h.`;
        }
        
        if (message.includes('foi') || message.includes('croire')) {
            return `💫 **La Foi :**\n\n${knowledgeBase.spiritual.foi}\n\nLa foi grandit en écoutant la Parole de Dieu (Romains 10:17).`;
        }
        
        if (message.includes('difficulté') || message.includes('problème') || message.includes('souffrance')) {
            return `🕊️ **Dans les difficultés :**\n\n${knowledgeBase.spiritual.difficulte}\n\n*"Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos."* - Matthieu 11:28`;
        }
        
        return `❓ **Question Spirituelle :**\n\nJe suis là pour vous aider dans votre marche spirituelle. Pour des questions plus profondes, je vous encourage à consulter l'un de nos responsables ou à participer à nos cultes d'enseignement le jeudi.`;
    }

    function handleBibleQuery(message) {
        // Versets d'encouragement
        if (message.match(/(encouragement|découragé|déprimé|triste)/)) {
            const verse = knowledgeBase.verses.encouragement[Math.floor(Math.random() * knowledgeBase.verses.encouragement.length)];
            return `📖 **Verset d'encouragement :**\n\n"${verse}"\n\nQue Dieu vous fortifie !`;
        }
        
        // Versets sur la paix
        if (message.match(/(paix|anxieux|inquiet|stress|anxiété)/)) {
            const verse = knowledgeBase.verses.paix[Math.floor(Math.random() * knowledgeBase.verses.paix.length)];
            return `🕊️ **Verset sur la paix :**\n\n"${verse}"\n\nQue la paix de Dieu qui surpasse toute intelligence garde votre cœur !`;
        }
        
        // Versets sur l'espérance
        if (message.match(/(espoir|esprance|avenir|futur)/)) {
            const verse = knowledgeBase.verses.esperance[Math.floor(Math.random() * knowledgeBase.verses.esperance.length)];
            return `🌟 **Verset d'espérance :**\n\n"${verse}"\n\nDieu a de bons projets pour vous !`;
        }
        
        return `📚 **Étude Biblique :**\n\nLa Bible est la Parole vivante de Dieu. Nous avons un culte d'enseignement le jeudi de 15h à 17h où nous étudions les Écritures en profondeur. Je vous y encourage !`;
    }

    function handlePrayerRequest(message) {
        chatbotState.spiritualNeeds.prayer = true;
        
        // Extraire l'objet de la prière si mentionné
        const prayerTopic = extractPrayerTopic(message);
        
        if (prayerTopic) {
            return `🙏 **Demande de prière :**\n\nJ'ai noté votre demande de prière pour : "${prayerTopic}". Notre équipe de prière va intercéder pour vous. *"Ne vous inquiétez de rien, mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces."* - Philippiens 4:6`;
        }
        
        return `🙏 **Demande de prière :**\n\nJe prie que Dieu vous bénisse et vous guide. Notre équipe de prière est aussi disponible le mardi de 15h à 17h pour des demandes spécifiques. N'hésitez pas à nous les partager.`;
    }

    function handleLeadershipQuery() {
        return `👨‍💼 **Notre Leadership :**\n\nNotre église est dirigée par une équipe de responsables dévoués qui travaillent ensemble pour servir la communauté. Pour des questions spécifiques ou un entretien personnel, n'hésitez pas à nous contacter après le culte ou par téléphone.`;
    }

    function handleMembershipQuery() {
        return `🤝 **Devenir Membre :**\n\nNous serions ravis de vous accueillir comme membre de notre communauté ! Le processus commence par participer régulièrement aux cultes, puis suivre une classe de découverte de l'église. Parlez-en à l'un de nos responsables pour plus d'informations.`;
    }

    function handleChildrenMinistry() {
        return `👶 **Ministère des Enfants :**\n\nNous avons un programme spécial pour les enfants pendant le culte du dimanche. Les enfants participent à des activités adaptées à leur âge avec des enseignements bibliques créatifs. La sécurité et le bien-être des enfants sont notre priorité.`;
    }

    function handleThanks() {
        const thanksResponses = [
            "À Dieu soit la gloire ! C'est un plaisir de vous servir.",
            "Je vous remercie ! Que Dieu vous bénisse abondamment.",
            "C'est ma joie de vous aider ! N'hésitez pas si vous avez d'autres questions."
        ];
        return thanksResponses[Math.floor(Math.random() * thanksResponses.length)];
    }

    function handleFarewell() {
        const farewells = [
            `Que la paix du Christ soit avec vous ${chatbotState.userName ? chatbotState.userName : ''} ! À bientôt à la Maison de Lumière.`,
            "Que Dieu vous bénisse et vous garde ! Au plaisir de vous revoir.",
            "Que la grâce de notre Seigneur Jésus-Christ soit avec votre esprit ! À très bientôt."
        ];
        return farewells[Math.floor(Math.random() * farewells.length)];
    }

    function handleUnknownQuery(originalMessage) {
        // Analyser l'intention avec des mots-clés supplémentaires
        if (originalMessage.length < 5) {
            return "Je n'ai pas bien compris. Pourriez-vous reformuler votre question ?";
        }
        
        // Réponse par défaut avec suggestions
        return `🤔 **Je n'ai pas compris :**\n\nJe suis désolé, je n'ai pas bien compris votre question "${originalMessage}".\n\nVoici ce que je peux vous aider à découvrir :\n• 📅 Horaires des cultes\n• 📍 Adresse et contacts\n• 👥 Départements et services\n• 🎉 Événements à venir\n• 💝 Faire un don\n• 🙏 Questions spirituelles\n• 📖 Versets bibliques\n\nQue souhaitez-vous savoir ?`;
    }

    // Fonctions utilitaires
    function extractPrayerTopic(message) {
        const topics = message.split(/(pour |prier |demande)/);
        if (topics.length > 2) {
            return topics[topics.length - 1];
        }
        return null;
    }

    // Ajouter un message de bienvenue initial
    setTimeout(() => {
        addMessage("Que la paix du Seigneur soit avec vous ! Je suis votre assistant virtuel de la Maison de Lumière. Comment puis-je vous aider aujourd'hui ?", 'bot');
    }, 1000);

    // Suggestions rapides
    function addQuickSuggestions() {
        const suggestions = [
            "Horaires des cultes",
            "Adresse de l'église",
            "Événements à venir",
            "Faire un don",
            "Demande de prière"
        ];
        
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'quick-suggestions';
        
        suggestions.forEach(suggestion => {
            const button = document.createElement('button');
            button.textContent = suggestion;
            button.className = 'suggestion-btn';
            button.addEventListener('click', function() {
                addMessage(suggestion, 'user');
                processUserMessage(suggestion);
            });
            suggestionsContainer.appendChild(button);
        });
        
        chatMessages.appendChild(suggestionsContainer);
    }

    // Ajouter les suggestions après le message de bienvenue
    setTimeout(addQuickSuggestions, 1500);

    // Styles pour les suggestions rapides
    const suggestionStyles = document.createElement('style');
    suggestionStyles.textContent = `
        .quick-suggestions {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 15px;
            padding: 10px;
        }
        
        .suggestion-btn {
            background: rgba(74, 144, 226, 0.1);
            border: 1px solid rgba(74, 144, 226, 0.3);
            border-radius: 20px;
            padding: 8px 16px;
            font-size: 0.85rem;
            color: #4a90e2;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .suggestion-btn:hover {
            background: rgba(74, 144, 226, 0.2);
            transform: translateY(-2px);
        }
        
        .bot-message {
            background: #f8f9fa;
            border-radius: 18px;
            padding: 12px 18px;
            margin: 8px 0;
            max-width: 80%;
            align-self: flex-start;
            border-bottom-left-radius: 4px;
        }
        
        .user-message {
            background: #4a90e2;
            color: white;
            border-radius: 18px;
            padding: 12px 18px;
            margin: 8px 0;
            max-width: 80%;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
        }
        
        .chatbot-messages {
            display: flex;
            flex-direction: column;
            height: 300px;
            overflow-y: auto;
            padding: 15px;
        }
    `;
    document.head.appendChild(suggestionStyles);
});

// Fonctionnalités avancées - Gestion des sessions
class ChatbotSession {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.startTime = new Date();
        this.messageCount = 0;
        this.userPreferences = {};
    }
    
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    trackMessage(type) {
        this.messageCount++;
        // Ici vous pourriez envoyer ces données à Google Analytics ou autre
        console.log(`Message ${type} envoyé - Session: ${this.sessionId}, Total: ${this.messageCount}`);
    }
    
    savePreferences(preferences) {
        this.userPreferences = { ...this.userPreferences, ...preferences };
        // Sauvegarder dans localStorage pour les visites futures
        localStorage.setItem('chatbotPreferences', JSON.stringify(this.userPreferences));
    }
}

// Initialiser la session
const chatbotSession = new ChatbotSession();

// Intégration avec les APIs existantes
function integrateWithBibleAPI() {
    // Cette fonction pourrait intégrer l'API Bible existante
    // pour fournir des versets plus dynamiques
    console.log('Intégration avec Bible API prête');
}

// Export pour une utilisation étendue
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ChatbotSession,
        integrateWithBibleAPI
    };
}