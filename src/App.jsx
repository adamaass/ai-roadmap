import { useState } from "react";

/** Ensures resource links open correctly (data may omit scheme). */
function resourceHref(url) {
  if (!url || typeof url !== "string") return "#";
  const t = url.trim();
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t.replace(/^\/+/, "")}`;
}

const TYPE_COLORS = {
  code: { bg: "#DBEAFE", text: "#1E40AF", label: "Code" },
  math: { bg: "#FEF3C7", text: "#92400E", label: "Théorie" },
  practice: { bg: "#D1FAE5", text: "#065F46", label: "Pratique" },
  project: { bg: "#EDE9FE", text: "#5B21B6", label: "Projet" },
  course: { bg: "#FFE4E6", text: "#9F1239", label: "Cours" },
  review: { bg: "#F3F4F6", text: "#374151", label: "Revue" },
};

const PHASE1_WEEKS = [
  {
    week: 1,
    title: "Python Solide + Maths — Algèbre Linéaire",
    color: "#E8D44D",
    accent: "#2D2A1E",
    hours: "24h",
    goal: "Passer d'un niveau 'je code un peu' à 'je maîtrise Python proprement' + poser les bases mathématiques.",
    days: [
      {
        day: "Jour 1", label: "Python — Structures de données",
        blocks: [
          { time: "1h", task: "Revoir listes, dictionnaires, sets, tuples — exercices pratiques", type: "code" },
          { time: "1h", task: "List comprehensions, générateurs, slicing avancé", type: "code" },
          { time: "1h", task: "Résoudre 5 problèmes HackerRank (Easy) sur les structures de données", type: "practice" },
          { time: "1h", task: "3Blue1Brown — Essence of Linear Algebra Ep.1-2 (vecteurs, combinaisons linéaires)", type: "math" },
        ],
      },
      {
        day: "Jour 2", label: "Python — OOP + Maths",
        blocks: [
          { time: "1h", task: "Classes, héritage, méthodes spéciales (__init__, __repr__, __str__)", type: "code" },
          { time: "1h", task: "Projet mini : créer une classe Matrix avec addition et multiplication", type: "project" },
          { time: "1h", task: "3Blue1Brown Ep.3-4 (transformations linéaires, multiplication de matrices)", type: "math" },
          { time: "1h", task: "Implémenter les opérations matricielles en Python pur (sans NumPy)", type: "practice" },
        ],
      },
      {
        day: "Jour 3", label: "Python — Fonctions avancées",
        blocks: [
          { time: "1h", task: "Décorateurs, *args/**kwargs, fonctions lambda, map/filter/reduce", type: "code" },
          { time: "1h", task: "Gestion d'erreurs (try/except), context managers (with)", type: "code" },
          { time: "1h", task: "3Blue1Brown Ep.5-7 (déterminant, systèmes linéaires, espace nul)", type: "math" },
          { time: "1h", task: "Exercices : résoudre un système linéaire à la main puis en code", type: "practice" },
        ],
      },
      {
        day: "Jour 4", label: "NumPy — Le langage de l'IA",
        blocks: [
          { time: "1h", task: "NumPy : arrays, shapes, broadcasting, indexing", type: "code" },
          { time: "1h", task: "Opérations matricielles avec NumPy (dot product, transpose, inverse)", type: "code" },
          { time: "1h", task: "3Blue1Brown Ep.8-10 (changement de base, eigenvectors, eigenvalues)", type: "math" },
          { time: "1h", task: "Exercice : implémenter les eigenvectors/values avec NumPy, comparer avec np.linalg.eig", type: "practice" },
        ],
      },
      {
        day: "Jour 5", label: "Pandas + Visualisation",
        blocks: [
          { time: "1h", task: "Pandas : DataFrames, lecture CSV, filtrage, groupby, merge", type: "code" },
          { time: "1h", task: "Matplotlib/Seaborn : line plots, scatter, histogrammes, heatmaps", type: "code" },
          { time: "1h", task: "Mini-projet : analyser un dataset Kaggle (Titanic ou House Prices), nettoyer + visualiser", type: "project" },
          { time: "1h", task: "Résumé de semaine : note tes 5 concepts maths clés + 5 patterns Python à retenir", type: "review" },
        ],
      },
      {
        day: "Jour 6", label: "Projet de consolidation",
        blocks: [
          { time: "2h", task: "Projet : Data Analysis Report — charger un dataset, nettoyer, analyser, visualiser, documenter dans un notebook Jupyter", type: "project" },
          { time: "1h", task: "Publier le notebook sur GitHub avec un README propre", type: "project" },
          { time: "1h", task: "Revoir les concepts de la semaine, identifier les lacunes", type: "review" },
        ],
      },
    ],
    resources: [
      { name: "3Blue1Brown — Essence of Linear Algebra", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" },
      { name: "Python for Everybody (py4e.com)", url: "https://www.py4e.com" },
      { name: "HackerRank Python", url: "https://www.hackerrank.com/domains/python" },
      { name: "NumPy Quickstart", url: "https://numpy.org/doc/stable/user/quickstart.html" },
    ],
  },
  {
    week: 2,
    title: "Maths — Calcul Différentiel + Probabilités",
    color: "#4ECDC4",
    accent: "#1A3A37",
    hours: "24h",
    goal: "Comprendre les gradients (comment un modèle apprend) et les probabilités (comment il décide).",
    days: [
      {
        day: "Jour 1", label: "Calcul — Dérivées & Gradients",
        blocks: [
          { time: "1h30", task: "3Blue1Brown — Essence of Calculus Ep.1-4 (dérivées, règle de la chaîne)", type: "math" },
          { time: "1h", task: "Implémenter des dérivées numériques en Python : f'(x) ≈ (f(x+h) - f(x)) / h", type: "code" },
          { time: "1h30", task: "Khan Academy : dérivées partielles, gradients (intro au calcul multivariable)", type: "math" },
        ],
      },
      {
        day: "Jour 2", label: "Gradient Descent — Le cœur de l'IA",
        blocks: [
          { time: "1h", task: "Vidéo : 3Blue1Brown — Neural Networks Ch.2 (Gradient descent)", type: "math" },
          { time: "2h", task: "Implémenter gradient descent from scratch : minimiser f(x) = x² + 3x + 2", type: "code" },
          { time: "1h", task: "Visualiser la descente avec Matplotlib (animation de la convergence)", type: "project" },
        ],
      },
      {
        day: "Jour 3", label: "Probabilités fondamentales",
        blocks: [
          { time: "1h", task: "Probabilité conditionnelle, théorème de Bayes, indépendance", type: "math" },
          { time: "1h", task: "Distributions : normale, uniforme, binomiale — visualiser chacune en Python", type: "code" },
          { time: "1h", task: "Espérance, variance, écart-type — calculer à la main puis avec NumPy", type: "practice" },
          { time: "1h", task: "StatQuest YouTube : Bayes theorem, p-values, distributions (3-4 vidéos)", type: "math" },
        ],
      },
      {
        day: "Jour 4", label: "Statistiques pour le ML",
        blocks: [
          { time: "1h", task: "Corrélation, covariance, régression linéaire simple (la théorie)", type: "math" },
          { time: "2h", task: "Implémenter une régression linéaire FROM SCRATCH avec gradient descent", type: "code" },
          { time: "1h", task: "Comparer ton implémentation avec sklearn LinearRegression", type: "practice" },
        ],
      },
      {
        day: "Jour 5", label: "Régression linéaire — Projet complet",
        blocks: [
          { time: "1h", task: "Ajouter la régression multivariable à ton implémentation", type: "code" },
          { time: "1h", task: "Feature scaling (normalisation, standardisation) — pourquoi c'est crucial", type: "code" },
          { time: "1h", task: "Métriques : MSE, MAE, R² — implémenter et comprendre chacune", type: "code" },
          { time: "1h", task: "Visualiser le processus d'apprentissage (loss curve)", type: "project" },
        ],
      },
      {
        day: "Jour 6", label: "Consolidation & Notebook",
        blocks: [
          { time: "2h", task: "Projet : Prédiction de prix (Boston Housing ou California) — from scratch vs sklearn", type: "project" },
          { time: "1h", task: "Écrire un article/notebook expliquant gradient descent en tes propres mots", type: "review" },
          { time: "1h", task: "Push sur GitHub — ton premier vrai projet ML", type: "project" },
        ],
      },
    ],
    resources: [
      { name: "3Blue1Brown — Essence of Calculus", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr" },
      { name: "StatQuest (YouTube)", url: "https://www.youtube.com/@statquest" },
      { name: "Khan Academy — Multivariable Calculus", url: "https://www.khanacademy.org/math/multivariable-calculus" },
    ],
  },
  {
    week: 3,
    title: "Machine Learning — Les Fondamentaux",
    color: "#FF6B6B",
    accent: "#3D1F1F",
    hours: "24h",
    goal: "Comprendre les algorithmes ML classiques, le workflow complet, et les pièges courants.",
    days: [
      {
        day: "Jour 1", label: "ML Workflow & Classification",
        blocks: [
          { time: "1h30", task: "Andrew Ng ML Specialization — Semaine 1 : supervised vs unsupervised, cost functions", type: "course" },
          { time: "1h", task: "Classification binaire : régression logistique (théorie + sigmoid function)", type: "math" },
          { time: "1h30", task: "Implémenter la régression logistique from scratch (gradient descent + sigmoid)", type: "code" },
        ],
      },
      {
        day: "Jour 2", label: "Arbres de décision & Ensemble Methods",
        blocks: [
          { time: "1h", task: "StatQuest : Decision Trees, Random Forests, XGBoost (3 vidéos)", type: "math" },
          { time: "1h", task: "Sklearn : DecisionTreeClassifier, RandomForestClassifier sur Iris dataset", type: "code" },
          { time: "1h", task: "Comprendre overfitting vs underfitting, train/test split, cross-validation", type: "math" },
          { time: "1h", task: "Visualiser les arbres de décision avec sklearn plot_tree", type: "practice" },
        ],
      },
      {
        day: "Jour 3", label: "Feature Engineering & Pipelines",
        blocks: [
          { time: "1h", task: "Encoding catégoriel (one-hot, label), gestion des valeurs manquantes", type: "code" },
          { time: "1h", task: "Feature scaling, feature selection, création de features", type: "code" },
          { time: "1h", task: "Sklearn Pipelines : enchaîner preprocessing + modèle", type: "code" },
          { time: "1h", task: "Kaggle : explorer 3 notebooks 'gold' sur le Titanic dataset", type: "practice" },
        ],
      },
      {
        day: "Jour 4", label: "Évaluation de modèles",
        blocks: [
          { time: "1h", task: "Métriques : accuracy, precision, recall, F1, AUC-ROC — quand utiliser quoi", type: "math" },
          { time: "1h", task: "Confusion matrix, courbes ROC — implémenter et visualiser", type: "code" },
          { time: "1h", task: "Hyperparameter tuning : GridSearchCV, RandomizedSearchCV", type: "code" },
          { time: "1h", task: "Bias-variance tradeoff — comprendre intuitivement", type: "math" },
        ],
      },
      {
        day: "Jour 5", label: "Unsupervised Learning",
        blocks: [
          { time: "1h", task: "K-Means clustering : théorie + implémentation", type: "code" },
          { time: "1h", task: "PCA (Principal Component Analysis) : réduction de dimensionnalité", type: "math" },
          { time: "1h", task: "Appliquer PCA + K-Means sur un dataset réel", type: "practice" },
          { time: "1h", task: "Andrew Ng ML Specialization — sections unsupervised learning", type: "course" },
        ],
      },
      {
        day: "Jour 6", label: "Kaggle Competition",
        blocks: [
          { time: "3h", task: "Compétition Kaggle 'House Prices' : EDA complète → feature engineering → modèle → soumission", type: "project" },
          { time: "1h", task: "Documenter l'approche, publier le notebook, analyser le leaderboard", type: "review" },
        ],
      },
    ],
    resources: [
      { name: "Andrew Ng — ML Specialization (Coursera)", url: "https://www.coursera.org/specializations/machine-learning-introduction" },
      { name: "Scikit-learn User Guide", url: "https://scikit-learn.org/stable/user_guide.html" },
      { name: "Kaggle Learn — Intro to ML", url: "https://www.kaggle.com/learn/intro-to-machine-learning" },
    ],
  },
  {
    week: 4,
    title: "Réseaux de Neurones — From Scratch",
    color: "#A78BFA",
    accent: "#2D2548",
    hours: "24h",
    goal: "Comprendre comment un réseau de neurones apprend, neurone par neurone, avant d'utiliser des frameworks.",
    days: [
      {
        day: "Jour 1", label: "Le Perceptron & Forward Pass",
        blocks: [
          { time: "1h", task: "3Blue1Brown — Neural Networks Ch.1 : What is a neural network?", type: "math" },
          { time: "1h", task: "Implémenter un seul neurone : inputs × weights + bias → activation", type: "code" },
          { time: "1h", task: "Fonctions d'activation : sigmoid, tanh, ReLU — visualiser chacune", type: "code" },
          { time: "1h", task: "Construire un forward pass pour un réseau 2 couches (en NumPy)", type: "code" },
        ],
      },
      {
        day: "Jour 2", label: "Backpropagation — Le concept clé",
        blocks: [
          { time: "1h30", task: "3Blue1Brown — Neural Networks Ch.3-4 (Backpropagation, calculus)", type: "math" },
          { time: "1h30", task: "Implémenter backprop à la main pour un réseau 2 couches", type: "code" },
          { time: "1h", task: "Andrej Karpathy — micrograd video (intro, premières 40 min)", type: "math" },
        ],
      },
      {
        day: "Jour 3", label: "Micrograd — Neural Net from Scratch",
        blocks: [
          { time: "3h", task: "Suivre Karpathy micrograd (fin) — construire un moteur autograd complet", type: "code" },
          { time: "1h", task: "Tester ton micrograd sur un problème de classification (moons dataset)", type: "practice" },
        ],
      },
      {
        day: "Jour 4", label: "PyTorch — Premiers pas",
        blocks: [
          { time: "1h", task: "PyTorch : tenseurs, autograd, operations de base", type: "code" },
          { time: "1h", task: "Comparer NumPy vs PyTorch tenseurs — mêmes opérations, syntaxe différente", type: "code" },
          { time: "1h", task: "nn.Module, nn.Linear, loss functions, optimizers", type: "code" },
          { time: "1h", task: "Reconstruire ta régression linéaire en PyTorch", type: "practice" },
        ],
      },
      {
        day: "Jour 5", label: "Premier réseau en PyTorch",
        blocks: [
          { time: "1h", task: "DataLoader, Dataset, batching, training loop", type: "code" },
          { time: "2h", task: "Classifieur MNIST en PyTorch : réseau fully connected → 97%+ accuracy", type: "project" },
          { time: "1h", task: "Visualiser les prédictions, les erreurs, et les poids du réseau", type: "practice" },
        ],
      },
      {
        day: "Jour 6", label: "Consolidation Deep",
        blocks: [
          { time: "2h", task: "Refactorer ton code : séparer modèle, entraînement, évaluation en fichiers propres", type: "project" },
          { time: "1h", task: "Écrire un notebook explicatif : 'Comment un réseau de neurones apprend — de zéro'", type: "review" },
          { time: "1h", task: "Push tout sur GitHub avec documentation", type: "project" },
        ],
      },
    ],
    resources: [
      { name: "3Blue1Brown — Neural Networks", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi" },
      { name: "Karpathy — micrograd", url: "https://www.youtube.com/watch?v=VMj-3S1tku0" },
      { name: "PyTorch Tutorials", url: "https://pytorch.org/tutorials" },
    ],
  },
  {
    week: 5,
    title: "Deep Learning — CNNs & Computer Vision",
    color: "#F97316",
    accent: "#3D2508",
    hours: "24h",
    goal: "Maîtriser les CNNs — essentiels pour la robotique et la vision par ordinateur.",
    days: [
      {
        day: "Jour 1", label: "Convolutions — L'intuition",
        blocks: [
          { time: "1h", task: "Qu'est-ce qu'une convolution ? Filtres, stride, padding — animation visuelle", type: "math" },
          { time: "1h", task: "Implémenter une convolution 2D en NumPy (sans framework)", type: "code" },
          { time: "1h", task: "Pooling layers, feature maps — pourquoi les CNNs voient des 'features'", type: "math" },
          { time: "1h", task: "fast.ai Lesson 1 — pratique avec un vrai dataset d'images", type: "course" },
        ],
      },
      {
        day: "Jour 2", label: "Architectures CNN classiques",
        blocks: [
          { time: "1h", task: "LeNet → AlexNet → VGG : l'évolution des architectures (lire + résumer)", type: "math" },
          { time: "2h", task: "Construire un CNN en PyTorch pour CIFAR-10 (Conv → Pool → FC)", type: "code" },
          { time: "1h", task: "Expérimenter : changer le nombre de filtres, layers, learning rate", type: "practice" },
        ],
      },
      {
        day: "Jour 3", label: "Transfer Learning",
        blocks: [
          { time: "1h", task: "Pourquoi le transfer learning fonctionne : features génériques vs spécifiques", type: "math" },
          { time: "2h", task: "Utiliser ResNet pré-entraîné pour classifier un dataset custom (tes propres images)", type: "code" },
          { time: "1h", task: "Fine-tuning vs feature extraction — expérimenter les deux", type: "practice" },
        ],
      },
      {
        day: "Jour 4", label: "Data Augmentation & Régularisation",
        blocks: [
          { time: "1h", task: "Augmentation : rotation, flip, crop, color jitter — torchvision.transforms", type: "code" },
          { time: "1h", task: "Dropout, Batch Normalization — théorie et implémentation", type: "code" },
          { time: "1h", task: "Learning rate scheduling, early stopping", type: "code" },
          { time: "1h", task: "Appliquer tout ça à ton modèle CIFAR-10 et mesurer l'amélioration", type: "practice" },
        ],
      },
      {
        day: "Jour 5", label: "Détection d'objets — Intro",
        blocks: [
          { time: "1h", task: "Object detection vs classification — YOLO, SSD concepts", type: "math" },
          { time: "2h", task: "Utiliser un modèle YOLO pré-entraîné avec ultralytics/YOLOv8", type: "code" },
          { time: "1h", task: "Tester sur tes propres images/vidéos (webcam si possible)", type: "practice" },
        ],
      },
      {
        day: "Jour 6", label: "Projet Vision",
        blocks: [
          { time: "3h", task: "Projet : classificateur d'images custom — scraper un dataset, entraîner, évaluer, déployer en API", type: "project" },
          { time: "1h", task: "Documentation, GitHub, rétrospective de la semaine", type: "review" },
        ],
      },
    ],
    resources: [
      { name: "fast.ai — Practical Deep Learning", url: "https://course.fast.ai" },
      { name: "CS231n Stanford (notes)", url: "https://cs231n.stanford.edu" },
      { name: "Ultralytics YOLOv8", url: "https://docs.ultralytics.com" },
    ],
  },
  {
    week: 6,
    title: "NLP & Transformers — Comment les LLMs fonctionnent",
    color: "#06B6D4",
    accent: "#0A2E38",
    hours: "24h",
    goal: "Comprendre l'architecture Transformer — le fondement de ChatGPT, Claude, et tous les LLMs modernes.",
    days: [
      {
        day: "Jour 1", label: "NLP Classique — Bases",
        blocks: [
          { time: "1h", task: "Tokenization, Bag of Words, TF-IDF — concepts et implémentation", type: "code" },
          { time: "1h", task: "Word embeddings : Word2Vec — l'idée clé de représenter les mots comme vecteurs", type: "math" },
          { time: "1h", task: "Utiliser gensim Word2Vec : entraîner sur un corpus, explorer les similarités", type: "code" },
          { time: "1h", task: "Sentiment analysis classique avec TF-IDF + Logistic Regression", type: "practice" },
        ],
      },
      {
        day: "Jour 2", label: "RNNs & Séquences",
        blocks: [
          { time: "1h", task: "RNN : comment traiter des séquences, le problème du vanishing gradient", type: "math" },
          { time: "1h", task: "LSTM & GRU : pourquoi ils résolvent le vanishing gradient", type: "math" },
          { time: "2h", task: "Implémenter un text generator simple avec LSTM en PyTorch", type: "code" },
        ],
      },
      {
        day: "Jour 3", label: "Attention Is All You Need",
        blocks: [
          { time: "1h30", task: "Lire et comprendre le mécanisme d'attention : Query, Key, Value", type: "math" },
          { time: "1h", task: "Self-attention : pourquoi c'est révolutionnaire (chaque token 'regarde' les autres)", type: "math" },
          { time: "1h30", task: "Implémenter self-attention from scratch en PyTorch", type: "code" },
        ],
      },
      {
        day: "Jour 4", label: "L'architecture Transformer",
        blocks: [
          { time: "1h", task: "Karpathy — Let's build GPT (1ère moitié) : tokenization + bigram model", type: "course" },
          { time: "1h", task: "Multi-head attention, positional encoding, feed-forward layers", type: "math" },
          { time: "2h", task: "Karpathy — Let's build GPT (2ème moitié) : construire un mini-GPT", type: "code" },
        ],
      },
      {
        day: "Jour 5", label: "Hugging Face & Modèles pré-entraînés",
        blocks: [
          { time: "1h", task: "Hugging Face ecosystem : models, datasets, tokenizers, pipelines", type: "code" },
          { time: "1h", task: "Utiliser BERT pour classification de texte (pipeline + fine-tuning simple)", type: "code" },
          { time: "1h", task: "Comprendre encoder-only (BERT) vs decoder-only (GPT) vs encoder-decoder (T5)", type: "math" },
          { time: "1h", task: "Explorer le Model Hub : tester 5 modèles différents sur des tâches variées", type: "practice" },
        ],
      },
      {
        day: "Jour 6", label: "Projet NLP",
        blocks: [
          { time: "3h", task: "Projet : fine-tuner un modèle BERT sur un dataset custom (reviews, news, etc.)", type: "project" },
          { time: "1h", task: "Écrire un article : 'Comment fonctionnent les Transformers — expliqué simplement'", type: "review" },
        ],
      },
    ],
    resources: [
      { name: "Karpathy — Let's build GPT", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY" },
      { name: "Illustrated Transformer (Jay Alammar)", url: "https://jalammar.github.io/illustrated-transformer/" },
      { name: "Hugging Face NLP Course", url: "https://huggingface.co/learn/nlp-course" },
    ],
  },
  {
    week: 7,
    title: "LLMs en Pratique — APIs, RAG & Agents",
    color: "#EC4899",
    accent: "#3D1232",
    hours: "24h",
    goal: "Passer de la théorie à la construction d'applications IA réelles et déployables.",
    days: [
      {
        day: "Jour 1", label: "APIs LLM & Prompt Engineering",
        blocks: [
          { time: "1h", task: "OpenAI API + Anthropic API : setup, premiers appels, paramètres (temperature, max_tokens)", type: "code" },
          { time: "1h", task: "Prompt engineering avancé : few-shot, chain-of-thought, system prompts", type: "practice" },
          { time: "1h", task: "Construire un chatbot CLI avec historique de conversation", type: "code" },
          { time: "1h", task: "Structured output : forcer le LLM à retourner du JSON, parser la réponse", type: "code" },
        ],
      },
      {
        day: "Jour 2", label: "Embeddings & Vector Databases",
        blocks: [
          { time: "1h", task: "Embeddings : comment les textes deviennent des vecteurs, similarité cosinus", type: "math" },
          { time: "1h", task: "Générer des embeddings avec l'API OpenAI ou un modèle HuggingFace", type: "code" },
          { time: "1h", task: "Vector databases : ChromaDB — stocker et rechercher des documents", type: "code" },
          { time: "1h", task: "Semantic search : trouver les documents les plus pertinents pour une question", type: "practice" },
        ],
      },
      {
        day: "Jour 3", label: "RAG — Retrieval-Augmented Generation",
        blocks: [
          { time: "1h", task: "Pourquoi RAG : les limites des LLMs (hallucinations, données obsolètes)", type: "math" },
          { time: "1h", task: "Architecture RAG : chunking → embedding → retrieval → generation", type: "code" },
          { time: "2h", task: "Construire un pipeline RAG complet : charger des PDFs → ChromaDB → LLM", type: "project" },
        ],
      },
      {
        day: "Jour 4", label: "LangChain & Orchestration",
        blocks: [
          { time: "1h", task: "LangChain : chains, prompts templates, memory, output parsers", type: "code" },
          { time: "1h", task: "LangChain document loaders, text splitters, retrievers", type: "code" },
          { time: "2h", task: "Reconstruire ton RAG avec LangChain — comparer avec ta version manuelle", type: "practice" },
        ],
      },
      {
        day: "Jour 5", label: "Agents IA",
        blocks: [
          { time: "1h", task: "Concept d'agent : reasoning + tool use + planning", type: "math" },
          { time: "1h", task: "Function calling / Tool use avec les APIs (OpenAI, Anthropic)", type: "code" },
          { time: "2h", task: "Construire un agent qui peut : chercher sur le web, calculer, lire des fichiers", type: "project" },
        ],
      },
      {
        day: "Jour 6", label: "Projet Full Stack AI",
        blocks: [
          { time: "3h", task: "Projet : App RAG complète avec FastAPI backend + interface simple (Streamlit ou Gradio)", type: "project" },
          { time: "1h", task: "Déployer sur un service cloud gratuit (Railway, Render, ou HuggingFace Spaces)", type: "project" },
        ],
      },
    ],
    resources: [
      { name: "DeepLearning.AI Short Courses (gratuits)", url: "https://www.deeplearning.ai/short-courses" },
      { name: "LangChain Docs", url: "https://python.langchain.com/docs" },
      { name: "ChromaDB Getting Started", url: "https://docs.trychroma.com" },
    ],
  },
  {
    week: 8,
    title: "Projet Capstone + Orientation Long Terme",
    color: "#8B5CF6",
    accent: "#2D1B69",
    hours: "24h",
    goal: "Consolider tout dans un projet ambitieux et tracer ta direction pour les 8 semaines suivantes.",
    days: [
      {
        day: "Jour 1", label: "Design du projet capstone",
        blocks: [
          { time: "1h", task: "Choisir un projet aligné avec tes ambitions (robotique IA ou compute spatial)", type: "review" },
          { time: "1h", task: "Option A : Robot vision — détection d'objets + prise de décision autonome", type: "project" },
          { time: "1h", task: "Option B : AI-powered satellite data analysis pipeline", type: "project" },
          { time: "1h", task: "Définir l'architecture, les composants, le plan de 5 jours", type: "project" },
        ],
      },
      {
        day: "Jour 2", label: "Capstone — Data & Model",
        blocks: [
          { time: "1h", task: "Collecter/préparer le dataset pour ton projet", type: "code" },
          { time: "2h", task: "Entraîner ou fine-tuner le modèle principal", type: "code" },
          { time: "1h", task: "Évaluer les performances, itérer sur les hyperparamètres", type: "practice" },
        ],
      },
      {
        day: "Jour 3", label: "Capstone — Backend & API",
        blocks: [
          { time: "2h", task: "Construire l'API FastAPI autour de ton modèle", type: "code" },
          { time: "1h", task: "Ajouter du monitoring, logging, gestion d'erreurs", type: "code" },
          { time: "1h", task: "Tests unitaires et d'intégration", type: "code" },
        ],
      },
      {
        day: "Jour 4", label: "Capstone — Frontend & Deploy",
        blocks: [
          { time: "2h", task: "Interface utilisateur (Streamlit, Gradio, ou React simple)", type: "code" },
          { time: "1h", task: "Dockeriser l'application complète", type: "code" },
          { time: "1h", task: "Déployer et tester en conditions réelles", type: "project" },
        ],
      },
      {
        day: "Jour 5", label: "Documentation & Portfolio",
        blocks: [
          { time: "1h", task: "README détaillé avec architecture, screenshots, instructions", type: "review" },
          { time: "1h", task: "Article de blog / thread expliquant le projet et les apprentissages", type: "review" },
          { time: "1h", task: "Mettre à jour ton profil GitHub et LinkedIn", type: "review" },
          { time: "1h", task: "Faire une démo vidéo de 3-5 minutes du projet", type: "project" },
        ],
      },
      {
        day: "Jour 6", label: "Roadmap Phase 2",
        blocks: [
          { time: "1h", task: "Bilan : quels sujets tu maîtrises, quelles lacunes restent", type: "review" },
          { time: "1h", task: "Explorer ROS (Robot Operating System) si orientation robotique", type: "practice" },
          { time: "1h", task: "Explorer edge AI (TensorFlow Lite, NVIDIA Jetson) si orientation hardware", type: "practice" },
          { time: "1h", task: "Planifier tes 8 prochaines semaines avec la Phase 2", type: "review" },
        ],
      },
    ],
    resources: [
      { name: "Streamlit Docs", url: "https://docs.streamlit.io" },
      { name: "ROS2 Tutorials", url: "https://docs.ros.org/en/humble/Tutorials.html" },
      { name: "TensorFlow Lite Guide", url: "https://www.tensorflow.org/lite/guide" },
      { name: "NVIDIA Jetson Getting Started", url: "https://developer.nvidia.com/embedded/learn/get-started-jetson-nano" },
    ],
  },
];

const PHASE2_BLOCKS = [
  {
    weeks: "Semaines 9–10",
    num: "09",
    title: "Software Engineering pour l'IA",
    color: "#F59E0B",
    icon: "⚙️",
    why: "Rendre tes projets production-ready. C'est ce qui sépare un hobbyiste d'un ingénieur.",
    topics: [
      "Git avancé : branching strategies, code reviews, CI/CD avec GitHub Actions",
      "Docker approfondi : multi-stage builds, docker-compose, optimisation d'images",
      "Tests pour l'IA : tester des outputs non-déterministes, evaluation frameworks (RAGAS, DeepEval)",
      "Bases de données avancées : PostgreSQL + pgvector, Redis pour le caching, MongoDB",
      "Architecture d'API robuste : rate limiting, auth (JWT/OAuth), versioning, error handling",
      "Monitoring & observabilité : logs structurés, métriques, alerting",
    ],
    project: "Reprendre ton app RAG de la semaine 7, la rendre production-ready : Docker, tests, CI/CD, monitoring, documentation API complète.",
    resources: [
      "The Missing Semester of CS (MIT)",
      "TestDriven.io — FastAPI + Docker tutorials",
      "GitHub Actions documentation",
    ],
  },
  {
    weeks: "Semaines 11–12",
    num: "11",
    title: "MLOps & Déploiement de Modèles",
    color: "#10B981",
    icon: "🚀",
    why: "Un modèle qui tourne dans un notebook ne vaut rien. MLOps = entraîner, versionner, déployer et surveiller à l'échelle.",
    topics: [
      "MLflow : tracking d'expériences, versioning de modèles, model registry",
      "Weights & Biases (W&B) : logging d'entraînement, hyperparameter sweeps",
      "Model serving : TorchServe, BentoML, ou FastAPI custom",
      "Cloud basics : AWS/GCP free tier — EC2, S3, Lambda",
      "GPU dans le cloud : Google Colab Pro, Lambda Labs, RunPod",
      "Orchestration : intro Kubernetes (concepts), Terraform (infra as code)",
    ],
    project: "Pipeline MLOps complète : entraîner → tracker avec MLflow → packager Docker → déployer cloud → monitorer.",
    resources: [
      "Made With ML — MLOps course (gratuit)",
      "MLflow official tutorials",
      "AWS/GCP free tier getting started",
    ],
  },
  {
    weeks: "Semaines 13–14",
    num: "13",
    title: "Advanced Deep Learning & Edge AI",
    color: "#8B5CF6",
    icon: "🧠",
    why: "Spécialisation vers tes ambitions : vision avancée, RL, et faire tourner des modèles sur du hardware limité.",
    topics: [
      "Architectures modernes : Vision Transformers (ViT), diffusion models, GANs",
      "3D Vision : point clouds, depth estimation — crucial pour la robotique",
      "Reinforcement Learning intro : Q-learning, policy gradients, Gymnasium",
      "Edge AI : TensorFlow Lite, ONNX Runtime — modèles sur hardware limité",
      "Quantization & pruning : réduire un modèle de 10x sans perdre en perf",
      "NVIDIA Jetson / Raspberry Pi : déployer un modèle de vision sur device",
    ],
    project: "Déployer un modèle de détection d'objets en temps réel sur Raspberry Pi ou Jetson Nano.",
    resources: [
      "CS231n Stanford — CV avancée",
      "Spinning Up in Deep RL (OpenAI)",
      "NVIDIA Jetson AI Fundamentals (gratuit)",
      "TensorFlow Lite for Microcontrollers",
    ],
  },
  {
    weeks: "Semaines 15–16",
    num: "15",
    title: "Robotique IA & Systèmes Distribués",
    color: "#EC4899",
    icon: "🤖",
    why: "Premier contact avec tes ambitions long terme : IA dans le monde physique et environnements contraints.",
    topics: [
      "ROS2 : nodes, topics, services, launch files",
      "Simulation robotique : Gazebo ou Isaac Sim",
      "Perception : SLAM, sensor fusion (caméra + LiDAR + IMU)",
      "Systèmes distribués : consensus, partitioning, CAP theorem",
      "Federated Learning : entraîner sans centraliser les données",
      "Communication contrainte : IA en bande passante limitée (satellite, espace)",
    ],
    project: "Robot simulé dans Gazebo naviguant avec vision IA, ou système de federated learning distribué.",
    resources: [
      "ROS2 Humble Tutorials (docs.ros.org)",
      "NVIDIA Isaac Sim (gratuit étudiants)",
      "Flower — framework Federated Learning",
      "Designing Data-Intensive Applications (Kleppmann)",
    ],
  },
];

export default function FullRoadmap() {
  const [phase, setPhase] = useState(1);
  const [openWeek, setOpenWeek] = useState(0);
  const [openP2, setOpenP2] = useState(0);
  const [completedTasks, setCompletedTasks] = useState({});

  const toggleTask = (wi, di, bi) => {
    const k = `${wi}-${di}-${bi}`;
    setCompletedTasks((p) => ({ ...p, [k]: !p[k] }));
  };

  const getWeekProgress = (wi) => {
    const w = PHASE1_WEEKS[wi];
    let t = 0, d = 0;
    w.days.forEach((day, di) => {
      day.blocks.forEach((_, bi) => { t++; if (completedTasks[`${wi}-${di}-${bi}`]) d++; });
    });
    return t > 0 ? Math.round((d / t) * 100) : 0;
  };

  const totalTasks = PHASE1_WEEKS.reduce((a, w) => a + w.days.reduce((b, d) => b + d.blocks.length, 0), 0);
  const totalDone = Object.values(completedTasks).filter(Boolean).length;

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif", maxWidth: 760, margin: "0 auto", padding: "20px 16px", color: "var(--text)", background: "var(--app-bg)", minHeight: "100vh", boxSizing: "border-box" }}>

      {/* Header */}
      <div style={{ marginBottom: 24, borderBottom: "3px solid var(--header-border)", paddingBottom: 18 }}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: 4 }}>Formation AI Engineer</div>
        <h1 style={{ fontSize: 31, fontWeight: 700, margin: 0, lineHeight: 1.2, color: "var(--text)" }}>Roadmap Complète — 16 Semaines</h1>
        <p style={{ color: "var(--text-muted)", margin: "6px 0 0", fontSize: 16 }}>4h/jour · 6 jours/semaine · 384h total</p>
      </div>

      {/* Phase tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[1, 2].map((p) => (
          <button key={p} onClick={() => setPhase(p)} style={{
            flex: 1, padding: "12px 0", border: "2px solid", cursor: "pointer",
            borderColor: phase === p ? "var(--phase-active-bg)" : "var(--phase-inactive-border)",
            background: phase === p ? "var(--phase-active-bg)" : "var(--phase-inactive-bg)",
            color: phase === p ? "var(--phase-active-text)" : "var(--phase-inactive-text)",
            borderRadius: 8, fontSize: 16, fontWeight: 600,
            fontFamily: "'IBM Plex Sans', sans-serif", transition: "all 0.15s",
          }}>
            {p === 1 ? "Phase 1 — S1 à S8" : "Phase 2 — S9 à S16"}
            <div style={{ fontSize: 12, fontWeight: 400, marginTop: 2, opacity: 0.7 }}>
              {p === 1 ? "Construire les fondations" : "Déployer & Spécialiser"}
            </div>
          </button>
        ))}
      </div>

      {/* ==================== PHASE 1 ==================== */}
      {phase === 1 && (
        <>
          {/* Progress bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{ flex: 1, height: 8, background: "var(--progress-track)", borderRadius: 4, overflow: "hidden", border: "1px solid var(--border)" }}>
              <div style={{ width: `${(totalDone / totalTasks) * 100}%`, height: "100%", background: "var(--progress-fill)", borderRadius: 3, transition: "width 0.35s ease-out" }} />
            </div>
            <span style={{ fontSize: 14, fontFamily: "'JetBrains Mono', monospace", color: "var(--text-muted)", fontWeight: 600 }}>{totalDone}/{totalTasks}</span>
          </div>

          {PHASE1_WEEKS.map((week, wi) => {
            const isOpen = openWeek === wi;
            const prog = getWeekProgress(wi);
            return (
              <div key={wi} style={{ marginBottom: 6, border: isOpen ? `2px solid ${week.color}` : "1px solid var(--border)", borderRadius: 10, overflow: "hidden", transition: "all 0.2s", background: "var(--surface-2)" }}>
                <div onClick={() => setOpenWeek(isOpen ? -1 : wi)} style={{ padding: "12px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, background: isOpen ? `${week.color}12` : "transparent" }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: week.color, color: week.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", flexShrink: 0 }}>S{week.week}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.3, color: "var(--text)" }}>{week.title}</div>
                    <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 1 }}>{week.hours}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    <span style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace", color: prog === 100 ? "#22c55e" : "var(--text-muted)" }}>{prog}%</span>
                    <span style={{ fontSize: 19, color: "var(--text-subtle)", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
                  </div>
                </div>

                {isOpen && (
                  <div style={{ padding: "0 14px 14px" }}>
                    <div style={{ marginBottom: 14, padding: "8px 10px", background: "var(--surface)", borderRadius: 6, borderLeft: `3px solid ${week.color}` }}>
                      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: 6 }}>Ressources</div>
                      {week.resources.map((r, ri) => {
                        const href = resourceHref(r.url);
                        const displayUrl = r.url.replace(/^https?:\/\//i, "").replace(/^www\./, "");
                        return (
                          <div key={ri} style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: ri < week.resources.length - 1 ? 6 : 0 }}>
                            <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 500, color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 2 }}>{r.name}</a>
                            <span style={{ color: "var(--link-url)", fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}> — </span>
                            <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--link-url)", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, textDecoration: "underline", textUnderlineOffset: 2 }}>{displayUrl}</a>
                          </div>
                        );
                      })}
                    </div>
                    <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: "0 0 14px", lineHeight: 1.5, padding: "6px 10px", background: "var(--surface)", borderRadius: 6 }}>
                      🎯 {week.goal}
                    </p>
                    {week.days.map((day, di) => (
                      <div key={di} style={{ marginBottom: 14 }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: week.color, fontFamily: "'JetBrains Mono', monospace" }}>{day.day}</span>
                          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--text)" }}>{day.label}</span>
                        </div>
                        {day.blocks.map((block, bi) => {
                          const k = `${wi}-${di}-${bi}`;
                          const done = !!completedTasks[k];
                          const ts = TYPE_COLORS[block.type] || TYPE_COLORS.code;
                          return (
                            <div key={bi} onClick={() => toggleTask(wi, di, bi)} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 8px", marginBottom: 3, borderRadius: 5, cursor: "pointer", background: done ? "var(--task-done-bg)" : "transparent", border: done ? "1px solid rgba(34, 197, 94, 0.35)" : "none", transition: "all 0.15s" }}>
                              <div style={{ width: 16, height: 16, borderRadius: 3, flexShrink: 0, marginTop: 1, border: done ? "none" : "2px solid var(--checkbox-border)", background: done ? "#22c55e" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff" }}>{done && "✓"}</div>
                              <div style={{ flex: 1, fontSize: 14, lineHeight: 1.45, textDecoration: done ? "line-through" : "none", color: done ? "var(--task-text-done)" : "var(--task-text)" }}>{block.task}</div>
                              <div style={{ display: "flex", gap: 4, alignItems: "center", flexShrink: 0 }}>
                                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "var(--text-muted)" }}>{block.time}</span>
                                <span style={{ fontSize: 10, fontWeight: 600, padding: "1px 5px", borderRadius: 3, background: ts.bg, color: ts.text }}>{ts.label}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}

      {/* ==================== PHASE 2 ==================== */}
      {phase === 2 && (
        <>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.55, margin: "0 0 18px", padding: "10px 12px", background: "var(--surface)", borderRadius: 8 }}>
            Tu sais construire des modèles et des apps IA. Maintenant : les rendre robustes, les déployer, et commencer à toucher au hardware et aux systèmes distribués.
          </p>

          {/* Mini nav */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 5, marginBottom: 20 }}>
            {PHASE2_BLOCKS.map((p, i) => (
              <div key={i} onClick={() => setOpenP2(i)} style={{
                padding: "8px 6px", borderRadius: 7, cursor: "pointer", textAlign: "center",
                background: openP2 === i ? `${p.color}15` : "transparent",
                border: openP2 === i ? `2px solid ${p.color}` : "2px solid transparent",
                transition: "all 0.15s",
              }}>
                <div style={{ fontSize: 22, marginBottom: 2 }}>{p.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: p.color }}>S{p.num}–{parseInt(p.num) + 1}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginTop: 1, lineHeight: 1.2 }}>{p.title.split("&")[0].split("—")[0].trim()}</div>
              </div>
            ))}
          </div>

          {PHASE2_BLOCKS.map((bl, bi) => {
            if (bi !== openP2) return null;
            return (
              <div key={bi} style={{ border: `2px solid ${bl.color}`, borderRadius: 12, overflow: "hidden" }}>
                <div style={{ background: `${bl.color}10`, padding: "16px 18px", borderBottom: `1px solid ${bl.color}25` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: bl.color, background: `${bl.color}18`, padding: "2px 7px", borderRadius: 4 }}>{bl.weeks}</span>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>48h · 4h/jour · 6j/semaine</span>
                  </div>
                  <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "var(--text)" }}>{bl.icon} {bl.title}</h2>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: "6px 0 0", lineHeight: 1.5, fontStyle: "italic" }}>{bl.why}</p>
                </div>

                <div style={{ padding: "14px 18px" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: 8 }}>Ce que tu vas apprendre</div>
                  {bl.topics.map((t, ti) => (
                    <div key={ti} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "7px 0", borderBottom: ti < bl.topics.length - 1 ? "1px solid var(--divider)" : "none" }}>
                      <div style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, background: `${bl.color}12`, color: bl.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{ti + 1}</div>
                      <div style={{ fontSize: 14, lineHeight: 1.45, color: "var(--text)" }}>{t}</div>
                    </div>
                  ))}
                </div>

                <div style={{ margin: "0 18px 14px", padding: "12px 14px", borderRadius: 7, background: `${bl.color}06`, borderLeft: `3px solid ${bl.color}` }}>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: bl.color, marginBottom: 4 }}>🎯 Projet de fin</div>
                  <div style={{ fontSize: 14, lineHeight: 1.55, color: "var(--text-secondary)", whiteSpace: "pre-line" }}>{bl.project}</div>
                </div>

                <div style={{ margin: "0 18px 18px", padding: "10px 12px", borderRadius: 7, background: "var(--surface)" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: 6 }}>Ressources</div>
                  {bl.resources.map((r, ri) => (
                    <div key={ri} style={{ fontSize: 13, color: "var(--text-secondary)", padding: "2px 0", display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ color: bl.color, fontSize: 8 }}>●</span> {r}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* After S16 */}
          <div style={{ marginTop: 18, padding: "14px 16px", borderRadius: 8, border: "1px dashed var(--dash-border)" }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: 6 }}>Et après ? · Semaines 17–52</div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text)" }}>S17–24 :</strong> Spécialisation profonde — robotique IA ou infrastructure compute (CUDA, cloud architecture).
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-secondary)", marginTop: 4 }}>
              <strong style={{ color: "var(--text)" }}>S25–36 :</strong> Premier prototype entrepreneurial — produit, validation utilisateur, itération.
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-secondary)", marginTop: 4 }}>
              <strong style={{ color: "var(--text)" }}>S37–52 :</strong> Communauté, open source, connexions écosystème (hardware AI, space tech).
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <div style={{ marginTop: 20, padding: "12px 14px", background: "var(--surface)", borderRadius: 8, fontSize: 14, lineHeight: 1.55, color: "var(--text-secondary)" }}>
        <strong style={{ color: "var(--text)" }}>Règle d'or :</strong> Code au moins 50% du temps. Si tu es bloqué plus de 30 minutes, passe à autre chose et reviens-y le lendemain.
      </div>
    </div>
  );
}
