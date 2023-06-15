import { useHttp } from "../hooks/http.hook";

const useMealSharingService = () => {
	const { loading, request, error} = useHttp();


	const getAllMeals = async () => {
		const res = await request("http://localhost:5000/api/meals/");
		console.log(res)
		return res.map(_transformMeal);
	};

	const getMeal = async (id) => {
		const res = await request(`http://localhost:5000/api/meals/${id}`);
		return _transformMeal(res[0]);
	};

	const _transformMeal = (item) => {
		return {
			id: item.id,
			title: item.meal_title,
			description: item.description
				? item.description
				: "There is no description",
			price: item.price
			
		};
	};



	return {
		loading,
		error,
		getAllMeals,
		getMeal
	
	};
};

export default useMealSharingService;
