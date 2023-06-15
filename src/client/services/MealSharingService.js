import { useHttp } from "../hooks/http.hook";

const useMealSharingService = () => {
	const { loading, request, error, clearError} = useHttp();


	const getAllMeals = async () => {
		const response = await request("http://localhost:5000/api/meals/");
		console.log(response)
		return response.map(_transformMeals);
	};

	const getMeal = async (id) => {
		const response = await request(`http://localhost:5000/api/meals/${id}`);
		return _transformMeal(response[0]);
	};

	const getReview = async (id) => {
		const response = await request(`http://localhost:5000/api/reviews/${id}`);
		return response.map(_transformReview);
	};

	const postReservation = async (data) => {
		const url = "http://localhost:5000/api/reservations/";
		const method = 'POST';
		const body = data;
		const headers = {'Content-Type': 'application/json'};
	
		try {
			const response = await request(url, method, body, headers);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

	const postReview = async (data) => {
		const url = "http://localhost:5000/api/reviews/";
		const method = 'POST';
		const body = data;
		const headers = {'Content-Type': 'application/json'};
	
		try {
			const response = await request(url, method, body, headers);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};
	


	const _transformMeals = (item) => {
		return {
			id: item.id,
			location: item.location,
			title: item.meal_title,
			description: item.description
				? `${item.description.slice(0, 255)}...`
				: "There is no description",
			price: item.price,
			url: item.url
			
		};
	};

	const _transformMeal = (item) => {
		return {
			id: item.id,
			location: item.location,
			title: item.meal_title,
			max_reservations: item.max_reservations,
			status: item.status,
			description: item.description
				? item.description
				: "There is no description",
			price: item.price,
			url: item.url
			
		};
	};

	const _transformReview = (item) => {
		return {
			id: item.id,
			name: item.name,
			stars: item.stars,
			description: item.description
				? item.description
				: "There is no description",
			date: item.created_date
		};
	};



	return {
		loading,
		error,
		getAllMeals,
		getMeal,
		getReview,
		postReservation,
		postReview,
		clearError
	
	};
};

export default useMealSharingService;
