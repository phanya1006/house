 // API pour le verset du jour
class BibleAPI {
    constructor() {
        this.baseURL = 'https://bible-api.com';
        this.dailyVerseElement = document.getElementById('daily-verse');
        this.audioButton = document.getElementById('audio-verse');
        this.shareButton = document.getElementById('share-verse');
        
        this.init();
    }
    
    init() {
        this.loadDailyVerse();
        
        if (this.audioButton) {
            this.audioButton.addEventListener('click', () => this.playVerseAudio());
        }
        
        if (this.shareButton) {
            this.shareButton.addEventListener('click', () => this.shareVerse());
        }
    }
    
    async loadDailyVerse() {
        try {
            // Versets populaires pour l'exemple (en attendant une API fonctionnelle)
            const popularVerses = [
                "Jean 3:16 - Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
                "Philippiens 4:13 - Je puis tout par celui qui me fortifie.",
                "Jérémie 29:11 - Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.",
                "Romains 8:28 - Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.",
                "Psaume 23:1 - L'Éternel est mon berger: je ne manquerai de rien."
            ];
            
            // Sélectionner un verset aléatoire
            const randomIndex = Math.floor(Math.random() * popularVerses.length);
            const verse = popularVerses[randomIndex];
            
            this.dailyVerseElement.innerHTML = `<p>${verse}</p>`;
            this.currentVerse = verse;
            
        } catch (error) {
            console.error('Erreur lors du chargement du verset:', error);
            this.dailyVerseElement.innerHTML = '<p>Jean 3:16 - Car Dieu a tant aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu\'il ait la vie éternelle.</p>';
            this.currentVerse = "Jean 3:16 - Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.";
        }
    }
    
    playVerseAudio() {
        // Utiliser l'API Web Speech pour lire le verset
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(this.currentVerse);
            utterance.lang = 'fr-FR';
            utterance.rate = 0.8;
            utterance.pitch = 1;
            
            // Arrêter toute lecture en cours
            window.speechSynthesis.cancel();
            
            // Démarrer la nouvelle lecture
            window.speechSynthesis.speak(utterance);
        } else {
            alert("La synthèse vocale n'est pas supportée par votre navigateur.");
        }
    }
    
    shareVerse() {
        if (navigator.share) {
            navigator.share({
                title: 'Verset du jour - Maison de Lumière',
                text: this.currentVerse,
                url: window.location.href
            })
            .catch(error => console.log('Erreur de partage:', error));
        } else {
            // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
            const textArea = document.createElement('textarea');
            textArea.value = `${this.currentVerse}\n\nPartagé depuis Maison de Lumière: ${window.location.href}`;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Verset copié dans le presse-papiers !');
        }
    }
}

// Initialiser l'API Bible lorsque la page est chargée
document.addEventListener('DOMContentLoaded', function() {
    new BibleAPI();
});

// API pour les citations du jour (exemple avec une API publique)
class QuoteAPI {
    constructor() {
        this.quoteElement = document.getElementById('daily-quote');
        this.init();
    }
    
    async init() {
        await this.loadDailyQuote();
    }
    
    async loadDailyQuote() {
        try {
            // Pour l'exemple, nous utilisons des citations pré-définies
            // En production, vous pourriez utiliser une API comme https://api.quotable.io/random
            const christianQuotes = [
                "La foi, c'est croire en ce que vous ne voyez pas, et la récompense de cette foi, c'est de voir ce en quoi vous croyez. - Saint Augustin",
                "Dieu ne vous demande pas de réussir, il vous demande seulement d'essayer. - Mère Teresa",
                "La prière n'est pas demander. C'est une aspiration de l'âme. - Mahatma Gandhi",
                "Ayez du courage, car j'ai vaincu le monde. - Jésus-Christ (Jean 16:33)",
                "Là où il y a de la charité et de l'amour, Dieu est présent. - Hymne chrétien"
            ];
            
            const randomIndex = Math.floor(Math.random() * christianQuotes.length);
            const quote = christianQuotes[randomIndex];
            
            if (this.quoteElement) {
                this.quoteElement.innerHTML = `<p>${quote}</p>`;
            }
            
            this.currentQuote = quote;
            
        } catch (error) {
            console.error('Erreur lors du chargement de la citation:', error);
        }
    }
    
    generateShareableImage() {
        // Créer une image partageable avec la citation
        // Cette fonctionnalité nécessiterait un backend pour générer des images
        alert("Fonctionnalité de génération d'image partageable à implémenter");
    }
}

// Initialiser l'API Citations
document.addEventListener('DOMContentLoaded', function() {
    new QuoteAPI();
});
