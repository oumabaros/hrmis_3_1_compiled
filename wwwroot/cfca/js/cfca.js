//begin export buttons
codeListTable = $("#data-table").DataTable(
	$(document).ready(function () {
		$('.dataTables_filter input[type="search"]').css(
			{ 'width': '65px', 'display': 'inline-block' }
		);
	})
);

//codeListTable.buttons().container().appendTo('#export-buttons');

parameterTable = $("#data-table-param").DataTable(
	$(document).ready(function () {
		$('.dataTables_filter input[type="search"]').css(
			{ 'width': '65px', 'display': 'inline-block' }
		);
	})
);




staffTable = $("#data-table-staff").DataTable(
	$(document).ready(function () {
		$('.dataTables_filter input[type="search"]').css(
			{ 'width': '65px', 'display': 'inline-block' }
		);
	})
);

empTable = $("#data-table-emp").DataTable(
	$(document).ready(function () {
		$('.dataTables_filter input[type="search"]').css(
			{ 'width': '65px', 'display': 'inline-block' }
		);
	})
);
