const servicesData = [
  {
    id: 1,
    title: "Strength Training",
    category: "BODY BUILDING",
    description: "Professional weightlifting and resistance training programs designed to build functional muscle mass and peak physical power.",
    icon: "strength"
  },
  {
    id: 2,
    title: "Combat Fitness",
    category: "MARTIAL ARTS",
    description: "High-intensity MMA and boxing conditioning that builds explosive speed, mental resilience, and superior reflexes.",
    icon: "combat"
  },
  {
    id: 3,
    title: "HIIT & Cardio",
    category: "ENDURANCE",
    description: "Heart-pounding interval sessions focused on maximum calorie burn, respiratory endurance, and metabolic health.",
    icon: "hiit"
  },
  {
    id: 4,
    title: "Personal Training",
    category: "ELITE COACHING",
    description: "One-on-one sessions tailored to your exact physiology and goals, ensuring 100% focus on your long-term success.",
    icon: "personal"
  },
  {
    id: 5,
    title: "Yoga & Recovery",
    category: "WELLNESS",
    description: "Restore balance with guided mobility and yoga sessions designed to reduce inflammation and improve flexibility.",
    icon: "wellness"
  },
  {
    id: 6,
    title: "Nutrition Plans",
    category: "DIET & HEALTH",
    description: "Science-based nutrition strategies and meal planning to fuel your training and accelerate your physical transformation.",
    icon: "nutrition"
  }
];

export const fetchServices = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(servicesData);
    }, 1500);
  });
};
