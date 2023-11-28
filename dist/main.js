(() => {
  "use strict";
  const t = class {
      constructor(t, e) {
        (this.name = t), (this.length = e);
      }
    },
    e = class {
      constructor(t, e) {
        (this.color = t),
          (this.user = e),
          (this.width = 10),
          (this.ships = []),
          (this.notDropped = null),
          (this.draggedShip = null),
          (this.boardBlocks = []),
          (this.angle = 0),
          this.createBoard(),
          (this.dragStart = this.dragStart.bind(this)),
          (this.dragOver = this.dragOver.bind(this)),
          (this.dropShip = this.dropShip.bind(this)),
          (this.highLightArea = this.highLightArea.bind(this)),
          (this.addShipPiece = this.addShipPiece.bind(this));
      }
      createBoard() {
        const t = document.createElement("div");
        t.classList.add("game-board"),
          (t.style.background = this.color),
          (t.id = this.user);
        for (let e = 0; e < this.width * this.width; e++) {
          const i = document.createElement("div");
          i.classList.add("block"),
            (i.id = e),
            t.append(i),
            this.boardBlocks.push(i);
        }
        document.getElementById("gamesboard-container").append(t);
      }
      getValidity(t, e, i, s) {
        const r = e
          ? i <= this.width * this.width - s.length
            ? i
            : this.width * this.width - s.length
          : i <= this.width * this.width - this.width * s.length
          ? i
          : i - s.length * this.width + this.width;
        let n,
          a = [];
        for (let i = 0; i < s.length; i++)
          e ? a.push(t[Number(r) + i]) : a.push(t[Number(r) + i * this.width]);
        e
          ? a.every(
              (t, e) =>
                (n = a[0].id % this.width != this.width - (a.length - (e + 1))),
            )
          : a.every((t, e) => (n = a[0].id < this.width * e + 1 + 90));
        const o = a.every((t) => !t.classList.contains("taken"));
        return { shipBlocks: a, valid: n, notTaken: o };
      }
      addShipPiece(t, e, i) {
        const s = document.querySelectorAll(`#${t} div`);
        let r = Math.random() < 0.5,
          n = "player" === t ? 0 === this.angle : r,
          a = Math.floor(Math.random() * this.width * this.width),
          o = i || a;
        const {
          shipBlocks: h,
          valid: d,
          notTaken: l,
        } = this.getValidity(s, n, o, e);
        d && l
          ? (h.forEach((t) => {
              t.classList.add(e.name), t.classList.add("taken");
            }),
            this.ships.push(e))
          : ("computer" === t && this.addShipPiece(t, e, i),
            "player" === t && (this.notDropped = !0));
      }
      dragStart(t) {
        (this.notDropped = !1), (this.draggedShip = t.target);
      }
      dragOver(t) {
        t.preventDefault();
        const e = this.ships[this.draggedShip.id];
        this.highLightArea(t.target.id, e);
      }
      dropShip(t) {
        t.preventDefault();
        const e = t.target.id,
          i = this.ships[this.draggedShip.id];
        this.addShipPiece("player", i, e),
          this.notDropped || this.draggedShip.remove();
      }
      highLightArea(t, e) {
        const i = document.querySelectorAll("#player div");
        let s = 0 === this.angle;
        const {
          shipBlocks: r,
          valid: n,
          notTaken: a,
        } = this.getValidity(i, s, t, e);
        n &&
          a &&
          r.forEach((t) => {
            t.classList.add("hover"),
              setTimeout(() => t.classList.remove("hover"), 200);
          });
      }
    },
    i = class {
      constructor() {
        (this.hits = []),
          (this.sunkShips = []),
          (this.playerTurn = null),
          (this.gameOver = !1);
      }
    },
    s = class extends i {
      constructor() {
        super();
      }
    };
  (() => {
    const r = document.querySelector(".option-container"),
      n = document.getElementById("flip-button"),
      a = document.getElementById("start-button"),
      o = document.getElementById("info"),
      h = document.getElementById("turn-display"),
      d = new t("destroyer", 2),
      l = new t("submarine", 3),
      c = new t("cruiser", 3),
      u = new t("battleship", 4),
      p = new t("carrier", 5),
      g = new e("#0077be", "player"),
      m = (new e("seagreen", "computer"), new i()),
      y = new s();
    function f(t) {
      if (!m.gameOver || !y.gameOver) {
        if (t.target.classList.contains("boom"))
          return void (o.textContent = "Target already hit");
        if (t.target.classList.contains("taken")) {
          t.target.classList.add("boom"),
            (o.textContent = "You hit the Admiral Bot's ship!"),
            (t.target.innerHTML = "💥");
          let e = Array.from(t.target.classList);
          (e = e.filter((t) => "block" !== t)),
            (e = e.filter((t) => "boom" !== t)),
            (e = e.filter((t) => "taken" !== t)),
            m.hits.push(...e),
            k("player", m.hits, m.sunkShips);
        }
        t.target.classList.contains("taken") ||
          ((o.textContent = "Nothing hit this time"),
          t.target.classList.add("empty"),
          (t.target.innerHTML = "💦")),
          (m.playerTurn = !1),
          document
            .querySelectorAll("#computer div")
            .forEach((t) => t.replaceWith(t.cloneNode(!0))),
          setTimeout(v, 1e3);
      }
    }
    function v() {
      y.gameOver ||
        m.gameOver ||
        ((h.textContent = " Admiral Bot's Go!"),
        (o.textContent = "Admiral Bot is thinking..."),
        setTimeout(() => {
          let t = Math.floor(Math.random() * g.width * g.width);
          const e = document.querySelectorAll("#player div");
          if (
            e[t].classList.contains("taken") &&
            e[t].classList.contains("boom")
          )
            v();
          else if (
            e[t].classList.contains("taken") &&
            !e[t].classList.contains("boom")
          ) {
            e[t].classList.add("boom"),
              (o.textContent = "Admiral Bot hit your ship"),
              (e[t].innerHTML = "💥");
            let i = Array.from(e[t].classList);
            (i = i.filter((t) => "block" !== t)),
              (i = i.filter((t) => "boom" !== t)),
              (i = i.filter((t) => "taken" !== t)),
              y.hits.push(...i),
              k("computer", y.hits, y.sunkShips);
          } else
            (o.textContent = "Nothing hit this time"),
              e[t].classList.add("empty"),
              (e[t].innerHTML = "💦");
        }, 1500),
        setTimeout(() => {
          (m.playerTurn = !0),
            (h.textContent = "Your Go!"),
            (o.textContent = "Please take your go."),
            document
              .querySelectorAll("#computer div")
              .forEach((t) => t.addEventListener("click", f));
        }, 2e3));
    }
    function k(t, e, i) {
      function s(s, r) {
        e.filter((t) => t === s).length === r &&
          ((o.textContent = `You sunk the ${t}'s ${s}`),
          "player" === t &&
            ((o.textContent = `You sunk Admiral Bot's ${s}`),
            (m.hits = e.filter((t) => t !== s))),
          "computer" === t &&
            ((o.textContent = `The Admiral Bot sunk your ${s}`),
            (y.hits = e.filter((t) => t !== s))),
          i.push(s));
      }
      s("destroyer", 2),
        s("submarine", 3),
        s("cruiser", 3),
        s("battleship", 4),
        s("carrier", 5),
        console.log("playerHits", m.hits),
        console.log("playerSunkShips", m.sunkShips),
        5 === m.sunkShips.length &&
          ((o.textContent = "You sunk all of Admiral Bot's ships. YOU WIN!"),
          (m.gameOver = !0)),
        5 === y.sunkShips.length &&
          ((o.textContent = "The Admiral Bot has sunk all ships. YOU LOST!"),
          (y.gameOver = !0));
    }
    (m.ships = [d, l, c, u, p]),
      m.ships.forEach((t) => g.addShipPiece("computer", t)),
      Array.from(r.children).forEach((t) =>
        t.addEventListener("dragstart", g.dragStart),
      ),
      document.querySelectorAll("#player div").forEach((t) => {
        t.addEventListener("dragover", (t) => {
          g.dragOver(t, g.angle);
        }),
          t.addEventListener("drop", (t) => {
            g.dropShip(t, g.angle);
          });
      }),
      n.addEventListener("click", function () {
        const t = Array.from(r.children);
        (g.angle = 90 === g.angle ? 0 : 90),
          t.forEach((t) => (t.style.transform = `rotate(${g.angle}deg)`));
      }),
      a.addEventListener("click", function () {
        (m.playerTurn = !0) &&
          (0 != r.children.length
            ? (o.textContent = "Please place all of your ships first!")
            : (document
                .querySelectorAll("#computer div")
                .forEach((t) => t.addEventListener("click", f)),
              (m.playerTurn = !0),
              h.classList.add("show"),
              (h.textContent = "Your Go!"),
              o.classList.add("show"),
              (o.textContent = "The game has started")));
      });
  })();
})();
