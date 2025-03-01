import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import Task from "./Task";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
            <Task/>

			
		</div>
	);
};

export default Home;