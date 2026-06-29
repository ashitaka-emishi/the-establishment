const realms = [
  "Finance", "Transportation", "Labor", "Research", "Entertainment", "Media",
  "Politics", "Law", "Underworld", "Elite", "Occult", "Street"
];

const descriptionDeck = [
  "Impulsive", "Kind", "Provocative", "Cautious", "Ambitious", "Idealistic",
  "Pragmatic", "Secretive", "Generous", "Ruthless", "Diplomatic", "Defiant",
  "Traditional", "Radical", "Patient", "Bold", "Suspicious", "Loyal",
  "Opportunistic", "Principled", "Charismatic", "Calculating", "Protective",
  "Reckless", "Optimistic", "Cynical", "Scholarly", "Streetwise", "Wealthy",
  "Humble", "Militant", "Persuasive", "Eccentric", "Stoic", "Vengeful",
  "Merciful", "Connected", "Independent"
].map((name, id) => ({ id, name }));

const factionCatalog = [
  {
    id: "equity",
    name: "The Equity Front",
    cardId: 3,
    influencerIds: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    id: "szora",
    name: "Szora Strefa",
    cardId: 5,
    influencerIds: [8, 9, 10, 11, 12, 13, 14]
  },
  {
    id: "artists",
    name: "Galactic Artists Inc.",
    cardId: 1,
    influencerIds: [16, 17, 18, 19, 20, 21, 22]
  },
  {
    id: "ceres",
    name: "Ceres Institute of Technology",
    cardId: 2,
    influencerIds: [24, 25, 26, 27, 28, 29, 30]
  },
  {
    id: "taxi",
    name: "The Taxi Union",
    cardId: 0,
    influencerIds: [32, 33, 34, 35, 36, 37, 38]
  },
  {
    id: "legatees",
    name: "The Legatees",
    cardId: 4,
    influencerIds: [40, 41, 42, 43, 44, 45, 46]
  }
];

const influencerMeta = {
  0: { name: "Haley S. Novitski", value: 3, realm: "Street", maxXp: 0 },
  1: { name: "MacKenzie Patel", value: 2, realm: "Labor", maxXp: 3 },
  2: { name: "Xavier L. Marone", value: 2, realm: "Politics", maxXp: 2 },
  3: { name: "Shifty Charlie", value: 2, realm: "Entertainment", maxXp: 1 },
  4: { name: "Jane Nakagawa", value: 1, realm: "Media", maxXp: 3 },
  5: { name: "Morgan J. Terzic", value: 1, realm: "Occult", maxXp: 2 },
  6: { name: "Ryland", value: 1, realm: "Underworld", maxXp: 1 },
  8: { name: "Zenobia Hyndai", value: 3, realm: "Finance", maxXp: 0 },
  9: { name: "Edita Erna Kamp", value: 2, realm: "Politics", maxXp: 3 },
  10: { name: "Bart Roberts", value: 2, realm: "Underworld", maxXp: 2 },
  11: { name: "Danai Irina Torres", value: 2, realm: "Research", maxXp: 1 },
  12: { name: "Mateo Somerset", value: 1, realm: "Media", maxXp: 3 },
  13: { name: "Lilah P. Wilde", value: 1, realm: "Elite", maxXp: 2 },
  14: { name: "Solomon Zuma", value: 1, realm: "Street", maxXp: 1 },
  16: { name: "Li Xquenda Megalos", value: 3, realm: "Entertainment", maxXp: 0 },
  17: { name: "Casey", value: 2, realm: "Occult", maxXp: 3 },
  18: { name: "Lola Chizimu", value: 2, realm: "Finance", maxXp: 2 },
  19: { name: "Wu Bai", value: 2, realm: "Elite", maxXp: 1 },
  20: { name: "Hector de la Costa", value: 1, realm: "Labor", maxXp: 3 },
  21: { name: "Kitty Juventas Aue", value: 1, realm: "Politics", maxXp: 2 },
  22: { name: "Willie Jansen", value: 1, realm: "Media", maxXp: 1 },
  24: { name: "Gavin Pinchback", value: 3, realm: "Research", maxXp: 0 },
  25: { name: "Robin M. Prinyanka", value: 2, realm: "Elite", maxXp: 3 },
  26: { name: "Corey Bieber", value: 2, realm: "Law", maxXp: 2 },
  27: { name: "Sebastian Smalls", value: 2, realm: "Finance", maxXp: 1 },
  28: { name: "Raharjo Enok", value: 1, realm: "Transportation", maxXp: 3 },
  29: { name: "Rose Marko", value: 1, realm: "Underworld", maxXp: 2 },
  30: { name: "Kaiti Eliana Gabor", value: 1, realm: "Street", maxXp: 1 },
  32: { name: "Jalex Alesse", value: 3, realm: "Transportation", maxXp: 0 },
  33: { name: "Pickles", value: 2, realm: "Underworld", maxXp: 3 },
  34: { name: "Shakti Vida", value: 2, realm: "Labor", maxXp: 2 },
  35: { name: "Hollis Serizawa", value: 2, realm: "Media", maxXp: 1 },
  36: { name: "Shaheen Kahn", value: 1, realm: "Street", maxXp: 3 },
  37: { name: "Jeda Akello", value: 1, realm: "Law", maxXp: 2 },
  38: { name: "Minerva Oza", value: 1, realm: "Research", maxXp: 1 },
  40: { name: "Ronny Mcculloch", value: 3, realm: "Politics", maxXp: 0 },
  41: { name: "Alfie-Jay Randolph", value: 2, realm: "Elite", maxXp: 3 },
  42: { name: "Saba Daugherty", value: 2, realm: "Finance", maxXp: 2 },
  43: { name: "Cardinal Kieron Higgs", value: 2, realm: "Occult", maxXp: 1 },
  44: { name: "Haven Safiyyah", value: 1, realm: "Law", maxXp: 3 },
  45: { name: "Naveed Luella Terrell", value: 1, realm: "Research", maxXp: 2 },
  46: { name: "Stan Dolnik", value: 1, realm: "Entertainment", maxXp: 1 }
};

const allSociety = Array.from({ length: 16 }, (_, i) => i);
const SAVE_VERSION = 1;
const SAVE_KEY = "the-establishment-local-game";

const state = {
  round: 1,
  phase: "setup",
  players: [],
  storylines: [1, 32, 63, 94].map((n, idx) => ({ lane: idx, card: n, history: [n], societyForNext: null })),
  support: {
    order: [],
    snakeTurns: [],
    turnIndex: 0,
    placements: []
  },
  societyDeck: [],
  resolution: [],
  resolutionDraft: null,
  privateViewPlayerId: null,
  overrideLog: []
};

const setupState = {
  active: false,
  playerCount: 3,
  playerIndex: 0,
  players: [],
  carouselIndex: 0,
  draftName: "Player 1",
  confirmed: null,
  pendingDeck: [],
  pendingHand: [],
  pendingReserve: [],
  drawnDescriptions: [],
  selectedDescriptions: new Set(),
  descriptionDrawPile: []
};

