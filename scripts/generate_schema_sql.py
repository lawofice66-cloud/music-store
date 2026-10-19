#!/usr/bin/env python3
import json
import os

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DB_JSON_PATH = os.path.join(ROOT_DIR, 'data', 'db.json')
SCHEMA_SQL_PATH = os.path.join(ROOT_DIR, 'schema.sql')

def escape_sql(val):
    if val is None:
        return 'NULL'
    if isinstance(val, bool):
        return '1' if val else '0'
    if isinstance(val, (int, float)):
        return str(val)
    val_str = str(val).replace("'", "''")
    return f"'{val_str}'"

def main():
    with open(DB_JSON_PATH, 'r', encoding='utf-8') as f:
        db_data = json.load(f)

    tracks = db_data.get('tracks', [])
    payment_config = db_data.get('paymentConfig', {})

    sql_lines = [
        "-- =========================================================",
        "-- FALLEN 75 FRANCE - CLOUDFLARE D1 FULL DATABASE SCHEMA",
        "-- Initialisation complète de la base Cloudflare D1 avec les 93 morceaux",
        "-- Commande d'exécution :",
        "--   npx wrangler d1 execute fallen75-db --file=./schema.sql",
        "-- =========================================================\n",
        "-- 1. Table des morceaux et beats",
        "CREATE TABLE IF NOT EXISTS tracks (",
        "  id TEXT PRIMARY KEY,",
        "  title TEXT NOT NULL,",
        "  description TEXT,",
        "  price REAL NOT NULL DEFAULT 35,",
        "  currency TEXT NOT NULL DEFAULT '€',",
        "  bpm INTEGER DEFAULT 140,",
        "  key TEXT DEFAULT 'D Minor',",
        "  tags TEXT DEFAULT '[\"Trap\",\"Dark\"]',",
        "  coverImage TEXT NOT NULL,",
        "  audioPreviewUrl TEXT DEFAULT '',",
        "  audioPreset TEXT DEFAULT 'drill_dark',",
        "  downloadFileName TEXT,",
        "  fileSize TEXT DEFAULT '4 MB',",
        "  featured INTEGER DEFAULT 0,",
        "  likes INTEGER DEFAULT 0,",
        "  plays INTEGER DEFAULT 0,",
        "  createdAt TEXT DEFAULT (datetime('now')),",
        "  updatedAt TEXT DEFAULT (datetime('now'))",
        ");\n",
        "-- 2. Table des commandes",
        "CREATE TABLE IF NOT EXISTS orders (",
        "  id TEXT PRIMARY KEY,",
        "  trackId TEXT NOT NULL,",
        "  trackTitle TEXT NOT NULL,",
        "  amount REAL NOT NULL,",
        "  currency TEXT NOT NULL,",
        "  method TEXT NOT NULL,",
        "  cryptoNetwork TEXT,",
        "  walletAddress TEXT,",
        "  transactionRef TEXT,",
        "  customerEmail TEXT NOT NULL,",
        "  customerName TEXT,",
        "  status TEXT NOT NULL DEFAULT 'pending',",
        "  downloadToken TEXT,",
        "  createdAt TEXT DEFAULT (datetime('now')),",
        "  confirmedAt TEXT,",
        "  notes TEXT",
        ");\n",
        "-- 3. Table de configuration des paiements & wallets",
        "CREATE TABLE IF NOT EXISTS payment_config (",
        "  id TEXT PRIMARY KEY DEFAULT 'global_config',",
        "  data TEXT NOT NULL,",
        "  updatedAt TEXT DEFAULT (datetime('now'))",
        ");\n",
        "-- 4. Table des logs ou paramètres admin",
        "CREATE TABLE IF NOT EXISTS admin_settings (",
        "  key TEXT PRIMARY KEY,",
        "  value TEXT NOT NULL,",
        "  updatedAt TEXT DEFAULT (datetime('now'))",
        ");\n",
        "-- =========================================================",
        "-- INSERTION DES 93 MORCEAUX OFFICIELS DU CATALOGUE",
        "-- ========================================================="
    ]

    for t in tracks:
        tid = escape_sql(t.get('id'))
        title = escape_sql(t.get('title', 'Untitled'))
        desc = escape_sql(t.get('description', ''))
        price = str(t.get('price', 35))
        curr = escape_sql(t.get('currency', '€'))
        bpm = str(t.get('bpm', 140))
        key = escape_sql(t.get('key', 'D Minor'))
        tags_str = json.dumps(t.get('tags', ['Trap', 'Dark']))
        tags = escape_sql(tags_str)
        cover = escape_sql(t.get('coverImage', ''))
        audio_url = escape_sql(t.get('audioPreviewUrl', ''))
        preset = escape_sql(t.get('audioPreset', 'drill_dark'))
        dl_name = escape_sql(t.get('downloadFileName', ''))
        file_size = escape_sql(t.get('fileSize', '4 MB'))
        featured = '1' if t.get('featured') else '0'
        likes = str(t.get('likes', 45))
        plays = str(t.get('plays', 680))

        insert_stmt = (
            f"INSERT OR REPLACE INTO tracks "
            f"(id, title, description, price, currency, bpm, key, tags, coverImage, audioPreviewUrl, audioPreset, downloadFileName, fileSize, featured, likes, plays) "
            f"VALUES ({tid}, {title}, {desc}, {price}, {curr}, {bpm}, {key}, {tags}, {cover}, {audio_url}, {preset}, {dl_name}, {file_size}, {featured}, {likes}, {plays});"
        )
        sql_lines.append(insert_stmt)

    # Insert payment config
    config_json_escaped = escape_sql(json.dumps(payment_config, ensure_ascii=False))
    sql_lines.extend([
        "\n-- =========================================================",
        "-- CONFIGURATION DES PAIEMENTS & WALLETS OFFICIELS",
        "-- =========================================================",
        f"INSERT OR REPLACE INTO payment_config (id, data, updatedAt) VALUES ('global_config', {config_json_escaped}, datetime('now'));\n"
    ])

    with open(SCHEMA_SQL_PATH, 'w', encoding='utf-8') as f:
        f.write('\n'.join(sql_lines))

    print(f"Generated {SCHEMA_SQL_PATH} with {len(tracks)} tracks successfully.")

if __name__ == '__main__':
    main()
