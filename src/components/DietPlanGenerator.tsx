import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Calendar,
  Plus,
  Clock,
  Users,
  ChefHat,
  Leaf,
  AlertCircle,
  Star,
  Download,
  Share,
  Filter,
  Sparkles
} from 'lucide-react';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

const sampleMealPlan = {
  'Monday': {
    'Breakfast': {
      name: "Warm Oatmeal with Ghee",
      calories: 320,
      cookTime: "15 minutes",
      dosha: "Vata",
      ingredients: ["Oats", "Ghee", "Cinnamon", "Almonds", "Dates"],
      benefits: "Nourishing and grounding for Vata",
      ayurvedicNote: "Warm morning meals pacify Vata dosha"
    },
    'Lunch': {
      name: "Quinoa Khichdi with Vegetables",
      calories: 450,
      cookTime: "30 minutes",
      dosha: "Tridoshic",
      ingredients: ["Quinoa", "Mung dal", "Cumin", "Turmeric", "Mixed vegetables"],
      benefits: "Balanced and easy to digest",
      ayurvedicNote: "Lunch should be the heaviest meal of the day"
    },
    'Dinner': {
      name: "Steamed Vegetables with Basmati Rice",
      calories: 380,
      cookTime: "25 minutes",
      dosha: "Kapha",
      ingredients: ["Basmati rice", "Seasonal vegetables", "Ginger", "Black pepper"],
      benefits: "Light and warming",
      ayurvedicNote: "Dinner should be light and easily digestible"
    },
    'Snacks': {
      name: "Herbal Tea with Dates",
      calories: 120,
      cookTime: "5 minutes",
      dosha: "Vata",
      ingredients: ["Chamomile tea", "Dates", "Cardamom"],
      benefits: "Calming and sweet",
      ayurvedicNote: "Evening tea aids digestion"
    }
  },
  'Tuesday': {
    'Breakfast': {
      name: "Fresh Fruit Bowl with Yogurt",
      calories: 280,
      cookTime: "10 minutes",
      dosha: "Pitta",
      ingredients: ["Seasonal fruits", "Coconut yogurt", "Mint", "Rose water"],
      benefits: "Cooling and refreshing",
      ayurvedicNote: "Cool foods are excellent for Pitta"
    },
    'Lunch': {
      name: "Coconut Rice with Dal",
      calories: 420,
      cookTime: "35 minutes",
      dosha: "Pitta",
      ingredients: ["Coconut rice", "Toor dal", "Curry leaves", "Coconut"],
      benefits: "Cooling and satisfying",
      ayurvedicNote: "Coconut pacifies Pitta dosha"
    },
    'Dinner': {
      name: "Millet Upma with Vegetables",
      calories: 350,
      cookTime: "20 minutes",
      dosha: "Kapha",
      ingredients: ["Millet", "Mixed vegetables", "Mustard seeds", "Green chilies"],
      benefits: "Light and energizing",
      ayurvedicNote: "Millet reduces Kapha dosha"
    },
    'Snacks': {
      name: "Coconut Water with Mint",
      calories: 80,
      cookTime: "2 minutes",
      dosha: "Pitta",
      ingredients: ["Coconut water", "Fresh mint", "Lime"],
      benefits: "Hydrating and cooling",
      ayurvedicNote: "Coconut water is excellent in hot weather"
    }
  },
  'Wednesday': {
    'Breakfast': {
      name: "Spiced Chia Pudding",
      calories: 300,
      cookTime: "5 minutes",
      dosha: "Vata",
      ingredients: ["Chia seeds", "Almond milk", "Cardamom", "Honey", "Pistachios"],
      benefits: "Omega-3 rich and grounding",
      ayurvedicNote: "Overnight soaking makes it easier to digest"
    },
    'Lunch': {
      name: "Vegetable Curry with Rice",
      calories: 430,
      cookTime: "40 minutes",
      dosha: "Tridoshic",
      ingredients: ["Mixed vegetables", "Coconut milk", "Spices", "Basmati rice"],
      benefits: "Warming and nourishing",
      ayurvedicNote: "Spices aid digestion and absorption"
    },
    'Dinner': {
      name: "Moong Dal Soup",
      calories: 250,
      cookTime: "25 minutes",
      dosha: "Tridoshic",
      ingredients: ["Yellow moong dal", "Ginger", "Turmeric", "Cilantro"],
      benefits: "Light and protein-rich",
      ayurvedicNote: "Perfect for evening detox"
    },
    'Snacks': {
      name: "Roasted Almonds with Raisins",
      calories: 150,
      cookTime: "10 minutes",
      dosha: "Vata",
      ingredients: ["Almonds", "Raisins", "Ghee", "Rock salt"],
      benefits: "Energy boosting",
      ayurvedicNote: "Soaked almonds are easier to digest"
    }
  },
  'Thursday': {
    'Breakfast': {
      name: "Vegetable Poha",
      calories: 310,
      cookTime: "20 minutes",
      dosha: "Kapha",
      ingredients: ["Poha", "Mixed vegetables", "Mustard seeds", "Curry leaves"],
      benefits: "Light and energizing",
      ayurvedicNote: "Good for reducing morning sluggishness"
    },
    'Lunch': {
      name: "Chickpea Curry with Bread",
      calories: 480,
      cookTime: "45 minutes",
      dosha: "Pitta",
      ingredients: ["Chickpeas", "Tomatoes", "Cooling spices", "Whole wheat bread"],
      benefits: "Protein-rich and satisfying",
      ayurvedicNote: "Chickpeas provide sustained energy"
    },
    'Dinner': {
      name: "Vegetable Soup with Quinoa",
      calories: 290,
      cookTime: "30 minutes",
      dosha: "Tridoshic",
      ingredients: ["Seasonal vegetables", "Quinoa", "Herbs", "Vegetable broth"],
      benefits: "Light and nutrient-dense",
      ayurvedicNote: "Soups are easier on evening digestion"
    },
    'Snacks': {
      name: "Cucumber Mint Water",
      calories: 25,
      cookTime: "5 minutes",
      dosha: "Pitta",
      ingredients: ["Cucumber", "Mint", "Lemon", "Water"],
      benefits: "Hydrating and cooling",
      ayurvedicNote: "Helps balance body temperature"
    }
  },
  'Friday': {
    'Breakfast': {
      name: "Banana Pancakes",
      calories: 340,
      cookTime: "15 minutes",
      dosha: "Vata",
      ingredients: ["Banana", "Oat flour", "Cinnamon", "Ghee", "Maple syrup"],
      benefits: "Sweet and grounding",
      ayurvedicNote: "Natural sweetness satisfies Vata"
    },
    'Lunch': {
      name: "Palak Dal with Rice",
      calories: 410,
      cookTime: "35 minutes",
      dosha: "Pitta",
      ingredients: ["Spinach", "Moong dal", "Basmati rice", "Cooling spices"],
      benefits: "Iron-rich and cooling",
      ayurvedicNote: "Spinach pacifies excess heat"
    },
    'Dinner': {
      name: "Zucchini Noodles with Pesto",
      calories: 270,
      cookTime: "15 minutes",
      dosha: "Kapha",
      ingredients: ["Zucchini", "Basil pesto", "Pine nuts", "Olive oil"],
      benefits: "Light and flavorful",
      ayurvedicNote: "Raw foods stimulate metabolism"
    },
    'Snacks': {
      name: "Herbal Golden Milk",
      calories: 140,
      cookTime: "10 minutes",
      dosha: "Vata",
      ingredients: ["Turmeric", "Warm milk", "Honey", "Ginger", "Black pepper"],
      benefits: "Anti-inflammatory and calming",
      ayurvedicNote: "Perfect for evening relaxation"
    }
  },
  'Saturday': {
    'Breakfast': {
      name: "Smoothie Bowl",
      calories: 290,
      cookTime: "10 minutes",
      dosha: "Pitta",
      ingredients: ["Mango", "Coconut milk", "Chia seeds", "Berries", "Coconut flakes"],
      benefits: "Cooling and antioxidant-rich",
      ayurvedicNote: "Cold foods balance Pitta in warm weather"
    },
    'Lunch': {
      name: "Stuffed Bell Peppers",
      calories: 390,
      cookTime: "50 minutes",
      dosha: "Tridoshic",
      ingredients: ["Bell peppers", "Quinoa", "Vegetables", "Herbs", "Cheese"],
      benefits: "Colorful and nutritious",
      ayurvedicNote: "Different colors provide varied nutrients"
    },
    'Dinner': {
      name: "Cauliflower Rice Stir-fry",
      calories: 220,
      cookTime: "20 minutes",
      dosha: "Kapha",
      ingredients: ["Cauliflower", "Mixed vegetables", "Ginger", "Soy sauce"],
      benefits: "Low-carb and energizing",
      ayurvedicNote: "Light dinner supports night-time detox"
    },
    'Snacks': {
      name: "Trail Mix",
      calories: 180,
      cookTime: "5 minutes",
      dosha: "Vata",
      ingredients: ["Nuts", "Dried fruits", "Seeds", "Dark chocolate"],
      benefits: "Energy sustaining",
      ayurvedicNote: "Good for on-the-go nourishment"
    }
  },
  'Sunday': {
    'Breakfast': {
      name: "Weekend Pancakes with Fruit",
      calories: 360,
      cookTime: "20 minutes",
      dosha: "Vata",
      ingredients: ["Whole wheat flour", "Fresh fruits", "Ghee", "Honey", "Nuts"],
      benefits: "Indulgent yet nourishing",
      ayurvedicNote: "Weekend treats in moderation are acceptable"
    },
    'Lunch': {
      name: "Mixed Vegetable Biryani",
      calories: 470,
      cookTime: "60 minutes",
      dosha: "Tridoshic",
      ingredients: ["Basmati rice", "Mixed vegetables", "Aromatic spices", "Saffron"],
      benefits: "Festive and complete meal",
      ayurvedicNote: "Sunday meals can be more elaborate"
    },
    'Dinner': {
      name: "Simple Khichdi",
      calories: 310,
      cookTime: "25 minutes",
      dosha: "Tridoshic",
      ingredients: ["Rice", "Moong dal", "Ghee", "Cumin", "Salt"],
      benefits: "Comforting and easy to digest",
      ayurvedicNote: "Perfect for meal prep and detox"
    },
    'Snacks': {
      name: "Herbal Tea with Homemade Cookies",
      calories: 160,
      cookTime: "15 minutes",
      dosha: "Vata",
      ingredients: ["Herbal tea", "Oat cookies", "Jaggery", "Cardamom"],
      benefits: "Comfort and satisfaction",
      ayurvedicNote: "Sunday treats can include healthy indulgences"
    }
  }
};

