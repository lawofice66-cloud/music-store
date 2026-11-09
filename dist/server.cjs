var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_config = require("dotenv/config");
var import_express = __toESM(require("express"), 1);
var import_path3 = __toESM(require("path"), 1);
var import_fs3 = __toESM(require("fs"), 1);
var import_cors = __toESM(require("cors"), 1);
var import_multer = __toESM(require("multer"), 1);
var import_vite = require("vite");

// server/db.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);

// src/data/tracksData.ts
var GLOBAL_TRACKS_CATALOG = [
  {
    "id": "df7515ab-d64d-414e-83ce-658b22a0090e",
    "title": "Ya waldin fhem",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "francais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 130,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Ya%20waldin%20fhem.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Ya waldin fhem.wav",
    "fileSize": "45 MB",
    "featured": true,
    "likes": 349,
    "plays": 2785
  },
  {
    "id": "df24ad30-1771-47d9-b5c9-30cb0b35ec23",
    "title": "Where the road ends",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 131,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Where%20the%20road%20ends.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Where the road ends.wav",
    "fileSize": "45 MB",
    "featured": true,
    "likes": 168,
    "plays": 3397
  },
  {
    "id": "17883ab9-eb21-4320-8067-7d815c08d826",
    "title": "Where the dust meet the sky ( instrumental)",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "instrumentale",
    "type": "instrumental",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 132,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Where%20the%20dust%20meet%20the%20sky%20(%20instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Where the dust meet the sky ( instrumental).wav",
    "fileSize": "45 MB",
    "featured": true,
    "likes": 342,
    "plays": 2115
  },
  {
    "id": "db75ac05-ef0e-4e54-be5e-32944393da51",
    "title": "When the lights go down",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 133,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/When%20the%20lights%20go%20down.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "When the lights go down.wav",
    "fileSize": "45 MB",
    "featured": true,
    "likes": 199,
    "plays": 1015
  },
  {
    "id": "07573d49-5f46-4712-92b8-c843bdaec886",
    "title": "Velvet signals",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 134,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Velvet%20signals.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Velvet signals.wav",
    "fileSize": "45 MB",
    "featured": true,
    "likes": 295,
    "plays": 2002
  },
  {
    "id": "3000bd5c-ce8c-4ae4-a35b-6d7876b9dc19",
    "title": "Tonight we run ( instrumental)",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "instrumentale",
    "type": "instrumental",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 135,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Tonight%20we%20run%20(%20instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Tonight we run ( instrumental).wav",
    "fileSize": "45 MB",
    "featured": true,
    "likes": 314,
    "plays": 2783
  },
  {
    "id": "2397cfc4-170a-418c-84e2-6e706b781138",
    "title": "Tiens bon",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 136,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Tiens%20bon.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Tiens bon.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 204,
    "plays": 1181
  },
  {
    "id": "e628d7fc-c7b9-421e-b53d-c596e4eff687",
    "title": "The world is still awake ( instrumental)",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "instrumentale",
    "type": "instrumental",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 137,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/The%20world%20is%20still%20awake%20(%20instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "The world is still awake ( instrumental).wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 44,
    "plays": 1098
  },
  {
    "id": "64665d99-f988-42a4-aa60-3d082de57949",
    "title": "The world is still awake ( acapulca)",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "accapella",
    "type": "acapella",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 138,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Accapella",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/The%20world%20is%20still%20awake%20(%20acapulca).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "The world is still awake ( acapulca).wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 79,
    "plays": 1818
  },
  {
    "id": "190a3728-2e21-473e-97cc-8e3f03d86045",
    "title": "The last man standing",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 139,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1520523839898-507125cd53c1?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/The%20last%20man%20standing.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "The last man standing.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 306,
    "plays": 2890
  },
  {
    "id": "4cb8afc8-349b-4d6f-b391-2d01c13d7442",
    "title": "Sous les toits",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "francais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 140,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Sous%20les%20toits.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Sous les toits.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 261,
    "plays": 647
  },
  {
    "id": "ce2b2c0f-9705-4ca9-b820-363affe400d2",
    "title": "Sous les ponts",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "francais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 141,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1526394931762-90052e97b376?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Sous%20les%20ponts.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Sous les ponts.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 209,
    "plays": 933
  },
  {
    "id": "74bd8109-21db-407e-b189-6aa20c918b26",
    "title": "Somewhere we belong",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 142,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Somewhere%20we%20belong.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Somewhere we belong.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 113,
    "plays": 3246
  },
  {
    "id": "63d716f4-15bc-4099-93bc-feef61c1d609",
    "title": "Runaway lights",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 143,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Runaway%20lights.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Runaway lights.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 349,
    "plays": 2306
  },
  {
    "id": "22a9382f-0dc2-4452-ba2a-bd46361fec4d",
    "title": "Run until the morning",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 144,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Run%20until%20the%20morning.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Run until the morning.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 184,
    "plays": 2227
  },
  {
    "id": "9bed8490-019c-4667-bf32-be347f37b050",
    "title": "Nothing can stop us",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 145,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Nothing%20can%20stop%20us.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Nothing can stop us.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 128,
    "plays": 1245
  },
  {
    "id": "4ee02e82-8314-436e-bc26-638c1fa354b0",
    "title": "Nos deux",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "francais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 146,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Nos%20deux.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Nos deux.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 235,
    "plays": 1122
  },
  {
    "id": "f983c458-b111-4143-bc59-dfbe45afb086",
    "title": "No way back",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 147,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/No%20way%20back.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "No way back.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 101,
    "plays": 3297
  },
  {
    "id": "62977ac3-6f22-49de-8895-3536e25eb13c",
    "title": "No sleep tonight ( instrumental)",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "instrumentale",
    "type": "instrumental",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 148,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/No%20sleep%20tonight%20(%20instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "No sleep tonight ( instrumental).wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 305,
    "plays": 1830
  },
  {
    "id": "c38202ea-dcd1-4e69-806a-10721eb61643",
    "title": "No sleep tonight ( acapulca)",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "accapella",
    "type": "acapella",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 149,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Accapella",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/No%20sleep%20tonight%20(%20acapulca).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "No sleep tonight ( acapulca).wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 344,
    "plays": 1983
  },
  {
    "id": "1eb4a5ec-97a6-404d-9c99-30a70400a137",
    "title": "No more may be",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 130,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/No%20more%20may%20be.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "No more may be.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 144,
    "plays": 1493
  },
  {
    "id": "63ecc66f-a2f2-490e-921a-5bd4349694e1",
    "title": "Neon hearts",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 131,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1520523839898-507125cd53c1?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Neon%20hearts.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Neon hearts.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 314,
    "plays": 855
  },
  {
    "id": "31e7e8a0-598b-46a0-b457-56022b4348f7",
    "title": "Midnight radio",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 132,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Midnight%20radio.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Midnight radio.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 59,
    "plays": 3261
  },
  {
    "id": "9ce4b046-2173-4336-8268-fe504cf449c4",
    "title": "Lost in the night ( acapulca)",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "accapella",
    "type": "acapella",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 133,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Accapella",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1526394931762-90052e97b376?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Lost%20in%20the%20night%20(%20acapulca).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Lost in the night ( acapulca).wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 227,
    "plays": 3392
  },
  {
    "id": "1619e82e-7921-4cfe-a1a7-92e05d61b496",
    "title": "Lost in the lights ( instrumental)",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "instrumentale",
    "type": "instrumental",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 134,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Lost%20in%20the%20lights%20(%20instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Lost in the lights ( instrumental).wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 66,
    "plays": 1616
  },
  {
    "id": "af6af599-12d6-4d3f-841a-95debf93543a",
    "title": "Living on a prayer",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 135,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Living%20on%20a%20prayer.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Living on a prayer.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 157,
    "plays": 991
  },
  {
    "id": "39e877c4-3582-4526-8919-2917fc94863a",
    "title": "Light up the room",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 136,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Light%20up%20the%20room.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Light up the room.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 315,
    "plays": 3121
  },
  {
    "id": "f2766e77-b261-42b0-a41a-b2d401f39c43",
    "title": "Into the wild",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 137,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Into%20the%20wild.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Into the wild.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 54,
    "plays": 2701
  },
  {
    "id": "504435fe-d9d6-41fb-9b26-8faee058ca65",
    "title": "Into the wild ( instrumental)",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "instrumentale",
    "type": "instrumental",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 138,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Into%20the%20wild%20(%20instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Into the wild ( instrumental).wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 247,
    "plays": 2348
  },
  {
    "id": "999fb67c-c1a3-4638-a1f3-12027c786fb8",
    "title": "Ican feel it",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 139,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Ican%20feel%20it.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Ican feel it.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 147,
    "plays": 1466
  },
  {
    "id": "db207c7c-f572-4665-9cf7-45f727f7c1ac",
    "title": "Golden skies",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 140,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Golden%20skies.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Golden skies.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 217,
    "plays": 1710
  },
  {
    "id": "89c488a0-877e-4bb7-afbc-302606aca791",
    "title": "Golden skies ( instrumental)",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "instrumentale",
    "type": "instrumental",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 141,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Golden%20skies%20(%20instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Golden skies ( instrumental).wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 106,
    "plays": 3539
  },
  {
    "id": "29eac18c-5d4e-4178-a041-174eadd823b5",
    "title": "Golden hour state of mind",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 142,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Golden%20hour%20state%20of%20mind.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Golden hour state of mind.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 347,
    "plays": 2344
  },
  {
    "id": "a2ea1e9c-0f22-4335-8cb0-3eea343a1d0e",
    "title": "Fire in the night",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 143,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1520523839898-507125cd53c1?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Fire%20in%20the%20night.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Fire in the night.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 339,
    "plays": 2140
  },
  {
    "id": "41679036-ed3d-4646-94ff-51345e4f6077",
    "title": "Fire in the night( instrumental)",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "instrumentale",
    "type": "instrumental",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 144,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Fire%20in%20the%20night(%20instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Fire in the night( instrumental).wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 101,
    "plays": 1924
  },
  {
    "id": "91713d9a-7be9-4795-80a6-958c78fc1e76",
    "title": "Feel so good",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 145,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1526394931762-90052e97b376?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Feel%20so%20good.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Feel so good.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 222,
    "plays": 2025
  },
  {
    "id": "d6be028a-4189-4992-a472-b2dc9b44da73",
    "title": "Electric tonight",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 146,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Electric%20tonight.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Electric tonight.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 88,
    "plays": 2849
  },
  {
    "id": "50e08d92-7d1a-420a-be61-e4be1df311a0",
    "title": "Electric tonight (instrumental)",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "instrumentale",
    "type": "instrumental",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 147,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Electric%20tonight%20(instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Electric tonight (instrumental).wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 199,
    "plays": 1420
  },
  {
    "id": "4901539b-783d-46bf-8612-527d910d1e15",
    "title": "Electric hearts",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 148,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Electric%20hearts.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Electric hearts.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 240,
    "plays": 632
  },
  {
    "id": "7a65b10c-8533-4b5d-8cc9-0be073372c5d",
    "title": "Electric hearts( instrumental)",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "instrumentale",
    "type": "instrumental",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 149,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Electric%20hearts(%20instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Electric hearts( instrumental).wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 304,
    "plays": 1893
  },
  {
    "id": "31d0ec9e-4a94-438e-9690-228941852d5a",
    "title": "Dust on my boots",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 130,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Dust%20on%20my%20boots.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Dust on my boots.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 99,
    "plays": 1894
  },
  {
    "id": "712a6bcb-a70f-447a-8540-032bba905db8",
    "title": "Cite  after dark",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 131,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Cite%20%20after%20dark.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Cite  after dark.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 135,
    "plays": 1281
  },
  {
    "id": "d8671a4f-0327-48fd-a9ff-c826f6fa2982",
    "title": "Chasing the horizon",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 132,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Chasing%20the%20horizon.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Chasing the horizon.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 343,
    "plays": 1481
  },
  {
    "id": "9d89e0b8-14fb-406a-af5c-5966424ad62a",
    "title": "Chasing the horizon ( instrumental)",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "instrumentale",
    "type": "instrumental",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 133,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Chasing%20the%20horizon%20(%20instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Chasing the horizon ( instrumental).wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 260,
    "plays": 1677
  },
  {
    "id": "ef230398-bbd9-4209-836a-5051301ae45a",
    "title": "Born for the ride",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 134,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Born%20for%20the%20ride.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Born for the ride.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 191,
    "plays": 498
  },
  {
    "id": "312b2107-e033-42b8-908d-08e288b799f4",
    "title": "Born for the ride ( instrumental)",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "instrumentale",
    "type": "instrumental",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 135,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1520523839898-507125cd53c1?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Born%20for%20the%20ride%20(%20instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Born for the ride ( instrumental).wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 212,
    "plays": 2661
  },
  {
    "id": "497d5519-d482-4bf7-883b-f0b4ea3cc244",
    "title": "Beyond the city lights",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 136,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Beyond%20the%20city%20lights.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Beyond the city lights.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 266,
    "plays": 2176
  },
  {
    "id": "a137d502-b344-4af1-8c57-7619b2d95d89",
    "title": "Beyond the city lights ( instrumental)",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "instrumentale",
    "type": "instrumental",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 137,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1526394931762-90052e97b376?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Beyond%20the%20city%20lights%20(%20instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Beyond the city lights ( instrumental).wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 340,
    "plays": 2634
  },
  {
    "id": "b854b816-3784-436b-bb88-4b2aff4e656b",
    "title": "Ashes on the highway",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 138,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Ashes%20on%20the%20highway.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Ashes on the highway.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 37,
    "plays": 2989
  },
  {
    "id": "4c2ff5c1-0fce-4680-a062-c202224b3967",
    "title": "After the storm",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 139,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/After%20the%20storm.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "After the storm.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 263,
    "plays": 1001
  },
  {
    "id": "f1cc0d4b-1852-41af-961a-8159c4f36fb8",
    "title": "After the last dance",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "unreleased",
    "category": "anglais",
    "type": "vocal",
    "price": 2.49,
    "mp3Price": 2.49,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 140,
    "key": "D Minor",
    "tags": [
      "In\xE9dite",
      "Unreleased",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/After%20the%20last%20dance.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "After the last dance.wav",
    "fileSize": "45 MB",
    "featured": false,
    "likes": 33,
    "plays": 2440
  },
  {
    "id": "track_16",
    "title": "Cite after dark",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 141,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Cite%20after%20dark.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Cite after dark.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 229,
    "plays": 1340
  },
  {
    "id": "track_3a488fcd",
    "title": "what-the-road-took",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 142,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/what-the-road-took.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "what-the-road-took.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 147,
    "plays": 991
  },
  {
    "id": "track_ef6e6d60",
    "title": "what-the-road-took-intrumental",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 143,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/what-the-road-took-intrumental.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "what-the-road-took-intrumental.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 103,
    "plays": 999
  },
  {
    "id": "track_2cb6f2f2",
    "title": "Where the dust meet the sky",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "instrumentale",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 144,
    "key": "D Minor",
    "tags": [
      "Released",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Where%20the%20dust%20meet%20the%20sky.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Where the dust meet the sky.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 36,
    "plays": 1939
  },
  {
    "id": "track_5c7463ab",
    "title": "Tu es ma chanson",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 145,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Tu%20es%20ma%20chanson.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Tu es ma chanson.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 307,
    "plays": 2434
  },
  {
    "id": "track_e8cec7af",
    "title": "Tu as rougie pour moi",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 146,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Tu%20as%20rougie%20pour%20moi.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Tu as rougie pour moi.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 130,
    "plays": 2400
  },
  {
    "id": "track_b380ac19",
    "title": "where the dust meet the sky",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 147,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/where%20the%20dust%20meet%20the%20sky.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "where the dust meet the sky.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 98,
    "plays": 3084
  },
  {
    "id": "track_891d3f44",
    "title": "Love looks good on us (instrumental)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "instrumentale",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 148,
    "key": "D Minor",
    "tags": [
      "Released",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Love%20looks%20good%20on%20us%20(instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Love looks good on us (instrumental).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 283,
    "plays": 1481
  },
  {
    "id": "track_48f9d385",
    "title": "Love looks good on us( acapila)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "accapella",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 149,
    "key": "D Minor",
    "tags": [
      "Released",
      "Accapella",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Love%20looks%20good%20on%20us(%20acapila).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Love looks good on us( acapila).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 252,
    "plays": 2105
  },
  {
    "id": "track_238c52ef",
    "title": "Love looks good on us",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 130,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Love%20looks%20good%20on%20us.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Love looks good on us.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 255,
    "plays": 2477
  },
  {
    "id": "track_75567a56",
    "title": "Best part of my day ( instrumental)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "instrumentale",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 131,
    "key": "D Minor",
    "tags": [
      "Released",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Best%20part%20of%20my%20day%20(%20instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Best part of my day ( instrumental).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 337,
    "plays": 2346
  },
  {
    "id": "track_67e4d914",
    "title": "Best part of my day( acapila)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "accapella",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 132,
    "key": "D Minor",
    "tags": [
      "Released",
      "Accapella",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Best%20part%20of%20my%20day(%20acapila).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Best part of my day( acapila).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 330,
    "plays": 2232
  },
  {
    "id": "track_2ac34f71",
    "title": "Best part of my day",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 133,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Best%20part%20of%20my%20day.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Best part of my day.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 121,
    "plays": 2170
  },
  {
    "id": "track_02e84f6b",
    "title": "Dancing into your heart (acapila)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "accapella",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 134,
    "key": "D Minor",
    "tags": [
      "Released",
      "Accapella",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Dancing%20into%20your%20heart%20(acapila).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Dancing into your heart (acapila).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 90,
    "plays": 550
  },
  {
    "id": "track_3b4e6b4c",
    "title": "Dancing into your heart( instrumental)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "instrumentale",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 135,
    "key": "D Minor",
    "tags": [
      "Released",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Dancing%20into%20your%20heart(%20instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Dancing into your heart( instrumental).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 83,
    "plays": 1808
  },
  {
    "id": "track_a7836fe7",
    "title": "Dancing into your heart",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 136,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Dancing%20into%20your%20heart.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Dancing into your heart.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 328,
    "plays": 3404
  },
  {
    "id": "track_5184570d",
    "title": "Drive me home tonight( acapila)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "accapella",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 137,
    "key": "D Minor",
    "tags": [
      "Released",
      "Accapella",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Drive%20me%20home%20tonight(%20acapila).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Drive me home tonight( acapila).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 121,
    "plays": 2729
  },
  {
    "id": "track_2c3e0804",
    "title": "Drive me home tonight",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 138,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Drive%20me%20home%20tonight.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Drive me home tonight.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 286,
    "plays": 1373
  },
  {
    "id": "track_f7daa68c",
    "title": "Drive me home tonight( instrumental)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "instrumentale",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 139,
    "key": "D Minor",
    "tags": [
      "Released",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Drive%20me%20home%20tonight(%20instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Drive me home tonight( instrumental).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 121,
    "plays": 3292
  },
  {
    "id": "track_5b90ebef",
    "title": "Every little thing ( acapila)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "accapella",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 140,
    "key": "D Minor",
    "tags": [
      "Released",
      "Accapella",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Every%20little%20thing%20(%20acapila).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Every little thing ( acapila).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 273,
    "plays": 1807
  },
  {
    "id": "track_6b1130ee",
    "title": "Every little thing ( instrumental)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "instrumentale",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 141,
    "key": "D Minor",
    "tags": [
      "Released",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Every%20little%20thing%20(%20instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Every little thing ( instrumental).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 307,
    "plays": 2423
  },
  {
    "id": "track_4e181532",
    "title": "Evry little thing",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 142,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Evry%20little%20thing.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Evry little thing.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 79,
    "plays": 1660
  },
  {
    "id": "track_69646ce5",
    "title": "Love found us dancing (instrumental)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "instrumentale",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 143,
    "key": "D Minor",
    "tags": [
      "Released",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Love%20found%20us%20dancing%20(instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Love found us dancing (instrumental).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 315,
    "plays": 641
  },
  {
    "id": "track_c55c9b3b",
    "title": "Love found us dancing",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 144,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Love%20found%20us%20dancing.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Love found us dancing.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 296,
    "plays": 2579
  },
  {
    "id": "track_7406ddfe",
    "title": "Love found us dancing( acapila)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "accapella",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 145,
    "key": "D Minor",
    "tags": [
      "Released",
      "Accapella",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Love%20found%20us%20dancing(%20acapila).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Love found us dancing( acapila).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 271,
    "plays": 1766
  },
  {
    "id": "track_eb2aa38c",
    "title": "Make our own sunshine ( acapila)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "accapella",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 146,
    "key": "D Minor",
    "tags": [
      "Released",
      "Accapella",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Make%20our%20own%20sunshine%20(%20acapila).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Make our own sunshine ( acapila).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 264,
    "plays": 1183
  },
  {
    "id": "track_1fbbefc5",
    "title": "Make our own sunshine ( instrumental)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "instrumentale",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 147,
    "key": "D Minor",
    "tags": [
      "Released",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Make%20our%20own%20sunshine%20(%20instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Make our own sunshine ( instrumental).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 335,
    "plays": 1122
  },
  {
    "id": "track_698ffeeb",
    "title": "Make our own sunshine",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 148,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Make%20our%20own%20sunshine.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Make our own sunshine.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 33,
    "plays": 1645
  },
  {
    "id": "track_edaaf0ee",
    "title": "Monday feels like friday( acapila)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "accapella",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 149,
    "key": "D Minor",
    "tags": [
      "Released",
      "Accapella",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Monday%20feels%20like%20friday(%20acapila).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Monday feels like friday( acapila).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 142,
    "plays": 2030
  },
  {
    "id": "track_467fab17",
    "title": "Monday feels like friday( instrumental)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "instrumentale",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 130,
    "key": "D Minor",
    "tags": [
      "Released",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Monday%20feels%20like%20friday(%20instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Monday feels like friday( instrumental).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 71,
    "plays": 649
  },
  {
    "id": "track_af7ed093",
    "title": "Monday feels like friday",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 131,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Monday%20feels%20like%20friday.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Monday feels like friday.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 132,
    "plays": 825
  },
  {
    "id": "track_37fb58ef",
    "title": "One more song ( acapila)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "accapella",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 132,
    "key": "D Minor",
    "tags": [
      "Released",
      "Accapella",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/One%20more%20song%20(%20acapila).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "One more song ( acapila).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 330,
    "plays": 1916
  },
  {
    "id": "track_c77d2e71",
    "title": "One more song ( instrumental)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "instrumentale",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 133,
    "key": "D Minor",
    "tags": [
      "Released",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/One%20more%20song%20(%20instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "One more song ( instrumental).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 32,
    "plays": 1632
  },
  {
    "id": "track_e47a311c",
    "title": "One more song",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 134,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/One%20more%20song.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "One more song.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 187,
    "plays": 1301
  },
  {
    "id": "track_0fc20a65",
    "title": "Tonight feels like forever( acapila)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "accapella",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 135,
    "key": "D Minor",
    "tags": [
      "Released",
      "Accapella",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Tonight%20feels%20like%20forever(%20acapila).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Tonight feels like forever( acapila).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 262,
    "plays": 3222
  },
  {
    "id": "track_c06907b8",
    "title": "Tonight feels like forever( instrumental)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "instrumentale",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 136,
    "key": "D Minor",
    "tags": [
      "Released",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Tonight%20feels%20like%20forever(%20instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Tonight feels like forever( instrumental).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 114,
    "plays": 3502
  },
  {
    "id": "track_5a3a1b1c",
    "title": "Tonight feels like forever",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 137,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Tonight%20feels%20like%20forever.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Tonight feels like forever.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 254,
    "plays": 2292
  },
  {
    "id": "track_3302c5e5",
    "title": "Under the city lights ( acapila)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "accapella",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 138,
    "key": "D Minor",
    "tags": [
      "Released",
      "Accapella",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Under%20the%20city%20lights%20(%20acapila).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Under the city lights ( acapila).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 48,
    "plays": 439
  },
  {
    "id": "track_cf778ca9",
    "title": "Under the city lights (instrumental)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "instrumentale",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 139,
    "key": "D Minor",
    "tags": [
      "Released",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Under%20the%20city%20lights%20(instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Under the city lights (instrumental).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 194,
    "plays": 2783
  },
  {
    "id": "track_7dd0753a",
    "title": "Under the city lights",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 140,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Under%20the%20city%20lights.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Under the city lights.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 108,
    "plays": 2922
  },
  {
    "id": "track_b13392c7",
    "title": "We own this night ( instrumental)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "instrumentale",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 141,
    "key": "D Minor",
    "tags": [
      "Released",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/We%20own%20this%20night%20(%20instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "We own this night ( instrumental).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 75,
    "plays": 2163
  },
  {
    "id": "track_1d387347",
    "title": "We own this night( acapila)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "accapella",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 142,
    "key": "D Minor",
    "tags": [
      "Released",
      "Accapella",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/We%20own%20this%20night(%20acapila).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "We own this night( acapila).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 233,
    "plays": 436
  },
  {
    "id": "track_f8722a9a",
    "title": "We own this night",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 143,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/We%20own%20this%20night.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "We own this night.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 287,
    "plays": 1388
  },
  {
    "id": "track_fab92970",
    "title": "Where love leads (acapila)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "accapella",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 144,
    "key": "D Minor",
    "tags": [
      "Released",
      "Accapella",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Where%20love%20leads%20(acapila).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Where love leads (acapila).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 133,
    "plays": 3011
  },
  {
    "id": "track_15bde57f",
    "title": "Where love leads (instrumental)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "instrumentale",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 145,
    "key": "D Minor",
    "tags": [
      "Released",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Where%20love%20leads%20(instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Where love leads (instrumental).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 38,
    "plays": 2450
  },
  {
    "id": "track_38aab3f8",
    "title": "Where love leads",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 146,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Where%20love%20leads.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Where love leads.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 299,
    "plays": 2863
  },
  {
    "id": "track_b634cc23",
    "title": "You turned my world around ( instrumental)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "instrumentale",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 147,
    "key": "D Minor",
    "tags": [
      "Released",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/You%20turned%20my%20world%20around%20(%20instrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "You turned my world around ( instrumental).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 318,
    "plays": 1797
  },
  {
    "id": "track_e0b9eb99",
    "title": "You turned my world around (acapila)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "accapella",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 148,
    "key": "D Minor",
    "tags": [
      "Released",
      "Accapella",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/You%20turned%20my%20world%20around%20(acapila).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "You turned my world around (acapila).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 92,
    "plays": 2266
  },
  {
    "id": "track_18d0bafc",
    "title": "You turned my world around",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 149,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/You%20turned%20my%20world%20around%20.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "You turned my world around.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 245,
    "plays": 1119
  },
  {
    "id": "track_fa7097ad",
    "title": "What the rood took(Acapela)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "accapella",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 130,
    "key": "D Minor",
    "tags": [
      "Released",
      "Accapella",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/What%20the%20rood%20took(Acapela).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "What the rood took(Acapela).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 150,
    "plays": 870
  },
  {
    "id": "track_04644b50",
    "title": "What the road took",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 131,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/What%20the%20road%20took.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "What the road took.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 82,
    "plays": 994
  },
  {
    "id": "track_d7bd1ce2",
    "title": "What the road took(intrumental)",
    "description": "HQ Master Audio \u2022 320kbps",
    "status": "released",
    "category": "instrumentale",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 132,
    "key": "D Minor",
    "tags": [
      "Released",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/What%20the%20road%20took(intrumental).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "What the road took(intrumental).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 255,
    "plays": 1682
  },
  {
    "id": "1e949267-e951-4eb3-af4e-47a6e4116c26",
    "title": "Your name in the wall",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 133,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Your%20name%20in%20the%20wall.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Your name in the wall.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 72,
    "plays": 828
  },
  {
    "id": "0ecfca2e-418d-4f6e-bf74-b05ae66aa133",
    "title": "We have the sun",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 134,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/We%20have%20the%20sun.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "We have the sun.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 313,
    "plays": 1485
  },
  {
    "id": "e4024213-f0e3-4684-b3b2-49a83288ce74",
    "title": "Valerie my love",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 135,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1520523839898-507125cd53c1?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Valerie%20my%20love.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Valerie my love.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 189,
    "plays": 540
  },
  {
    "id": "465a3a92-da44-4fc0-986e-380dd8464e88",
    "title": "Un amour de nuit",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 136,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Un%20amour%20de%20nuit.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Un amour de nuit.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 183,
    "plays": 3245
  },
  {
    "id": "f27a919b-4da4-4218-9929-070f94583565",
    "title": "Tu es \xE0 moi",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 137,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1526394931762-90052e97b376?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Tu%20es%20%C3%A0%20moi.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Tu es \xE0 moi.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 268,
    "plays": 1569
  },
  {
    "id": "8b7091fa-cb13-4a52-b681-f8ae1d944768",
    "title": "Tu es paertie sans bruit",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 138,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Tu%20es%20paertie%20sans%20bruit.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Tu es paertie sans bruit.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 113,
    "plays": 679
  },
  {
    "id": "2ac0ddcf-c7fc-44eb-8da8-6ff957c413e9",
    "title": "Ton sourire est une lumi\xE8re",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 139,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Ton%20sourire%20est%20une%20lumi%C3%A8re.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Ton sourire est une lumi\xE8re.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 264,
    "plays": 1652
  },
  {
    "id": "0b06b17d-6ce0-4370-a5f0-b7e0daaa9e05",
    "title": "Ton parfum sur mon echarpe",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 140,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Ton%20parfum%20sur%20mon%20echarpe.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Ton parfum sur mon echarpe.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 112,
    "plays": 2273
  },
  {
    "id": "c9216d41-26e7-4f89-ac67-8ca0fc87e623",
    "title": "The town we left behind",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 141,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/The%20town%20we%20left%20behind.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "The town we left behind.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 263,
    "plays": 3401
  },
  {
    "id": "6ec6a2d0-faed-416c-9f72-832b91cb8b8c",
    "title": "T'as du faire un choix",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 142,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/T'as%20du%20faire%20un%20choix.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "T'as du faire un choix.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 209,
    "plays": 3095
  },
  {
    "id": "dacebe9e-7204-4a38-871e-e12d7bc7c453",
    "title": "Sans me dire pourquoi",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 143,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Sans%20me%20dire%20pourquoi.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Sans me dire pourquoi.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 235,
    "plays": 3429
  },
  {
    "id": "6e2f649b-7195-4f3b-afdf-48c772731e1a",
    "title": "Rich girl (duet)",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 144,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Rich%20girl%20(duet).mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Rich girl (duet).wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 194,
    "plays": 2133
  },
  {
    "id": "30262458-0a81-4e83-aa01-905d9a94ec73",
    "title": "Reine de mon coeur",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 145,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Reine%20de%20mon%20coeur.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Reine de mon coeur.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 179,
    "plays": 3018
  },
  {
    "id": "a6fdfdc1-1853-4de2-ab81-5d057326de21",
    "title": "Par hasard",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 146,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Par%20hasard.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Par hasard.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 55,
    "plays": 1429
  },
  {
    "id": "cfca0618-55e1-49df-97c0-3f7074fc1807",
    "title": "On va ecrire notre histoire",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 147,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1520523839898-507125cd53c1?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/On%20va%20ecrire%20notre%20histoire.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "On va ecrire notre histoire.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 130,
    "plays": 3042
  },
  {
    "id": "8f561856-be66-47de-8ec7-d45936a99a28",
    "title": "On s'est aim\xE8 \xE0 paris",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 148,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/On%20s'est%20aim%C3%A8%20%C3%A0%20paris.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "On s'est aim\xE8 \xE0 paris.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 309,
    "plays": 1505
  },
  {
    "id": "f9f26690-b302-43ac-a4d4-60e947e50e25",
    "title": "On est bien",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 149,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1526394931762-90052e97b376?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/On%20est%20bien.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "On est bien.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 70,
    "plays": 2798
  },
  {
    "id": "d6c629cc-50eb-49cc-9866-67461ec3da31",
    "title": "On dance c'est tout",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 130,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/On%20dance%20c'est%20tout.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "On dance c'est tout.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 92,
    "plays": 2114
  },
  {
    "id": "7654c940-09bc-494b-bb07-171a70164719",
    "title": "Now you came back",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 131,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Now%20you%20came%20back.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Now you came back.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 309,
    "plays": 942
  },
  {
    "id": "028221cf-370d-4d06-8932-071705145ddd",
    "title": "Nos levres \xE0 minuit",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 132,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Nos%20levres%20%C3%A0%20minuit.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Nos levres \xE0 minuit.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 281,
    "plays": 2650
  },
  {
    "id": "1d68247f-074c-46ba-98f6-c37f05fafdfa",
    "title": "Mon coeur battait pour toi",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 133,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Mon%20coeur%20battait%20pour%20toi.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Mon coeur battait pour toi.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 227,
    "plays": 2270
  },
  {
    "id": "f41a34f0-9fd0-48f7-b215-848ca5938e35",
    "title": "Midnight in paris",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 134,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Midnight%20in%20paris.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Midnight in paris.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 147,
    "plays": 1392
  },
  {
    "id": "6c0c5868-0d42-4994-a98d-40daa59dfd1a",
    "title": "Les mots qu'on a pas dit",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 135,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Les%20mots%20qu'on%20a%20pas%20dit.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Les mots qu'on a pas dit.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 275,
    "plays": 1436
  },
  {
    "id": "94ed6c71-15eb-45f7-a538-68a2523832b4",
    "title": "L'amour n'est qu'illusion",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 136,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/L'amour%20n'est%20qu'illusion.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "L'amour n'est qu'illusion.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 329,
    "plays": 536
  },
  {
    "id": "c51a56fc-4665-4dab-975d-fae0f972221b",
    "title": "Jai ecrit ton nom partout",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 137,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Jai%20ecrit%20ton%20nom%20partout.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Jai ecrit ton nom partout.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 99,
    "plays": 1895
  },
  {
    "id": "3b81dd88-a76b-4464-baca-1d548a6dca7a",
    "title": "I saw you dancing",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 138,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/I%20saw%20you%20dancing.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "I saw you dancing.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 71,
    "plays": 577
  },
  {
    "id": "87ba5ec0-b0be-407a-88a4-77a9b0822539",
    "title": "Hearthbeat \xE0 paris",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 139,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Hearthbeat%20%C3%A0%20paris.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Hearthbeat \xE0 paris.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 181,
    "plays": 2090
  },
  {
    "id": "f9a78a7b-ee96-48e1-8a4b-8bc5925ad143",
    "title": "Etoile de paris",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 140,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Etoile%20de%20paris.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Etoile de paris.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 183,
    "plays": 3397
  },
  {
    "id": "0f154a2b-a97a-463c-8b31-7077388f7c1f",
    "title": "Dardih chawi Instrumental",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "instrumentale",
    "type": "instrumental",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 141,
    "key": "D Minor",
    "tags": [
      "Released",
      "Instrumentale",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1526394931762-90052e97b376?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Dardih%20chawi%20Instrumental.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Dardih chawi Instrumental.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 239,
    "plays": 1906
  },
  {
    "id": "5a3299e3-e29a-45a7-b4d4-5930bf6b161f",
    "title": "Dance dance encore",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 142,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Dance%20dance%20encore.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Dance dance encore.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 288,
    "plays": 2051
  },
  {
    "id": "d8765a82-7c5f-42f2-b93a-1bf3641faeb8",
    "title": "Dance avec moi ce soir",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 143,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Dance%20avec%20moi%20ce%20soir.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Dance avec moi ce soir.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 149,
    "plays": 3492
  },
  {
    "id": "f047d802-ee11-4cb1-b97e-357d2fb77796",
    "title": "Cette nuit est \xE0 nous",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 144,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Cette%20nuit%20est%20%C3%A0%20nous.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Cette nuit est \xE0 nous.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 175,
    "plays": 2401
  },
  {
    "id": "c94183e8-5cec-4da9-95dd-31bae7676aef",
    "title": "C'est une evidence",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 145,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/C'est%20une%20evidence.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "C'est une evidence.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 314,
    "plays": 3415
  },
  {
    "id": "60494531-d6d1-4796-95d1-ddec2cf89c9e",
    "title": "C'est plus fort que l'amour",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 146,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/C'est%20plus%20fort%20que%20l'amour.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "C'est plus fort que l'amour.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 86,
    "plays": 654
  },
  {
    "id": "886ef61c-0a45-4931-93c7-9e6f301636c4",
    "title": "Blackboeard heart",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "anglais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 147,
    "key": "D Minor",
    "tags": [
      "Released",
      "Anglais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Blackboeard%20heart.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Blackboeard heart.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 284,
    "plays": 694
  },
  {
    "id": "f9e98d32-f785-4bbb-94d7-011e73ccd67c",
    "title": "Aux caraibes avec toi",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 148,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Aux%20caraibes%20avec%20toi.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Aux caraibes avec toi.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 314,
    "plays": 2855
  },
  {
    "id": "4e9f91ab-cf0f-4a51-a1ce-f0a855591a10",
    "title": "Alors comme t'es partie",
    "description": "HQ Studio Master \u2022 320kbps",
    "status": "released",
    "category": "francais",
    "type": "vocal",
    "price": 0.99,
    "mp3Price": 0.99,
    "wavPrice": 2.49,
    "currency": "$",
    "bpm": 149,
    "key": "D Minor",
    "tags": [
      "Released",
      "Francais",
      "Studio Master"
    ],
    "coverImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    "audioPreviewUrl": "https://music.fallen75.com/mp3/Alors%20comme%20t'es%20partie.mp3",
    "audioPreset": "drill_dark",
    "downloadFileName": "Alors comme t'es partie.wav",
    "fileSize": "35 MB",
    "featured": false,
    "likes": 333,
    "plays": 2442
  }
];

// src/data/initialData.ts
var INITIAL_PAYMENT_CONFIG = {
  crypto: {
    usdtTron: {
      label: "USDT (TRC20)",
      network: "TRON Network (TRC20)",
      address: "TGCFdvC4qCJNUJpt31TyxuVCM1doERyJAe",
      buttonText: "Copy USDT Address",
      active: true,
      instructions: "Send only USDT via the TRON network (TRC20). Any transfer via another network (ERC20, BSC) will be permanently lost."
    },
    ethereum: {
      label: "Ethereum (ETH)",
      network: "Ethereum Mainnet (ERC20)",
      address: "0x983dA5413e8755f027DaF36611f1D98Ecfce0300",
      buttonText: "Copy Ethereum Address",
      active: true,
      instructions: "Send ETH or ERC20 tokens strictly on the Ethereum Mainnet."
    },
    solana: {
      label: "Solana (SOL)",
      network: "Solana Network (SOL)",
      address: "HkxrjqehskPQy5HPw5zYKtQo877ntWScffMCHgXphW72",
      buttonText: "Copy Solana Address",
      active: true,
      instructions: "Send SOL strictly on the native Solana Mainnet."
    }
  },
  otherMethods: {
    skrill: {
      label: "Skrill",
      account: "azzoulaali@hotmail.com",
      instructions: "Send a direct Skrill transfer to azzoulaali@hotmail.com with the beat title as transaction reference.",
      active: true
    },
    redotpay: {
      label: "RedotPay (Visa Card)",
      account: "lawofice66@gmail.com",
      beneficiaryName: "Azzoula Ali",
      instructions: "Transfer to RedotPay account / Redot Visa card using email lawofice66@gmail.com (Cardholder: Azzoula Ali). Include the beat title.",
      active: true
    }
  },
  adminPasswordHash: "FALLEN2026AA",
  contactEmail: "lawofice66@gmail.com",
  contactAddress: "75 Rue de Paris, 75000 Paris, France",
  contactCity: "Paris",
  contactCountry: "France",
  contactPhone: "+33 1 42 68 75 00",
  socialLinks: {
    youtube: "https://youtube.com/@fallen75france",
    instagram: "https://instagram.com/fallen75france",
    twitter: "https://x.com/fallen75france",
    soundcloud: "https://soundcloud.com/fallen75france",
    spotify: "https://open.spotify.com/artist/fallen75france",
    telegram: "https://t.me/fallen75france"
  }
};
var INITIAL_TRACKS = GLOBAL_TRACKS_CATALOG;
var INITIAL_ORDERS = [
  {
    id: "F75-ORD-9021",
    trackId: "track-1",
    trackTitle: "75 SHADOWS",
    licenseType: "WAV ($2.49)",
    price: 2.49,
    currency: "$",
    clientEmail: "producer.paris@gmail.com",
    paymentMethod: "USDT (TRC20)",
    txHashOrRef: "e6a8f172b83491c3d90284716281746281927391746291028374619284716291",
    clientNotes: "Payment sent for WAV Master package.",
    status: "confirmed",
    createdAt: "2026-09-13T14:22:00Z",
    confirmedAt: "2026-09-13T14:45:00Z",
    downloadToken: "dl_tok_75shadows_demo9021"
  },
  {
    id: "F75-ORD-9022",
    trackId: "track-2",
    trackTitle: "PARIS NOIR 2026",
    licenseType: "MP3 ($0.99)",
    price: 0.99,
    currency: "$",
    clientEmail: "studio.records@outlook.fr",
    paymentMethod: "Solana",
    txHashOrRef: "4k8W9xLpQ2vNm7ZtJ1cE6uF8hR4dY3aT9sP5oM2wX7yU1",
    clientNotes: "MP3 License purchased via Phantom Wallet.",
    status: "pending",
    createdAt: "2026-09-14T06:15:00Z",
    downloadToken: "dl_tok_parisnoir_demo9022"
  }
];

// server/db.ts
var DATA_DIR = import_path.default.join(process.cwd(), "data");
var DB_FILE = import_path.default.join(DATA_DIR, "db.json");
if (!import_fs.default.existsSync(DATA_DIR)) {
  import_fs.default.mkdirSync(DATA_DIR, { recursive: true });
}
function loadDatabase() {
  try {
    if (import_fs.default.existsSync(DB_FILE)) {
      const content = import_fs.default.readFileSync(DB_FILE, "utf-8");
      const data = JSON.parse(content);
      if (data && Array.isArray(data.tracks)) {
        let changed = false;
        if (data.tracks.length < INITIAL_TRACKS.length) {
          const existingIds = new Set(data.tracks.map((t) => t.id));
          const existingTitles = new Set(data.tracks.map((t) => t.title.toLowerCase().trim()));
          for (const catalogTrack of INITIAL_TRACKS) {
            if (!existingIds.has(catalogTrack.id) && !existingTitles.has(catalogTrack.title.toLowerCase().trim())) {
              data.tracks.push(catalogTrack);
              changed = true;
            }
          }
        }
        const catalogMap = new Map(INITIAL_TRACKS.map((t) => [t.id, t]));
        for (const t of data.tracks) {
          if (t.likes === void 0 || t.plays === void 0) {
            const cat = catalogMap.get(t.id);
            if (t.likes === void 0) t.likes = cat?.likes || 42;
            if (t.plays === void 0) t.plays = cat?.plays || 750;
            changed = true;
          }
        }
        if (!data.paymentConfig?.socialLinks || !data.paymentConfig?.contactAddress) {
          data.paymentConfig = {
            ...INITIAL_PAYMENT_CONFIG,
            ...data.paymentConfig,
            contactAddress: data.paymentConfig?.contactAddress || INITIAL_PAYMENT_CONFIG.contactAddress,
            contactCity: data.paymentConfig?.contactCity || INITIAL_PAYMENT_CONFIG.contactCity,
            contactCountry: data.paymentConfig?.contactCountry || INITIAL_PAYMENT_CONFIG.contactCountry,
            contactPhone: data.paymentConfig?.contactPhone || INITIAL_PAYMENT_CONFIG.contactPhone,
            socialLinks: {
              ...INITIAL_PAYMENT_CONFIG.socialLinks,
              ...data.paymentConfig?.socialLinks || {}
            }
          };
          changed = true;
        }
        if (!data.paymentConfig?.otherMethods?.redotpay?.beneficiaryName || data.paymentConfig?.otherMethods?.redotpay?.account === "ID: 752026889") {
          data.paymentConfig = {
            ...INITIAL_PAYMENT_CONFIG,
            ...data.paymentConfig,
            otherMethods: {
              ...INITIAL_PAYMENT_CONFIG.otherMethods,
              ...data.paymentConfig?.otherMethods || {},
              redotpay: INITIAL_PAYMENT_CONFIG.otherMethods.redotpay,
              skrill: INITIAL_PAYMENT_CONFIG.otherMethods.skrill
            }
          };
          if (data.paymentConfig?.otherMethods?.payoneer) {
            delete data.paymentConfig.otherMethods.payoneer;
          }
          changed = true;
        }
        if (changed || (data.version || 1) < 2) {
          data.version = 2;
          saveDatabase(data);
        }
        return data;
      }
    }
  } catch (err) {
    console.error("Failed to load db.json, re-initializing default schema:", err);
  }
  const initialDb = {
    tracks: INITIAL_TRACKS,
    paymentConfig: INITIAL_PAYMENT_CONFIG,
    orders: INITIAL_ORDERS,
    version: 2
  };
  saveDatabase(initialDb);
  return initialDb;
}
function saveDatabase(data) {
  try {
    const tempFile = `${DB_FILE}.tmp`;
    import_fs.default.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
    import_fs.default.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error("Failed to save db.json:", err);
  }
}
function getTracks() {
  const db = loadDatabase();
  return db.tracks;
}
function getTrackById(id) {
  const db = loadDatabase();
  return db.tracks.find((t) => t.id === id);
}
function createTrack(trackData) {
  const db = loadDatabase();
  const id = trackData.id || `track-${Date.now()}`;
  const numPrice = trackData.price !== void 0 ? Number(trackData.price) : 0.99;
  const autoStatus = trackData.status === "unreleased" || numPrice >= 2.49 ? "unreleased" : "released";
  const autoCategory = trackData.category || autoStatus;
  const newTrack = {
    ...trackData,
    id,
    status: autoStatus,
    category: autoCategory,
    price: numPrice,
    mp3Price: autoStatus === "unreleased" ? numPrice : trackData.mp3Price !== void 0 ? Number(trackData.mp3Price) : 0.99,
    wavPrice: trackData.wavPrice !== void 0 ? Number(trackData.wavPrice) : 2.49,
    tags: Array.isArray(trackData.tags) ? trackData.tags : ["Beat", "Trap"],
    currency: trackData.currency || "$"
  };
  db.tracks = [newTrack, ...db.tracks];
  saveDatabase(db);
  return newTrack;
}
function updateTrack(id, updates) {
  const db = loadDatabase();
  const index = db.tracks.findIndex((t) => t.id === id);
  if (index === -1) return null;
  const prev = db.tracks[index];
  const newPrice = updates.price !== void 0 ? Number(updates.price) : prev.price;
  const newStatus = updates.status ? updates.status : newPrice >= 2.49 ? "unreleased" : "released";
  const newCategory = updates.category || newStatus;
  db.tracks[index] = {
    ...prev,
    ...updates,
    id,
    // protect id
    status: newStatus,
    category: newCategory,
    price: newPrice,
    mp3Price: newStatus === "unreleased" ? newPrice : updates.mp3Price !== void 0 ? Number(updates.mp3Price) : prev.mp3Price || 0.99,
    wavPrice: updates.wavPrice !== void 0 ? Number(updates.wavPrice) : prev.wavPrice || 2.49
  };
  saveDatabase(db);
  return db.tracks[index];
}
function deleteTrack(id) {
  const db = loadDatabase();
  const initialLength = db.tracks.length;
  db.tracks = db.tracks.filter((t) => t.id !== id);
  if (db.tracks.length !== initialLength) {
    saveDatabase(db);
    return true;
  }
  return false;
}
function likeTrack(id, delta = 1) {
  const db = loadDatabase();
  const track = db.tracks.find((t) => t.id === id);
  if (!track) return null;
  track.likes = Math.max(0, (track.likes || 0) + delta);
  saveDatabase(db);
  return track;
}
function recordTrackPlay(id) {
  const db = loadDatabase();
  const track = db.tracks.find((t) => t.id === id);
  if (!track) return null;
  track.plays = (track.plays || 0) + 1;
  saveDatabase(db);
  return track;
}
function getPaymentConfig() {
  const db = loadDatabase();
  return db.paymentConfig;
}
function updatePaymentConfig(newConfig) {
  const db = loadDatabase();
  db.paymentConfig = newConfig;
  saveDatabase(db);
  return db.paymentConfig;
}
function getOrders() {
  const db = loadDatabase();
  return db.orders;
}
function createOrder(order) {
  const db = loadDatabase();
  db.orders = [order, ...db.orders];
  saveDatabase(db);
  return order;
}
function updateOrderStatus(orderId, status, notes) {
  const db = loadDatabase();
  const index = db.orders.findIndex((o) => o.id === orderId);
  if (index === -1) return null;
  db.orders[index] = {
    ...db.orders[index],
    status,
    confirmedAt: status === "confirmed" ? (/* @__PURE__ */ new Date()).toISOString() : db.orders[index].confirmedAt,
    clientNotes: notes !== void 0 ? notes : db.orders[index].clientNotes
  };
  saveDatabase(db);
  return db.orders[index];
}

// server/storage.ts
var import_fs2 = __toESM(require("fs"), 1);
var import_path2 = __toESM(require("path"), 1);
var import_client_s3 = require("@aws-sdk/client-s3");
var UPLOADS_DIR = import_path2.default.join(process.cwd(), "uploads");
if (!import_fs2.default.existsSync(UPLOADS_DIR)) {
  import_fs2.default.mkdirSync(UPLOADS_DIR, { recursive: true });
}
function getR2Client() {
  const accountId = process.env.CF_R2_ACCOUNT_ID;
  const accessKeyId = process.env.CF_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CF_R2_SECRET_ACCESS_KEY;
  const bucket = process.env.CF_R2_BUCKET_NAME || "music-2026";
  const publicUrl = process.env.CF_R2_PUBLIC_URL || "";
  if (accountId && accessKeyId && secretAccessKey) {
    const client = new import_client_s3.S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey
      }
    });
    return { client, bucket, publicUrl };
  }
  return null;
}
async function saveUploadedFile(buffer, originalFilename, mimeType) {
  const ext = import_path2.default.extname(originalFilename).toLowerCase() || (mimeType.startsWith("image/") ? ".jpg" : ".mp3");
  const cleanName = import_path2.default.basename(originalFilename, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
  const key = `${Date.now()}_${cleanName}${ext}`;
  const r2 = getR2Client();
  if (r2) {
    try {
      await r2.client.send(
        new import_client_s3.PutObjectCommand({
          Bucket: r2.bucket,
          Key: key,
          Body: buffer,
          ContentType: mimeType,
          Metadata: {
            originalName: encodeURIComponent(originalFilename)
          }
        })
      );
      const url = r2.publicUrl ? `${r2.publicUrl.replace(/\/$/, "")}/${key}` : `/api/media/${key}`;
      return {
        url,
        key,
        size: buffer.length,
        mimeType,
        storage: "r2"
      };
    } catch (err) {
      console.error("Failed to upload to Cloudflare R2, falling back to local storage:", err);
    }
  }
  const filePath = import_path2.default.join(UPLOADS_DIR, key);
  import_fs2.default.writeFileSync(filePath, buffer);
  return {
    url: `/api/media/${key}`,
    key,
    size: buffer.length,
    mimeType,
    storage: "local"
  };
}
async function deleteMediaFile(key) {
  const cleanKey = import_path2.default.basename(key);
  const r2 = getR2Client();
  if (r2) {
    try {
      await r2.client.send(
        new import_client_s3.DeleteObjectCommand({
          Bucket: r2.bucket,
          Key: cleanKey
        })
      );
    } catch (err) {
      console.warn(`Could not delete from R2 bucket (${cleanKey}):`, err);
    }
  }
  const localPath = import_path2.default.join(UPLOADS_DIR, cleanKey);
  if (import_fs2.default.existsSync(localPath)) {
    try {
      import_fs2.default.unlinkSync(localPath);
      return true;
    } catch (e) {
      console.warn(`Could not delete local file (${cleanKey}):`, e);
    }
  }
  return true;
}
async function getMediaStream(key) {
  const cleanKey = import_path2.default.basename(key);
  const localPath = import_path2.default.join(UPLOADS_DIR, cleanKey);
  if (import_fs2.default.existsSync(localPath)) {
    const stats = import_fs2.default.statSync(localPath);
    const ext = import_path2.default.extname(cleanKey).toLowerCase();
    const contentType = getContentType(ext);
    const stream = import_fs2.default.createReadStream(localPath);
    return { stream, contentType, contentLength: stats.size };
  }
  const r2 = getR2Client();
  if (r2) {
    try {
      const response = await r2.client.send(
        new import_client_s3.GetObjectCommand({
          Bucket: r2.bucket,
          Key: cleanKey
        })
      );
      if (response.Body) {
        const stream = response.Body;
        return {
          stream,
          contentType: response.ContentType || "application/octet-stream",
          contentLength: response.ContentLength
        };
      }
    } catch (e) {
      console.error(`Media key ${cleanKey} not found in R2:`, e);
    }
  }
  return null;
}
function getContentType(ext) {
  switch (ext) {
    case ".mp3":
      return "audio/mpeg";
    case ".wav":
      return "audio/wav";
    case ".ogg":
      return "audio/ogg";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".svg":
      return "image/svg+xml";
    case ".zip":
      return "application/zip";
    default:
      return "application/octet-stream";
  }
}

// server/auth.ts
var import_crypto = __toESM(require("crypto"), 1);
var ADMIN_SECRET = process.env.ADMIN_SESSION_SECRET || "Fallen75France_AA2026_Session_Secret_9xK4mP7qL2vR8";
var PRIMARY_PASSWORD = process.env.ADMIN_PASSWORD || "FALLEN2026AA";
var ACCEPTED_PASSWORDS = [
  "FALLEN2026AA",
  "fallen2026aa",
  "12344321",
  "fallen75",
  "admin2026",
  process.env.ADMIN_PASSWORD
].filter(Boolean);
function isPasswordValid(input) {
  if (!input) return false;
  const cleaned = input.trim().toLowerCase();
  return ACCEPTED_PASSWORDS.some((p) => p.toLowerCase() === cleaned);
}
var validTokens = /* @__PURE__ */ new Map();
function generateToken(password) {
  if (!isPasswordValid(password)) {
    return null;
  }
  const random = import_crypto.default.randomBytes(24).toString("hex");
  const signature = import_crypto.default.createHmac("sha256", ADMIN_SECRET).update(random).digest("hex");
  const token = `${random}.${signature}`;
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1e3;
  validTokens.set(token, expiresAt);
  return token;
}
function verifyToken(token) {
  if (!token) return false;
  const cleanToken = token.startsWith("Bearer ") ? token.slice(7).trim() : token.trim();
  if (isPasswordValid(cleanToken)) {
    return true;
  }
  const parts = cleanToken.split(".");
  if (parts.length !== 2) return false;
  const [random, signature] = parts;
  const expected = import_crypto.default.createHmac("sha256", ADMIN_SECRET).update(random).digest("hex");
  if (signature !== expected) return false;
  const expiry = validTokens.get(cleanToken);
  if (expiry && expiry < Date.now()) {
    validTokens.delete(cleanToken);
    return false;
  }
  return true;
}
function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || req.headers["x-admin-key"];
  if (!verifyToken(authHeader)) {
    return res.status(401).json({
      error: "Acc\xE8s non autoris\xE9. Vous devez \xEAtre connect\xE9 en tant qu'administrateur.",
      code: "UNAUTHORIZED"
    });
  }
  next();
}

// server.ts
var PORT = 3e3;
var upload = (0, import_multer.default)({
  storage: import_multer.default.memoryStorage(),
  limits: {
    fileSize: 60 * 1024 * 1024
    // 60MB max for high-quality audio / WAV / MP3 / images
  }
});
async function startServer() {
  const app = (0, import_express.default)();
  app.use((0, import_cors.default)());
  app.use(import_express.default.json({ limit: "10mb" }));
  app.use(import_express.default.urlencoded({ extended: true, limit: "10mb" }));
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      time: (/* @__PURE__ */ new Date()).toISOString(),
      cloudflareR2Configured: !!(process.env.CF_R2_ACCOUNT_ID && process.env.CF_R2_ACCESS_KEY_ID && process.env.CF_R2_SECRET_ACCESS_KEY)
    });
  });
  app.post("/api/auth/login", (req, res) => {
    const { password } = req.body || {};
    if (!password) {
      return res.status(400).json({ error: "Mot de passe requis." });
    }
    const token = generateToken(password);
    if (!token) {
      return res.status(401).json({ error: "Mot de passe administrateur incorrect." });
    }
    return res.json({
      success: true,
      token,
      message: "Connexion administrateur r\xE9ussie."
    });
  });
  app.get("/api/auth/verify", (req, res) => {
    const authHeader = req.headers.authorization || req.headers["x-admin-key"];
    const isValid = verifyToken(authHeader);
    return res.json({ valid: isValid });
  });
  app.get("/api/tracks", (_req, res) => {
    try {
      const tracks = getTracks();
      res.json(tracks);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la r\xE9cup\xE9ration des morceaux." });
    }
  });
  app.get("/api/tracks/:id", (req, res) => {
    const track = getTrackById(req.params.id);
    if (!track) {
      return res.status(404).json({ error: "Morceau introuvable." });
    }
    res.json(track);
  });
  app.post("/api/tracks", requireAdmin, (req, res) => {
    try {
      const trackData = req.body;
      if (!trackData.title || !trackData.title.trim()) {
        return res.status(400).json({ error: "Le titre du morceau est obligatoire." });
      }
      const newTrack = createTrack(trackData);
      res.status(201).json(newTrack);
    } catch (err) {
      res.status(500).json({ error: err.message || "Erreur lors de la cr\xE9ation du morceau." });
    }
  });
  app.put("/api/tracks/:id", requireAdmin, (req, res) => {
    try {
      const updated = updateTrack(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Morceau non trouv\xE9." });
      }
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message || "Erreur lors de la mise \xE0 jour." });
    }
  });
  app.delete("/api/tracks/:id", requireAdmin, async (req, res) => {
    try {
      const track = getTrackById(req.params.id);
      const deleted = deleteTrack(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Morceau non trouv\xE9." });
      }
      if (track?.audioPreviewUrl && track.audioPreviewUrl.startsWith("/api/media/")) {
        const key = track.audioPreviewUrl.replace("/api/media/", "");
        await deleteMediaFile(key);
      }
      res.json({ success: true, message: "Morceau supprim\xE9 avec succ\xE8s." });
    } catch (err) {
      res.status(500).json({ error: err.message || "Erreur lors de la suppression." });
    }
  });
  app.post("/api/tracks/:id/like", (req, res) => {
    const { delta } = req.body || {};
    const track = likeTrack(req.params.id, typeof delta === "number" ? delta : 1);
    if (!track) {
      return res.status(404).json({ error: "Morceau introuvable." });
    }
    res.json({ success: true, id: track.id, likes: track.likes });
  });
  app.post("/api/tracks/:id/play", (req, res) => {
    const track = recordTrackPlay(req.params.id);
    if (!track) {
      return res.status(404).json({ error: "Morceau introuvable." });
    }
    res.json({ success: true, id: track.id, plays: track.plays });
  });
  app.post("/api/upload", requireAdmin, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Aucun fichier re\xE7u." });
      }
      const result = await saveUploadedFile(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype
      );
      res.json({
        success: true,
        ...result,
        message: result.storage === "r2" ? "\u2713 Fichier sauvegard\xE9 de fa\xE7on permanente sur Cloudflare R2" : "\u2713 Fichier sauvegard\xE9 de fa\xE7on permanente sur le serveur"
      });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ error: err.message || "Erreur lors du t\xE9l\xE9versement du fichier." });
    }
  });
  app.get("/api/media/:key", async (req, res) => {
    try {
      const media = await getMediaStream(req.params.key);
      if (!media) {
        return res.status(404).send("Fichier introuvable");
      }
      res.setHeader("Content-Type", media.contentType);
      res.setHeader("Accept-Ranges", "bytes");
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      if (media.contentLength) {
        res.setHeader("Content-Length", media.contentLength);
      }
      media.stream.pipe(res);
    } catch (err) {
      console.error("Media stream error:", err);
      res.status(500).send("Erreur lors de la lecture du fichier");
    }
  });
  app.get("/api/payment-config", (_req, res) => {
    try {
      const config = getPaymentConfig();
      res.json(config);
    } catch (err) {
      res.status(500).json({ error: "Erreur de configuration paiement." });
    }
  });
  app.post("/api/payment-config", requireAdmin, (req, res) => {
    try {
      const updated = updatePaymentConfig(req.body);
      res.json({
        success: true,
        config: updated,
        message: "Param\xE8tres de paiement mis \xE0 jour."
      });
    } catch (err) {
      res.status(500).json({ error: err.message || "Erreur lors de la sauvegarde." });
    }
  });
  app.get("/api/orders", (req, res) => {
    const { orderId } = req.query;
    const authHeader = req.headers.authorization || req.headers["x-admin-key"];
    const isAdmin = verifyToken(authHeader);
    const allOrders = getOrders();
    if (orderId && typeof orderId === "string") {
      const matched = allOrders.filter(
        (o) => o.id.toLowerCase() === orderId.toLowerCase() || o.txHashOrRef?.toLowerCase() === orderId.toLowerCase()
      );
      return res.json(matched);
    }
    if (!isAdmin) {
      return res.status(401).json({
        error: "Acc\xE8s r\xE9serv\xE9. Fournissez un identifiant de commande ou connectez-vous."
      });
    }
    res.json(allOrders);
  });
  app.post("/api/orders", (req, res) => {
    try {
      const orderData = req.body;
      if (!orderData.trackId || !orderData.customerEmail) {
        return res.status(400).json({ error: "Donn\xE9es de commande incompl\xE8tes." });
      }
      const newOrder = createOrder(orderData);
      res.status(201).json({
        success: true,
        order: newOrder,
        message: "Commande enregistr\xE9e avec succ\xE8s."
      });
    } catch (err) {
      res.status(500).json({ error: err.message || "Erreur enregistrement commande." });
    }
  });
  app.put("/api/orders/:id/status", requireAdmin, (req, res) => {
    try {
      const { status, notes } = req.body;
      if (!["pending", "confirmed", "rejected"].includes(status)) {
        return res.status(400).json({ error: "Statut invalide." });
      }
      const updated = updateOrderStatus(req.params.id, status, notes);
      if (!updated) {
        return res.status(404).json({ error: "Commande introuvable." });
      }
      res.json({
        success: true,
        order: updated,
        message: `Commande pass\xE9e \xE0 l'\xE9tat "${status}".`
      });
    } catch (err) {
      res.status(500).json({ error: err.message || "Erreur mise \xE0 jour commande." });
    }
  });
  app.get("/api/download/cloudflare-zip", (_req, res) => {
    const primaryPath = import_path3.default.join(process.cwd(), "public", "fallen75france-cloudflare-pages.zip");
    const fallbackPath = import_path3.default.join(process.cwd(), "dist", "fallen75france-cloudflare-pages.zip");
    const zipPath = import_fs3.default.existsSync(primaryPath) ? primaryPath : fallbackPath;
    if (!import_fs3.default.existsSync(zipPath)) {
      return res.status(404).json({
        error: "Le fichier ZIP Cloudflare Pages est en cours de pr\xE9paration. Veuillez r\xE9essayer dans quelques secondes."
      });
    }
    res.setHeader("Content-Disposition", 'attachment; filename="fallen75france-cloudflare-pages.zip"');
    res.setHeader("Content-Type", "application/zip");
    const fileStream = import_fs3.default.createReadStream(zipPath);
    fileStream.pipe(res);
  });
  app.get("/api/download/source-zip", (_req, res) => {
    const primaryPath = import_path3.default.join(process.cwd(), "public", "fallen75france-full-source.zip");
    const fallbackPath = import_path3.default.join(process.cwd(), "dist", "fallen75france-full-source.zip");
    const zipPath = import_fs3.default.existsSync(primaryPath) ? primaryPath : fallbackPath;
    if (!import_fs3.default.existsSync(zipPath)) {
      return res.status(404).json({
        error: "Le fichier ZIP source est en cours de pr\xE9paration. Veuillez r\xE9essayer dans quelques secondes."
      });
    }
    res.setHeader("Content-Disposition", 'attachment; filename="fallen75france-full-source.zip"');
    res.setHeader("Content-Type", "application/zip");
    const fileStream = import_fs3.default.createReadStream(zipPath);
    fileStream.pipe(res);
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path3.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(import_path3.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`FALLEN 75 Server running at http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
