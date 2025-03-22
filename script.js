document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const hiddenContent = button.parentElement.nextElementSibling;

            if (hiddenContent.style.display === 'none' || hiddenContent.style.display === '') {
                hiddenContent.style.display = 'block';
                button.textContent = '[-]'; // Obaida
            } else {
                hiddenContent.style.display = 'none';
                button.textContent = '[+]'; // Obaida
            }
        });
    });

    // Handle "Other" input box visibility - Obaida
    document.getElementById("purpose").addEventListener("change", function() {
        let otherReason = document.getElementById("otherReason");
        let otherText = document.getElementById("otherText");

        if (this.value === "Other") {
            otherReason.style.display = "block";
            otherText.setAttribute("required", "true");
        } else {
            otherReason.style.display = "none";
            otherText.removeAttribute("required");
        }
    });

    // Handle "Other" course selection visibility - Obaida
    document.getElementById("course").addEventListener("change", function() {
        let otherCourseBox = document.getElementById("otherCourseBox");
        let otherCourse = document.getElementById("otherCourse");

        if (this.value === "Other") {
            otherCourseBox.style.display = "block";
            otherCourse.setAttribute("required", "true");
        } else {
            otherCourseBox.style.display = "none";
            otherCourse.removeAttribute("required");
        }
    });

    // Keep course toggling logic the same - Obaida
    const courseTypes = document.querySelectorAll('.course-type');
    courseTypes.forEach(course => {
        course.addEventListener('click', function() {
            const courseBox = document.getElementById(this.dataset.target);
            if (courseBox.style.display === 'none' || courseBox.style.display === '') {
                courseBox.style.display = 'block';
            } else {
                courseBox.style.display = 'none';
            }
        });
    });
});
