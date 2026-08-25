const cron = require('node-cron');
const { RecurringTransactionService } = require('../services/recurringTransactionService');


cron.schedule('0 1 * * *', async () => {
  const created = await RecurringTransactionService.runDue();
  console.log(`Recurring job: created ${created.length} transactions`);
});