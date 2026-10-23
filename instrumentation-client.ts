const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (!projectToken || !host) {
  if (process.env.NODE_ENV === "development") {
    const missingVariable = !projectToken
      ? "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN"
      : "NEXT_PUBLIC_POSTHOG_HOST";

    // Só um aviso: um throw aqui corre antes do React e impede a
    // hidratação, deixando todos os botões da página sem resposta.
    console.warn(
      `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This warning stops appearing once ${missingVariable} is configured`,
    );
  }
} else {
  // O posthog-js (~150 KB gzip) era o maior pedaço do bundle inicial e
  // atrasava a hidratação. Agora só é descarregado depois de a página
  // carregar e o browser ficar livre — não compete com o primeiro ecrã.
  const loadPostHog = () => {
    import("posthog-js").then(({ default: posthog }) => {
      posthog.init(projectToken, {
        api_host: host,
        defaults: "2026-01-30",
        capture_exceptions: {
          capture_unhandled_errors: true,
          capture_unhandled_rejections: true,
          capture_console_errors: false,
        },
        debug: process.env.NODE_ENV === "development",
      });
    });
  };

  const scheduleLoad = () => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(loadPostHog, { timeout: 4000 });
    } else {
      setTimeout(loadPostHog, 2000);
    }
  };

  if (document.readyState === "complete") {
    scheduleLoad();
  } else {
    window.addEventListener("load", scheduleLoad, { once: true });
  }
}
