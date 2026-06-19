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
  resolution: []
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
  startGameBtn: document.getElementById("startGameBtn"),
  playersContainer: document.getElementById("playersContainer"),
  setupIntro: document.getElementById("setupIntro"),
  setupPanel: document.getElementById("setupPanel"),
  gamePanel: document.getElementById("gamePanel"),
  roundLabel: document.getElementById("roundLabel"),
  phaseLabel: document.getElementById("phaseLabel"),
  storylineBoard: document.getElementById("storylineBoard"),
  toSupportBtn: document.getElementById("toSupportBtn"),
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

function renderCardSetup() {
  const faction = getFaction(setupState.confirmed.factionId);
  const selected = setupState.drawnDescriptions.filter((card) => setupState.selectedDescriptions.has(card.id));
  const selectedCount = setupState.selectedDescriptions.size;

  els.playersContainer.innerHTML = `
    <div class="wizard-shell">
      <div class="setup-progress">Player ${setupState.playerIndex + 1} of ${setupState.playerCount}</div>
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
                <small>${player.descriptions.map((card) => esc(card.name)).join(" / ")}</small>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    </div>
  `;
  els.startGameBtn.classList.remove("hidden");
  els.startGameBtn.disabled = false;
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

function resolveRound() {
  state.phase = "resolution";
  state.resolution = [];

  state.storylines.forEach((s) => {
    const societyId = state.societyDeck.pop() ?? allSociety[Math.floor(Math.random() * allSociety.length)];
    const bonusInput = prompt(`Lane ${s.lane + 1}: Society ${pad(societyId)} bonus value (0-3)`, "1");
    const dirInput = prompt(`Lane ${s.lane + 1}: Bonus side? Enter L or R`, "L");
    const canceledInput = prompt(`Lane ${s.lane + 1}: canceled realms (comma-separated names, optional)`, "");

    const placements = state.support.placements.filter((p) => p.lane === s.lane);
    const canceledRealms = canceledInput.split(",").map((x) => x.trim()).filter(Boolean);
    placements.forEach((p) => { p.canceled = canceledRealms.includes(p.card.realm); });

    const left = placements.filter((p) => p.side === "L");
    const right = placements.filter((p) => p.side === "R");

    const lSoc = dirInput?.toUpperCase() === "L" ? Number(bonusInput || 0) : 0;
    const rSoc = dirInput?.toUpperCase() === "R" ? Number(bonusInput || 0) : 0;

    const l = computeSideScore(left, lSoc);
    const r = computeSideScore(right, rSoc);

    const winner = l.total === r.total ? (lSoc >= rSoc ? "L" : "R") : (l.total > r.total ? "L" : "R");

    const winners = placements.filter((p) => p.side === winner);
    const byPlayer = new Map();
    winners.forEach((p) => {
      if (!byPlayer.has(p.playerId)) byPlayer.set(p.playerId, []);
      byPlayer.get(p.playerId).push(p.card);
    });

    byPlayer.forEach((cards, pid) => {
      if (!cards.length) return;
      let card = cards[0];
      if (cards.length > 1) {
        const pick = prompt(`${state.players[pid].name}: choose influencer id for XP on Lane ${s.lane + 1}. Options: ${cards.map((c) => pad(c.id)).join(", ")}`, pad(cards[0].id));
        const found = cards.find((c) => pad(c.id) === String(pick).padStart(3, "0"));
        if (found) card = found;
      }
      if (card.xp < card.maxXp) card.xp += 1;
    });

    const nextInput = prompt(`Lane ${s.lane + 1} winner is ${winner === "L" ? "Left" : "Right"}. Enter winning card number in parentheses (1-124).`, String(s.card));
    const nextCard = Math.max(1, Math.min(124, Number(nextInput) || s.card));

    const restrictions = {
      banned: prompt(`Lane ${s.lane + 1}: next-round banned realms from society card (comma list, optional)`, "").split(",").map((x) => x.trim()).filter(Boolean),
      opposite: parsePairs(prompt(`Lane ${s.lane + 1}: next-round opposite-side realm pairs (format: A/B,C/D)`, "")),
      same: parsePairs(prompt(`Lane ${s.lane + 1}: next-round same-side forbidden realm pairs (format: A/B,C/D)`, ""))
    };

    s.card = nextCard;
    s.history.push(nextCard);
    s.societyForNext = { societyId, restrictions };

    state.resolution.push({ lane: s.lane, societyId, canceledRealms, l, r, winner, nextCard });
  });

  render();
}

function parsePairs(input) {
  if (!input?.trim()) return [];
  return input.split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((pair) => {
      const [a, b] = pair.split("/").map((x) => x.trim());
      return a && b ? { a, b } : null;
    })
    .filter(Boolean);
}

function renderResolution() {
  els.resolutionTitle.classList.remove("hidden");
  els.resolutionArea.classList.remove("hidden");
  els.resolutionArea.innerHTML = state.resolution.map((r) => {
    const lWin = r.winner === "L";
    const rWin = r.winner === "R";
    return `
      <div class="res-block">
        <div class="res-grid">
          <div>
            <strong>Lane ${r.lane + 1}</strong><br />
            Society: ${pad(r.societyId)}<br />
            Canceled: ${esc(r.canceledRealms.join(", ") || "none")}
          </div>
          <div class="${lWin ? "score-good" : ""}">
            Left: ${r.l.total} (rating ${r.l.rating}, matches ${r.l.matchBonus}, society ${r.l.societyBonus})
          </div>
          <div class="${rWin ? "score-good" : ""}">
            Right: ${r.r.total} (rating ${r.r.rating}, matches ${r.r.matchBonus}, society ${r.r.societyBonus})
          </div>
          <div>
            Winner: <strong>${r.winner === "L" ? "Left" : "Right"}</strong><br />
            Next Card: ${r.nextCard}
          </div>
        </div>
        <img src="${societySrc(r.societyId)}" alt="Society ${r.societyId}" style="max-width:220px;margin-top:.4rem;" />
      </div>
    `;
  }).join("");

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
  if (state.round >= 4) {
    alert("Game complete after 4 rounds.");
    return;
  }
  state.round += 1;
  state.phase = "opening";
  state.support = { order: [], snakeTurns: [], turnIndex: 0, placements: [] };
  state.resolution = [];
  drawHands();
  render();
}

function resetGame() {
  location.reload();
}

function render() {
  els.roundLabel.textContent = String(state.round);
  els.phaseLabel.textContent = state.phase === "setup" ? "Setup" : state.phase[0].toUpperCase() + state.phase.slice(1);

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

  if (state.round === 4 && state.phase === "resolution") {
    els.nextRoundBtn.textContent = "Game Complete";
    els.nextRoundBtn.disabled = true;
  } else {
    els.nextRoundBtn.textContent = "Next Round";
    els.nextRoundBtn.disabled = false;
  }
}

els.buildPlayersBtn.addEventListener("click", beginSetup);
els.startGameBtn.addEventListener("click", startGame);
els.toSupportBtn.addEventListener("click", beginSupport);
els.resolveBtn.addEventListener("click", resolveRound);
els.nextRoundBtn.addEventListener("click", nextRound);
els.resetBtn.addEventListener("click", resetGame);

renderSetupWizard();
