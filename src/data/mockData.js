// Mock data for the e-learning semantic search platform

export const courses = [
  {
    id: 'c1',
    title: 'Introduction aux Bases de Données Relationnelles',
    description: 'Maîtrisez les fondamentaux des SGBD relationnels : modèle entité-association, SQL, normalisation et optimisation des requêtes.',
    instructor: 'Dr. Amina Benali',
    category: 'Base de données',
    level: 'Débutant',
    duration: '24h',
    rating: 4.8,
    students: 1247,
    thumbnail: null,
    tags: ['SQL', 'SGBD', 'Modélisation', 'Normalisation'],
    modules: 12,
    lastUpdated: '2026-07-15',
    progress: 75,
  },
  {
    id: 'c2',
    title: 'PL/SQL Avancé : Triggers, Procédures et Packages',
    description: 'Approfondissez vos compétences en PL/SQL avec les triggers, curseurs, gestion des exceptions et packages Oracle.',
    instructor: 'Prof. Karim Ziani',
    category: 'Base de données',
    level: 'Avancé',
    duration: '32h',
    rating: 4.9,
    students: 834,
    thumbnail: null,
    tags: ['PL/SQL', 'Oracle', 'Triggers', 'Procédures stockées'],
    modules: 16,
    lastUpdated: '2026-08-01',
    progress: 30,
  },
  {
    id: 'c3',
    title: 'Développement Web Full-Stack avec React & Node.js',
    description: 'Construisez des applications web modernes de A à Z avec React, Node.js, Express et MongoDB.',
    instructor: 'Sarah Mekhloufi',
    category: 'Développement Web',
    level: 'Intermédiaire',
    duration: '48h',
    rating: 4.7,
    students: 2103,
    thumbnail: null,
    tags: ['React', 'Node.js', 'JavaScript', 'MongoDB'],
    modules: 24,
    lastUpdated: '2026-07-28',
    progress: 50,
  },
  {
    id: 'c4',
    title: 'Intelligence Artificielle & Machine Learning',
    description: 'Découvrez les algorithmes fondamentaux du ML : régression, classification, clustering et réseaux de neurones avec Python.',
    instructor: 'Dr. Youssef Hamdi',
    category: 'Intelligence Artificielle',
    level: 'Intermédiaire',
    duration: '40h',
    rating: 4.9,
    students: 1856,
    thumbnail: null,
    tags: ['Python', 'TensorFlow', 'Scikit-learn', 'Deep Learning'],
    modules: 20,
    lastUpdated: '2026-08-03',
    progress: 10,
  },
  {
    id: 'c5',
    title: 'Architecture Cloud avec Firebase & GCP',
    description: 'Déployez des applications scalables avec Firebase, Cloud Functions, Firestore et l\'authentification sécurisée.',
    instructor: 'Lina Bouzid',
    category: 'Cloud Computing',
    level: 'Intermédiaire',
    duration: '28h',
    rating: 4.6,
    students: 967,
    thumbnail: null,
    tags: ['Firebase', 'GCP', 'Cloud Functions', 'Firestore'],
    modules: 14,
    lastUpdated: '2026-07-20',
    progress: 0,
  },
  {
    id: 'c6',
    title: 'Sécurité Informatique & Ethical Hacking',
    description: 'Apprenez les techniques de pentesting, la cryptographie appliquée et la sécurisation des infrastructures réseau.',
    instructor: 'Dr. Rachid Khelifa',
    category: 'Cybersécurité',
    level: 'Avancé',
    duration: '36h',
    rating: 4.8,
    students: 1432,
    thumbnail: null,
    tags: ['Pentesting', 'Cryptographie', 'Réseau', 'Linux'],
    modules: 18,
    lastUpdated: '2026-07-10',
    progress: 0,
  },
];

