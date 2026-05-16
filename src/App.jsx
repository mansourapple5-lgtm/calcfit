import { useState } from "react";

// ─── LANGUAGES META ───────────────────────────────────────────────────────────
const LANGS = [
  { code: "ar", label: "العربية", flag: "🇸🇦", rtl: true,  font: "'Tajawal', sans-serif" },
  { code: "en", label: "English", flag: "🇬🇧", rtl: false, font: "'DM Sans', sans-serif" },
  { code: "es", label: "Español", flag: "🇪🇸", rtl: false, font: "'DM Sans', sans-serif" },
  { code: "fr", label: "Français",flag: "🇫🇷", rtl: false, font: "'DM Sans', sans-serif" },
  { code: "pt", label: "Português",flag:"🇧🇷", rtl: false, font: "'DM Sans', sans-serif" },
  { code: "hi", label: "हिन्दी",  flag: "🇮🇳", rtl: false, font: "'Noto Sans Devanagari', sans-serif" },
  { code: "zh", label: "中文",    flag: "🇨🇳", rtl: false, font: "'Noto Sans SC', sans-serif" },
];

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  ar: {
    title: "حاسبة السعرات", subtitle: "الأدق • الأشمل • المخصصة",
    basics: "المعلومات الأساسية",
    age: "العمر", height: "الطول (سم)", weight: "الوزن (كغ)",
    heightFt: "الطول (قدم.بوصة)", weightLb: "الوزن (باوند)",
    male: "ذكر", female: "أنثى",
    unitMetric: "متري (كغ / سم)", unitImperial: "إمبراطوري (باوند / قدم)",
    activityBuilder: "بنّي نشاطك اليومي", addActivity: "+ أضف نشاط",
    activities: {
      steps:        { label: "خطوات يومية",               icon: "👟", perUnit: 45,  type: "daily"  },
      bodybuilding: { label: "بودي بيلدنق / كاليستنيكس", icon: "🏋️", perUnit: 5.5, type: "weekly" },
      cardio_run:   { label: "جري",                        icon: "🏃", perUnit: 9,   type: "weekly" },
      cardio_bike:  { label: "دراجة",                     icon: "🚴", perUnit: 7,   type: "weekly" },
      cardio_swim:  { label: "سباحة",                     icon: "🏊", perUnit: 8,   type: "weekly" },
      hiit:         { label: "HIIT / كروسفيت",            icon: "⚡", perUnit: 10,  type: "weekly" },
      walk:         { label: "مشي (تمرين)",               icon: "🚶", perUnit: 4.5, type: "weekly" },
      sport:        { label: "رياضة جماعية",              icon: "⚽", perUnit: 7,   type: "weekly" },
    },
    calculate: "احسب سعراتي", breakdown: "تفصيل الحرق",
    bmrLabel: "حرق الجسم الطبيعي (BMR)", bmrDesc: "ما يحرقه جسمك وأنت نايم",
    neatLabel: "حرق الحركة اليومية (NEAT)", neatDesc: "الخطوات والتنقل",
    exerciseLabel: "حرق التمارين", exerciseDesc: "متوسط يومي من برنامجك",
    tefLabel: "حرق الهضم (TEF)", tefDesc: "≈ 10% من الإجمالي",
    totalLabel: "إجمالي الحرق اليومي (TDEE)",
    goalsTable: "السعرات حسب هدفك",
    maintain: "محافظة على الوزن",
    lose025: "نزول 0.25 كغ/أسبوع", lose05: "نزول 0.5 كغ/أسبوع", lose1: "نزول 1 كغ/أسبوع",
    gain025: "زيادة 0.25 كغ/أسبوع", gain05: "زيادة 0.5 كغ/أسبوع",
    lose025i: "نزول 0.5 باوند/أسبوع", lose05i: "نزول 1.1 باوند/أسبوع", lose1i: "نزول 2.2 باوند/أسبوع",
    gain025i: "زيادة 0.5 باوند/أسبوع", gain05i: "زيادة 1.1 باوند/أسبوع",
    macros: "الماكروز الموصى بها", protein: "بروتين", carbs: "كربوهيدرات", fat: "دهون",
    g: "غ", kcal: "سعرة", perWeekCalc: "حرق أسبوعي",
    bbNote: "البودي بيلدنق يحرق أقل من الكارديو لأن الجهد متقطع",
    noActivity: "لم تضف أي نشاط — سيُحسب BMR فقط",
    stepsAvg: "متوسط الخطوات يومياً", stepsDay: "يوم",
    minSession: "دقائق/جلسة", daysWeek: "أيام/أسبوع",
    cancel: "إلغاء", ftHint: "مثال: 5.9 = 5 قدم 9 بوصة",
    langSelect: "اللغة",
  },
  en: {
    title: "Calorie Calculator", subtitle: "Accurate • Detailed • Personalized",
    basics: "Basic Information",
    age: "Age", height: "Height (cm)", weight: "Weight (kg)",
    heightFt: "Height (ft.in)", weightLb: "Weight (lbs)",
    male: "Male", female: "Female",
    unitMetric: "Metric (kg / cm)", unitImperial: "Imperial (lbs / ft)",
    activityBuilder: "Build Your Daily Activity", addActivity: "+ Add Activity",
    activities: {
      steps:        { label: "Daily Steps",                 icon: "👟", perUnit: 45,  type: "daily"  },
      bodybuilding: { label: "Bodybuilding / Calisthenics", icon: "🏋️", perUnit: 5.5, type: "weekly" },
      cardio_run:   { label: "Running",                     icon: "🏃", perUnit: 9,   type: "weekly" },
      cardio_bike:  { label: "Cycling",                     icon: "🚴", perUnit: 7,   type: "weekly" },
      cardio_swim:  { label: "Swimming",                    icon: "🏊", perUnit: 8,   type: "weekly" },
      hiit:         { label: "HIIT / CrossFit",             icon: "⚡", perUnit: 10,  type: "weekly" },
      walk:         { label: "Walking (exercise)",          icon: "🚶", perUnit: 4.5, type: "weekly" },
      sport:        { label: "Team Sport",                  icon: "⚽", perUnit: 7,   type: "weekly" },
    },
    calculate: "Calculate My Calories", breakdown: "Calorie Breakdown",
    bmrLabel: "Basal Metabolic Rate (BMR)", bmrDesc: "Calories burned at complete rest",
    neatLabel: "Daily Movement (NEAT)", neatDesc: "Steps and daily activity",
    exerciseLabel: "Exercise Burn", exerciseDesc: "Daily avg from your weekly routine",
    tefLabel: "Digestion (TEF)", tefDesc: "≈ 10% of total",
    totalLabel: "Total Daily Expenditure (TDEE)",
    goalsTable: "Calories by Goal",
    maintain: "Maintain Weight",
    lose025: "Lose 0.25 kg/week", lose05: "Lose 0.5 kg/week", lose1: "Lose 1 kg/week",
    gain025: "Gain 0.25 kg/week", gain05: "Gain 0.5 kg/week",
    lose025i: "Lose 0.5 lb/week", lose05i: "Lose 1.1 lb/week", lose1i: "Lose 2.2 lb/week",
    gain025i: "Gain 0.5 lb/week", gain05i: "Gain 1.1 lb/week",
    macros: "Recommended Macros", protein: "Protein", carbs: "Carbs", fat: "Fat",
    g: "g", kcal: "kcal", perWeekCalc: "Weekly burn",
    bbNote: "Bodybuilding burns less than cardio — effort is intermittent",
    noActivity: "No activity added — only BMR will be calculated",
    stepsAvg: "Avg. daily steps", stepsDay: "day",
    minSession: "Min/session", daysWeek: "Days/week",
    cancel: "Cancel", ftHint: "e.g. 5.9 = 5 ft 9 in",
    langSelect: "Language",
  },
  es: {
    title: "Calculadora de Calorías", subtitle: "Precisa • Completa • Personalizada",
    basics: "Información Básica",
    age: "Edad", height: "Altura (cm)", weight: "Peso (kg)",
    heightFt: "Altura (pie.pulg)", weightLb: "Peso (lbs)",
    male: "Hombre", female: "Mujer",
    unitMetric: "Métrico (kg / cm)", unitImperial: "Imperial (lbs / pie)",
    activityBuilder: "Crea tu actividad diaria", addActivity: "+ Añadir actividad",
    activities: {
      steps:        { label: "Pasos diarios",              icon: "👟", perUnit: 45,  type: "daily"  },
      bodybuilding: { label: "Musculación / Calistenia",   icon: "🏋️", perUnit: 5.5, type: "weekly" },
      cardio_run:   { label: "Correr",                     icon: "🏃", perUnit: 9,   type: "weekly" },
      cardio_bike:  { label: "Ciclismo",                   icon: "🚴", perUnit: 7,   type: "weekly" },
      cardio_swim:  { label: "Natación",                   icon: "🏊", perUnit: 8,   type: "weekly" },
      hiit:         { label: "HIIT / CrossFit",            icon: "⚡", perUnit: 10,  type: "weekly" },
      walk:         { label: "Caminar (ejercicio)",        icon: "🚶", perUnit: 4.5, type: "weekly" },
      sport:        { label: "Deporte de equipo",          icon: "⚽", perUnit: 7,   type: "weekly" },
    },
    calculate: "Calcular mis calorías", breakdown: "Desglose de quema",
    bmrLabel: "Metabolismo basal (BMR)", bmrDesc: "Calorías quemadas en reposo total",
    neatLabel: "Movimiento diario (NEAT)", neatDesc: "Pasos y actividad diaria",
    exerciseLabel: "Quema por ejercicio", exerciseDesc: "Promedio diario de tu rutina",
    tefLabel: "Digestión (TEF)", tefDesc: "≈ 10% del total",
    totalLabel: "Gasto diario total (TDEE)",
    goalsTable: "Calorías por objetivo",
    maintain: "Mantener peso",
    lose025: "Perder 0.25 kg/semana", lose05: "Perder 0.5 kg/semana", lose1: "Perder 1 kg/semana",
    gain025: "Ganar 0.25 kg/semana", gain05: "Ganar 0.5 kg/semana",
    lose025i: "Perder 0.5 lb/semana", lose05i: "Perder 1.1 lb/semana", lose1i: "Perder 2.2 lb/semana",
    gain025i: "Ganar 0.5 lb/semana", gain05i: "Ganar 1.1 lb/semana",
    macros: "Macros recomendados", protein: "Proteína", carbs: "Carbohidratos", fat: "Grasas",
    g: "g", kcal: "kcal", perWeekCalc: "Quema semanal",
    bbNote: "Musculación quema menos que cardio — esfuerzo intermitente",
    noActivity: "Sin actividad — solo se calculará BMR",
    stepsAvg: "Promedio pasos/día", stepsDay: "día",
    minSession: "Min/sesión", daysWeek: "Días/semana",
    cancel: "Cancelar", ftHint: "ej. 5.9 = 5 pies 9 pulgadas",
    langSelect: "Idioma",
  },
  fr: {
    title: "Calculateur de Calories", subtitle: "Précis • Complet • Personnalisé",
    basics: "Informations de base",
    age: "Âge", height: "Taille (cm)", weight: "Poids (kg)",
    heightFt: "Taille (pi.po)", weightLb: "Poids (lbs)",
    male: "Homme", female: "Femme",
    unitMetric: "Métrique (kg / cm)", unitImperial: "Impérial (lbs / pi)",
    activityBuilder: "Construis ton activité", addActivity: "+ Ajouter activité",
    activities: {
      steps:        { label: "Pas quotidiens",             icon: "👟", perUnit: 45,  type: "daily"  },
      bodybuilding: { label: "Musculation / Callisthénie", icon: "🏋️", perUnit: 5.5, type: "weekly" },
      cardio_run:   { label: "Course à pied",              icon: "🏃", perUnit: 9,   type: "weekly" },
      cardio_bike:  { label: "Vélo",                       icon: "🚴", perUnit: 7,   type: "weekly" },
      cardio_swim:  { label: "Natation",                   icon: "🏊", perUnit: 8,   type: "weekly" },
      hiit:         { label: "HIIT / CrossFit",            icon: "⚡", perUnit: 10,  type: "weekly" },
      walk:         { label: "Marche (exercice)",          icon: "🚶", perUnit: 4.5, type: "weekly" },
      sport:        { label: "Sport collectif",            icon: "⚽", perUnit: 7,   type: "weekly" },
    },
    calculate: "Calculer mes calories", breakdown: "Détail des dépenses",
    bmrLabel: "Métabolisme de base (BMR)", bmrDesc: "Calories brûlées au repos complet",
    neatLabel: "Activité quotidienne (NEAT)", neatDesc: "Pas et mouvements du jour",
    exerciseLabel: "Dépense exercice", exerciseDesc: "Moyenne quotidienne de ta routine",
    tefLabel: "Digestion (TEF)", tefDesc: "≈ 10% du total",
    totalLabel: "Dépense journalière totale (TDEE)",
    goalsTable: "Calories selon objectif",
    maintain: "Maintenir le poids",
    lose025: "Perdre 0,25 kg/sem", lose05: "Perdre 0,5 kg/sem", lose1: "Perdre 1 kg/sem",
    gain025: "Prendre 0,25 kg/sem", gain05: "Prendre 0,5 kg/sem",
    lose025i: "Perdre 0,5 lb/sem", lose05i: "Perdre 1,1 lb/sem", lose1i: "Perdre 2,2 lb/sem",
    gain025i: "Prendre 0,5 lb/sem", gain05i: "Prendre 1,1 lb/sem",
    macros: "Macros recommandés", protein: "Protéines", carbs: "Glucides", fat: "Lipides",
    g: "g", kcal: "kcal", perWeekCalc: "Dépense hebdo",
    bbNote: "La musculation brûle moins que le cardio — effort intermittent",
    noActivity: "Aucune activité — seul le BMR sera calculé",
    stepsAvg: "Moy. pas/jour", stepsDay: "jour",
    minSession: "Min/séance", daysWeek: "Jours/semaine",
    cancel: "Annuler", ftHint: "ex. 5.9 = 5 pieds 9 pouces",
    langSelect: "Langue",
  },
  pt: {
    title: "Calculadora de Calorias", subtitle: "Precisa • Completa • Personalizada",
    basics: "Informações Básicas",
    age: "Idade", height: "Altura (cm)", weight: "Peso (kg)",
    heightFt: "Altura (pé.pol)", weightLb: "Peso (lbs)",
    male: "Homem", female: "Mulher",
    unitMetric: "Métrico (kg / cm)", unitImperial: "Imperial (lbs / pé)",
    activityBuilder: "Monte sua atividade diária", addActivity: "+ Adicionar atividade",
    activities: {
      steps:        { label: "Passos diários",             icon: "👟", perUnit: 45,  type: "daily"  },
      bodybuilding: { label: "Musculação / Calistenia",    icon: "🏋️", perUnit: 5.5, type: "weekly" },
      cardio_run:   { label: "Corrida",                    icon: "🏃", perUnit: 9,   type: "weekly" },
      cardio_bike:  { label: "Ciclismo",                   icon: "🚴", perUnit: 7,   type: "weekly" },
      cardio_swim:  { label: "Natação",                    icon: "🏊", perUnit: 8,   type: "weekly" },
      hiit:         { label: "HIIT / CrossFit",            icon: "⚡", perUnit: 10,  type: "weekly" },
      walk:         { label: "Caminhada (exercício)",      icon: "🚶", perUnit: 4.5, type: "weekly" },
      sport:        { label: "Esporte coletivo",           icon: "⚽", perUnit: 7,   type: "weekly" },
    },
    calculate: "Calcular minhas calorias", breakdown: "Detalhamento da queima",
    bmrLabel: "Taxa Metabólica Basal (BMR)", bmrDesc: "Calorias em repouso total",
    neatLabel: "Movimento diário (NEAT)", neatDesc: "Passos e atividade do dia",
    exerciseLabel: "Queima com exercício", exerciseDesc: "Média diária da sua rotina",
    tefLabel: "Digestão (TEF)", tefDesc: "≈ 10% do total",
    totalLabel: "Gasto diário total (TDEE)",
    goalsTable: "Calorias por objetivo",
    maintain: "Manter peso",
    lose025: "Perder 0,25 kg/semana", lose05: "Perder 0,5 kg/semana", lose1: "Perder 1 kg/semana",
    gain025: "Ganhar 0,25 kg/semana", gain05: "Ganhar 0,5 kg/semana",
    lose025i: "Perder 0,5 lb/semana", lose05i: "Perder 1,1 lb/semana", lose1i: "Perder 2,2 lb/semana",
    gain025i: "Ganhar 0,5 lb/semana", gain05i: "Ganhar 1,1 lb/semana",
    macros: "Macros recomendados", protein: "Proteína", carbs: "Carboidratos", fat: "Gordura",
    g: "g", kcal: "kcal", perWeekCalc: "Queima semanal",
    bbNote: "Musculação queima menos que cardio — esforço intermitente",
    noActivity: "Sem atividade — apenas BMR será calculado",
    stepsAvg: "Média passos/dia", stepsDay: "dia",
    minSession: "Min/sessão", daysWeek: "Dias/semana",
    cancel: "Cancelar", ftHint: "ex. 5.9 = 5 pés 9 polegadas",
    langSelect: "Idioma",
  },
  hi: {
    title: "कैलोरी कैलकुलेटर", subtitle: "सटीक • विस्तृत • व्यक्तिगत",
    basics: "मूलभूत जानकारी",
    age: "उम्र", height: "ऊंचाई (सेमी)", weight: "वजन (किग्रा)",
    heightFt: "ऊंचाई (फुट.इंच)", weightLb: "वजन (पाउंड)",
    male: "पुरुष", female: "महिला",
    unitMetric: "मेट्रिक (किग्रा / सेमी)", unitImperial: "इम्पीरियल (पाउंड / फुट)",
    activityBuilder: "अपनी दैनिक गतिविधि बनाएं", addActivity: "+ गतिविधि जोड़ें",
    activities: {
      steps:        { label: "दैनिक कदम",                icon: "👟", perUnit: 45,  type: "daily"  },
      bodybuilding: { label: "बॉडीबिल्डिंग / कैलिस्थेनिक्स", icon: "🏋️", perUnit: 5.5, type: "weekly" },
      cardio_run:   { label: "दौड़",                      icon: "🏃", perUnit: 9,   type: "weekly" },
      cardio_bike:  { label: "साइकिलिंग",                icon: "🚴", perUnit: 7,   type: "weekly" },
      cardio_swim:  { label: "तैराकी",                   icon: "🏊", perUnit: 8,   type: "weekly" },
      hiit:         { label: "HIIT / CrossFit",           icon: "⚡", perUnit: 10,  type: "weekly" },
      walk:         { label: "पैदल चलना",                icon: "🚶", perUnit: 4.5, type: "weekly" },
      sport:        { label: "टीम स्पोर्ट",              icon: "⚽", perUnit: 7,   type: "weekly" },
    },
    calculate: "कैलोरी कैलकुलेट करें", breakdown: "कैलोरी विवरण",
    bmrLabel: "बेसल मेटाबॉलिक रेट (BMR)", bmrDesc: "पूर्ण आराम में जलती कैलोरी",
    neatLabel: "दैनिक गतिविधि (NEAT)", neatDesc: "कदम और दिनचर्या",
    exerciseLabel: "व्यायाम से कैलोरी", exerciseDesc: "साप्ताहिक रूटीन का दैनिक औसत",
    tefLabel: "पाचन (TEF)", tefDesc: "≈ कुल का 10%",
    totalLabel: "कुल दैनिक खपत (TDEE)",
    goalsTable: "लक्ष्य के अनुसार कैलोरी",
    maintain: "वजन बनाए रखें",
    lose025: "0.25 किग्रा/सप्ताह घटाएं", lose05: "0.5 किग्रा/सप्ताह घटाएं", lose1: "1 किग्रा/सप्ताह घटाएं",
    gain025: "0.25 किग्रा/सप्ताह बढ़ाएं", gain05: "0.5 किग्रा/सप्ताह बढ़ाएं",
    lose025i: "0.5 lb/सप्ताह घटाएं", lose05i: "1.1 lb/सप्ताह घटाएं", lose1i: "2.2 lb/सप्ताह घटाएं",
    gain025i: "0.5 lb/सप्ताह बढ़ाएं", gain05i: "1.1 lb/सप्ताह बढ़ाएं",
    macros: "अनुशंसित मैक्रोज़", protein: "प्रोटीन", carbs: "कार्ब्स", fat: "फैट",
    g: "ग्रा", kcal: "kcal", perWeekCalc: "साप्ताहिक बर्न",
    bbNote: "बॉडीबिल्डिंग कार्डियो से कम जलाती है — रुक-रुककर प्रयास",
    noActivity: "कोई गतिविधि नहीं — केवल BMR की गणना होगी",
    stepsAvg: "औसत दैनिक कदम", stepsDay: "दिन",
    minSession: "मिनट/सेशन", daysWeek: "दिन/सप्ताह",
    cancel: "रद्द करें", ftHint: "जैसे: 5.9 = 5 फुट 9 इंच",
    langSelect: "भाषा",
  },
  zh: {
    title: "卡路里计算器", subtitle: "精准 • 全面 • 个性化",
    basics: "基本信息",
    age: "年龄", height: "身高 (厘米)", weight: "体重 (公斤)",
    heightFt: "身高 (英尺.英寸)", weightLb: "体重 (磅)",
    male: "男", female: "女",
    unitMetric: "公制 (公斤 / 厘米)", unitImperial: "英制 (磅 / 英尺)",
    activityBuilder: "设置每日活动", addActivity: "+ 添加活动",
    activities: {
      steps:        { label: "每日步数",           icon: "👟", perUnit: 45,  type: "daily"  },
      bodybuilding: { label: "健美 / 自重训练",    icon: "🏋️", perUnit: 5.5, type: "weekly" },
      cardio_run:   { label: "跑步",               icon: "🏃", perUnit: 9,   type: "weekly" },
      cardio_bike:  { label: "骑行",               icon: "🚴", perUnit: 7,   type: "weekly" },
      cardio_swim:  { label: "游泳",               icon: "🏊", perUnit: 8,   type: "weekly" },
      hiit:         { label: "HIIT / CrossFit",    icon: "⚡", perUnit: 10,  type: "weekly" },
      walk:         { label: "健步走",             icon: "🚶", perUnit: 4.5, type: "weekly" },
      sport:        { label: "团队运动",           icon: "⚽", perUnit: 7,   type: "weekly" },
    },
    calculate: "计算我的卡路里", breakdown: "消耗明细",
    bmrLabel: "基础代谢率 (BMR)", bmrDesc: "完全静息时消耗的卡路里",
    neatLabel: "日常活动 (NEAT)", neatDesc: "步行和日常移动",
    exerciseLabel: "运动消耗", exerciseDesc: "每周计划的每日平均值",
    tefLabel: "消化产热 (TEF)", tefDesc: "≈ 总量的10%",
    totalLabel: "每日总消耗 (TDEE)",
    goalsTable: "按目标的卡路里",
    maintain: "维持体重",
    lose025: "每周减0.25公斤", lose05: "每周减0.5公斤", lose1: "每周减1公斤",
    gain025: "每周增0.25公斤", gain05: "每周增0.5公斤",
    lose025i: "每周减0.5磅", lose05i: "每周减1.1磅", lose1i: "每周减2.2磅",
    gain025i: "每周增0.5磅", gain05i: "每周增1.1磅",
    macros: "推荐宏量营养素", protein: "蛋白质", carbs: "碳水化合物", fat: "脂肪",
    g: "克", kcal: "千卡", perWeekCalc: "每周消耗",
    bbNote: "健美训练比有氧运动消耗更少热量——间歇性用力",
    noActivity: "未添加活动 — 仅计算BMR",
    stepsAvg: "平均每日步数", stepsDay: "天",
    minSession: "分钟/次", daysWeek: "天/周",
    cancel: "取消", ftHint: "例如：5.9 = 5英尺9英寸",
    langSelect: "语言",
  },
};

