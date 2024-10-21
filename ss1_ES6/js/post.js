let courses = [{id: 1, title: "JavaScript Basics", rating: 3.5},
    {id: 2, title: "Learn Js", rating: 4.2},
    {id: 3, title: "Learn Java", rating: 3.8},
    {id: 4, title: "Learn React", rating: 3.9},
    {id: 5, title: "ReactJS Guide", rating: 4.5}];
let addedCourses =[
    {id: 6, title: "Learn CSS", rating: 2.5},
    {id: 7, title: "Learn BooTRAP", rating: 5},
    {id: 8, title: "Learn SpringBoot", rating: 2.8}
]
const highRating = courses.filter(course => course.rating >= 4);
console.log("Danh sách post có rate >=4")
highRating.forEach((courses) => {
    console.log(`${courses.title}`);

})
console.log("Danh sách post có rate <4")
courses.forEach(course => {
    if (course.rating < 4) {
        console.log(`id:${course.id}, title:${course.title}, rating:${course.rating}`);
    }
})
let newCourses=[...courses,...addedCourses]
console.log(newCourses)
