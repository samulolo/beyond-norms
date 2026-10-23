"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
  shareMessage,
  upcomingEventsQrPath,
  upcomingEventsUrl,
} from "@/utils/constant/const";

const buttonBase =
  "inline-flex items-center justify-center whitespace-nowrap px-6 py-3 font-sans text-xs font-medium uppercase tracking-wider transition-colors";

const shareTitle = "Beyond Norms — Upcoming Events";
const encodedUrl = encodeURIComponent(upcomingEventsUrl);
const encodedText = encodeURIComponent(`${shareMessage} ${upcomingEventsUrl}`);

const shareLinks = [
  { label: "WhatsApp", href: `https://wa.me/?text=${encodedText}` },
  {
    label: "Email",
    href: `mailto:?subject=${encodeURIComponent("You're invited to Beyond Norms")}&body=${encodedText}`,
  },
  {
    label: "Facebook",
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  },
  {
    label: "X",
    href: `https://x.com/intent/post?text=${encodeURIComponent(shareMessage)}&url=${encodedUrl}`,
  },
  {
    label: "LinkedIn",
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  },
];

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Alguns browsers/webviews bloqueiam a Clipboard API: recorre ao
    // método antigo com um textarea temporário.
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    textarea.remove();
    return ok;
  }
}

export function ShareQr() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora ou carregar em Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const copyLink = async () => {
    const ok = await copyText(upcomingEventsUrl);
    setCopyState(ok ? "copied" : "failed");
    if (ok) setTimeout(() => setCopyState("idle"), 2000);
  };

  const share = async () => {
    // Telemóveis (e Safari/Edge no desktop): folha de partilha nativa.
    // Sempre que o sistema aceita ficheiros, a imagem do QR vai junto.
    if (typeof navigator.share === "function") {
      try {
        const response = await fetch(upcomingEventsQrPath);
        const blob = await response.blob();
        const file = new File([blob], "beyond-norms-qr-code.png", {
          type: blob.type || "image/png",
        });
        const withFile = {
          title: shareTitle,
          text: `${shareMessage} ${upcomingEventsUrl}`,
          files: [file],
        };

        if (navigator.canShare?.(withFile)) {
          await navigator.share(withFile);
        } else {
          await navigator.share({
            title: shareTitle,
            text: shareMessage,
            url: upcomingEventsUrl,
          });
        }
        return;
      } catch (err) {
        // Cancelar a partilha não é um erro; outros erros caem no menu.
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }

    // Sem partilha nativa (ex: Chrome no Mac): menu com as redes.
    setMenuOpen((open) => !open);
  };

  return (
    <div className="flex flex-col items-center gap-8 border border-secondary/50 bg-primary/5 p-8 text-center sm:flex-row sm:items-center sm:gap-10 sm:text-left">
      <div className="shrink-0 border border-secondary bg-primary p-3">
        <Image
          src={upcomingEventsQrPath}
          alt="QR code to the Beyond Norms upcoming events page"
          width={168}
          height={168}
          className="block size-40 [image-rendering:pixelated]"
        />
      </div>

      <div className="flex flex-col items-center gap-4 sm:items-start">
        <span className="font-sans text-xs uppercase tracking-[0.28em] text-secondary">
          Spread the Beyond Norms spirit
        </span>
        <h2 className="font-serif text-2xl text-primary sm:text-3xl">
          Share it with someone special
        </h2>
        <p className="max-w-md font-sans text-sm leading-relaxed text-neutral">
          Scan the code, or send this page to a friend who deserves an evening
          of real connection.
        </p>

        <div className="mt-2 flex flex-wrap justify-center gap-3 sm:justify-start">
          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={share}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              className={`${buttonBase} bg-secondary text-primary hover:opacity-90`}
            >
              Share
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute left-1/2 top-full z-20 mt-2 flex w-48 -translate-x-1/2 flex-col border border-secondary/60 bg-tertiary py-2 text-left shadow-[0_16px_40px_rgba(0,0,0,0.35)] sm:left-0 sm:translate-x-0"
              >
                {shareLinks.map((link) => (
                  <a
                    key={link.label}
                    role="menuitem"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-2.5 font-sans text-sm text-primary transition-colors hover:bg-primary/10 hover:text-secondary"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={copyLink}
            className={`${buttonBase} border border-primary text-primary hover:bg-primary hover:text-tertiary`}
            aria-live="polite"
          >
            {copyState === "copied" ? "Link copied" : "Copy link"}
          </button>
          <a
            href={upcomingEventsQrPath}
            download="beyond-norms-qr-code.png"
            className={`${buttonBase} border border-secondary text-secondary hover:bg-secondary hover:text-tertiary`}
          >
            Download QR
          </a>
        </div>

        {copyState === "failed" && (
          <input
            readOnly
            value={upcomingEventsUrl}
            onFocus={(event) => event.currentTarget.select()}
            aria-label="Link to copy"
            className="w-full max-w-sm border border-primary/20 bg-transparent px-3 py-2 font-sans text-sm text-primary focus:border-secondary focus:outline-none"
          />
        )}
      </div>
    </div>
  );
}
