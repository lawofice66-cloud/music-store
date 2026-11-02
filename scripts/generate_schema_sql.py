#!/usr/bin/env python3
import json
import os

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SEEDED_JSON_PATH = os.path.join(ROOT_DIR, 'data', 'fallback_140_tracks_seeded.json')
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
    tracks = []
    if os.path.exists(SEEDED_JSON_PATH):
        with open(SEEDED_JSON_PATH, 'r', encoding='utf-8') as f:
            tracks = json.load(f)

    payment_config = {}
    if os.path.exists(DB_JSON_PATH):
        try:
            with open(DB_JSON_PATH, 'r', encoding='utf-8') as f:
                payment_config = json.load(f).get('paymentConfig', {})
        except Exception:
            pass

    sql_lines = [
        "-- =========================================================",
        "-- FALLEN 75 FRANCE - CLOUDFLARE D1 FULL DATABASE SCHEMA",
        "-- Initialisation complète de la base Cloudflare D1 avec les 140 morceaux",
        "-- Commande d'exécution :",
        "--   npx wrangler d1 execute fallen75-db --file=./schema.sql",
        "-- =========================================================\n",
        "-- 1. Table des morceaux et beats",
        "CREATE TABLE IF NOT EXISTS tracks (",
        "  id TEXT PRIMARY KEY,",
        "  title TEXT NOT NULL,",
        "  description TEXT,",
        "  price REAL NOT NULL DEFAULT 0.99,",
        "  mp3Price REAL NOT NULL DEFAULT 0.99,",
        "  wavPrice REAL NOT NULL DEFAULT 2.49,",
        "  currency TEXT NOT NULL DEFAULT '$',",
        "  bpm INTEGER DEFAULT 140,",
        "  key TEXT DEFAULT 'D Minor',",
        "  tags TEXT DEFAULT '[\"Trap\",\"Studio Master\"]',",
        "  coverImage TEXT,",
        "  audioPreviewUrl TEXT DEFAULT '',",
        "  audioPreset TEXT DEFAULT 'drill_dark',",
        "  downloadFileName TEXT,",
        "  fileSize TEXT DEFAULT '8 MB',",
        "  featured INTEGER DEFAULT 0,",
        "  likes INTEGER DEFAULT 120,",
        "  plays INTEGER DEFAULT 1200,",
        "  views INTEGER DEFAULT 1200,",
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
        "  customerEmail TEXT DEFAULT '',",
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
        f"-- INSERTION DES {len(tracks)} MORCEAUX OFFICIELS DU CATALOGUE (MP3 $0.99 / WAV $2.49)",
        "-- ========================================================="
    ]

    for t in tracks:
        tid = escape_sql(t.get('id') or t.get('slug'))
        title = escape_sql(t.get('title', 'Untitled'))
        desc = escape_sql(t.get('description', 'HQ Studio Master • 320kbps'))
        price = "0.99"
        mp3_price = "0.99"
        wav_price = "2.49"
        curr = "'$'"
        bpm = "140"
        key = escape_sql(t.get('key', 'D Minor'))
        tags_str = json.dumps(t.get('tags', [t.get('category', 'Trap'), 'Studio Master']))
        tags = escape_sql(tags_str)
        cover = escape_sql(t.get('coverImage') or t.get('cover') or '')
        audio_url = escape_sql(t.get('audioPreviewUrl', ''))
        preset = escape_sql('drill_dark')
        dl_name = escape_sql(f"{t.get('title')}.wav")
        file_size = escape_sql('45 MB')
        featured = '1' if t.get('featured') else '0'
        likes = str(t.get('likes', 120))
        plays = str(t.get('plays', 1200))

        insert_stmt = (
            f"INSERT OR REPLACE INTO tracks "
            f"(id, title, description, price, mp3Price, wavPrice, currency, bpm, key, tags, coverImage, audioPreviewUrl, audioPreset, downloadFileName, fileSize, featured, likes, plays, views) "
            f"VALUES ({tid}, {title}, {desc}, {price}, {mp3_price}, {wav_price}, {curr}, {bpm}, {key}, {tags}, {cover}, {audio_url}, {preset}, {dl_name}, {file_size}, {featured}, {likes}, {plays}, {plays});"
        )
        sql_lines.append(insert_stmt)

    if payment_config:
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