function pad(n) { return String(n).padStart(3, "0"); }
function storylineSrc(num, side) { return `../__docs__/cards/storyline/storyline-${pad(num - 1)}_${side}.png`; }
function influencerSrc(id) { return `../__docs__/cards/influencer/influencer-${pad(id)}_F.png`; }
function influencerBackSrc() { return "../__docs__/cards/influencer/influencer-004_B.png"; }
function factionIdentitySrc(faction) { return `../__docs__/cards/faction/faction-${pad(faction.cardId)}_B.png`; }
function factionReferenceSrc(faction) { return `../__docs__/cards/faction/faction-${pad(faction.cardId)}_F.png`; }
function societySrc(id) { return `../__docs__/cards/society/society-${pad(id)}_F.png`; }

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const els = {
  playerCount: document.getElementById("playerCount"),
  buildPlayersBtn: document.getElementById("buildPlayersBtn"),
  savePanel: document.getElementById("savePanel"),
  startGameBtn: document.getElementById("startGameBtn"),
  playersContainer: document.getElementById("playersContainer"),
  setupIntro: document.getElementById("setupIntro"),
  setupPanel: document.getElementById("setupPanel"),
  gamePanel: document.getElementById("gamePanel"),
  roundLabel: document.getElementById("roundLabel"),
  phaseLabel: document.getElementById("phaseLabel"),
  storylineBoard: document.getElementById("storylineBoard"),
  toSupportBtn: document.getElementById("toSupportBtn"),
  privacyPanel: document.getElementById("privacyPanel"),
  supportTitle: document.getElementById("supportTitle"),
  supportArea: document.getElementById("supportArea"),
  turnOrder: document.getElementById("turnOrder"),
  turnPrompt: document.getElementById("turnPrompt"),
  playControls: document.getElementById("playControls"),
  placedList: document.getElementById("placedList"),
  resolveBtn: document.getElementById("resolveBtn"),
  resolutionTitle: document.getElementById("resolutionTitle"),
  resolutionArea: document.getElementById("resolutionArea"),
  nextRoundBtn: document.getElementById("nextRoundBtn"),
  leaderboardTitle: document.getElementById("leaderboardTitle"),
  leaderboard: document.getElementById("leaderboard"),
  resetBtn: document.getElementById("resetBtn")
};

function getFaction(factionId) {
  return factionCatalog.find((faction) => faction.id === factionId);
}

function privateInfoSummary() {
  return "Private information: setup description choices, influencer hands, face-down reserves, and unplayed per-player cards.";
}

function currentPrivatePlayer() {
  if (state.privateViewPlayerId == null) return null;
  return state.players.find((player) => player.id === state.privateViewPlayerId) || null;
}

function openPrivateView(playerId) {
  state.privateViewPlayerId = playerId;
  render();
}

function closePrivateView() {
  state.privateViewPlayerId = null;
  render();
}

function serializeSetupState() {
  return {
    ...setupState,
    selectedDescriptions: [...setupState.selectedDescriptions]
  };
}

function restoreSetupState(savedSetup) {
  Object.assign(setupState, {
    active: Boolean(savedSetup?.active),
    playerCount: savedSetup?.playerCount ?? 3,
    playerIndex: savedSetup?.playerIndex ?? 0,
    players: savedSetup?.players ?? [],
    carouselIndex: savedSetup?.carouselIndex ?? 0,
    draftName: savedSetup?.draftName ?? "Player 1",
    confirmed: savedSetup?.confirmed ?? null,
    pendingDeck: savedSetup?.pendingDeck ?? [],
    pendingHand: savedSetup?.pendingHand ?? [],
    pendingReserve: savedSetup?.pendingReserve ?? [],
    drawnDescriptions: savedSetup?.drawnDescriptions ?? [],
    selectedDescriptions: new Set(savedSetup?.selectedDescriptions ?? []),
    descriptionDrawPile: savedSetup?.descriptionDrawPile ?? []
  });
}

function relinkPlayerCards(players) {
  players.forEach((player) => {
    const deckCards = new Map((player.deck || []).map((card) => [card.uniqueId, card]));
    player.hand = (player.hand || []).map((card) => deckCards.get(card.uniqueId) || card);
    player.reserveInfluencers = (player.reserveInfluencers || []).map((card) => deckCards.get(card.uniqueId) || card);
  });
}

function relinkSavedCards() {
  relinkPlayerCards(state.players);
  relinkPlayerCards(setupState.players);

  if (setupState.pendingDeck.length) {
    const pendingCards = new Map(setupState.pendingDeck.map((card) => [card.uniqueId, card]));
    setupState.pendingHand = setupState.pendingHand.map((card) => pendingCards.get(card.uniqueId) || card);
    setupState.pendingReserve = setupState.pendingReserve.map((card) => pendingCards.get(card.uniqueId) || card);
  }

  state.support.placements.forEach((placement) => {
    const player = state.players[placement.playerId];
    const deckCard = player?.deck?.find((card) => card.uniqueId === placement.card.uniqueId);
    if (deckCard) placement.card = deckCard;
  });

  if (!Array.isArray(state.overrideLog)) state.overrideLog = [];
}

function createSavePayload() {
  const savedState = {
    ...state,
    privateViewPlayerId: null
  };
  return {
    version: SAVE_VERSION,
    savedAt: new Date().toISOString(),
    state: savedState,
    setupState: serializeSetupState()
  };
}

function readSave() {
  let raw;
  try {
    raw = localStorage.getItem(SAVE_KEY);
  } catch {
    return null;
  }

  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (parsed.version !== SAVE_VERSION) return { unsupported: true, savedAt: parsed.savedAt };
    return parsed;
  } catch {
    return { corrupt: true };
  }
}

function hasMeaningfulSaveState() {
  return setupState.active || state.phase !== "setup" || state.players.length > 0;
}

function saveGame() {
  if (!hasMeaningfulSaveState()) return;
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(createSavePayload()));
  } catch {
    // Saving is a convenience layer; gameplay should continue if storage is unavailable.
  }
}

function clearSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    // Ignore storage failures during an explicit start-over request.
  }
}

function formatSavedAt(savedAt) {
  if (!savedAt) return "unknown time";
  const date = new Date(savedAt);
  if (Number.isNaN(date.getTime())) return "unknown time";
  return date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}

function renderSavePanel(saved = readSave()) {
  if (!els.savePanel) return;
  if (!saved) {
    els.savePanel.innerHTML = "";
    return;
  }

  const message = saved.unsupported
    ? "A saved game uses an older save format."
    : saved.corrupt
      ? "A saved game could not be read."
      : `Saved game from ${formatSavedAt(saved.savedAt)}.`;

  els.savePanel.innerHTML = `
    <div class="save-panel">
      <div>
        <strong>${message}</strong>
        <p>${saved.unsupported || saved.corrupt ? "Start over to clear it." : "Resume it or start over with a fresh setup."}</p>
      </div>
      <div class="save-actions">
        ${saved.unsupported || saved.corrupt ? "" : "<button id=\"resumeGameBtn\" type=\"button\">Resume</button>"}
        <button id="clearSaveBtn" type="button">Start Over</button>
      </div>
    </div>
  `;

  const resumeBtn = document.getElementById("resumeGameBtn");
  if (resumeBtn) resumeBtn.addEventListener("click", resumeSavedGame);
  document.getElementById("clearSaveBtn").addEventListener("click", startOver);
}

