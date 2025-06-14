Hooks.once("ready", () => {
  // Enricher selector
  const selector = "a.pf1-link.button";
  // Context-menu (right click)
  document.body.addEventListener("contextmenu", async event => {
    const el = event.target.closest(selector);
    if (!el) return;
    event.preventDefault();
    try {
      const markup = reconstructMarkup(el.dataset);
      if (!markup) throw new Error("No se pudo reconstruir el markup");
      // Publica al chat
      ChatMessage.create({ content: markup });
    } catch (err) {
      console.error("pf1-enricher-sender |", err);
      ui.notifications.error("No se pudo enviar el Enricher al chat.");
    }
  });
});

/**
 * Reconstructs the text @Enricher[...] from dataset.
 * Optionally add the label if it exists (dataset.sensitiveLabel).
 */
function reconstructMarkup(data) {
  const handler = data.handler;
  const opts = [];
  // For each key of interest, if it exists, we add it as option
  for (let key of ["dc","bonus","roll","formula","type","item","action","condition","uuid","ident"]) {
    if (data[key] !== undefined) {
      opts.push(`${key}=${data[key]}`);
    }
  }
  // Content according to type
  switch (handler) {
    case "skill":
      // @Skill[skill;opt1;opt2…]{Label}
      return `@Skill[${data.skill}${opts.length ? ";" + opts.join(";") : ""}]`;
    case "save":
      return  `@Save[${data.type}${opts.length ? ";" + opts.join(";") : ""}]` +
              (data.sensitiveLabel ? `{${data.sensitiveLabel}}` : "");
    case "ability":
      return  `@Ability[${data.ability}${opts.length ? ";" + opts.join(";") : ""}]`;
    case "use":
      // @Use[item#action;…]
      const actionPart = data.action ? `#${data.action}` : "";
      return `@Use[${data.item}${actionPart}${opts.length ? ";" + opts.join(";") : ""}]`;
    case "action":
      return `@Action[${data.action}${opts.length ? ";" + opts.join(";") : ""}]`;
    case "apply":
      return `@Apply[${data.uuid}${opts.length ? ";" + opts.join(";") : ""}]`;
    case "toggle":
      return `@Toggle[${data.name}${opts.length ? ";" + opts.join(";") : ""}]`;
    case "health":
      return `@${capitalize(data.command)}[${data.formula}${opts.length ? ";" + opts.join(";") : ""}]`;
    case "browse":
      return `@Browse[${data.category}${opts.length ? ";" + opts.join(";") : ""}]`;
    case "condition":
      return `@Condition[${data.condition}${opts.length ? ";" + opts.join(";") : ""}]` +
             (data.label ? `{${data.label}}` : "");
    case "draw":
      return `@Draw[${data.ident}]` + (data.label ? `{${data.label}}` : "");
    // Add more handlers to cover other Enrichers
    default:
      return null;
  }
}
function capitalize(s){ return s?.charAt(0).toUpperCase()+s.slice(1).toLowerCase(); }
