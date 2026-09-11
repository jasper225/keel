const RecurringTransaction = require("../models/RecurringTransaction");
const { withTransaction } = require("../config/db");

function nextDate(current, unit, count) {
  const d = new Date(current);
  if (unit === "day") d.setDate(d.getDate() + count);
  if (unit === "week") d.setDate(d.getDate() + count * 7);
  if (unit === "month") d.setMonth(d.getMonth() + count);
  if (unit === "year") d.setFullYear(d.getFullYear() + count);
  return d.toISOString().slice(0, 10);
}

const RecurringTransactionService = {
  async runDue(asOfDate) {
    const due = await RecurringTransaction.listDue(asOfDate);
    const created = [];

    for (const rule of due) {
      await withTransaction(async (client) => {
        const txn = await client.query(
          `INSERT INTO transactions
             (user_id, account_id, category_id, type, amount, description, occurred_at)
           VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
          [
            rule.user_id,
            rule.account_id,
            rule.category_id,
            rule.type,
            rule.amount,
            rule.occured_at,
          ],
        );
        const next = nextDate(
          rule.next_occurrence,
          rule.interval_unit,
          rule.interval_count,
        );
        await client.query(
          `UPDATE recurring_transactions SET next_occurrence = $1 WHERE id = $2`,
          [next, rule.id],
        );
        created.push(txn.rows[0]);
      });
    }

    return created;
  },
};

module.exports = { RecurringTransactionService };
