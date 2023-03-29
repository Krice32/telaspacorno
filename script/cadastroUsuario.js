		const form = document.getElementById('addForm');
		const tableBody = document.getElementById('tbody');

		form.addEventListener('submit', function(e) {
			e.preventDefault();
			const nameInput = document.getElementById('name');
			const jobInput = document.getElementById('job');

			const name = nameInput.value;
			const job = jobInput.value;

			const row = document.createElement('tr');
			row.innerHTML = `
				<td>${name}</td>
				<td>${job}</td>
			`;

			tableBody.appendChild(row);

			nameInput.value = '';
			jobInput.value = '';
		});
