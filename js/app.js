class CalorieTracker {
	constructor() {
		this._calorieLimit = 1000;
		this._totalCalories = 0;
		this._meals = [];
		this._workouts = [];

		this._displayCaloriesLimit();
		this._displayCaloriesTotal();
		this._displayCaloriesConsumed();
		this._displayCaloriesBurned();
		this._displayCaloriesRemaining();
		this._displayCaloriesProgress();
	}

	addMeal(meal) {
		this._meals.push(meal);
		this._totalCalories += meal.calories;
		this._render();
	}

	addWorkout(workout) {
		this._workouts.push(workout);
		this._totalCalories -= workout.calories;
		this._render();
	}

	_displayCaloriesTotal() {
		const totalCaloriesEl = document.getElementById('calories-total');
		totalCaloriesEl.innerHTML = this._totalCalories;
	}

	_displayCaloriesLimit() {
		const limitCaloriesEl = document.getElementById('calories-limit');
		limitCaloriesEl.innerHTML = this._calorieLimit;
	}

	_displayCaloriesConsumed() {
		const caloriesConsumedEl = document.getElementById('calories-consumed');

		const consumed = this._meals.reduce((total, meal) => total + meal.calories, 0);
		caloriesConsumedEl.innerHTML = consumed;
	}

	_displayCaloriesBurned() {
		const caloriesBurnedEl = document.getElementById('calories-burned');

		const burned = this._workouts.reduce((total, workout) => total + workout.calories, 0);
		caloriesBurnedEl.innerHTML = burned;
	}

	_displayCaloriesRemaining() {
		const caloriesRemainingEl = document.getElementById('calories-remaining');
		const remaining = this._calorieLimit - this._totalCalories;
		caloriesRemainingEl.innerHTML = remaining;
		const calorieLimitCardEl = caloriesRemainingEl.parentElement.parentElement;

		if (remaining <= 0) {
			calorieLimitCardEl.classList.add('bg-danger');
			calorieLimitCardEl.classList.remove('bg-light');
		}
	}

	_displayCaloriesProgress() {
		const calorieProgressEl = document.getElementById('calorie-progress');
		const percentage = (this._totalCalories / this._calorieLimit) * 100;
		const width = Math.min(percentage, 100);
		calorieProgressEl.style.width = `${width}%`;
	}

	_render() {
		this._displayCaloriesTotal();
		this._displayCaloriesConsumed();
		this._displayCaloriesBurned();
		this._displayCaloriesRemaining();
		this._displayCaloriesProgress();
	}
}

class Meal {
	constructor(name, calories) {
		this.id = Math.random().toString(16).slice(2);
		this.name = name;
		this.calories = calories;
	}
}

class Workout {
	constructor(name, calories) {
		this.id = Math.random().toString(16).slice(2);
		this.name = name;
		this.calories = calories;
	}
}

const tracker = new CalorieTracker();
const breakfast = new Meal('Breakfast', 40);
tracker.addMeal(breakfast);
console.log(breakfast);
const running = new Workout('Running', 200);
tracker.addWorkout(running);
