var ctx = document.getElementById('doughnutChart').getContext('2d');
var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: [topics[0].category, topics[1].category, topics[2].category],
        datasets: [{
            label: '# of Votes',
            data: [Math.round(topics[0].score * 100), Math.round(topics[1].score * 100), Math.round(topics[2].score * 100)],
            backgroundColor: [
                'rgb(65, 212, 146)',
                'rgb(242, 181, 29)',
                'rgb(242, 102, 102)'
            ],
						borderColor: [
							'rgb(65, 212, 146)',
							'rgb(242, 181, 29)',
							'rgb(242, 102, 102)'
						]
        }]
    },
    options: {
			legend: {
				display: false
			}
		}
});

