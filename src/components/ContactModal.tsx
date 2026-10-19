import React, { useState } from 'react';
import {
  X,
  Mail,
  MapPin,
  Phone,
  Copy,
  Check,
  Send,
  ExternalLink,
  Youtube,
  Instagram,
  Twitter,
  Music,
  Radio,
  Building2,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { PaymentConfig } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PaymentConfig;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, config }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const email = config.contactEmail || 'lawofice66@gmail.com';
  const address = config.contactAddress || '75 Rue de Paris, 75000 Paris, France';
  const phone = config.contactPhone || '+33 1 42 68 75 00';
  const socials = config.socialLinks || {
    youtube: 'https://youtube.com/@fallen75france',
    instagram: 'https://instagram.com/fallen75france',
    twitter: 'https://x.com/fallen75france',
    soundcloud: 'https://soundcloud.com/fallen75france',
    spotify: 'https://open.spotify.com/artist/fallen75france',
    telegram: 'https://t.me/fallen75france',
  };

  const copyToClipboard = (text: string, type: 'email' | 'address') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject || 'Track Inquiry / Custom Production')}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 5000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-neutral-900/95 border border-neutral-800 shadow-2xl p-6 sm:p-8 text-neutral-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-wide">
              FALLEN 75 FRANCE • Official Contact & Studio
            </h2>
            <p className="text-xs text-neutral-400">
              Music Production, Licensing, Custom Beats & Direct Artist Inquiries
            </p>
          </div>
        </div>

        {/* Studio Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Physical Address */}
          <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80 hover:border-neutral-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <MapPin className="h-4 w-4" /> Studio Address
              </span>
              <button
                onClick={() => copyToClipboard(address, 'address')}
                className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                title="Copy address"
              >
                {copiedAddress ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span className="text-[11px]">{copiedAddress ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-sm font-medium text-white">{address}</p>
            <p className="text-xs text-neutral-400 mt-1">Paris, Île-de-France • France (AA2026)</p>
          </div>

          {/* Contact Email */}
          <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80 hover:border-neutral-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <Mail className="h-4 w-4" /> Direct Email
              </span>
              <button
                onClick={() => copyToClipboard(email, 'email')}
                className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                title="Copy email"
              >
                {copiedEmail ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span className="text-[11px]">{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <a
              href={`mailto:${email}`}
              className="text-sm font-medium text-white hover:text-amber-400 transition-colors block break-all"
            >
              {email}
            </a>
            <div className="flex items-center gap-1 text-xs text-neutral-400 mt-1">
              <Clock className="h-3 w-3 text-neutral-500" />
              <span>Response within 24h</span>
            </div>
          </div>
        </div>

        {/* Social Media Channels */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
            <Radio className="h-3.5 w-3.5 text-amber-500" /> Official Social Media & Streaming
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {/* YouTube */}
            {socials.youtube && (
              <a
                href={socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-red-500/50 hover:bg-red-500/10 transition-all group"
              >
                <div className="p-1.5 rounded-lg bg-red-500/20 text-red-400 group-hover:bg-red-500 group-hover:text-white transition-colors">
                  <Youtube className="h-4 w-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">YouTube</div>
                  <div className="text-[10px] text-neutral-400 truncate">@fallen75france</div>
                </div>
                <ExternalLink className="h-3 w-3 text-neutral-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}

            {/* Instagram */}
            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all group"
              >
                <div className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                  <Instagram className="h-4 w-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white group-hover:text-pink-400 transition-colors">Instagram</div>
                  <div className="text-[10px] text-neutral-400 truncate">@fallen75france</div>
                </div>
                <ExternalLink className="h-3 w-3 text-neutral-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}

            {/* Twitter / X */}
            {socials.twitter && (
              <a
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-blue-400/50 hover:bg-blue-400/10 transition-all group"
              >
                <div className="p-1.5 rounded-lg bg-blue-400/20 text-blue-400 group-hover:bg-blue-400 group-hover:text-white transition-colors">
                  <Twitter className="h-4 w-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">X / Twitter</div>
                  <div className="text-[10px] text-neutral-400 truncate">@fallen75france</div>
                </div>
                <ExternalLink className="h-3 w-3 text-neutral-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}

            {/* SoundCloud */}
            {socials.soundcloud && (
              <a
                href={socials.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all group"
              >
                <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <Radio className="h-4 w-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">SoundCloud</div>
                  <div className="text-[10px] text-neutral-400 truncate">Fallen 75 France</div>
                </div>
                <ExternalLink className="h-3 w-3 text-neutral-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}

            {/* Spotify */}
            {socials.spotify && (
              <a
                href={socials.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all group"
              >
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <Music className="h-4 w-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">Spotify</div>
                  <div className="text-[10px] text-neutral-400 truncate">Artist Profile</div>
                </div>
                <ExternalLink className="h-3 w-3 text-neutral-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}

            {/* Telegram */}
            {socials.telegram && (
              <a
                href={socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-sky-500/50 hover:bg-sky-500/10 transition-all group"
              >
                <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                  <Send className="h-4 w-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">Telegram</div>
                  <div className="text-[10px] text-neutral-400 truncate">Direct Channel</div>
                </div>
                <ExternalLink className="h-3 w-3 text-neutral-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}
          </div>
        </div>

        {/* Quick Message Form */}
        <div className="p-5 rounded-xl bg-neutral-950/40 border border-neutral-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-amber-400" /> Send a Direct Message to Producer
          </h4>
          <form onSubmit={handleSendEmail} className="space-y-3">
            <div>
              <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                Subject / Project Type
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Exclusive Beat License / Custom Production Inquiry"
                className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                Message / Inquiries
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Specify the track title, requested terms, or collaboration details..."
                rows={3}
                className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-500" />
                Guaranteed privacy & zero spam
              </span>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                Open Email Client
              </button>
            </div>
            {sentSuccess && (
              <p className="text-xs text-emerald-400 text-center font-medium animate-pulse">
                Opening your email client to dispatch to {email}...
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
