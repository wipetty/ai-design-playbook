const LINKEDIN_SHARE_TEXT =
  "A field guide to AI-assisted design for designers who ship — vibe coding, prompting, and everything between. Worth a read:";

export function shareOnLinkedIn() {
  const url = `${window.location.origin}/`;
  const text = `${LINKEDIN_SHARE_TEXT} ${url}`;
  const shareUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
  window.open(shareUrl, "_blank", "noopener,noreferrer");
}
