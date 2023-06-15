import { useHttp } from "../hooks/http.hook";

const useMealSharingService = () => {
	const { loading, request, error, clearError} = useHttp();


	const getAllMeals = async () => {
		const res = await request("http://localhost:5000/api/meals/");
		console.log(res)
		return res.map(_transformMeals);
	};

	const getMeal = async (id) => {
		const res = await request(`http://localhost:5000/api/meals/${id}`);
		return _transformMeal(res[0]);
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



	return {
		loading,
		error,
		getAllMeals,
		getMeal,
		clearError
	
	};
};

export default useMealSharingService;
