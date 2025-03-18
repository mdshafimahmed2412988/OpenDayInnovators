document.addEventListener('DOMContentLoaded', function() {
   
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            const hiddenContent = button.parentElement.nextElementSibling;

            if (hiddenContent.style.display === 'none' || hiddenContent.style.display === '') {
                hiddenContent.style.display = 'block';
                button.textContent = '[-]'; 
            } else {
                hiddenContent.style.display = 'none';
                button.textContent = '[+]'; 
            }
        });
    });
});