function resumeSavedGame() {
  const saved = readSave();
  if (!saved || saved.unsupported || saved.corrupt) return;
  Object.assign(state, saved.state);
  state.privateViewPlayerId = null;
  if (!Array.isArray(state.overrideLog)) state.overrideLog = [];
  restoreSetupState(saved.setupState);
  relinkSavedCards();
  els.savePanel.innerHTML = "";
  els.playerCount.value = String(setupState.playerCount || 3);

  if (state.phase === "setup") {
    els.setupPanel.classList.remove("hidden");
    els.gamePanel.classList.add("hidden");
    els.setupIntro.classList.toggle("hidden", setupState.active);
    renderSetupWizard();
    return;
  }

  els.setupPanel.classList.add("hidden");
  els.gamePanel.classList.remove("hidden");
  render();
}

function startOver() {
  clearSave();
  location.reload();
}

function usedFactionIds() {
  return new Set(setupState.players.map((player) => player.factionId));
}

function availableFactions() {
  const used = usedFactionIds();
  return factionCatalog.filter((faction) => !used.has(faction.id));
}

function clampCarouselIndex() {
  const available = availableFactions();
  if (!available.length) {
    setupState.carouselIndex = 0;
    return;
  }
  setupState.carouselIndex = ((setupState.carouselIndex % available.length) + available.length) % available.length;
}

function createInfluencerCard(playerId, id) {
  const meta = influencerMeta[id];
  return {
    uniqueId: `p${playerId}-i${id}`,
    id,
    name: meta.name,
    value: meta.value,
    realm: meta.realm,
    maxXp: meta.maxXp,
    xp: 0
  };
}

function drawDescriptions() {
  return setupState.descriptionDrawPile.splice(0, 5);
}

function beginSetup() {
  const playerCount = Math.max(2, Math.min(6, Number(els.playerCount.value) || 3));
  els.playerCount.value = String(playerCount);
  setupState.active = true;
  setupState.playerCount = playerCount;
  setupState.playerIndex = 0;
  setupState.players = [];
  setupState.carouselIndex = 0;
  setupState.draftName = "Player 1";
  setupState.confirmed = null;
  setupState.pendingDeck = [];
  setupState.pendingHand = [];
  setupState.pendingReserve = [];
  setupState.drawnDescriptions = [];
  setupState.selectedDescriptions = new Set();
  setupState.descriptionDrawPile = shuffle(descriptionDeck);
  els.setupIntro.classList.add("hidden");
  els.savePanel.innerHTML = "";
  els.startGameBtn.classList.add("hidden");
  els.startGameBtn.disabled = true;
  renderSetupWizard();
}

function renderSetupWizard() {
  if (!setupState.active) {
    els.playersContainer.innerHTML = "";
    els.startGameBtn.classList.add("hidden");
    els.startGameBtn.disabled = true;
    return;
  }

  if (setupState.playerIndex >= setupState.playerCount) {
    renderSetupReview();
    return;
  }

  if (setupState.confirmed) {
    renderCardSetup();
    return;
  }

  renderFactionSetup();
}

function renderFactionSetup() {
  clampCarouselIndex();
  const available = availableFactions();
  const faction = available[setupState.carouselIndex];

  els.playersContainer.innerHTML = `
    <div class="wizard-shell">
      <div class="setup-progress">Player ${setupState.playerIndex + 1} of ${setupState.playerCount}</div>
      <div class="name-lock row">
        <label for="setupPlayerName">Name</label>
        <input id="setupPlayerName" type="text" value="${esc(setupState.draftName)}" />
      </div>
      <div class="faction-carousel">
        <button class="icon-btn" id="prevFactionBtn" aria-label="Previous faction">&#8249;</button>
        <figure class="faction-display">
          <img class="faction-card-img" src="${factionIdentitySrc(faction)}" alt="${esc(faction.name)} identity card" />
          <img class="faction-card-img" src="${factionReferenceSrc(faction)}" alt="${esc(faction.name)} reference card" />
        </figure>
        <button class="icon-btn" id="nextFactionBtn" aria-label="Next faction">&#8250;</button>
      </div>
      <div class="row centered">
        <button id="confirmFactionBtn">Confirm Faction</button>
      </div>
    </div>
  `;

  const nameInput = document.getElementById("setupPlayerName");
  nameInput.addEventListener("input", () => {
    setupState.draftName = nameInput.value;
    saveGame();
  });

  document.getElementById("prevFactionBtn").addEventListener("click", () => {
    setupState.carouselIndex -= 1;
    renderSetupWizard();
  });
  document.getElementById("nextFactionBtn").addEventListener("click", () => {
    setupState.carouselIndex += 1;
    renderSetupWizard();
  });
  document.getElementById("confirmFactionBtn").addEventListener("click", () => {
    const name = nameInput.value.trim() || `Player ${setupState.playerIndex + 1}`;
    confirmFaction(faction.id, name);
  });
  saveGame();
}

function confirmFaction(factionId, name) {
  const faction = getFaction(factionId);
  const deck = shuffle(faction.influencerIds).map((id) => createInfluencerCard(setupState.playerIndex, id));
  setupState.confirmed = { name, factionId };
  setupState.pendingDeck = deck;
  setupState.pendingHand = deck.slice(0, 4);
  setupState.pendingReserve = deck.slice(4);
  setupState.drawnDescriptions = drawDescriptions();
  setupState.selectedDescriptions = new Set();
  renderSetupWizard();
}

function descriptionCardMarkup(card, selected) {
  return `
    <button class="description-card ${selected ? "selected" : ""}" data-description-id="${card.id}" type="button">
      ${esc(card.name)}
    </button>
  `;
}

function influencerCardMarkup(card) {
  return `
    <figure class="mini-card influencer-mini">
      <img src="${influencerSrc(card.id)}" alt="${esc(card.name)}" />
      <figcaption>${esc(card.name)} | ${card.realm} | ${card.value}+${card.xp}</figcaption>
    </figure>
  `;
}

function privateInfluencerMarkup(card, isPlaced) {
  return `
    <figure class="mini-card influencer-mini ${isPlaced ? "is-placed" : ""}">
      <img src="${influencerSrc(card.id)}" alt="${esc(card.name)}" />
      <figcaption>
        ${esc(card.name)} | ${card.realm} | ${card.value}+${card.xp}
        ${isPlaced ? "<span>Placed this round</span>" : ""}
      </figcaption>
    </figure>
  `;
}

