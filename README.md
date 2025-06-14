# PF1 Enricher to Chat

A micro-module for Foundry VTT (not tested on v12) in the **Pathfinder 1e** system that allows to send to chat the original syntax of any Enricher with a simple right click. Thus, players and Master can reuse skills, saves and other Enriched prompts directly from the chat window, without the need to expose Journals content or manually type the commands.

## Features.

- 📤 **Right click on an Enricher** (`@Skill[...]`, `@Save[...]`, `@Ability[...]`, etc.) to send it to the chat.
- 🔄 **Automatic reconstruction** of the original markup (_without redundant tags_) so that when rendered it shows exactly the expected text (``Perception DC 15`, not ``Skill: Skill DC 15`).
- ⚙️ **Lightweight and without external dependencies**, compatible with Foundry VTT v13 and PF1e.
- 🔧 **Easy to extend**: add new `handlers` in `reconstructMarkup()` to cover other types of rich links.

## Installation

1. Clone or download this repository into your modules folder or use Foundry's installation:
   https://raw.githubusercontent.com/ZzinnerGamer/pf1e-enricher-to-chat/main/module.json
3. In Foundry configuration, enable **PF1 Enricher Sender**.
4. Reload the page or restart the game.

## Usage

1. Open any PF1e rich text (Chat, Journal, Object Description...).
2. Right-click** on the rich link you want to share.
3. You will see that, automatically, its original markup is published in the chat tab.
4. Both you and your players will be able to click on it and launch the associated action/shoot.

---

You're done! Now you can send rich prompts to the chat in a single gesture, without complications or duplicate tags.
