require('dotenv').load();
const DailyBook = require('./dailyBook');
const CronJob = require('cron').CronJob;

const job = new CronJob({
	cronTime: '00 30 09 * * *', 
	onTick: function() {
	DailyBook.todays_book();
	},
	start: false,
	timeZone: 'America/Chicago'
});
job.start();