export const searchResults = [
  {
    id: 'r1',
    type: 'video',
    title: 'Configuration des Triggers PL/SQL pour les Logs',
    description: 'Dans ce module, nous configurons un trigger BEFORE INSERT sur la table AUDIT_LOG pour tracer automatiquement toutes les modifications.',
    course: 'PL/SQL Avancé : Triggers, Procédures et Packages',
    courseId: 'c2',
    timestamp: '14:32',
    duration: '28:45',
    relevance: 0.96,
    instructor: 'Prof. Karim Ziani',
    snippet: `CREATE OR REPLACE TRIGGER trg_audit_log
  BEFORE INSERT OR UPDATE ON employees
  FOR EACH ROW
BEGIN
  INSERT INTO audit_log (action, table_name, timestamp)
  VALUES (:NEW.action, 'EMPLOYEES', SYSDATE);
END;`,
  },
  {
    id: 'r2',
    type: 'cours',
    title: 'Architecture des Triggers : BEFORE vs AFTER',
    description: 'Comprendre les différences entre les triggers BEFORE et AFTER, les triggers au niveau ligne vs instruction, et les cas d\'utilisation.',
    course: 'PL/SQL Avancé : Triggers, Procédures et Packages',
    courseId: 'c2',
    chapter: 'Chapitre 7 — Triggers Avancés',
    page: 142,
    relevance: 0.91,
    instructor: 'Prof. Karim Ziani',
    snippet: null,
  },
  {
    id: 'r3',
    type: 'exercice',
    title: 'TP : Créer un système de logs avec triggers composés',
    description: 'Exercice pratique : implémenter un trigger composé pour auditer les opérations CRUD sur une table de gestion de stock.',
    course: 'PL/SQL Avancé : Triggers, Procédures et Packages',
    courseId: 'c2',
    difficulty: 'Difficile',
    estimatedTime: '45 min',
    relevance: 0.87,
    instructor: 'Prof. Karim Ziani',
    snippet: null,
  },
  {
    id: 'r4',
    type: 'forum',
    title: 'Erreur ORA-04091 avec trigger mutant sur table employees',
    description: 'J\'obtiens l\'erreur "mutating table" quand mon trigger tente de lire la même table. Comment contourner ?',
    course: 'PL/SQL Avancé : Triggers, Procédures et Packages',
    courseId: 'c2',
    author: 'Mehdi_92',
    answers: 5,
    solved: true,
    relevance: 0.82,
    snippet: null,
  },
  {
    id: 'r5',
    type: 'video',
    title: 'Journalisation des événements avec Cloud Functions',
    description: 'Implémentez un système de logs en temps réel avec Firebase Cloud Functions et Firestore pour suivre les actions utilisateur.',
    course: 'Architecture Cloud avec Firebase & GCP',
    courseId: 'c5',
    timestamp: '08:15',
    duration: '22:30',
    relevance: 0.74,
    instructor: 'Lina Bouzid',
    snippet: null,
  },
];

export const forumQuestions = [
  {
    id: 'f1',
    title: 'Comment optimiser une requête SQL avec plusieurs JOIN ?',
    author: 'Ahmed_Dev',
    avatar: null,
    date: '2026-08-05',
    tags: ['SQL', 'Optimisation', 'JOIN'],
    votes: 23,
    answers: 7,
    views: 456,
    solved: true,
    course: 'Introduction aux Bases de Données Relationnelles',
  },
  {
    id: 'f2',
    title: 'Différence entre useEffect et useLayoutEffect en React ?',
    author: 'Lina_React',
    avatar: null,
    date: '2026-08-04',
    tags: ['React', 'Hooks', 'JavaScript'],
    votes: 18,
    answers: 4,
    views: 312,
    solved: true,
    course: 'Développement Web Full-Stack avec React & Node.js',
  },
  {
    id: 'f3',
    title: 'TensorFlow vs PyTorch pour un projet de classification d\'images ?',
    author: 'Yacine_ML',
    avatar: null,
    date: '2026-08-04',
    tags: ['Machine Learning', 'Python', 'Deep Learning'],
    votes: 31,
    answers: 9,
    views: 678,
    solved: false,
    course: 'Intelligence Artificielle & Machine Learning',
  },
  {
    id: 'f4',
    title: 'Erreur CORS avec Firebase Cloud Functions en production',
    author: 'Sara_Cloud',
    avatar: null,
    date: '2026-08-03',
    tags: ['Firebase', 'CORS', 'Cloud Functions'],
    votes: 12,
    answers: 3,
    views: 189,
    solved: true,
    course: 'Architecture Cloud avec Firebase & GCP',
  },
  {
    id: 'f5',
    title: 'Meilleure approche pour indexer des vecteurs dans Firestore ?',
    author: 'Karim_Vec',
    avatar: null,
    date: '2026-08-02',
    tags: ['Firestore', 'Vector Search', 'Embeddings'],
    votes: 27,
    answers: 6,
    views: 534,
    solved: false,
    course: 'Architecture Cloud avec Firebase & GCP',
  },
];

