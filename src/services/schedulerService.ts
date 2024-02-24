import schedule from 'node-schedule';
import { log } from '../utils/logUtils';

export function startScheduleJob() {
    // runs every 30 seconds
    let job = schedule.scheduleJob('*/30 * * * * *', async function() {
        try {
            // schedule job logic here
            log("Schedule job triggered.");
        } catch (error) {
            log("Encountered error while running schedule job...");
            console.error(error);
        }
    });

    return job;
}