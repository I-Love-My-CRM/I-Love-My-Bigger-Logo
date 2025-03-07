import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-6 border-t border-white/20">
      <div className="container flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">Built with</p>
          <span className="text-purple-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-heart"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </span>
          <p className="text-sm text-muted-foreground">by</p>
          <a
            href="https://ilovemycrm.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <img
              src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/CO6jLvcPnbItrvocChZ1/media/6663d8fb1b8465e1ffa4898f.png"
              alt="I Love My CRM"
              className="h-6 w-auto"
            />
            <ExternalLink className="h-3 w-3 text-muted-foreground" />
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
}