export const similarQuestions = [
  {
    id: 'sq1',
    title: 'Optimisation des requêtes SQL avec index et EXPLAIN',
    similarity: 0.94,
    answers: 5,
    solved: true,
    date: '2026-07-28',
  },
  {
    id: 'sq2',
    title: 'Performance des JOIN sur grandes tables : bonnes pratiques',
    similarity: 0.89,
    answers: 8,
    solved: true,
    date: '2026-07-15',
  },
  {
    id: 'sq3',
    title: 'INDEX vs FULL SCAN : quand PostgreSQL ignore mes index ?',
    similarity: 0.83,
    answers: 3,
    solved: true,
    date: '2026-06-22',
  },
];

export const chatMessages = [
  {
    id: 'm1',
    role: 'user',
    content: 'Comment configurer un trigger PL/SQL pour les logs ?',
    timestamp: '08:45',
  },
  {
    id: 'm2',
    role: 'assistant',
    content: `Excellente question ! Voici comment créer un trigger PL/SQL pour la journalisation :

**1. Trigger BEFORE INSERT/UPDATE :**

\`\`\`sql
CREATE OR REPLACE TRIGGER trg_audit_log
  BEFORE INSERT OR UPDATE ON employees
  FOR EACH ROW
DECLARE
  v_action VARCHAR2(10);
BEGIN
  IF INSERTING THEN
    v_action := 'INSERT';
  ELSIF UPDATING THEN
    v_action := 'UPDATE';
  END IF;
  
  INSERT INTO audit_log (
    user_id, action, table_name, 
    old_value, new_value, log_date
  ) VALUES (
    USER, v_action, 'EMPLOYEES',
    :OLD.salary, :NEW.salary, SYSDATE
  );
END;
/
\`\`\`

**Points clés :**
- Utilisez \`BEFORE\` pour valider/modifier avant l'écriture
- \`:OLD\` et \`:NEW\` référencent les valeurs avant/après
- \`FOR EACH ROW\` déclenche le trigger pour chaque ligne affectée

📚 **Ressources trouvées :** 3 cours et 2 vidéos correspondent à votre recherche.`,
    timestamp: '08:45',
    sources: [
      { type: 'video', title: 'Configuration des Triggers PL/SQL pour les Logs', time: '14:32' },
      { type: 'cours', title: 'Architecture des Triggers : BEFORE vs AFTER', page: 142 },
      { type: 'exercice', title: 'TP : Créer un système de logs avec triggers composés' },
    ],
  },
];

export const userStats = {
  coursesEnrolled: 4,
  coursesCompleted: 1,
  hoursLearned: 68,
  streak: 12,
  searchesThisWeek: 23,
  topTopics: ['SQL', 'React', 'PL/SQL', 'Firebase'],
};

export const recentSearches = [
  'comment configurer un trigger PL/SQL pour les logs',
  'différence entre JOIN et sous-requête',
  'useEffect React nettoyage',
  'firebase authentication custom claims',
  'normalisation 3NF exemple',
];

export const suggestedSearches = [
  { text: 'Qu\'est-ce qu\'un trigger en PL/SQL ?', icon: 'sparkles' },
  { text: 'Comment optimiser les requêtes SQL ?', icon: 'zap' },
  { text: 'Les hooks React expliqués simplement', icon: 'book' },
  { text: 'Déployer une app sur Firebase', icon: 'cloud' },
  { text: 'Introduction au Machine Learning', icon: 'brain' },
  { text: 'Sécuriser une API REST', icon: 'shield' },
];

export const categories = [
  { id: 'all', name: 'Tous', count: 142, icon: 'layers' },
  { id: 'cours', name: 'Cours', count: 48, icon: 'book-open' },
  { id: 'video', name: 'Vidéos', count: 36, icon: 'play-circle' },
  { id: 'exercice', name: 'Exercices', count: 31, icon: 'code' },
  { id: 'forum', name: 'Forum', count: 27, icon: 'messages-square' },
];

export const activityFeed = [
  { id: 'a1', type: 'course_progress', text: 'Vous avez complété le Module 9 de "PL/SQL Avancé"', time: 'il y a 2h' },
  { id: 'a2', type: 'forum_answer', text: 'Votre réponse sur "Optimisation SQL" a été acceptée', time: 'il y a 5h' },
  { id: 'a3', type: 'new_content', text: 'Nouveau cours disponible : "Architecture Microservices"', time: 'il y a 1j' },
  { id: 'a4', type: 'achievement', text: 'Badge débloqué : "Chercheur Assidu" — 50 recherches !', time: 'il y a 2j' },
];