// ─── UNIT CONVERSION ──────────────────────────────────────────────────────────
const lbsToKg = lb => lb * 0.453592;
function ftDecimalToCm(ftDecimal) {
  const str = String(ftDecimal);
  const [ftPart, inPart = "0"] = str.split(".");
  const ft = parseInt(ftPart, 10) || 0;
  const inches = parseInt(inPart.padEnd(2, "0").slice(0, 2), 10) || 0;
  return ft * 30.48 + inches * 2.54;
}

// ─── CALC HELPERS ─────────────────────────────────────────────────────────────
function calcBMR(gender, w, h, a) {
  return gender === "male" ? 10*w + 6.25*h - 5*a + 5 : 10*w + 6.25*h - 5*a - 161;
}
function calcNEAT(steps1000) { return steps1000 * 45; }
function calcExerciseBurn(activities, lang) {
  const acts = T[lang].activities;
  let weekly = 0;
  activities.forEach(a => {
    if (a.key === "steps") return;
    const meta = acts[a.key];
    if (!meta) return;
    weekly += meta.perUnit * (a.minutes || 60) * (a.days || 3);
  });
  return weekly / 7;
}
function getMacros(kcal, weight) {
  const protein = Math.round(weight * 1.8);
  const fat     = Math.round(weight * 0.7);
  const carbs   = Math.round(Math.max(0, kcal - protein*4 - fat*9) / 4);
  return { protein, fat, carbs };
}

