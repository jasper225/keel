CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TYPE account_type AS ENUM (
    'checking', 'savings', 'credit_card', 'cash', 'investment', 'loan', 'other'
);


CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(30) NOT NULL,
    type account_type NOT NULL DEFAULT 'checking',
    currency CHAR(3) NOT NULL DEFAULT 'USD',
    opening_balance NUMERIC(14, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT now()
);


CREATE TYPE category_type AS ENUM (
    'income', 'expense', 'transfer'
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    parent_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(30) NOT NULL,
    type category_type NOT NULL DEFAULT 'income',
    created_at TIMESTAMP DEFAULT now(),
    UNIQUE (user_id, parent_id, name)
);

CREATE TYPE transaction_type AS ENUM (
    'income', 'expense', 'transfer'
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    account_id INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    type transaction_type NOT NULL DEFAULT 'income',
    amount NUMERIC(14, 2) NOT NULL CHECK (amount > 0),
    transfer_account_id INTEGER REFERENCES accounts(id) ON DELETE CASCADE,
    occured_at TIMESTAMP DEFAULT now(),
    created_at TIMESTAMP DEFAULT now()
    CHECK (
        (type = 'transfer' AND transfer_account_id IS NOT NULL AND transfer_account_id <> account_id)
        OR (type <> 'transfer' AND transfer_account_id IS NULL)
    )

);

CREATE INDEX idx_transactions_account_date ON transactions (account_id, occured_at DESC);
CREATE INDEX idx_transactions_category ON transactions (category_id);
CREATE INDEX idx_transactions_user_date ON transactions (user_id, occured_at DESC);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(30) NOT NULL,
    UNIQUE (user_id, name)
);

CREATE TABLE transaction_tags (
    transaction_id INTEGER NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (transaction_id, tag_id)
);

CREATE TYPE budget_period AS ENUM ('weekly', 'monthly', 'yearly');

CREATE TABLE budgets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    amount_limit NUMERIC(14, 2) NOT NULL CHECK (amount_limit >= 0)
    period budget_period NOT NULL DEFAULT 'weekly',
    start_date DATE NOT NULL,
    end_date DATE,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE recurring_transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    account_id INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    type transaction_type NOT NULL DEFAULT 'income',
    amount NUMERIC(14, 2) NOT NULL CHECK (amount > 0),
    interval_unit TEXT NOT NULL CHECK (interval_unit IN ('day', 'week', 'month', 'year')),
    interval_count INT NOT NULL DEFAULT 1,
    next_occurence DATE NOT NULL,
    end_date DATE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP DEFAULT now()
);

CREATE VIEW account_balances AS
    SELECT
        a.id AS account_id,
        a.name,
        a.opening_balance
        + COALESCE(SUM(
            CASE
              WHEN t.type = 'income' THEN t.amount
              WHEN t.type = 'expense' THEN -t.amount
              WHEN t.type = 'transfer' AND t.account_id = a.id THEN -t.amount
              WHEN t.type = 'transfer' AND t.transfer_account_id = a.id THEN t.amount
            END
        ), 0) AS current_balance
    FROM accounts a
    LEFT JOIN transactions t
            ON t.account_id = a.id OR t.transfer_account_id = a.id
    GROUP BY a.id, a.name, a.opening_balance;