function renderPrivacyPanel() {
  if (!els.privacyPanel) return;
  if (!state.players.length || state.phase === "setup") {
    state.privateViewPlayerId = null;
    els.privacyPanel.innerHTML = "";
    return;
  }

  const unlocked = currentPrivatePlayer();
  const playerButtons = state.players.map((player) => `
    <button type="button" class="private-open-btn" data-private-player="${player.id}">
      Open ${esc(player.name)}
    </button>
  `).join("");

  if (!unlocked) {
    els.privacyPanel.innerHTML = `
      <section class="privacy-shell shared-mode" aria-label="Private player views">
        <div>
          <strong>Shared table view</strong>
          <p>${privateInfoSummary()} Open one player view at a time and pass the device.</p>
        </div>
        <div class="private-actions">${playerButtons}</div>
      </section>
    `;
  } else {
    const faction = getFaction(unlocked.factionId);
    const placedIds = new Set(state.support.placements
      .filter((placement) => placement.playerId === unlocked.id)
      .map((placement) => placement.card.uniqueId));
    const activeTurn = state.phase === "support"
      && state.support.turnIndex < state.support.snakeTurns.length
      && state.support.snakeTurns[state.support.turnIndex] === unlocked.id;

    els.privacyPanel.innerHTML = `
      <section class="privacy-shell private-mode" aria-label="${esc(unlocked.name)} private view">
        <div class="privacy-heading">
          <div>
            <strong>${esc(unlocked.name)} private view</strong>
            <p>${esc(faction.name)}${activeTurn ? " | Current support turn" : ""}</p>
          </div>
          <button type="button" id="closePrivateViewBtn">Return to Shared Table</button>
        </div>
        <div class="private-grid">
          <div>
            <h4>Description cards</h4>
            <div class="private-descriptions">
              ${unlocked.descriptions.map((card) => `<div class="description-card locked">${esc(card.name)}</div>`).join("")}
            </div>
          </div>
          <div>
            <h4>Influencer hand</h4>
            <div class="private-hand-grid">
              ${unlocked.hand.map((card) => privateInfluencerMarkup(card, placedIds.has(card.uniqueId))).join("")}
            </div>
          </div>
          <div>
            <h4>Reserve</h4>
            <p class="hint">${unlocked.reserveInfluencers.length} face-down influencers remain private.</p>
          </div>
        </div>
      </section>
    `;
  }

  els.privacyPanel.querySelectorAll("[data-private-player]").forEach((button) => {
    button.addEventListener("click", () => openPrivateView(Number(button.dataset.privatePlayer)));
  });
  const closeBtn = document.getElementById("closePrivateViewBtn");
  if (closeBtn) closeBtn.addEventListener("click", closePrivateView);
}

function renderCardSetup() {
  const faction = getFaction(setupState.confirmed.factionId);
  const selected = setupState.drawnDescriptions.filter((card) => setupState.selectedDescriptions.has(card.id));
  const selectedCount = setupState.selectedDescriptions.size;

  els.playersContainer.innerHTML = `
    <div class="wizard-shell">
      <div class="setup-progress">Player ${setupState.playerIndex + 1} of ${setupState.playerCount}</div>
      <div class="privacy-note">Private setup view: pass the device to ${esc(setupState.confirmed.name)}. Description choices, hand, and reserves should not be shown to other players.</div>
      <div class="locked-choice">
        <strong>${esc(setupState.confirmed.name)}</strong>
        <span>${esc(faction.name)}</span>
      </div>
      <div class="player-area-layout">
        <div class="chosen-descriptions">
          ${selected.length ? selected.map((card) => `<div class="description-card locked">${esc(card.name)}</div>`).join("") : "<div class=\"empty-slot\">Select 3 descriptions</div>"}
        </div>
        <div class="faction-zone">
          <img class="faction-card-img" src="${factionIdentitySrc(faction)}" alt="${esc(faction.name)}" />
          <div class="hand-row">
            ${setupState.pendingHand.map(influencerCardMarkup).join("")}
          </div>
        </div>
        <div class="reserve-pile" aria-label="Three face-down influencer cards">
          <img src="${influencerBackSrc()}" alt="Face-down influencer deck" />
          <span>3</span>
        </div>
      </div>
      <div class="description-picker">
        ${setupState.drawnDescriptions.map((card) => descriptionCardMarkup(card, setupState.selectedDescriptions.has(card.id))).join("")}
      </div>
      <div class="row centered">
        <button id="finishPlayerBtn" ${selectedCount === 3 ? "" : "disabled"}>Continue</button>
      </div>
    </div>
  `;

  els.playersContainer.querySelectorAll("[data-description-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.descriptionId);
      if (setupState.selectedDescriptions.has(id)) {
        setupState.selectedDescriptions.delete(id);
      } else if (setupState.selectedDescriptions.size < 3) {
        setupState.selectedDescriptions.add(id);
      }
      renderSetupWizard();
    });
  });

  document.getElementById("finishPlayerBtn").addEventListener("click", finishPlayerSetup);
  saveGame();
}

function finishPlayerSetup() {
  if (setupState.selectedDescriptions.size !== 3) return;

  const descriptions = setupState.drawnDescriptions
    .filter((card) => setupState.selectedDescriptions.has(card.id))
    .map((card) => ({ ...card }));

  setupState.players.push({
    id: setupState.playerIndex,
    name: setupState.confirmed.name,
    factionId: setupState.confirmed.factionId,
    deck: setupState.pendingDeck,
    hand: setupState.pendingHand,
    reserveInfluencers: setupState.pendingReserve,
    descriptions,
    playedThisRound: 0
  });

  setupState.playerIndex += 1;
  setupState.carouselIndex = 0;
  setupState.draftName = `Player ${setupState.playerIndex + 1}`;
  setupState.confirmed = null;
  setupState.pendingDeck = [];
  setupState.pendingHand = [];
  setupState.pendingReserve = [];
  setupState.drawnDescriptions = [];
  setupState.selectedDescriptions = new Set();
  renderSetupWizard();
}

