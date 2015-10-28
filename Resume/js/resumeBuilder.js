/**
 * Got this from Chris West's Blog http://cwestblog.com/2011/07/25/javascript-string-prototype-replaceall/
 * @param target the string to replace
 * @param replacement the replacement string.
 * @return the string with all occurrences of target replaced with replacement.
 */
String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};

/**
 * Format the HTML by replacing all of %data% with value.
 * @param s the HTML.
 * @param value the value to replace %data% with.
 */
function format(s, value) {
	return s.replaceAll("%data%", value);
};

/**
 * Fill in the resume with the bio information.
 */
bio.buildResume = function() {

	// Decided to move as much layout code as possible to index.html
	// var formattedName = format(HTMLheaderName, bio.name);
	// var contactEmail = format(HTMLemail, bio.contacts.email);
	// var contactTwitter = format(HTMLtwitter, bio.contacts.twitter);
	// var contactGithub = format(HTMLgithub, bio.contacts.github);
	// var contactMobile = format(HTMLmobile, bio.contacts.mobile);
	// var formattedRole = format(HTMLheaderRole, bio.role);
	// var formattedPicUrl = format(HTMLbioPic, bio.pictureURL);
	// var formattedWelcome = format(HTMLWelcomeMsg, bio.welcome);

	$("#name").prepend(bio.name);
	$("#role").prepend(bio.role);
	$("#profileImage").append(bio.pictureURL);
	$("#welcome").append(bio.welcome);
	$("#email").append(bio.contacts.email);
	$("#twitter").append(bio.contacts.twitter);
	$("#github").append(bio.contacts.github);

	// Fill out the skills section,...
	$("#topSkills").append(HTMLskillsStart);
	bio.skills.forEach(function(skill) {
		var s = "";
		skill.forEach(function(d) {
			var mySkills = HTMLskills.replace("%data%", d);
			$("#skills").append(mySkills);
		});
	});
};

/**
 * Fill in the resume with the education information.
 */
education.buildResume = function() {
	education.schools.forEach(function(d) {
		var schoolName = format(HTMLschoolName, d.name);
		schoolName = schoolName.replace("%link%", d.website);
		var degree = format(HTMLschoolDegree, d.degree);
		var schoolDates = format(HTMLschoolDates, d.years);
		var schoolLocation = format(HTMLschoolLocation, d.location);
		var major = format(HTMLschoolMajor, d.major);

		$("#education").append(HTMLschoolStart);
		$(".education-entry:last").append(schoolName);
		$(".education-entry:last").append(degree);
		$(".education-entry:last").append(schoolDates);
		$(".education-entry:last").append(schoolLocation);
		$(".education-entry:last").append(major);
		//$(".education-entry:last").append("<br>");
	});
};

/**
 * Fill in the resume with the work information.
 */
work.buildResume = function() {
	work.forEach(function(d) {
		var employer = HTMLworkEmployer.replace("%data%", d.employer);
		employer = employer.replace("%link%", d.website)
		var position = HTMLworkTitle.replace("%data%", d.position);
		var workDates = HTMLworkDates.replace("%data%", d.dates);
		var workLocation = HTMLworkLocation.replace("%data%", d.location);
		var workDescription = HTMLworkDescription.replace("%data%", d.description);

		$("#workExperience").append(HTMLworkStart);
		$(".work-entry:last").append(position);
		$(".work-entry:last").append(employer);
		$(".work-entry:last").append(workDates);
		$(".work-entry:last").append(workLocation);
		$(".work-entry:last").append(workDescription);
		// $("#work-entry:last").append("<br>");
	});
};

/**
 * Fill in the resume with the extras (memberships and activites) information.
 */
extras.buildResume = function() {
	$("#extras").append(HTMLextraStart);
	extras.memberships.forEach(function(d) {
		var extraDescription = format(HTMLextraDescription, d.name);
		extraDescription = extraDescription.replace("%link%", d.website);
		$(".extra-entry:last").append(extraDescription);
	});
	extras.activities.forEach(function(d) {
		var extraDescription = format(HTMLextraDescription, d.name);
		extraDescription = extraDescription.replace("%link%", d.website);
		$(".extra-entry:last").append(extraDescription);
	});
};

// function locationizer(myWork) {
// 	var locations = [];
// 	myWork.forEach(function(d) {
// 		locations.push(d.location);
// 	});
// 	return locations;
// }

console.log("Building Resume...");

bio.buildResume();
work.buildResume();
education.buildResume();
extras.buildResume();

console.log("Done Building Resume...");

$(document).click(function(loc) {
	logClicks(loc.pageX, loc.pageY);
});