const GOAL_ADJUSTMENTS = [
  { key: "lose1",   delta: -1100 },
  { key: "lose05",  delta: -550  },
  { key: "lose025", delta: -275  },
  { key: "maintain",delta: 0    },
  { key: "gain025", delta: 275  },
  { key: "gain05",  delta: 550  },
];
const GOAL_COLORS = {
  lose1: "#ef4444", lose05: "#f87171", lose025: "#fca5a5",
  maintain: "#38bdf8", gain025: "#86efac", gain05: "#4ade80",
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang]     = useState("ar");
  const [showLangs, setShowLangs] = useState(false);
  const t   = T[lang];
  const meta = LANGS.find(l => l.code === lang);
  const isRtl = meta?.rtl || false;

  const [form, setForm]     = useState({ age: "", gender: "male", height: "", weight: "" });
  const [units, setUnits]   = useState("metric");
  const [userActivities, setUserActivities] = useState([
    { id: 1, key: "steps",        value: 10, days: null, minutes: null },
    { id: 2, key: "bodybuilding", value: null, days: 4, minutes: 60   },
    { id: 3, key: "cardio_run",   value: null, days: 3, minutes: 30   },
  ]);
  const [result, setResult]       = useState(null);
  const [selectedGoal, setGoal]   = useState("maintain");
  const [showAdd, setShowAdd]     = useState(false);

  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const addActivity = (key) => {
    const m = T[lang].activities[key];
    setUserActivities(a => [...a, { id: Date.now(), key, value: m.type==="daily"?8:null, days: m.type==="weekly"?3:null, minutes: m.type==="weekly"?45:null }]);
    setShowAdd(false);
  };
  const removeActivity = id => setUserActivities(a => a.filter(x => x.id !== id));
  const updateActivity = (id, field, val) => setUserActivities(a => a.map(x => x.id===id ? {...x,[field]:val} : x));

  const calculate = () => {
    const { age, gender } = form;
    if (!age) return;
    let weightKg, heightCm;
    if (units === "imperial") {
      if (!form.weight || !form.height) return;
      weightKg = lbsToKg(+form.weight);
      heightCm = ftDecimalToCm(form.height);
    } else {
      if (!form.height || !form.weight) return;
      weightKg = +form.weight; heightCm = +form.height;
    }
    const bmr = calcBMR(gender, weightKg, heightCm, +age);
    const stepsEntry = userActivities.find(a => a.key === "steps");
    const neat = stepsEntry ? calcNEAT(+stepsEntry.value || 0) : 0;
    const exercise = calcExerciseBurn(userActivities, lang);
    const subtotal = bmr + neat + exercise;
    const tef = subtotal * 0.10;
    setResult({ bmr: Math.round(bmr), neat: Math.round(neat), exercise: Math.round(exercise), tef: Math.round(tef), tdee: Math.round(subtotal+tef), weight: weightKg });
  };

  // ─ Styles ───────────────────────────────────────────────────────────────────
  const card = { background: "#0f172a", borderRadius: 20, border: "1px solid #1e293b", padding: 22, marginTop: 16 };
  const inp = { background: "#0a0f1e", border: "1.5px solid #1e293b", borderRadius: 10, padding: "10px 12px", color: "#f1f5f9", fontSize: 14, outline: "none", fontFamily: "inherit", width: "100%", boxSizing: "border-box" };
  const lbl = { fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 5, display: "block", letterSpacing: 1, textTransform: "uppercase" };
  const togBtn = (active, color="#38bdf8") => ({ flex:1, padding:"9px 6px", borderRadius:9, border:"none", cursor:"pointer", fontWeight:700, fontSize:13, fontFamily:"inherit", transition:"all 0.2s", background: active ? color : "#1e293b", color: active ? "#0a0f1e" : "#475569" });

  const googleFonts = "https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&family=DM+Sans:wght@400;700;900&family=Noto+Sans+Devanagari:wght@400;700;900&family=Noto+Sans+SC:wght@400;700;900&display=swap";

  return (
    <div dir={isRtl ? "rtl" : "ltr"} style={{ minHeight:"100vh", background:"#070d1a", fontFamily: meta?.font || "'DM Sans',sans-serif", paddingBottom:60 }}>
      <link href={googleFonts} rel="stylesheet" />

      {/* ── HEADER ── */}
      <div style={{ background:"linear-gradient(160deg,#0f172a,#131f35)", padding:"36px 20px 28px", textAlign:"center", position:"relative", borderBottom:"1px solid #1e293b" }}>
        <div style={{ position:"absolute", top:-80, left:"50%", transform:"translateX(-50%)", width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle,rgba(56,189,248,.1) 0%,transparent 70%)", pointerEvents:"none" }} />

        {/* Lang picker */}
        <div style={{ position:"absolute", top:16, [isRtl?"left":"right"]:16 }}>
          <button onClick={() => setShowLangs(s => !s)} style={{ background:"#1e293b", border:"1px solid #334155", color:"#94a3b8", borderRadius:10, padding:"6px 12px", cursor:"pointer", fontSize:13, fontWeight:700, fontFamily:"inherit", display:"flex", alignItems:"center", gap:6 }}>
            {meta?.flag} {meta?.label} ▾
          </button>
          {showLangs && (
            <div style={{ position:"absolute", [isRtl?"left":"right"]:0, top:40, background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:8, zIndex:100, minWidth:160, boxShadow:"0 8px 32px rgba(0,0,0,.5)" }}>
              {LANGS.map(l => (
                <button key={l.code} onClick={() => { setLang(l.code); setShowLangs(false); setResult(null); }} style={{ display:"flex", alignItems:"center", gap:10, width:"100%", padding:"9px 12px", borderRadius:9, border:"none", cursor:"pointer", fontFamily:"inherit", fontWeight: lang===l.code ? 700 : 400, fontSize:14, background: lang===l.code ? "rgba(56,189,248,.1)" : "transparent", color: lang===l.code ? "#38bdf8" : "#94a3b8", transition:"all 0.15s" }}>
                  <span>{l.flag}</span><span>{l.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ fontSize:36, marginBottom:6 }}>🔥</div>
        <h1 style={{ margin:0, fontSize:26, fontWeight:900, color:"#f1f5f9" }}>{t.title}</h1>
        <p style={{ margin:"4px 0 0", color:"#475569", fontSize:13 }}>{t.subtitle}</p>
      </div>

      <div style={{ maxWidth:500, margin:"0 auto", padding:"0 16px" }}>

        {/* ── BASICS ── */}
        <div style={card}>
          <SectionTitle>{t.basics}</SectionTitle>

          {/* Unit toggle */}
          <div style={{ display:"flex", gap:8, marginBottom:16 }}>
            <button onClick={() => setUnits("metric")} style={{ flex:1, padding:"9px 6px", borderRadius:10, border:"1.5px solid", cursor:"pointer", fontWeight:700, fontSize:12, fontFamily:"inherit", borderColor: units==="metric" ? "#38bdf8" : "#1e293b", background: units==="metric" ? "rgba(56,189,248,0.1)" : "#1e293b", color: units==="metric" ? "#38bdf8" : "#475569" }}>⚖️ {t.unitMetric}</button>
            <button onClick={() => setUnits("imperial")} style={{ flex:1, padding:"9px 6px", borderRadius:10, border:"1.5px solid", cursor:"pointer", fontWeight:700, fontSize:12, fontFamily:"inherit", borderColor: units==="imperial" ? "#f87171" : "#1e293b", background: units==="imperial" ? "rgba(248,113,113,0.1)" : "#1e293b", color: units==="imperial" ? "#f87171" : "#475569" }}>📏 {t.unitImperial}</button>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
            <div><label style={lbl}>{t.age}</label><input type="number" placeholder="25" style={inp} value={form.age} onChange={e => setF("age",e.target.value)} /></div>
            <div>
              <label style={lbl}>{isRtl ? "الجنس" : (lang==="zh" ? "性别" : lang==="hi" ? "लिंग" : "Gender")}</label>
              <div style={{ display:"flex", gap:6 }}>
                <button style={togBtn(form.gender==="male")} onClick={() => setF("gender","male")}>{t.male}</button>
                <button style={togBtn(form.gender==="female")} onClick={() => setF("gender","female")}>{t.female}</button>
              </div>
            </div>
          </div>

          {units === "metric" ? (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div><label style={lbl}>{t.height}</label><input type="number" placeholder="175" style={inp} value={form.height} onChange={e => setF("height",e.target.value)} /></div>
              <div><label style={lbl}>{t.weight}</label><input type="number" placeholder="75" style={inp} value={form.weight} onChange={e => setF("weight",e.target.value)} /></div>
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div>
                <label style={lbl}>{t.heightFt}</label>
                <input type="number" placeholder="5.9" step="0.1" style={inp} value={form.height} onChange={e => setF("height",e.target.value)} />
                <div style={{ fontSize:11, color:"#334155", marginTop:4 }}>{t.ftHint}</div>
              </div>
              <div><label style={lbl}>{t.weightLb}</label><input type="number" placeholder="165" style={inp} value={form.weight} onChange={e => setF("weight",e.target.value)} /></div>
            </div>
          )}
        </div>

        {/* ── ACTIVITY BUILDER ── */}
        <div style={card}>
          <SectionTitle>{t.activityBuilder}</SectionTitle>

          {userActivities.length === 0 && <div style={{ textAlign:"center", color:"#334155", fontSize:13, padding:"12px 0" }}>{t.noActivity}</div>}

          {userActivities.map(a => {
            const actMeta = T[lang].activities[a.key];
            if (!actMeta) return null;
            const isSteps = a.key === "steps";
            const isWeekly = actMeta.type === "weekly";
            return (
              <div key={a.id} style={{ background:"#0a0f1e", borderRadius:14, padding:"14px 16px", marginBottom:10, border:"1px solid #1e293b" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: isSteps ? 10 : 12 }}>
                  <span style={{ fontWeight:700, fontSize:15, color:"#e2e8f0" }}>{actMeta.icon} {actMeta.label}</span>
                  <button onClick={() => removeActivity(a.id)} style={{ background:"none", border:"none", color:"#334155", cursor:"pointer", fontSize:18, lineHeight:1 }}>×</button>
                </div>

                {isSteps ? (
                  <div>
                    <label style={lbl}>{t.stepsAvg}</label>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <input type="range" min={1} max={20} step={0.5} value={a.value||8} onChange={e => updateActivity(a.id,"value",+e.target.value)} style={{ flex:1, accentColor:"#38bdf8" }} />
                      <span style={{ color:"#38bdf8", fontWeight:900, minWidth:50, fontSize:16 }}>{(a.value||8).toLocaleString()}k</span>
                    </div>
                    <div style={{ fontSize:12, color:"#334155", marginTop:4 }}>≈ {Math.round((a.value||8)*45)} {t.kcal}/{t.stepsDay} (NEAT)</div>
                  </div>
                ) : (
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                    <div>
                      <label style={lbl}>{t.daysWeek}</label>
                      <div style={{ display:"flex", gap:4 }}>
                        {[1,2,3,4,5,6,7].map(d => (
                          <button key={d} onClick={() => updateActivity(a.id,"days",d)} style={{ flex:1, padding:"6px 0", borderRadius:7, border:"none", cursor:"pointer", background: a.days===d ? "#38bdf8" : "#1e293b", color: a.days===d ? "#0a0f1e" : "#475569", fontWeight:700, fontSize:12, fontFamily:"inherit" }}>{d}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={lbl}>{t.minSession}</label>
                      <input type="number" placeholder="60" value={a.minutes||""} onChange={e => updateActivity(a.id,"minutes",+e.target.value)} style={{ ...inp, padding:"8px 10px" }} />
                    </div>
                  </div>
                )}

                {a.key === "bodybuilding" && (
                  <div style={{ marginTop:8, background:"rgba(251,191,36,.07)", border:"1px solid rgba(251,191,36,.2)", borderRadius:8, padding:"6px 10px", fontSize:11, color:"#fbbf24" }}>
                    💪 {t.bbNote}
                  </div>
                )}

                {isWeekly && a.days && a.minutes && (
                  <div style={{ marginTop:8, fontSize:12, color:"#334155" }}>
                    {t.perWeekCalc}: ≈ {Math.round(actMeta.perUnit*(a.minutes||60)*(a.days||3))} {t.kcal} → ≈ {Math.round(actMeta.perUnit*(a.minutes||60)*(a.days||3)/7)} {t.kcal}/{t.stepsDay}
                  </div>
                )}
              </div>
            );
          })}

          {!showAdd ? (
            <button onClick={() => setShowAdd(true)} style={{ width:"100%", padding:"11px", borderRadius:12, border:"1.5px dashed #1e293b", background:"transparent", color:"#38bdf8", cursor:"pointer", fontWeight:700, fontSize:14, fontFamily:"inherit", marginTop:4 }}>{t.addActivity}</button>
          ) : (
            <div style={{ background:"#0a0f1e", borderRadius:14, padding:14, border:"1px solid #1e293b", marginTop:8 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                {Object.entries(T[lang].activities).map(([key, m]) => (
                  <button key={key} onClick={() => addActivity(key)} style={{ padding:"10px 8px", borderRadius:10, border:"1px solid #1e293b", background:"#131f35", color:"#94a3b8", cursor:"pointer", fontWeight:700, fontSize:13, fontFamily:"inherit", textAlign:"center" }}>{m.icon} {m.label}</button>
                ))}
              </div>
              <button onClick={() => setShowAdd(false)} style={{ marginTop:8, width:"100%", padding:"8px", borderRadius:10, border:"none", background:"#1e293b", color:"#475569", cursor:"pointer", fontFamily:"inherit", fontSize:13 }}>{t.cancel}</button>
            </div>
          )}
        </div>

        {/* ── CALCULATE BUTTON ── */}
        <button onClick={calculate} style={{ width:"100%", padding:"16px", marginTop:16, borderRadius:14, border:"none", background:"linear-gradient(135deg,#38bdf8,#818cf8)", color:"#070d1a", fontWeight:900, fontSize:17, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 4px 24px rgba(56,189,248,.25)" }}>{t.calculate} →</button>

        {/* ── RESULTS ── */}
        {result && (
          <>
            {/* Breakdown */}
            <div style={{ ...card, marginTop:20 }}>
              <SectionTitle>{t.breakdown}</SectionTitle>
              {[
                { label:t.bmrLabel,      desc:t.bmrDesc,      val:result.bmr,      color:"#818cf8", icon:"🛌" },
                { label:t.neatLabel,     desc:t.neatDesc,     val:result.neat,     color:"#38bdf8", icon:"👟" },
                { label:t.exerciseLabel, desc:t.exerciseDesc, val:result.exercise, color:"#4ade80", icon:"💪" },
                { label:t.tefLabel,      desc:t.tefDesc,      val:result.tef,      color:"#fbbf24", icon:"🍽️" },
              ].map((row, i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"13px 0", borderBottom: i<3 ? "1px solid #0f172a" : "none" }}>
                  <div>
                    <div style={{ fontWeight:700, color:"#e2e8f0", fontSize:14 }}>{row.icon} {row.label}</div>
                    <div style={{ fontSize:12, color:"#334155", marginTop:2 }}>{row.desc}</div>
                  </div>
                  <div style={{ fontWeight:900, fontSize:20, color:row.color, minWidth:70, textAlign: isRtl ? "left" : "right" }}>{row.val.toLocaleString()}</div>
                </div>
              ))}
              <div style={{ background:"linear-gradient(135deg,rgba(56,189,248,.1),rgba(129,140,248,.1))", border:"1px solid rgba(56,189,248,.2)", borderRadius:14, padding:"18px 20px", marginTop:16, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ fontWeight:900, color:"#f1f5f9", fontSize:15 }}>{t.totalLabel}</div>
                <div style={{ fontWeight:900, color:"#38bdf8", fontSize:32 }}>{result.tdee.toLocaleString()}</div>
              </div>
            </div>

            {/* Goals Table */}
            <div style={card}>
              <SectionTitle>{t.goalsTable}</SectionTitle>
              {GOAL_ADJUSTMENTS.map(({ key, delta }) => {
                const kcal = result.tdee + delta;
                const isSel = selectedGoal === key;
                const goalLabel = key === "maintain"
                  ? t.maintain
                  : units === "imperial" ? (t[`${key}i`] || t[key]) : t[key];
                return (
                  <div key={key} onClick={() => setGoal(key)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 14px", borderRadius:12, marginBottom:6, cursor:"pointer", background: isSel ? `${GOAL_COLORS[key]}18` : "#0a0f1e", border:`1.5px solid ${isSel ? GOAL_COLORS[key] : "#1e293b"}`, transition:"all 0.2s" }}>
                    <div>
                      <div style={{ fontWeight:700, color: isSel ? GOAL_COLORS[key] : "#94a3b8", fontSize:14 }}>{goalLabel}</div>
                      {delta !== 0 && <div style={{ fontSize:11, color:"#334155", marginTop:2 }}>{delta>0?"+":""}{delta} {t.kcal}</div>}
                    </div>
                    <div style={{ fontWeight:900, fontSize:22, color: isSel ? GOAL_COLORS[key] : "#475569" }}>
                      {kcal.toLocaleString()}<span style={{ fontSize:11, fontWeight:400, color:"#334155", margin:"0 4px" }}>{t.kcal}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Macros */}
            <div style={card}>
              <SectionTitle>{t.macros} — {t[selectedGoal]}</SectionTitle>
              {(() => {
                const kcal = result.tdee + (GOAL_ADJUSTMENTS.find(g => g.key===selectedGoal)?.delta || 0);
                const m = getMacros(kcal, result.weight);
                const total = m.protein*4 + m.carbs*4 + m.fat*9;
                return [
                  { label:t.protein, val:m.protein, kcal:m.protein*4, color:"#f87171", pct:Math.round((m.protein*4/total)*100) },
                  { label:t.carbs,   val:m.carbs,   kcal:m.carbs*4,   color:"#38bdf8", pct:Math.round((m.carbs*4/total)*100)   },
                  { label:t.fat,     val:m.fat,     kcal:m.fat*9,     color:"#fbbf24", pct:Math.round((m.fat*9/total)*100)     },
                ].map((macro, i) => (
                  <div key={i} style={{ marginBottom:16 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                      <span style={{ fontWeight:700, color:macro.color, fontSize:14 }}>{macro.label}</span>
                      <span style={{ color:"#475569", fontSize:13 }}>{macro.val}{t.g} · {macro.kcal} {t.kcal}</span>
                    </div>
                    <div style={{ background:"#1e293b", borderRadius:8, height:8 }}>
                      <div style={{ width:`${macro.pct}%`, height:"100%", background:macro.color, borderRadius:8, transition:"width 1s" }} />
                    </div>
                  </div>
                ));
              })()}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return <div style={{ fontSize:13, fontWeight:900, color:"#38bdf8", marginBottom:14, letterSpacing:1, textTransform:"uppercase" }}>{children}</div>;
}