function renderSetupReview() {
  els.playersContainer.innerHTML = `
    <div class="wizard-shell">
      <div class="setup-progress">Setup Complete</div>
      <div class="review-grid">
        ${setupState.players.map((player) => {
          const faction = getFaction(player.factionId);
          return `
            <article class="review-player">
              <img src="${factionIdentitySrc(faction)}" alt="${esc(faction.name)}" />
              <div>
                <strong>${esc(player.name)}</strong>
                <span>${esc(faction.name)}</span>
                <small>Private descriptions selected</small>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    </div>
  `;
  els.startGameBtn.classList.remove("hidden");
  els.startGameBtn.disabled = false;
  saveGame();
}

function startGame() {
  if (setupState.players.length !== setupState.playerCount) return;
  state.players = setupState.players;
  state.round = 1;
  state.phase = "opening";
  state.storylines = [1, 32, 63, 94].map((n, idx) => ({ lane: idx, card: n, history: [n], societyForNext: null }));
  state.support = { order: [], snakeTurns: [], turnIndex: 0, placements: [] };
  state.societyDeck = shuffle(allSociety);
  state.resolution = [];
  state.resolutionDraft = null;
  state.privateViewPlayerId = null;
  state.overrideLog = [];

  els.setupPanel.classList.add("hidden");
  els.gamePanel.classList.remove("hidden");
  render();
}

function drawHands() {
  state.players.forEach((p) => {
    p.hand = shuffle([...p.deck]).slice(0, 4);
    const handIds = new Set(p.hand.map((card) => card.uniqueId));
    p.reserveInfluencers = p.deck.filter((card) => !handIds.has(card.uniqueId));
    p.playedThisRound = 0;
  });
}

function renderStorylines() {
  els.storylineBoard.innerHTML = "";
  state.storylines.forEach((s) => {
    const card = document.createElement("article");
    card.className = "story-card";

    const img = document.createElement("img");
    img.src = storylineSrc(s.card, "F");
    img.alt = `Storyline ${s.card}`;

    const flipBtn = document.createElement("button");
    flipBtn.textContent = "Flip Side";
    let onF = true;
    flipBtn.addEventListener("click", () => {
      onF = !onF;
      img.src = storylineSrc(s.card, onF ? "F" : "B");
    });

    const meta = document.createElement("div");
    meta.className = "story-meta";
    const restrictions = s.societyForNext ? `Restrictions: ${formatRestrictions(s.societyForNext.restrictions)}` : "Restrictions: none";
    meta.textContent = `Lane ${s.lane + 1} | Card ${s.card} | ${restrictions}`;

    card.append(img, flipBtn, meta);
    els.storylineBoard.appendChild(card);
  });
}

function formatRestrictions(r) {
  if (!r) return "none";
  const parts = [];
  if (r.banned.length) parts.push(`ban ${r.banned.join(", ")}`);
  if (r.opposite.length) parts.push(`opp ${r.opposite.map((x) => `${x.a}/${x.b}`).join(", ")}`);
  if (r.same.length) parts.push(`same ${r.same.map((x) => `${x.a}/${x.b}`).join(", ")}`);
  return parts.length ? parts.join(" | ") : "none";
}

function beginSupport() {
  state.phase = "support";
  state.privateViewPlayerId = null;
  const order = shuffle(state.players.map((p) => p.id));
  state.support.order = order;
  state.support.snakeTurns = [...order, ...[...order].reverse(), ...order];
  state.support.turnIndex = 0;
  state.support.placements = [];
  render();
}

function restrictionViolates(placement, targetLane, targetSide) {
  const storyline = state.storylines[targetLane];
  const r = storyline.societyForNext?.restrictions;
  if (!r) return null;
  if (r.banned.includes(placement.card.realm)) return `Realm ${placement.card.realm} is banned on this storyline.`;

  const existing = state.support.placements.filter((p) => p.lane === targetLane);
  for (const e of existing) {
    for (const pair of r.same) {
      if (targetSide === e.side) {
        const hit = (placement.card.realm === pair.a && e.card.realm === pair.b)
          || (placement.card.realm === pair.b && e.card.realm === pair.a);
        if (hit) return `${pair.a} and ${pair.b} cannot be on the same side.`;
      }
    }
    for (const pair of r.opposite) {
      if (targetSide !== e.side) {
        const hit = (placement.card.realm === pair.a && e.card.realm === pair.b)
          || (placement.card.realm === pair.b && e.card.realm === pair.a);
        if (hit) return `${pair.a} and ${pair.b} cannot be opposite each other.`;
      }
    }
  }
  return null;
}

function renderSupport() {
  els.supportTitle.classList.remove("hidden");
  els.supportArea.classList.remove("hidden");

  const orderNames = state.support.snakeTurns.map((pid, idx) => `${idx + 1}. ${state.players[pid].name}`);
  els.turnOrder.innerHTML = orderNames.map((n) => `<span class="turn-chip">${esc(n)}</span>`).join("");

  if (state.support.turnIndex >= state.support.snakeTurns.length) {
    els.turnPrompt.textContent = "All placements complete.";
    els.playControls.innerHTML = "";
    return;
  }

  const pid = state.support.snakeTurns[state.support.turnIndex];
  const player = state.players[pid];
  const already = state.support.placements.filter((p) => p.playerId === pid).length;
  els.turnPrompt.textContent = `${player.name} turn (${already + 1}/3 placements)`;

  if (state.privateViewPlayerId !== pid) {
    els.playControls.innerHTML = `
      <div class="private-turn-lock">
        <strong>${esc(player.name)} has the private turn.</strong>
        <span>Open ${esc(player.name)}'s private view above, pass the device, then place an influencer.</span>
      </div>
    `;
    els.placedList.innerHTML = state.support.placements.map((p) => {
      const pl = state.players[p.playerId];
      return `<div class="placed-item">${esc(pl.name)} placed ${pad(p.card.id)} (${esc(p.card.name)}, ${p.card.realm}, ${p.card.value}+${p.card.xp}) on Lane ${p.lane + 1} ${p.side === "L" ? "Left" : "Right"}</div>`;
    }).join("");
    return;
  }

  const handOptions = player.hand
    .filter((h) => !state.support.placements.some((p) => p.card.uniqueId === h.uniqueId))
    .map((h) => `<option value="${esc(h.uniqueId)}">${pad(h.id)} | ${esc(h.name)} | ${h.realm} | ${h.value}+${h.xp}</option>`)
    .join("");

  els.playControls.innerHTML = `
    <label>Influencer<select id="playCard">${handOptions}</select></label>
    <label>Storyline<select id="playLane">${state.storylines.map((s) => `<option value="${s.lane}">Lane ${s.lane + 1} (Card ${s.card})</option>`).join("")}</select></label>
    <label>Side<select id="playSide"><option value="L">Left</option><option value="R">Right</option></select></label>
    <button id="commitPlayBtn">Place</button>
  `;

  document.getElementById("commitPlayBtn").addEventListener("click", () => {
    const uid = document.getElementById("playCard").value;
    const lane = Number(document.getElementById("playLane").value);
    const side = document.getElementById("playSide").value;
    const card = player.hand.find((h) => h.uniqueId === uid);
    if (!card) return;

    const placement = { playerId: pid, lane, side, card, canceled: false };
    const violation = restrictionViolates(placement, lane, side);
    if (violation) {
      alert(`Illegal placement: ${violation}`);
      return;
    }

    state.support.placements.push(placement);
    state.support.turnIndex += 1;
    state.privateViewPlayerId = null;
    render();
  });

  els.placedList.innerHTML = state.support.placements.map((p) => {
    const pl = state.players[p.playerId];
    return `<div class="placed-item">${esc(pl.name)} placed ${pad(p.card.id)} (${esc(p.card.name)}, ${p.card.realm}, ${p.card.value}+${p.card.xp}) on Lane ${p.lane + 1} ${p.side === "L" ? "Left" : "Right"}</div>`;
  }).join("");
}

function computeSideScore(cards, society) {
  const live = cards.filter((c) => !c.canceled);
  const rating = live.reduce((sum, p) => sum + p.card.value + p.card.xp, 0);
  const counts = new Map();
  live.forEach((p) => counts.set(p.card.realm, (counts.get(p.card.realm) || 0) + 1));
  let matchBonus = 0;
  counts.forEach((c) => { if (c >= 2) matchBonus += c - 1; });
  const societyBonus = society;
  return { total: rating + matchBonus + societyBonus, rating, matchBonus, societyBonus, liveCount: live.length };
}

function createResolutionDraft() {
  return {
    laneIndex: 0,
    error: "",
    lanes: state.storylines.map((storyline) => ({
      lane: storyline.lane,
      societyId: state.societyDeck.pop() ?? allSociety[Math.floor(Math.random() * allSociety.length)],
      bonusValue: 1,
      bonusSide: "L",
      canceledRealms: [],
      nextCard: storyline.card,
      bannedRealms: [],
      oppositePairs: "",
      samePairs: "",
      overrideLeftTotal: "",
      overrideRightTotal: "",
      overrideWinner: "",
      overrideReason: ""
    }))
  };
}

function resolveRound() {
  state.phase = "resolution";
  state.privateViewPlayerId = null;
  state.resolution = [];
  state.resolutionDraft = createResolutionDraft();
  render();
}

function canonicalRealm(input) {
  const normalized = input.trim().toLowerCase();
  return realms.find((realm) => realm.toLowerCase() === normalized) || null;
}

function parsePairs(input, label = "pairs") {
  if (!input?.trim()) return { pairs: [], errors: [] };
  const errors = [];
  const pairs = input.split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((pair) => {
      const [a, b] = pair.split("/").map((x) => x.trim());
      const left = a ? canonicalRealm(a) : null;
      const right = b ? canonicalRealm(b) : null;
      if (!left || !right) {
        errors.push(`${label}: "${pair}" must use known realms in A/B format.`);
        return null;
      }
      return { a: left, b: right };
    })
    .filter(Boolean);
  return { pairs, errors };
}

function laneRealms(lane) {
  return [...new Set(state.support.placements
    .filter((placement) => placement.lane === lane)
    .map((placement) => placement.card.realm))]
    .sort((a, b) => realms.indexOf(a) - realms.indexOf(b));
}

function readCheckedValues(form, name) {
  return [...form.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
}

function readResolutionForm() {
  const form = document.getElementById("resolutionLaneForm");
  const current = state.resolutionDraft.lanes[state.resolutionDraft.laneIndex];
  if (!form) return current;
  return {
    ...current,
    bonusValue: Number(form.elements.bonusValue.value),
    bonusSide: form.elements.bonusSide.value,
    canceledRealms: readCheckedValues(form, "canceledRealm"),
    nextCard: Number(form.elements.nextCard.value),
    bannedRealms: readCheckedValues(form, "bannedRealm"),
    oppositePairs: form.elements.oppositePairs.value.trim(),
    samePairs: form.elements.samePairs.value.trim(),
    overrideLeftTotal: form.elements.overrideLeftTotal.value.trim(),
    overrideRightTotal: form.elements.overrideRightTotal.value.trim(),
    overrideWinner: form.elements.overrideWinner.value,
    overrideReason: form.elements.overrideReason.value.trim()
  };
}

function parseOverrideScore(value, label, errors) {
  if (value === "" || value == null) return null;
  const score = Number(value);
  if (!Number.isInteger(score) || score < 0) {
    errors.push(`${label} override must be a non-negative whole number.`);
    return null;
  }
  return score;
}

function validateResolutionDraft(draft) {
  const errors = [];
  if (!Number.isInteger(draft.bonusValue) || draft.bonusValue < 0 || draft.bonusValue > 3) {
    errors.push("Society bonus must be a whole number from 0 to 3.");
  }
  if (!["L", "R"].includes(draft.bonusSide)) {
    errors.push("Choose which side receives the society bonus.");
  }
  if (!Number.isInteger(draft.nextCard) || draft.nextCard < 1 || draft.nextCard > 124) {
    errors.push("Next storyline card must be a whole number from 1 to 124.");
  }

  const opposite = parsePairs(draft.oppositePairs, "Opposite-side restriction");
  const same = parsePairs(draft.samePairs, "Same-side restriction");
  errors.push(...opposite.errors, ...same.errors);
  const overrideLeftTotal = parseOverrideScore(draft.overrideLeftTotal, "Left total", errors);
  const overrideRightTotal = parseOverrideScore(draft.overrideRightTotal, "Right total", errors);
  const hasOverride = overrideLeftTotal != null || overrideRightTotal != null || draft.overrideWinner !== "";
  if (hasOverride && draft.overrideReason.length < 3) {
    errors.push("Manual overrides require a reason.");
  }

  return {
    errors,
    restrictions: {
      banned: draft.bannedRealms,
      opposite: opposite.pairs,
      same: same.pairs
    },
    overrides: {
      leftTotal: overrideLeftTotal,
      rightTotal: overrideRightTotal,
      winner: draft.overrideWinner || null,
      reason: draft.overrideReason
    }
  };
}

function applyScoreOverride(score, overrideTotal) {
  if (overrideTotal == null) return score;
  return {
    ...score,
    calculatedTotal: score.total,
    total: overrideTotal,
    overridden: true
  };
}

function buildOverrideAudit(lane, overrides, calculated, effective) {
  const changes = [];
  if (overrides.leftTotal != null) {
    changes.push(`Left total ${calculated.left.total} -> ${effective.left.total}`);
  }
  if (overrides.rightTotal != null) {
    changes.push(`Right total ${calculated.right.total} -> ${effective.right.total}`);
  }
  if (overrides.winner && overrides.winner !== calculated.winner) {
    changes.push(`Winner ${calculated.winner === "L" ? "Left" : "Right"} -> ${effective.winner === "L" ? "Left" : "Right"}`);
  }
  if (!changes.length) return null;
  return {
    round: state.round,
    lane,
    changes,
    reason: overrides.reason,
    recordedAt: new Date().toISOString()
  };
}

function awardXpForLane(placements, winner) {
  const awards = [];
  const winners = placements.filter((p) => p.side === winner);
  const byPlayer = new Map();
  winners.forEach((p) => {
    if (!byPlayer.has(p.playerId)) byPlayer.set(p.playerId, []);
    byPlayer.get(p.playerId).push(p.card);
  });

  byPlayer.forEach((cards, pid) => {
    if (!cards.length) return;
    const card = cards.find((candidate) => candidate.xp < candidate.maxXp) || cards[0];
    const awarded = card.xp < card.maxXp;
    if (awarded) card.xp += 1;
    awards.push({
      playerId: pid,
      playerName: state.players[pid].name,
      cardId: card.id,
      cardName: card.name,
      awarded
    });
  });

  return awards;
}

function commitResolutionLane() {
  const draft = readResolutionForm();
  state.resolutionDraft.lanes[state.resolutionDraft.laneIndex] = draft;
  const validation = validateResolutionDraft(draft);

  if (validation.errors.length) {
    state.resolutionDraft.error = validation.errors.join(" ");
    renderResolution();
    return;
  }

  const storyline = state.storylines[draft.lane];
  const placements = state.support.placements.filter((p) => p.lane === draft.lane);
  placements.forEach((p) => { p.canceled = draft.canceledRealms.includes(p.card.realm); });

  const left = placements.filter((p) => p.side === "L");
  const right = placements.filter((p) => p.side === "R");
  const lSoc = draft.bonusSide === "L" ? draft.bonusValue : 0;
  const rSoc = draft.bonusSide === "R" ? draft.bonusValue : 0;
  const calculatedL = computeSideScore(left, lSoc);
  const calculatedR = computeSideScore(right, rSoc);
  const calculatedWinner = calculatedL.total === calculatedR.total
    ? (lSoc >= rSoc ? "L" : "R")
    : (calculatedL.total > calculatedR.total ? "L" : "R");
  const l = applyScoreOverride(calculatedL, validation.overrides.leftTotal);
  const r = applyScoreOverride(calculatedR, validation.overrides.rightTotal);
  const effectiveWinner = l.total === r.total ? (lSoc >= rSoc ? "L" : "R") : (l.total > r.total ? "L" : "R");
  const winner = validation.overrides.winner || effectiveWinner;
  const overrideAudit = buildOverrideAudit(draft.lane, validation.overrides, {
    left: calculatedL,
    right: calculatedR,
    winner: calculatedWinner
  }, { left: l, right: r, winner });
  const xpAwards = awardXpForLane(placements, winner);

  storyline.card = draft.nextCard;
  storyline.history.push(draft.nextCard);
  storyline.societyForNext = { societyId: draft.societyId, restrictions: validation.restrictions };
  if (overrideAudit) state.overrideLog.push(overrideAudit);

  state.resolution.push({
    lane: draft.lane,
    societyId: draft.societyId,
    canceledRealms: draft.canceledRealms,
    restrictions: validation.restrictions,
    l,
    r,
    winner,
    calculatedWinner,
    overrides: overrideAudit,
    nextCard: draft.nextCard,
    xpAwards
  });

  state.resolutionDraft.laneIndex += 1;
  state.resolutionDraft.error = "";
  render();
}

function restrictionChecklist(name, selected = []) {
  const selectedSet = new Set(selected);
  return `
    <div class="realm-checklist">
      ${realms.map((realm) => `
        <label>
          <input type="checkbox" name="${name}" value="${esc(realm)}" ${selectedSet.has(realm) ? "checked" : ""} />
          ${esc(realm)}
        </label>
      `).join("")}
    </div>
  `;
}

function laneCancelChecklist(lane, selected = []) {
  const options = laneRealms(lane);
  if (!options.length) return `<p class="hint">No influencers were placed on this lane.</p>`;
  const selectedSet = new Set(selected);
  return `
    <div class="realm-checklist compact-checklist">
      ${options.map((realm) => `
        <label>
          <input type="checkbox" name="canceledRealm" value="${esc(realm)}" ${selectedSet.has(realm) ? "checked" : ""} />
          ${esc(realm)}
        </label>
      `).join("")}
    </div>
  `;
}

function lanePlacementSummary(lane) {
  const placements = state.support.placements.filter((placement) => placement.lane === lane);
  if (!placements.length) return `<p class="hint">No placements on this storyline.</p>`;
  return placements.map((placement) => {
    const player = state.players[placement.playerId];
    return `
      <div class="placed-item">
        ${placement.side === "L" ? "Left" : "Right"}:
        ${esc(player.name)} - ${pad(placement.card.id)} ${esc(placement.card.name)}
        (${placement.card.realm}, ${placement.card.value}+${placement.card.xp})
      </div>
    `;
  }).join("");
}

function renderResolutionForm() {
  const draftState = state.resolutionDraft;
  if (!draftState || draftState.laneIndex >= draftState.lanes.length) {
    return `
      <div class="res-block">
        <strong>Resolution complete.</strong>
        <p class="hint">Use ${state.round >= 4 ? "Game Complete" : "Next Round"} when everyone has reviewed the results.</p>
      </div>
    `;
  }

  const draft = draftState.lanes[draftState.laneIndex];
  const storyline = state.storylines[draft.lane];
  return `
    <form class="resolution-form" id="resolutionLaneForm" novalidate>
      <div class="resolution-heading">
        <div>
          <div class="setup-progress">Lane ${draft.lane + 1} of ${draftState.lanes.length}</div>
          <h4>Resolve Storyline ${storyline.card}</h4>
        </div>
        <img src="${societySrc(draft.societyId)}" alt="Society ${draft.societyId}" />
      </div>

      ${draftState.error ? `<div class="form-error">${esc(draftState.error)}</div>` : ""}

      <div class="resolution-section">
        <h5>Placed Influencers</h5>
        <div class="placed-list">${lanePlacementSummary(draft.lane)}</div>
      </div>

      <div class="resolution-fields">
        <label>Society bonus
          <input name="bonusValue" type="number" min="0" max="3" step="1" value="${draft.bonusValue}" />
        </label>
        <label>Bonus side
          <select name="bonusSide">
            <option value="L" ${draft.bonusSide === "L" ? "selected" : ""}>Left</option>
            <option value="R" ${draft.bonusSide === "R" ? "selected" : ""}>Right</option>
          </select>
        </label>
        <label>Winning branch card
          <input name="nextCard" type="number" min="1" max="124" step="1" value="${draft.nextCard}" />
        </label>
      </div>

      <div class="resolution-section">
        <h5>Canceled realms for this lane</h5>
        ${laneCancelChecklist(draft.lane, draft.canceledRealms)}
      </div>

      <div class="resolution-section">
        <h5>Next-round banned realms</h5>
        ${restrictionChecklist("bannedRealm", draft.bannedRealms)}
      </div>

      <div class="resolution-fields">
        <label>Next-round opposite-side realm pairs
          <input name="oppositePairs" type="text" value="${esc(draft.oppositePairs)}" placeholder="Finance/Labor, Media/Street" />
        </label>
        <label>Next-round same-side forbidden pairs
          <input name="samePairs" type="text" value="${esc(draft.samePairs)}" placeholder="Occult/Law, Elite/Underworld" />
        </label>
      </div>

      <div class="resolution-section override-section">
        <h5>Manual overrides</h5>
        <div class="resolution-fields">
          <label>Left total override
            <input name="overrideLeftTotal" type="number" min="0" step="1" value="${esc(draft.overrideLeftTotal ?? "")}" placeholder="Calculated" />
          </label>
          <label>Right total override
            <input name="overrideRightTotal" type="number" min="0" step="1" value="${esc(draft.overrideRightTotal ?? "")}" placeholder="Calculated" />
          </label>
          <label>Winner override
            <select name="overrideWinner">
              <option value="" ${(draft.overrideWinner ?? "") === "" ? "selected" : ""}>Calculated winner</option>
              <option value="L" ${draft.overrideWinner === "L" ? "selected" : ""}>Left</option>
              <option value="R" ${draft.overrideWinner === "R" ? "selected" : ""}>Right</option>
            </select>
          </label>
          <label class="wide-field">Override reason
            <input name="overrideReason" type="text" value="${esc(draft.overrideReason ?? "")}" placeholder="Correction or playtest ruling" />
          </label>
        </div>
        <p class="hint">Overrides require a reason, are marked in results, and are saved in the current game audit trail.</p>
      </div>

      <div class="row centered">
        <button type="submit">Resolve Lane ${draft.lane + 1}</button>
      </div>
    </form>
  `;
}

function scoreSummary(label, score) {
  const marker = score.overridden
    ? ` <span class="override-pill">overridden from ${score.calculatedTotal}</span>`
    : "";
  return `${label}: ${score.total}${marker} (rating ${score.rating}, matches ${score.matchBonus}, society ${score.societyBonus})`;
}

function renderOverrideAudit() {
  if (!state.overrideLog.length) return "";
  return `
    <div class="audit-log" aria-label="Manual override audit trail">
      <h4>Override Audit</h4>
      ${state.overrideLog.map((entry) => `
        <div class="audit-item">
          <strong>Round ${entry.round}, Lane ${entry.lane + 1}</strong>
          <span>${esc(entry.changes.join("; "))}</span>
          <span>Reason: ${esc(entry.reason)}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function renderResolution() {
  els.resolutionTitle.classList.remove("hidden");
  els.resolutionArea.classList.remove("hidden");
  const completed = state.resolution.map((r) => {
    const lWin = r.winner === "L";
    const rWin = r.winner === "R";
    const xp = r.xpAwards.length
      ? r.xpAwards.map((award) => `${esc(award.playerName)}: ${pad(award.cardId)} ${esc(award.cardName)}${award.awarded ? " +1 XP" : " at max XP"}`).join("<br />")
      : "none";
    return `
      <div class="res-block">
        <div class="res-grid">
          <div>
            <strong>Lane ${r.lane + 1}</strong><br />
            Society: ${pad(r.societyId)}<br />
            Canceled: ${esc(r.canceledRealms.join(", ") || "none")}
          </div>
          <div class="${lWin ? "score-good" : ""}">
            ${scoreSummary("Left", r.l)}
          </div>
          <div class="${rWin ? "score-good" : ""}">
            ${scoreSummary("Right", r.r)}
          </div>
          <div>
            Winner: <strong>${r.winner === "L" ? "Left" : "Right"}</strong><br />
            ${r.overrides ? `<span class="override-pill">${esc(r.overrides.changes.join("; "))}</span><br />` : ""}
            Next Card: ${r.nextCard}
          </div>
          <div>
            XP awards:<br />${xp}
          </div>
        </div>
        <img src="${societySrc(r.societyId)}" alt="Society ${r.societyId}" style="max-width:220px;margin-top:.4rem;" />
      </div>
    `;
  }).join("");

  els.resolutionArea.innerHTML = `${completed}${renderOverrideAudit()}${renderResolutionForm()}`;
  const form = document.getElementById("resolutionLaneForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      commitResolutionLane();
    });
    ["input", "change"].forEach((eventName) => {
      form.addEventListener(eventName, () => {
        state.resolutionDraft.lanes[state.resolutionDraft.laneIndex] = readResolutionForm();
        state.resolutionDraft.error = "";
        saveGame();
      });
    });
  }

  renderLeaderboard();
}

function renderLeaderboard() {
  const rows = [];
  state.players.forEach((p) => {
    p.deck.forEach((c) => {
      rows.push({ player: p.name, id: c.id, name: c.name, xp: c.xp, value: c.value, realm: c.realm, total: c.value + c.xp });
    });
  });
  rows.sort((a, b) => b.total - a.total || b.xp - a.xp);

  els.leaderboardTitle.classList.remove("hidden");
  els.leaderboard.classList.remove("hidden");
  els.leaderboard.innerHTML = rows.map((r) =>
    `<div class="lb-item">${esc(r.player)} | ${pad(r.id)} ${esc(r.name)} | ${r.realm} | base ${r.value} + xp ${r.xp} = <strong>${r.total}</strong></div>`
  ).join("");
}

function nextRound() {
  if (state.resolution.length < state.storylines.length) return;
  if (state.round >= 4) {
    alert("Game complete after 4 rounds.");
    return;
  }
  state.round += 1;
  state.phase = "opening";
  state.privateViewPlayerId = null;
  state.support = { order: [], snakeTurns: [], turnIndex: 0, placements: [] };
  state.resolution = [];
  state.resolutionDraft = null;
  drawHands();
  render();
}

function resetGame() {
  startOver();
}

function render() {
  if (state.privateViewPlayerId != null && !state.players.some((player) => player.id === state.privateViewPlayerId)) {
    state.privateViewPlayerId = null;
  }
  els.roundLabel.textContent = String(state.round);
  els.phaseLabel.textContent = state.phase === "setup" ? "Setup" : state.phase[0].toUpperCase() + state.phase.slice(1);

  renderPrivacyPanel();
  renderStorylines();

  els.toSupportBtn.classList.toggle("hidden", state.phase !== "opening");
  els.supportTitle.classList.toggle("hidden", state.phase !== "support");
  els.supportArea.classList.toggle("hidden", state.phase !== "support");
  els.resolveBtn.classList.toggle("hidden", state.phase !== "support" || state.support.turnIndex < state.support.snakeTurns.length);
  els.resolutionTitle.classList.toggle("hidden", state.phase !== "resolution");
  els.resolutionArea.classList.toggle("hidden", state.phase !== "resolution");
  els.nextRoundBtn.classList.toggle("hidden", state.phase !== "resolution");

  if (state.phase === "support") renderSupport();
  if (state.phase === "resolution") renderResolution();

  const resolutionComplete = state.phase === "resolution" && state.resolution.length >= state.storylines.length;
  els.nextRoundBtn.disabled = state.phase === "resolution" && !resolutionComplete;

  if (state.round === 4 && state.phase === "resolution" && resolutionComplete) {
    els.nextRoundBtn.textContent = "Game Complete";
    els.nextRoundBtn.disabled = true;
  } else if (state.phase === "resolution" && !resolutionComplete) {
    els.nextRoundBtn.textContent = "Resolve All Lanes";
  } else {
    els.nextRoundBtn.textContent = "Next Round";
    els.nextRoundBtn.disabled = false;
  }
  saveGame();
}

els.buildPlayersBtn.addEventListener("click", beginSetup);
els.startGameBtn.addEventListener("click", startGame);
els.toSupportBtn.addEventListener("click", beginSupport);
els.resolveBtn.addEventListener("click", resolveRound);
els.nextRoundBtn.addEventListener("click", nextRound);
els.resetBtn.addEventListener("click", resetGame);

renderSavePanel();
renderSetupWizard();
