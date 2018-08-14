const users = [{
	id:1,
	name:'Sandy',
	schoolId: 101
},{
	id:2,
	name:'Halim',
	schoolId: 102
}];

const grades = [{
	id:1,
	schoolId:101,
	grade:86
},{
	id:2,
	schoolId:101,
	grade:76
},{
	id:3,
	schoolId:102,
	grade:98
}];

const getUser = (id) => {
	return new Promise((resolve, reject)=>{
		const user = users.find((user) => user.id === id );
		if (user){
			resolve(user);
		} else{
			reject('user not found');
		}
	})
}

getUser(2)
	.then( (user) => {console.log('user:', user)})
	.catch((e)=> console.log(e));

const getGrade = (schoolId) => {
	return new Promise((resolve, reject)=>{
		// resolve(grades.filter((g)=> g.schoolId === schoolId));
		const filteredGrades = grades.filter((g)=> g.schoolId === schoolId);
		if (filteredGrades.length>0){
			resolve(filteredGrades)
		}
		else {
			reject ('no grade matching schoolId');
		}
	});
};

getGrade(102)
	.then((response) => console.log('grades:', response))
	.catch((e)=> console.log(e))


//xx has a 'average' in the class
const getStatus = (userId) => {
	//retrouver le user
	let user;
	return getUser(userId)
	//le récupérer dans la promesse
	.then((responseUser)=> {
		user = responseUser;
		return getGrade(user.schoolId);})
	// récupérer ses notes
	.then((responseGrade) => {
		console.log('liste des grades:', responseGrade);
		//créer une variable average
		let average;
		if (responseGrade.length>0){
			let gradeList = responseGrade.map((grade) => {
				return grade.grade});
			console.log('gradeList:', gradeList)
			average = gradeList.reduce((a,b)=>a+b)/gradeList.length;
		}
		//retourner la moyenne
		return `${user.name} has ${average}`;
	})
	
}

getStatus(1)
.then((response) => console.log('status:', response))
.catch((e)=> console.log(e))