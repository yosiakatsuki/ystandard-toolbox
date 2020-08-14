const form = document.getElementById('ystdtb-menu');
form.addEventListener('change', (e) => {
	if (e.target.validationMessage) {
		const submit = document.querySelector('input[type="submit"]');
		if (submit) {
			submit.click();
		}
	}
	if (form.checkValidity()) {
		form.classList.remove('has-error');
	} else {
		form.classList.add('has-error');
	}
});