const allergyOptions = [
  'Gluten Free',
  'Dairy Free',
  'Nut Free',
  'Soy Free',
  'Egg Free',
  'Low Sodium'
];

const dietTypes = [
  'Vegetarian',
  'Vegan',
  'Lacto-Vegetarian',
  'Sattvic',
  'Raw Food'
];

const doshaOptions = ['Vata', 'Pitta', 'Kapha', 'Vata-Pitta', 'Pitta-Kapha', 'Vata-Kapha'];

export function DietPlanGenerator() {
  const [selectedPatient, setSelectedPatient] = useState('sarah-johnson');
  const [selectedDosha, setSelectedDosha] = useState('Vata-Pitta');
  const [selectedDietType, setSelectedDietType] = useState('Vegetarian');
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [maxCookTime, setMaxCookTime] = useState('30');
  const [activeDay, setActiveDay] = useState('Monday');

  const handleAllergyChange = (allergy: string, checked: boolean) => {
    if (checked) {
      setSelectedAllergies([...selectedAllergies, allergy]);
    } else {
      setSelectedAllergies(selectedAllergies.filter(a => a !== allergy));
    }
  };

  const currentDayMeals = sampleMealPlan[activeDay as keyof typeof sampleMealPlan] || {};

  const totalCalories = currentDayMeals && Object.keys(currentDayMeals).length > 0 
    ? Object.values(currentDayMeals).reduce((total, meal) => total + meal.calories, 0)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="animate-fade-in-up">
          <h1 className="text-2xl text-[#9E7E3D] mb-2 font-semibold flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-[#F5C24D]" />
            Diet Plan Generator
          </h1>
          <p className="text-[#4C7A5A]/80">Create personalized 7-day Ayurvedic meal plans for your patients.</p>
        </div>
        <div className="flex gap-3 animate-slide-in-right">
          <Button className="btn-rustic-outline">
            <Download className="w-4 h-4 mr-2" />
            Download Plan
          </Button>
          <Button className="btn-rustic">
            <Plus className="w-4 h-4 mr-2" />
            Generate New Plan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Panel */}
        <Card className="card-rustic animate-slide-in-left">
          <CardHeader>
            <CardTitle className="text-[#9E7E3D] flex items-center">
              <Filter className="w-5 h-5 mr-2 text-[#F5C24D]" />
              Plan Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-[#4C7A5A]/70">Patient</label>
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger className="border-[#9E7E3D]/20 bg-white transition-all duration-300 hover:border-[#F5C24D]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                  <SelectItem value="michael-chen">Michael Chen</SelectItem>
                  <SelectItem value="emma-davis">Emma Davis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-[#4C7A5A]/70">Primary Dosha</label>
              <Select value={selectedDosha} onValueChange={setSelectedDosha}>
                <SelectTrigger className="border-[#9E7E3D]/20 bg-white transition-all duration-300 hover:border-[#F5C24D]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {doshaOptions.map(dosha => (
                    <SelectItem key={dosha} value={dosha}>
                      {dosha}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-[#4C7A5A]/70">Diet Type</label>
              <Select value={selectedDietType} onValueChange={setSelectedDietType}>
                <SelectTrigger className="border-[#9E7E3D]/20 bg-white transition-all duration-300 hover:border-[#F5C24D]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dietTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-[#4C7A5A]/70">Max Cooking Time</label>
              <Select value={maxCookTime} onValueChange={setMaxCookTime}>
                <SelectTrigger className="border-[#9E7E3D]/20 bg-white transition-all duration-300 hover:border-[#F5C24D]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm text-[#4C7A5A]/70">Dietary Restrictions</label>
              {allergyOptions.map((allergy) => (
                <div key={allergy} className="flex items-center space-x-2">
                  <Checkbox
                    id={allergy}
                    checked={selectedAllergies.includes(allergy)}
                    onCheckedChange={(checked) => handleAllergyChange(allergy, checked as boolean)}
                    className="border-[#9E7E3D]/30 data-[state=checked]:bg-[#9E7E3D] data-[state=checked]:border-[#9E7E3D]"
                  />
                  <label htmlFor={allergy} className="text-sm text-[#9E7E3D] cursor-pointer">{allergy}</label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Meal Plan Display */}
        <div className="lg:col-span-3 space-y-6">
          {/* Weekly Overview */}
          <Card className="card-rustic animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-[#9E7E3D] flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-[#F5C24D]" />
                  7-Day Meal Plan
                </div>
                <Badge className="bg-gradient-to-r from-[#F5C24D]/20 to-[#4C7A5A]/20 text-[#9E7E3D] border-[#9E7E3D]/20">
                  {totalCalories} calories/day
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {weekDays.map((day) => (
                  <Button
                    key={day}
                    variant={activeDay === day ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveDay(day)}
                    className={`min-w-24 transition-all duration-300 ${
                      activeDay === day 
                        ? 'btn-rustic transform scale-105' 
                        : 'btn-rustic-outline hover:scale-105'
                    }`}
                  >
                    {day.slice(0, 3)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Daily Meals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mealTypes.map((mealType, index) => {
              const meal = currentDayMeals[mealType as keyof typeof currentDayMeals];
              
              if (!meal) {
                return (
                  <Card key={mealType} className="card-rustic animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-6 text-center">
                      <h4 className="text-lg text-[#9E7E3D] mb-2">{mealType}</h4>
                      <p className="text-[#4C7A5A]/60">No meal plan available for this day</p>
                    </CardContent>
                  </Card>
                );
              }
              
              return (
                <Card key={mealType} className="card-rustic animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-[#9E7E3D]">{mealType}</CardTitle>
                      <Badge variant="outline" className="border-[#F5C24D]/30 bg-[#F5C24D]/10 text-[#9E7E3D]">
                        {meal.dosha}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <h4 className="text-[#9E7E3D] font-medium">{meal.name}</h4>
                    
                    <div className="flex items-center justify-between text-sm text-[#4C7A5A]/80">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-[#F5C24D]" />
                        {meal.cookTime}
                      </div>
                      <div className="flex items-center">
                        <ChefHat className="w-4 h-4 mr-1 text-[#F5C24D]" />
                        {meal.calories} calories
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-[#4C7A5A]/70">Ingredients:</p>
                      <div className="flex flex-wrap gap-1">
                        {meal.ingredients.map((ingredient, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-[#E1D1A5]/50 text-[#9E7E3D] border-[#9E7E3D]/10 hover:bg-[#F5C24D]/20 transition-colors duration-200">
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-gradient-to-r from-[#E1D1A5]/30 to-[#F5C24D]/10 rounded-lg border border-[#9E7E3D]/10">
                      <div className="flex items-start">
                        <Leaf className="w-4 h-4 text-[#4C7A5A] mr-2 mt-0.5" />
                        <div>
                          <p className="text-xs text-[#9E7E3D]">{meal.benefits}</p>
                          <p className="text-xs text-[#4C7A5A]/70 mt-1 italic">{meal.ayurvedicNote}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 btn-rustic-outline">
                        <Star className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 btn-rustic-outline">
                        <Share className="w-3 h-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Nutrition Summary */}
          <Card className="card-rustic animate-on-scroll">
            <CardHeader>
              <CardTitle className="text-[#9E7E3D] flex items-center">
                <ChefHat className="w-5 h-5 mr-2 text-[#F5C24D]" />
                Daily Nutrition Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-[#E1D1A5]/50 to-[#F5C24D]/20 rounded-lg border border-[#9E7E3D]/10 hover:shadow-md transition-all duration-300">
                  <p className="text-2xl text-[#9E7E3D] font-semibold">{totalCalories}</p>
                  <p className="text-sm text-[#4C7A5A]/70">Total Calories</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-[#4C7A5A]/20 to-[#E1D1A5]/30 rounded-lg border border-[#9E7E3D]/10 hover:shadow-md transition-all duration-300">
                  <p className="text-2xl text-[#9E7E3D] font-semibold">65g</p>
                  <p className="text-sm text-[#4C7A5A]/70">Protein</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-[#F5C24D]/20 to-[#4C7A5A]/20 rounded-lg border border-[#9E7E3D]/10 hover:shadow-md transition-all duration-300">
                  <p className="text-2xl text-[#9E7E3D] font-semibold">180g</p>
                  <p className="text-sm text-[#4C7A5A]/70">Carbohydrates</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-[#E1D1A5]/50 to-[#4C7A5A]/20 rounded-lg border border-[#9E7E3D]/10 hover:shadow-md transition-all duration-300">
                  <p className="text-2xl text-[#9E7E3D] font-semibold">45g</p>
                  <p className="text-sm text-[#4C7A5A]/70">Healthy Fats</p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-gradient-to-r from-[#E1D1A5]/40 to-[#F5C24D]/20 rounded-lg border border-[#9E7E3D]/20">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-[#4C7A5A] mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-[#9E7E3D] font-medium">Ayurvedic Recommendation</p>
                    <p className="text-xs text-[#4C7A5A]/80 mt-1">
                      This meal plan is designed to balance Vata-Pitta constitution. It includes warm, nourishing foods 
                      for breakfast and lunch, with lighter dinner options that support proper digestion.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}