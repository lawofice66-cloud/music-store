#!/usr/bin/env python3
import json
import os

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SEEDED_PATH = os.path.join(ROOT_DIR, 'data', 'fallback_140_tracks_seeded.json')
DB_PATH = os.path.join(ROOT_DIR, 'data', 'db.json')
TRACKS_DATA_PATH = os.path.join(ROOT_DIR, 'src', 'data', 'tracksData.ts')

COVERS = [
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1520523839898-507125cd53c1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518972559570-7cc1309f3229?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526394931762-90052e97b376?auto=format&fit=crop&w=800&q=80',
]

def main():
    with open(SEEDED_PATH, 'r', encoding='utf-8') as f:
        seeded_tracks = json.load(f)

    print(f"Loaded {len(seeded_tracks)} tracks from seeded json.")

    # Sort tracks so that all Inédites (Unreleased) are first, followed by all Released tracks
    unreleased_raw = [t for t in seeded_tracks if (t.get('status') or '').lower() == 'unreleased']
    released_raw = [t for t in seeded_tracks if (t.get('status') or '').lower() != 'unreleased']

    print(f"Counts: {len(unreleased_raw)} Inédites (Unreleased), {len(released_raw)} Released.")

    sorted_raw = unreleased_raw + released_raw
    normalized_tracks = []

    for idx, t in enumerate(sorted_raw):
        tid = t.get('id') or f"track-{idx+1}"
        title = t.get('title', f"Track {idx+1}")
        category = t.get('category') or ('francais' if t.get('language') == 'fr' else 'anglais')
        status = 'unreleased' if (t.get('status') or '').lower() == 'unreleased' else 'released'
        
        cover = t.get('coverImage') or t.get('cover') or COVERS[idx % len(COVERS)]
        bpm = t.get('bpm') or (130 + (idx % 20))
        key = t.get('key') or 'D Minor'
        audio_url = t.get('audioPreviewUrl') or f"https://music.fallen75.com/mp3/{title}.mp3"
        
        if status == 'unreleased':
            price = 2.49
            mp3_price = 2.49
            wav_price = 2.49
            tag_status = 'Inédite'
            desc = t.get('description') or f"HQ Studio Master • Morceau Inédit (Unreleased) • Licence Exclusive $2.49 USD"
            tags = ['Inédite', 'Unreleased', category.capitalize(), 'Studio Master']
        else:
            price = 0.99
            mp3_price = 0.99
            wav_price = 2.49
            tag_status = 'Released'
            desc = t.get('description') or f"HQ Studio Master • Morceau Sorti (Released) • MP3 $0.99 / WAV $2.49"
            tags = ['Released', category.capitalize(), 'Studio Master']

        norm = {
            "id": tid,
            "title": title,
            "description": desc,
            "status": status,
            "category": category,
            "type": t.get('type') or 'vocal',
            "price": price,
            "mp3Price": mp3_price,
            "wavPrice": wav_price,
            "currency": "$",
            "bpm": bpm,
            "key": key,
            "tags": tags,
            "coverImage": cover,
            "audioPreviewUrl": audio_url,
            "audioPreset": "drill_dark",
            "downloadFileName": f"{title}.wav",
            "fileSize": "45 MB" if status == 'unreleased' else "35 MB",
            "featured": bool(t.get('featured', idx < 6)),
            "likes": int(t.get('likes') or (120 + (idx * 7) % 250)),
            "plays": int(t.get('plays') or t.get('views') or (900 + (idx * 23) % 2500))
        }
        normalized_tracks.append(norm)

    # 1. Update data/db.json
    with open(DB_PATH, 'r', encoding='utf-8') as f:
        db = json.load(f)
    
    db['tracks'] = normalized_tracks
    with open(DB_PATH, 'w', encoding='utf-8') as f:
        json.dump(db, f, indent=2, ensure_ascii=False)
    print(f"✅ Updated {DB_PATH} with {len(normalized_tracks)} tracks.")

    # 2. Update src/data/tracksData.ts
    tracks_ts_content = "import { Track } from '../types';\n\n"
    tracks_ts_content += "// Full official catalog of 140 beats and instrumentals for FALLEN 75 FRANCE\n"
    tracks_ts_content += "// 51 Inédites (Unreleased) @ $2.49 USD + 89 Released @ $0.99 USD (MP3) / $2.49 USD (WAV)\n"
    tracks_ts_content += "export const GLOBAL_TRACKS_CATALOG: Track[] = " + json.dumps(normalized_tracks, indent=2, ensure_ascii=False) + ";\n"
    
    with open(TRACKS_DATA_PATH, 'w', encoding='utf-8') as f:
        f.write(tracks_ts_content)
    print(f"✅ Updated {TRACKS_DATA_PATH} with {len(normalized_tracks)} tracks.")

if __name__ == '__main__':
    main()
